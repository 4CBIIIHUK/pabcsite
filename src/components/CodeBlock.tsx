import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

const keywords = new Set([
  "array", "begin", "do", "else", "end", "for", "function", "if", "of",
  "procedure", "then", "to", "var", "while", "result", "div", "mod",
  "and", "or", "not", "case", "downto", "repeat", "until", "const",
  "break", "continue", "true", "false",
]);
const types = new Set(["integer", "real", "string", "boolean", "char"]);
const builtins = new Set([
  "readln", "writeln", "write", "read", "random", "randomize",
  "abs", "sqr", "sqrt", "round", "trunc", "setlength",
]);
const tokenPattern =
  /(\/\/.*$|'(?:''|[^'])*'|\b(?:array|begin|do|else|end|for|function|if|of|procedure|then|to|var|while|result|div|mod|and|or|not|case|downto|repeat|until|const|break|continue|true|false|integer|real|string|boolean|char|readln|writeln|write|read|random|randomize|abs|sqr|sqrt|round|trunc|setlength)\b|\b\d+(?:\.\d+)?\b|:=|<=|>=|<>|\.\.)/gi;

export function highlightedLine(line: string): ReactNode[] {
  return line.split(tokenPattern).map((part, index) => {
    if (!part) return null;
    let className = "";
    const lower = part.toLowerCase();
    if (part.startsWith("//")) className = "syntax-comment";
    else if (part.startsWith("'")) className = "syntax-string";
    else if (keywords.has(lower)) className = "syntax-keyword";
    else if (types.has(lower)) className = "syntax-type";
    else if (builtins.has(lower)) className = "syntax-function";
    else if (/^\d+(?:\.\d+)?$/.test(part)) className = "syntax-number";
    else if ([":=", "<=", ">=", "<>", ".."].includes(part)) className = "syntax-operator";
    return (
      <span className={className || undefined} key={`${index}-${part}`}>
        {part}
      </span>
    );
  });
}

export function CodeBlock({
  code,
  compact = false,
  copyable = true,
  filename = "main.pas",
}: {
  code: string;
  compact?: boolean;
  copyable?: boolean;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`code-block${compact ? " code-block-compact" : ""}`}>
      <div className="code-toolbar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>{filename}</span>
        {copyable && (
          <button
            className="copy-button"
            type="button"
            onClick={copyCode}
            aria-label={copied ? "Код скопирован" : "Скопировать код"}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? "Скопировано" : "Скопировать"}</span>
          </button>
        )}
      </div>
      <pre className="code-pre">
        <code>
          {code.split("\n").map((line, index) => (
            <span className="code-line" key={index}>
              <span className="line-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="line-text">{line ? highlightedLine(line) : " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
