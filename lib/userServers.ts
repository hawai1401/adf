import { auth } from "@/lib/auth";
import decodeDiscordPermissions from "@/lib/decodeDiscordPermissions";
import { headers } from "next/headers";

export interface serveur {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: Uppercase<string>[];
  approximate_member_count: number;
  approximate_presence_count: number;
}

export default async function userServers() {
  const user = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "discord",
    },
  });
  const data = await fetch(
    "https://discord.com/api/v10/users/@me/guilds?with_counts=true",
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );
  const serveurs: serveur[] = await data.json();
  console.log(serveurs, user.accessToken);
  serveurs.sort((a, b) => {
    if (
      (a.owner ||
        decodeDiscordPermissions(a.permissions).includes("ADMINISTRATOR") ||
        decodeDiscordPermissions(a.permissions).includes("MANAGE_GUILD")) &&
      a.approximate_member_count > 200
    )
      return -1;
    if (
      (b.owner ||
        decodeDiscordPermissions(b.permissions).includes("ADMINISTRATOR") ||
        decodeDiscordPermissions(b.permissions).includes("MANAGE_GUILD")) &&
      b.approximate_member_count > 200
    )
      return 1;
    return 0;
  });
  return serveurs;
}
