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

const cache = new Map<string, serveur[]>();

export default async function userServers() {
  const user = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "discord",
    },
  });
  const cache_value = cache.get(user.accessToken)
  if (cache_value) return cache_value
  const data = await fetch(
    "https://discord.com/api/v10/users/@me/guilds?with_counts=true",
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
  );
  const serveurs: serveur[] = await data.json();
  const return_value = serveurs
    .filter(
      (s) =>
        s.owner ||
        decodeDiscordPermissions(s.permissions).includes("ADMINISTRATOR") ||
        decodeDiscordPermissions(s.permissions).includes("MANAGE_GUILD")
    )
    .sort((a, b) => b.approximate_member_count - a.approximate_member_count);

  cache.set(user.accessToken, return_value);
  setTimeout(() => {
    cache.delete(user.accessToken)
  }, 60_000 * 5)
  
  return return_value;
}
