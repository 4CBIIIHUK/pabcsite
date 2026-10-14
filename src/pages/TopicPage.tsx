import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ExternalLink } from "lucide-react";
import type { Topic } from "../data/types";
import { sectionMeta } from "../data/types";
import { topicsBySection } from "../data/topics";
import { AnswerOptions } from "../components/AnswerOptions";
import { CodeBlock } from "../components/CodeBlock";
import { SparkMark } from "../components/HeroArt";

export function TopicPage({
  topic,
  completed,
  onTopic,
  onSection,
  onComplete,
}: {
  topic: Topic;
  completed: string[];
  onTopic: (id: string) => void;
  onSection: (section: Topic["section"]) => void;
  onComplete: (id: string) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const sectionTopics = topicsBySection(topic.section);
  const index = sectionTopics.findIndex((item) => item.id === topic.id);
  const nextTopic = sectionTopics[index + 1];
  const previousTopic = sectionTopics[index - 1];
  const solved = selected === topic.quiz.answer;
  const meta = sectionMeta[topic.section];

  function selectAnswer(answer: number) {
    setSelected(answer);
    if (answer === topic.quiz.answer) onComplete(topic.id);
  }

  return (
    <main className="lesson-page">
      <div className="container lesson-topbar">
        <button type="button" className="back-link" onClick={() => onSection(topic.section)}>
          <ArrowLeft size={17} /> {meta.title}
        </button>
        <span>
          Тема {topic.number} / {String(sectionTopics.length).padStart(2, "0")}
        </span>
      </div>
      <div className="container lesson-layout">
        <aside className="lesson-sidebar" aria-label="Список тем раздела">
          <div className="sidebar-heading">
            <span>{meta.title.toUpperCase()}</span>
            <strong>
              {sectionTopics.filter((item) => completed.includes(item.id)).length} / {sectionTopics.length}
            </strong>
          </div>
          <div className="sidebar-progress">
            <span
              style={{
                width: `${(sectionTopics.filter((item) => completed.includes(item.id)).length / sectionTopics.length) * 100}%`,
              }}
            />
          </div>
          <div className="sidebar-lessons">
            {sectionTopics.map((item) => (
              <button
                type="button"
                className={`sidebar-lesson${item.id === topic.id ? " is-active" : ""}`}
                key={item.id}
                onClick={() => onTopic(item.id)}
                aria-current={item.id === topic.id ? "step" : undefined}
              >
                <span className="sidebar-lesson-number">
                  {completed.includes(item.id) ? <Check size={15} /> : item.number}
                </span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
          <p className="sidebar-note">Не спеши. Каждую тему можно пройти в своём темпе.</p>
        </aside>

        <article className="lesson-article">
          <div className="mobile-lesson-select">
            <label htmlFor="lesson-picker">Перейти к теме</label>
            <div className="select-wrap">
              <select id="lesson-picker" value={topic.id} onChange={(event) => onTopic(event.target.value)}>
                {sectionTopics.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.number}. {item.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} aria-hidden="true" />
            </div>
          </div>
          <motion.div key={topic.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="lesson-kicker">
              <span>{topic.tag}</span>
              <span className="kicker-dot" />
              <span>{topic.duration} на чтение</span>
              {completed.includes(topic.id) && (
                <span className="completed-kicker">
                  <Check size={14} /> Пройдена
                </span>
              )}
            </div>
            <h1>
              {topic.title}
              <span className="title-period">.</span>
            </h1>
            <p className="lesson-subtitle">{topic.short}</p>

            <section className="lesson-section lesson-explanation" aria-labelledby="idea-title">
              <span className="lesson-section-label">01 / Разбираемся</span>
              <h2 id="idea-title">Сначала по-человечески</h2>
              <p>{topic.lead}</p>
              <div className="analogy">
                <SparkMark />
                <p>{topic.analogy}</p>
              </div>
              {topic.bullets && (
                <ul className="fact-list">
                  {topic.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>

            <section className="lesson-section" aria-labelledby="example-title">
              <span className="lesson-section-label">02 / Смотрим код</span>
              <h2 id="example-title">{topic.exampleTitle}</h2>
              <p>{topic.exampleDescription}</p>
              {topic.id === "first-program" && (
                <a className="lesson-setup-link" href="https://pascalabc.net/" target="_blank" rel="noopener noreferrer">
                  Нет программы? Открой официальный сайт <ExternalLink size={15} />
                </a>
              )}
              <CodeBlock code={topic.code} />
              <div className="console-output">
                {topic.input && (
                  <div>
                    <span>Что вводим</span>
                    <pre>{topic.input}</pre>
                  </div>
                )}
                <div>
                  <span>Что увидим</span>
                  <pre>{topic.output}</pre>
                </div>
              </div>
            </section>

            <section className="lesson-section" aria-labelledby="steps-title">
              <span className="lesson-section-label">03 / По полочкам</span>
              <h2 id="steps-title">Что здесь происходит?</h2>
              <div className="explanation-list">
                {topic.steps.map((step, stepIndex) => (
                  <div className="explanation-row" key={stepIndex}>
                    <code>{step.token}</code>
                    <p>{step.explanation}</p>
                  </div>
                ))}
              </div>
              <div className="remember-note">
                <strong>Запомни</strong>
                <p>{topic.takeaway}</p>
              </div>
              <div className="try-note">
                <strong>Твоя очередь</strong>
                <p>{topic.tryIt}</p>
              </div>
            </section>

            {topic.mistakes && (
              <section className="lesson-section extra-section" aria-labelledby="mistakes-title">
                <span className="lesson-section-label">Типичные грабли</span>
                <h2 id="mistakes-title">Так нельзя — так можно</h2>
                <div className="mistake-list">
                  {topic.mistakes.map((row) => (
                    <div className="mistake-row" key={row.wrong}>
                      <div>
                        <span>Не так</span>
                        <code>{row.wrong}</code>
                      </div>
                      <div>
                        <span>Вот так</span>
                        <code>{row.right}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {topic.extra && (
              <section className="lesson-section extra-section" aria-labelledby="extra-title">
                <span className="lesson-section-label">Ещё один шаг</span>
                <h2 id="extra-title">{topic.extra.title}</h2>
                <p>{topic.extra.description}</p>
                <CodeBlock code={topic.extra.code} />
              </section>
            )}

            <section className="lesson-quiz" aria-labelledby="quiz-title">
              <div className="quiz-heading">
                <span className="section-eyebrow">04 / Проверим себя</span>
                <SparkMark className="quiz-spark" />
              </div>
              <h2 id="quiz-title">
                Кажется, ты уже <em>разобрался.</em>
              </h2>
              <p className="quiz-question">{topic.quiz.question}</p>
              <AnswerOptions
                options={topic.quiz.options}
                answer={topic.quiz.answer}
                selected={selected}
                onSelect={selectAnswer}
              />
              <AnimatePresence mode="wait">
                {selected !== null && (
                  <motion.div
                    className={`answer-feedback${solved ? " feedback-success" : " feedback-retry"}`}
                    key={selected}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                  >
                    <strong>{solved ? "Именно так!" : "Ничего страшного, попробуй ещё."}</strong>{" "}
                    {solved ? topic.quiz.explanation : topic.quiz.hint}
                  </motion.div>
                )}
              </AnimatePresence>
              {solved && (
                <button
                  className="button button-dark quiz-next"
                  type="button"
                  onClick={() => (nextTopic ? onTopic(nextTopic.id) : onSection(topic.section))}
                >
                  {nextTopic ? "Следующая тема" : `К разделу «${meta.title}»`}
                  <ArrowRight size={18} />
                </button>
              )}
            </section>

            <div className="lesson-bottom-nav">
              {previousTopic ? (
                <button type="button" onClick={() => onTopic(previousTopic.id)}>
                  <ArrowLeft size={16} /> Предыдущая тема
                </button>
              ) : (
                <span />
              )}
              {nextTopic && (
                <button type="button" onClick={() => onTopic(nextTopic.id)}>
                  Следующая: {nextTopic.title} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </article>
      </div>
      <div className="lesson-footer">
        <div className="container">
          <span>Маленькие шаги. Большое понимание. · by чсв</span>
          <button type="button" onClick={() => onSection(topic.section)}>
            Вернуться к разделу <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}

