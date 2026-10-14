import type { CheatItem } from "./types";

export const cheatsheet: CheatItem[] = [
  {
    term: "begin ... end.",
    title: "Начало и конец",
    description: "Между begin и end пишутся команды основной программы. После последнего end ставится точка. Внутри циклов и условий тоже бывают begin…end, но уже с точкой с запятой.",
    code: "begin\n  Writeln('Готово!');\nend.",
  },
  {
    term: "var / :=",
    title: "Объявить и записать",
    description: "var создаёт переменную и указывает тип. := кладёт значение внутрь. Обычный = в Pascal сравнивает, а не присваивает.",
    code: "var x: integer;\nbegin\n  x := 5;\n  if x = 5 then Writeln('Да');\nend.",
  },
  {
    term: "Write / Writeln",
    title: "Показать ответ",
    description: "Обе команды выводят данные. Writeln после вывода переходит на следующую строку, Write остаётся на этой и не добавляет пробел сам по себе.",
    code: "Write('Ответ: ');\nWriteln(42); // Ответ: 42",
  },
  {
    term: "Readln(x)",
    title: "Получить ввод",
    description: "Программа ждёт значение с клавиатуры и сохраняет его в переменную. Несколько чисел можно считать сразу: Readln(a, b).",
    code: "var a, b: integer;\nbegin\n  Readln(a, b);\nend.",
  },
  {
    term: "div / mod",
    title: "Деление целых",
    description: "div — целая часть, mod — остаток. 7 div 2 = 3, 7 mod 2 = 1. Для дробного деления бери / и тип real.",
    code: "Writeln(7 div 2); // 3\nWriteln(7 mod 2); // 1",
  },
  {
    term: "if / else",
    title: "Решение",
    description: "if условие then действие. Перед else точку с запятой не ставят — иначе else «отвалится» от if.",
    code: "if n mod 2 = 0 then\n  Writeln('Чётное')\nelse\n  Writeln('Нечётное');",
  },
  {
    term: "for / while",
    title: "Повторить",
    description: "for — когда известны начало и конец. while — пока условие истинно. В while обязательно меняй переменную, иначе цикл станет бесконечным.",
    code: "for var i := 1 to 3 do\n  Writeln(i);",
  },
  {
    term: "array[1..n]",
    title: "Набор ячеек",
    description: "Массив хранит несколько значений одного типа. a[i] — элемент с номером i. Границы смотри в квадратных скобках.",
    code: "var a: array[1..5] of integer;\nbegin\n  a[1] := 10;\n  Writeln(a[1]);\nend.",
  },
  {
    term: "function / Result",
    title: "Вернуть значение",
    description: "Функция получает параметры и вычисляет ответ. Result — то, что она вернёт. procedure делает действие, но значение не возвращает.",
    code: "function Double(x: integer): integer;\nbegin\n  Result := x * 2;\nend;",
  },
];
