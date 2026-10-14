import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Braces,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  GraduationCap,
  Repeat,
} from "lucide-react";
import { useState } from "react";
import { cheatsheet } from "../data/cheatsheet";
import { topics } from "../data/topics";
import { problems } from "../data/problems";
import { theoryQuestions, taskQuestions } from "../data/tests";
import { HeroArt } from "../components/HeroArt";

const tracks = [
  {
    id: "osnova",
    number: "01",
    title: "Основа",
    text: "Каркас программы, типы, real, ввод-вывод, if/else if/case, boolean, строки, функции, процедуры и грабли новичков.",
    meta: `${topics.filter((t) => t.section === "osnova").length} тем`,
    icon: BookOpen,
  },
  {
    id: "cikly",
    number: "02",
    title: "Циклы",
    text: "for, while, repeat, копилки, вложенные циклы, цифры числа, ввод до нуля и трассировка «что выведет».",
    meta: `${topics.filter((t) => t.section === "cikly").length} тем`,
    icon: Repeat,
  },
  {
    id: "massivy",
    number: "03",
    title: "Массивы",
    text: "Шкафчик с ячейками: заполнение, min/max, поиск, реверс, пузырёк, удаление/вставка и матрицы.",
    meta: `${topics.filter((t) => t.section === "massivy").length} тем`,
    icon: Braces,
  },
  {
    id: "zadachi",
    number: "04",
    title: "Примеры задач",
    text: "Разборы как на контрольной: условие, идея, код, шаги. От суммы двух чисел до двух максимумов.",
    meta: `${problems.length} задач`,
    icon: ClipboardList,
  },
  {
    id: "testy",
    number: "05",
    title: "Тесты",
    text: "Два режима: теория без кода и задачи «что выведет программа». Сразу видно, где дыра.",
    meta: `${theoryQuestions.length} теор. · ${taskQuestions.length} задач`,
    icon: GraduationCap,
  },
];

const marquee = [
  "begin", "end.", "var", "integer", "real", ":=", "Readln", "Writeln",
  "if then else", "and or not", "for to do", "while", "repeat until",
  "div", "mod", "array[1..n]", "function", "Result",
];

export function HomePage({
  completed,
  onNav,
  onStart,
}: {
  completed: string[];
  onNav: (id: string) => void;
  onStart: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const hasProgress = completed.length > 0;

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <motion.p
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Понятный курс для 10 класса
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="hero-title-main">PascalABC.NET</span>
              <br />
              <span className="hero-title-soft">без паники.</span>
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              {topics.length} уроков: вся основа, циклы и массивы, плюс разборы задач и тесты — отдельно по теории
              и по коду. Объясняем человеческим языком, чтобы одноклассники наконец разобрали эту чухню на 10.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <button className="button button-cream" type="button" onClick={onStart}>
                {hasProgress ? "Продолжить учиться" : "Начать с нуля"} <ArrowUpRight size={19} />
              </button>
              <button className="hero-secondary" type="button" onClick={() => onNav("osnova")}>
                Смотреть разделы <ArrowDown size={18} />
              </button>
            </motion.div>
            <motion.div
              className="hero-stamp"
              initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
              animate={{ opacity: 1, rotate: -6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              aria-hidden="true"
            >
              10 класс
            </motion.div>
          </div>
          <motion.div
            className="hero-art"
            initial={{ opacity: 0, x: 42, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          >
            <HeroArt />
          </motion.div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="tracks-section section-spacing" id="osnova" aria-labelledby="tracks-title">
        <div className="container tracks-layout">
          <motion.div
            className="section-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <span className="section-eyebrow">Пять блоков</span>
            <h2 id="tracks-title">
              Сложное становится <em>простым.</em> По полкам.
            </h2>
            <p>
              Не надо глотать всё сразу. Открой нужный раздел, пройди темы, потом проверь себя тестом.
              Прогресс сохраняется в браузере.
            </p>
            <div className="course-progress" aria-label={`Пройдено ${completed.length} из ${topics.length} тем`}>
              <div className="course-progress-track">
                <span style={{ width: `${(completed.length / topics.length) * 100}%` }} />
              </div>
              <span>
                {completed.length === 0
                  ? "Твой путь начнётся с первой темы основы"
                  : `Пройдено ${completed.length} из ${topics.length} тем`}
              </span>
            </div>
          </motion.div>

          <div className="track-list">
            {tracks.map((track, index) => {
              const Icon = track.icon;
              return (
                <motion.button
                  className="track-card"
                  type="button"
                  key={track.id}
                  onClick={() => onNav(track.id)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 6 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <span className="track-number">{track.number}</span>
                  <span className="track-icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="track-text">
                    <strong>{track.title}</strong>
                    <span>{track.text}</span>
                  </span>
                  <span className="track-end">
                    <small>{track.meta}</small>
                    <span className="roadmap-arrow">
                      <ArrowUpRight size={21} />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cheatsheet-section section-spacing" id="cheatsheet" aria-labelledby="cheatsheet-title">
        <div className="container cheatsheet-layout">
          <motion.div
            className="section-intro cheatsheet-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <span className="section-eyebrow">Всегда под рукой</span>
            <h2 id="cheatsheet-title">
              Забыл команду? <em>Подсмотри.</em>
            </h2>
            <p>Короткая шпаргалка по самым нужным словам PascalABC.NET. Возвращайся к ней, когда пишешь свой код.</p>
            <a className="official-link" href="https://pascalabc.net/" target="_blank" rel="noopener noreferrer">
              Где писать код? Сайт PascalABC.NET <ExternalLink size={16} />
            </a>
          </motion.div>
          <div className="cheatsheet-list">
            {cheatsheet.map((item, index) => {
              const open = openIndex === index;
              return (
                <div className={`cheat-item${open ? " is-open" : ""}`} key={item.term}>
                  <button
                    type="button"
                    className="cheat-trigger"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`cheat-detail-${index}`}
                  >
                    <code>{item.term}</code>
                    <span>{item.title}</span>
                    <ChevronDown size={21} className="cheat-chevron" />
                  </button>
                  {open && (
                    <div id={`cheat-detail-${index}`} className="cheat-detail">
                      <div className="cheat-detail-inner">
                        <p>{item.description}</p>
                        <pre>
                          <code>{item.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
