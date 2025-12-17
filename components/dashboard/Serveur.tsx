import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Serveur({
  disabled,
  logo,
  name,
  member_count,
  description,
  badges,
  id,
}: {
  disabled?: boolean | null | undefined;
  logo?: string | null | undefined;
  name: string;
  member_count: number | string;
  description?: string | null | undefined;
  badges?:
    | Array<"Pub" | "Rp" | "Graphisme" | "Communautaire">
    | null
    | undefined;
  id: string;
}) {
  const badges_class: Record<Uppercase<string>, string> = {
    PUB: "error",
    RP: "neutral",
    GRAPHISME: "primary",
    COMMUNAUTAIRE: "info",
  };
  const content = (
    <>
      <div className="flex justify-center items-center gap-4 mb-0.5">
        {logo ? (
          <Image
            src={logo}
            width={50}
            height={50}
            alt="Logo"
            className={cn(
              "rounded-full border border-accent",
              disabled ? "grayscale" : ""
            )}
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
      {!disabled && description && (
        <>
          <hr className="w-full h-2 border-accent" />
          <p className="text-justify mb-0.5">{description}</p>
        </>
      )}
      {badges && (
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
    </>
  );
  if (disabled) {
    return (
      <div className="bg-base-300 p-4 rounded-box flex items-start md:items-center justify-center flex-col gap-4 cursor-pointer hover:scale-[1.02] h-full transition-transform">
        {content}
      </div>
    );
  } else {
    return (
      <Link
        href={`/dashboard/serveurs/${id}`}
        className="bg-base-300 p-4 rounded-box flex items-start md:items-center justify-center flex-col gap-4 cursor-pointer hover:scale-[1.02] h-full transition-transform"
      >
        {content}
      </Link>
    );
  }
}
