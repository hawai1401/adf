import parseInline from "@/lib/parseInline";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

export default function Serveur({
  logo,
  name,
  member_count,
  description,
  badges,
}: {
  logo?: string | null | undefined;
  name: string;
  member_count: number | string;
  description: string;
  badges?:
    | Array<"Pub" | "Rp" | "Graphisme" | "Communautaire">
    | null
    | undefined;
}) {
  const badges_class: Record<Uppercase<string>, string> = {
    PUB: "error",
    RP: "neutral",
    GRAPHISME: "primary",
    COMMUNAUTAIRE: "info",
  };

  const desc: ReactNode = description.split("\n").map((s, i) => {
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
  return (
    <div className="bg-base-300 p-4 rounded-box flex flex-col w-full sm:w-[calc(100%/2-2%)] lg:w-[calc(100%/3-2%)] gap-4">
      <div className="flex justify-center items-center gap-4 mb-0.5">
        {logo ? (
          <Image
            src={logo}
            width={50}
            height={50}
            alt="Logo"
            className="rounded-full border border-accent"
          />
        ) : (
          <div className="w-12.5 h-12.5 rounded-full border border-accent flex items-center justify-center">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col">
          <h4 className="font-semibold">{name}</h4>
          <p>{member_count} membres</p>
        </div>
      </div>
      <hr className="w-full h-2 border-accent" />
      <p className="text-justify mb-0.5 flex flex-col">{desc}</p>
      {badges && badges.length > 0 && (
        <>
          <hr className="w-full h-2 border-accent" />
          <div className="flex flex-wrap items-center justify-center">
            {badges.map((b, i) => (
              <div
                className={cn(
                  "badge p-2",
                  `badge-${badges_class[b.toUpperCase() as Uppercase<string>]}`
                )}
                key={i}
              >
                {b.toUpperCase()}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
