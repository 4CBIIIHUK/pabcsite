import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { sectionMeta, type SectionId } from "../data/types";
import { topicsBySection } from "../data/topics";

export function SectionPage({
  section,
  completed,
  onHome,
  onTopic,
}: {
  section: SectionId;
  completed: string[];
  onHome: () => void;
  onTopic: (id: string) => void;
}) {
  const meta = sectionMeta[section];
  const list = topicsBySection(section);
  const done = list.filter((topic) => completed.includes(topic.id)).length;

  return (
    <main className="hub-page">
      <div className="container lesson-topbar">
        <button type="button" className="back-link" onClick={onHome}>
          <ArrowLeft size={17} /> На главную
        </button>
        <span>{meta.eyebrow}</span>
      </div>
      <section className="section-spacing hub-hero">
        <div className="container roadmap-layout">
          <motion.div
            className="section-intro roadmap-intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-eyebrow">{meta.kicker}</span>
            <h2>
              {meta.title}
              <span className="title-period">.</span>
            </h2>
            <p>{meta.blurb}</p>
            <div className="course-progress" aria-label={`Пройдено ${done} из ${list.length}`}>
              <div className="course-progress-track">
                <span style={{ width: `${(done / list.length) * 100}%` }} />
              </div>
              <span>
                {done === 0 ? "Ещё ни одной темы — самое время начать" : `Пройдено ${done} из ${list.length} тем`}
              </span>
            </div>
          </motion.div>
          <div className="roadmap-list">
            {list.map((topic, index) => {
              const isDone = completed.includes(topic.id);
              return (
                <motion.button
                  className="roadmap-row"
                  type="button"
                  key={topic.id}
                  onClick={() => onTopic(topic.id)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  aria-label={`Тема ${topic.number}: ${topic.title}${isDone ? ", пройдена" : ""}`}
                >
                  <span className="roadmap-number">{topic.number}</span>
                  <span className="roadmap-text">
                    <strong>{topic.title}</strong>
                    <span>{topic.short}</span>
                  </span>
                  <span className="roadmap-end">
                    <small>{topic.duration}</small>
                    <span className={`roadmap-arrow${isDone ? " is-done" : ""}`}>
                      {isDone ? <Check size={20} /> : <ArrowUpRight size={21} />}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
