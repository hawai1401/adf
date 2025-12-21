import { ReactNode } from "react";

export default function textToMarkdown(description: string): ReactNode[] {
  function parseInline(text: string) {
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

  return description.split("\n").map((s, i) => {
    // Titres
    if (s.startsWith("### "))
      return (
        <div className="text-lg font-semibold" key={i}>
          {parseInline(s.slice(4))}
        </div>
      );

    if (s.startsWith("## "))
      return (
        <div className="text-xl font-semibold" key={i}>
          {parseInline(s.slice(3))}
        </div>
      );

    if (s.startsWith("# "))
      return (
        <div className="text-2xl font-bold" key={i}>
          {parseInline(s.slice(2))}
        </div>
      );

    // Blockquote >
    if (s.startsWith("> "))
      return (
        <div key={i} className="border-l-4 border-gray-500 pl-3 opacity-90">
          {parseInline(s.slice(2))}
        </div>
      );

    // Listes
    if (s.startsWith("- ") || s.startsWith("* "))
      return (
        <div key={i} className="flex gap-2 pl-2">
          <span>•</span>
          <span>{parseInline(s.slice(2))}</span>
        </div>
      );

    // Ligne vide
    if (s.trim() === "") return <br key={i} />;

    // Texte normal
    return <div key={i}>{parseInline(s)}</div>;
  });
}
