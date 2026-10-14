import { Check, X } from "lucide-react";

export function AnswerOptions({
  options,
  answer,
  selected,
  onSelect,
  lockOnPick = false,
}: {
  options: string[];
  answer: number;
  selected: number | null;
  onSelect: (index: number) => void;
  lockOnPick?: boolean;
}) {
  const solved = selected === answer;
  const locked = solved || (lockOnPick && selected !== null);
  return (
    <div className="answer-list" role="group" aria-label="Варианты ответа">
      {options.map((option, index) => {
        const chosen = selected === index;
        return (
          <button
            className={`answer-option${chosen ? (index === answer ? " answer-correct" : " answer-incorrect") : ""}`}
            type="button"
            key={`${index}-${option}`}
            onClick={() => onSelect(index)}
            disabled={locked}
            aria-pressed={chosen}
          >
            <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
            <span>{option}</span>
            {chosen &&
              (index === answer ? (
                <Check size={19} className="answer-state-icon" />
              ) : (
                <X size={19} className="answer-state-icon" />
              ))}
          </button>
        );
      })}
    </div>
  );
}
