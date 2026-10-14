export type SectionId = "osnova" | "cikly" | "massivy";

export type Topic = {
  id: string;
  section: SectionId;
  number: string;
  title: string;
  short: string;
  tag: string;
  duration: string;
  lead: string;
  analogy: string;
  bullets?: string[];
  mistakes?: { wrong: string; right: string }[];
  exampleTitle: string;
  exampleDescription: string;
  code: string;
  input?: string;
  output: string;
  steps: { token: string; explanation: string }[];
  takeaway: string;
  tryIt: string;
  extra?: { title: string; description: string; code: string };
  quiz: {
    question: string;
    options: string[];
    answer: number;
    hint: string;
    explanation: string;
  };
};

export type Problem = {
  id: string;
  number: string;
  title: string;
  difficulty: "лёгкая" | "средняя" | "сложная";
  tags: string[];
  statement: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  hint: string;
  idea: string;
  code: string;
  steps: string[];
};

export type TestQuestion = {
  id: string;
  kind: "theory" | "task";
  topic: string;
  question: string;
  code?: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
};

export type CheatItem = {
  term: string;
  title: string;
  description: string;
  code: string;
};

export const sectionMeta: Record<
  SectionId,
  { slug: string; title: string; kicker: string; blurb: string; eyebrow: string }
> = {
  osnova: {
    slug: "osnova",
    title: "Основа",
    kicker: "С чего всё начинается",
    blurb: "Программа, переменные, типы, real и формат вывода, ввод-вывод, условия и лесенки, boolean, строки, функции, процедуры и типичные ловушки. Полная база на 10.",
    eyebrow: "01 / База",
  },
  cikly: {
    slug: "cikly",
    title: "Циклы",
    kicker: "Повторяем без копипаста",
    blurb: "for, while, repeat, счётчики и суммы, вложенные циклы, break, цифры и делители, ввод до стоп-сигнала и трассировка — всё, что любят на контрольных.",
    eyebrow: "02 / Повторения",
  },
  massivy: {
    slug: "massivy",
    title: "Массивы",
    kicker: "Много значений — одно имя",
    blurb: "Заполнение, сумма, min/max, поиск, реверс и сдвиг, пузырёк, удаление и вставка, матрицы. Разберём на пальцах.",
    eyebrow: "03 / Данные",
  },
};
