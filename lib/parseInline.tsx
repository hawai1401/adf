import { ReactNode } from "react";

export default function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let i = 0;

  while (i < text.length) {
    // Gras **text**
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        parts.push(<strong key={i}>{text.slice(i + 2, end)}</strong>);
        i = end + 2;
        continue;
      }
    }

    // Souligné __text__
    if (text.startsWith("__", i)) {
      const end = text.indexOf("__", i + 2);
      if (end !== -1) {
        parts.push(<u key={i}>{text.slice(i + 2, end)}</u>);
        i = end + 2;
        continue;
      }
    }

    // Italique *text*
    if (text.startsWith("*", i)) {
      const end = text.indexOf("*", i + 1);
      if (end !== -1) {
        parts.push(<em key={i}>{text.slice(i + 1, end)}</em>);
        i = end + 1;
        continue;
      }
    }
    // Italique _text_
    if (text.startsWith("_", i)) {
      const end = text.indexOf("_", i + 1);
      if (end !== -1) {
        parts.push(<em key={i}>{text.slice(i + 1, end)}</em>);
        i = end + 1;
        continue;
      }
    }

    // Code inline `text`
    if (text.startsWith("`", i)) {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        parts.push(
          <code
            key={i}
            className="p-1 pr-0 rounded bg-base-200 font-mono text-center"
          >
            {text.slice(i + 1, end)}
          </code>
        );
        i = end + 1;
        continue;
      }
    }

    // Texte normal
    parts.push(text[i]);
    i++;
  }

  return parts;
}
