import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpenText, Code2, RotateCcw, Trophy } from "lucide-react";
import { AnswerOptions } from "../components/AnswerOptions";
import { CodeBlock } from "../components/CodeBlock";
import { taskQuestions, theoryQuestions } from "../data/tests";
import type { TestQuestion } from "../data/types";

type Mode = "choice" | "theory" | "task";

function verdict(score: number, total: number) {
  const ratio = score / total;
  if (ratio === 1) return "Идеально. Можешь объяснять одноклассникам.";
  if (ratio >= 0.8) return "Крепко. На контрольной должно хватить.";
  if (ratio >= 0.5) return "Середина. Открой темы, где ошибся, и пройди ещё раз.";
  return "Это не провал — это карта дыр. Вернись в нужный раздел и закрой их.";
}

function Quiz({
  title,
  eyebrow,
  questions,
  onExit,
}: {
  title: string;
  eyebrow: string;
  questions: TestQuestion[];
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState<(number | null)[]>(() => questions.map(() => null));
  const finished = index >= questions.length;
  const question = questions[index];
  const score = locked.filter((value, i) => value === questions[i].answer).length;

  function pick(answer: number) {
    if (selected !== null) return;
    setSelected(answer);
    setLocked((current) => {
      const next = [...current];
      next[index] = answer;
      return next;
    });
  }

  function next() {
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setLocked(questions.map(() => null));
  }

  const wrong = useMemo(
    () => questions.filter((item, i) => locked[i] !== null && locked[i] !== item.answer),
    [locked, questions],
  );

  if (finished) {
    return (
      <div className="practice-panel test-panel">
        <div className="practice-finished">
          <span className="panel-eyebrow">{eyebrow} · результат</span>
          <div className="finish-symbol">
            <Trophy size={32} strokeWidth={2.2} />
          </div>
          <h3>
            {score} из {questions.length}
          </h3>
          <p>{verdict(score, questions.length)}</p>
          {wrong.length > 0 && (
            <ul className="wrong-list">
              {wrong.map((item) => (
                <li key={item.id}>
                  <strong>{item.topic}.</strong> {item.question}
                </li>
              ))}
            </ul>
          )}
          <div className="hero-actions" style={{ marginTop: 8 }}>
            <button className="button button-dark" type="button" onClick={restart}>
              Пройти ещё раз <RotateCcw size={17} />
            </button>
            <button className="hero-secondary" type="button" onClick={onExit} style={{ color: "#7a3b42" }}>
              К выбору теста
            </button>
          </div>
        </div>
      </div>
    );
  }

  const solved = selected !== null;

  return (
    <div className="practice-panel test-panel">
      <div className="panel-topline">
        <span className="panel-eyebrow">{title}</span>
        <span className="panel-counter">
          {String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
        </span>
      </div>
      <div className="test-progress">
        <span style={{ width: `${((index + (solved ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>
      <p className="test-topic">{question.topic}</p>
      <h3>{question.question}</h3>
      {question.code && <CodeBlock code={question.code} compact copyable={false} />}
      <p className="choose-label">Выбери один ответ · попытка одна</p>
      <AnswerOptions
        options={question.options}
        answer={question.answer}
        selected={selected}
        onSelect={pick}
        lockOnPick
      />
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            className={`answer-feedback${selected === question.answer ? " feedback-success" : " feedback-retry"}`}
            key={`${index}-${selected}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            <strong>{selected === question.answer ? "Верно!" : "Не в этот раз."}</strong> {question.explanation}
          </motion.div>
        )}
      </AnimatePresence>
      {solved && (
        <button className="panel-next" type="button" onClick={next}>
          {index === questions.length - 1 ? "Посмотреть результат" : "Следующий вопрос"}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}

export function TestsPage({
  mode,
  onHome,
  onMode,
}: {
  mode: Mode;
  onHome: () => void;
  onMode: (mode: Mode) => void;
}) {
  return (
    <main className="hub-page">
      <div className="container lesson-topbar">
        <button
          type="button"
          className="back-link"
          onClick={() => (mode === "choice" ? onHome() : onMode("choice"))}
        >
          <ArrowLeft size={17} /> {mode === "choice" ? "На главную" : "К выбору теста"}
        </button>
        <span>05 / Тесты</span>
      </div>

      <section className="section-spacing tests-section">
        <div className="container practice-layout">
          <motion.div
            className="section-intro practice-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-eyebrow">Проверь себя</span>
            <h2>
              Тесты делятся <em>на два.</em>
            </h2>
            <p>
              По теории — определения, знаки, ловушки с точкой с запятой. По задачам — смотришь код и говоришь, что
              выведется. В каждом вопросе одна попытка, в конце — счёт и список ошибок.
            </p>
          </motion.div>

          {mode === "choice" ? (
            <div className="test-choice">
              <button type="button" className="choice-card" onClick={() => onMode("theory")}>
                <span className="choice-icon">
                  <BookOpenText size={26} />
                </span>
                <strong>По теории</strong>
                <span>{theoryQuestions.length} вопросов · без трассы кода, чистые правила</span>
                <em>begin, :=, div, if, массивы</em>
              </button>
              <button type="button" className="choice-card" onClick={() => onMode("task")}>
                <span className="choice-icon">
                  <Code2 size={26} />
                </span>
                <strong>По задачам</strong>
                <span>{taskQuestions.length} вопросов · что напечатает программа?</span>
                <em>трассировка, как на самостоятельной</em>
              </button>
            </div>
          ) : (
            <Quiz
              title={mode === "theory" ? "Тест по теории" : "Тест по задачам"}
              eyebrow={mode === "theory" ? "Теория" : "Задачи"}
              questions={mode === "theory" ? theoryQuestions : taskQuestions}
              onExit={() => onMode("choice")}
            />
          )}
        </div>
      </section>
    </main>
  );
}
