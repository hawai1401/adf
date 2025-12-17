import type { serveur } from "@/lib/userServers";
import decodeDiscordPermissions from "@/lib/decodeDiscordPermissions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export default async function SideMenu({
  serveurs,
  actual,
}: {
  serveurs: serveur[];
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
      <li>
        <Link href="/dashboard/serveurs">
          <IoSettingsOutline size={20} />
          Gérer mes serveurs
        </Link>
      </li>
      <li className="h-[calc(100%-56px)]">
        <details open>
          <summary>
            <IoPeopleOutline size={20} />
            Serveurs
          </summary>
          <ul className="max-w-45 h-full">
            {serveurs.map((s) => {
              if (
                (s.owner ||
                  decodeDiscordPermissions(s.permissions).includes(
                    "ADMINISTRATOR"
                  ) ||
                  decodeDiscordPermissions(s.permissions).includes(
                    "MANAGE_GUILD"
                  )) &&
                s.approximate_member_count > 200
              )
                return (
                  <li key={s.id}>
                    <Link
                      href={`/dashboard/serveurs/${s.id}`}
                      className={cn(
                        "text-ellipsis whitespace-nowrap overflow-hidden max-w-[172px]",
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
                      {s.name}
                    </Link>
                  </li>
                );
            })}
          </ul>
        </details>
      </li>
    </ul>
  );
}
