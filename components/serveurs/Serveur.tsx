import textToMarkdown from "@/lib/textToMarkdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Hr from "./Hr";
import { Button } from "../animate-ui/components/buttons/button";
import { tag } from "@/types/types";

export default function Serveur({
  id,
  name,
  member_count,
  description,
  link,
  logo,
  tags,
}: {
  id: string;
  name: string;
  member_count: number | string;
  description: string;
  link: string;
  logo?: string | null | undefined;
  tags?: tag[] | null | undefined;
}) {
  const tags_class: Record<tag, string> = {
    E_Sport: "primary",
    Pub: "secondary",
    Rp: "accent",
    Art: "info",
    Communautaire: "success",
    Gaming: "warning",
    Informatique: "error",
    Micronation: "success",
    Sport: "primary",
    Audiovisuel: "warning",
  };

  return (
    <div className="bg-base-300 p-4 rounded-box flex flex-col gap-4">
      <div className="grid grid-cols-4">
        <div className="flex justify-center items-center gap-4 col-span-3">
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
            <Link
              href={`/serveurs/${id}`}
              className="font-semibold hover:underline"
            >
              {name}
            </Link>
            <p>{member_count} membres</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button variant={"outline"} className="w-fit self-center rounded-lg">
            <Link href={link}>Rejoindre</Link>
          </Button>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <>
          <Hr />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tags.map((t, i) => (
              <div
                className={cn(
                  "p-4 badge badge-soft border",
                  `badge-${tags_class[t]}`,
                  `border-${tags_class[t]}`
                )}
                key={i}
              >
                {t}
              </div>
            ))}
          </div>
        </>
      )}
      <Hr />
      <div className="flex flex-col p-2">{textToMarkdown(description)}</div>
    </div>
  );
}
