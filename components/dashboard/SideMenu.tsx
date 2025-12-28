import type { serveur } from "@/lib/serveurs/userServers";
import type { serveur as db_serveur } from "@/generated/prisma/client";
import decodeDiscordPermissions from "@/lib/decodeDiscordPermissions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";

export default async function SideMenu({
  serveurs,
  serveurs_db,
  actual,
}: {
  serveurs: serveur[];
  serveurs_db: db_serveur[];
  actual?: string;
}) {
  return (
    <ul className="menu menu-xs bg-base-200 rounded-box max-w-55 mt-2 h-[calc(100vh-60px)]">
      <li>
        <Link href="/dashboard">
          <IoHomeOutline size={20} />
          Accueil
        </Link>
      </li>
      <li className="h-[calc(100%-56px)]">
        <details open>
          <summary>
            <IoPeopleOutline size={20} />
            Serveurs
          </summary>
          <ul className="max-w-45 h-full">
            {serveurs
              .filter(
                (s) =>
                  ((s.owner ||
                    decodeDiscordPermissions(s.permissions).includes(
                      "ADMINISTRATOR"
                    ) ||
                    decodeDiscordPermissions(s.permissions).includes(
                      "MANAGE_GUILD"
                    )) &&
                    s.approximate_member_count > 200) ||
                  serveurs_db.find((v) => v.id === s.id)?.whitelist
              )
              .map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/dashboard/serveurs/${s.id}`}
                    className={cn(
                      "text-ellipsis whitespace-nowrap wrap-break-word overflow-hidden max-w-43",
                      actual === s.id ? "bg-accent text-accent-content" : ""
                    )}
                  >
                    {s.icon ? (
                      <Image
                        src={`https://cdn.discordapp.com/icons/${s.id}/${s.icon}.webp`}
                        alt="Logo"
                        className="rounded-full border border-accent"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-accent flex items-center justify-center">
                        {s.name.charAt(0)}
                      </div>
                    )}
                    {s.name.slice(0, 21)}
                  </Link>
                </li>
              ))}
          </ul>
        </details>
      </li>
    </ul>
  );
}
