import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lightbulb } from "lucide-react";
import { problems, findProblem } from "../data/problems";
import { CodeBlock } from "../components/CodeBlock";

const filters = ["все", "лёгкая", "средняя", "сложная"] as const;

export function ProblemsPage({
  problemId,
  onHome,
  onOpen,
}: {
  problemId: string | null;
  onHome: () => void;
  onOpen: (id: string | null) => void;
}) {
  const problem = problemId ? findProblem(problemId) : undefined;
  const [filter, setFilter] = useState<(typeof filters)[number]>("все");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const visible = useMemo(
    () => problems.filter((item) => filter === "все" || item.difficulty === filter),
    [filter],
  );

  if (problem) {
    const index = problems.findIndex((item) => item.id === problem.id);
    const next = problems[index + 1];
    const prev = problems[index - 1];

    return (
      <main className="lesson-page">
        <div className="container lesson-topbar">
          <button
            type="button"
            className="back-link"
            onClick={() => {
              setShowHint(false);
              setShowSolution(false);
              onOpen(null);
            }}
          >
            <ArrowLeft size={17} /> Все задачи
          </button>
          <span>
            Задача {problem.number} / {String(problems.length).padStart(2, "0")}
          </span>
        </div>
        <article className="container problem-article">
          <motion.div key={problem.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="lesson-kicker">
              <span>{problem.difficulty}</span>
              <span className="kicker-dot" />
              {problem.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>
              {problem.title}
              <span className="title-period">.</span>
            </h1>
            <p className="lesson-subtitle">{problem.statement}</p>

            <section className="lesson-section">
              <span className="lesson-section-label">Формат</span>
              <h2>Что на входе и что сдать</h2>
              <div className="io-grid">
                <div>
                  <span>Ввод</span>
                  <p>{problem.inputFormat}</p>
                </div>
                <div>
                  <span>Вывод</span>
                  <p>{problem.outputFormat}</p>
                </div>
              </div>
              <div className="console-output">
                <div>
                  <span>Пример ввода</span>
                  <pre>{problem.sampleInput}</pre>
                </div>
                <div>
                  <span>Пример вывода</span>
                  <pre>{problem.sampleOutput}</pre>
                </div>
              </div>
            </section>

            <section className="lesson-section">
              <span className="lesson-section-label">Думай сам</span>
              <h2>Подсказка и идея</h2>
              <p>Сначала попробуй на листочке. Подсказка не стыд, а ускоритель.</p>
              <button className="ghost-btn" type="button" onClick={() => setShowHint((v) => !v)}>
                <Lightbulb size={16} /> {showHint ? "Скрыть подсказку" : "Показать подсказку"}
              </button>
              {showHint && (
                <div className="try-note">
                  <strong>Подсказка</strong>
                  <p>{problem.hint}</p>
                </div>
              )}
              <div className="remember-note">
                <strong>Идея</strong>
                <p>{problem.idea}</p>
              </div>
            </section>

            <section className="lesson-section">
              <span className="lesson-section-label">Разбор</span>
              <h2>Решение</h2>
              <button className="button button-dark" type="button" onClick={() => setShowSolution((v) => !v)}>
                {showSolution ? "Скрыть код" : "Показать решение"}
              </button>
              {showSolution && (
                <>
                  <CodeBlock code={problem.code} />
                  <div className="explanation-list">
                    {problem.steps.map((step, i) => (
                      <div className="explanation-row" key={step}>
                        <code>шаг {String(i + 1).padStart(2, "0")}</code>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>

            <div className="lesson-bottom-nav">
              {prev ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowHint(false);
                    setShowSolution(false);
                    onOpen(prev.id);
                  }}
                >
                  <ArrowLeft size={16} /> {prev.title}
                </button>
              ) : (
                <span />
              )}
              {next && (
                <button
                  type="button"
                  onClick={() => {
                    setShowHint(false);
                    setShowSolution(false);
                    onOpen(next.id);
                  }}
                >
                  {next.title} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </article>
        <div className="lesson-footer">
          <div className="container">
            <span>Сначала идея, потом код. · by чсв</span>
            <button type="button" onClick={() => onOpen(null)}>
              К списку задач <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="hub-page">
      <div className="container lesson-topbar">
        <button type="button" className="back-link" onClick={onHome}>
          <ArrowLeft size={17} /> На главную
        </button>
        <span>04 / Примеры задач</span>
      </div>
      <section className="section-spacing">
        <div className="container roadmap-layout">
          <div className="section-intro roadmap-intro">
            <span className="section-eyebrow">Как на контрольной</span>
            <h2>
              Сначала условие. <em>Потом код.</em>
            </h2>
            <p>
              {problems.length} задач с подсказкой, идеей и полным решением. Открой любую, попробуй сам, сверься.
              Фильтр по сложности — если хочешь разогреться или сразу в бой.
            </p>
            <div className="filter-row">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`filter-chip${filter === item ? " is-active" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="roadmap-list">
            {visible.map((item, index) => (
              <motion.button
                className="roadmap-row"
                type="button"
                key={item.id}
                onClick={() => onOpen(item.id)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <span className="roadmap-number">{item.number}</span>
                <span className="roadmap-text">
                  <strong>{item.title}</strong>
                  <span>{item.statement}</span>
                </span>
                <span className="roadmap-end">
                  <small>{item.difficulty}</small>
                  <span className="roadmap-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
