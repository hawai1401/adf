import textToMarkdown from "@/lib/textToMarkdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Hr from "./Hr";
import { Button } from "../animate-ui/components/buttons/button";
import { tags } from "@/lib/tags";

export default function Serveur({
  logo,
  name,
  member_count,
  description,
  tags,
  link,
}: {
  logo?: string | null | undefined;
  name: string;
  member_count: number | string;
  description: string;
  tags?: tags[] | null | undefined;
  link: string;
}) {
  const tags_class: Record<Uppercase<string>, string> = {
    PUB: "error",
    RP: "secondary",
    GRAPHISME: "primary",
    COMMUNAUTAIRE: "info",
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
            <h4 className="font-semibold">{name}</h4>
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
            {tags.map((b, i) => (
              <div
                className={cn(
                  "p-4 badge badge-soft border",
                  `badge-${tags_class[b.toUpperCase() as Uppercase<string>]}`,
                  `border-${tags_class[b.toUpperCase() as Uppercase<string>]}`
                )}
                key={i}
              >
                {b}
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
