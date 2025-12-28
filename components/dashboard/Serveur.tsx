import { serveur } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Serveur({
  id,
  name,
  member_count,
  s_db,
  disabled,
  logo,
}: {
  id: string;
  name: string;
  member_count: number | string;
  s_db?: serveur | undefined;
  disabled?: boolean | null | undefined;
  logo?: string | null | undefined;
}) {
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
              disabled && !s_db?.whitelist ? "grayscale" : ""
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
    </>
  );
  if (disabled && !s_db?.whitelist) {
    return (
      <div className="bg-base-300 p-4 rounded-box flex items-start md:items-center justify-center flex-col gap-4 cursor-not-allowed hover:scale-[1.02] h-full transition-transform">
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
