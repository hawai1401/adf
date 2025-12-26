"use server";

export interface user {
  id: string;
  username: string;
  avatar: string | null;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number;
  global_name: string;
  banner_color: `#${number}`;
}

export interface guildMember {
  joined_at: Date;
  nick: null | string;
  roles: string[];
  user: user;
}

const cache_members = new Map<string, guildMember[]>();
const cache_user = new Map<string, user>();

export default async function getMember(user: string) {
  let cache_value_members = cache_members.get(user);

  if (!cache_value_members) {
    const members: guildMember[] = await fetch(
      `https://discord.com/api/v10/guilds/1429482388655706235/members/search?query=${user}&limit=1000`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    cache_value_members = members;
    cache_members.set(user, members);
    setTimeout(() => {
      cache_members.delete(user);
    }, 5 * 60_000);
  }

  if (cache_value_members.length === 0) return null;

  let cache_value_user = cache_user.get(cache_value_members[0].user.id);

  if (!cache_value_user) {
    const discord_user: user = await fetch(
      `https://discord.com/api/v10/users/${cache_value_members[0].user.id}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    cache_value_user = discord_user;
    cache_user.set(cache_value_members[0].user.id, discord_user);
    setTimeout(() => {
      cache_user.delete(cache_value_members[0].user.id);
    }, 5 * 60_000);
  }

  cache_value_members[0].user = cache_value_user;

  return cache_value_members[0];
}
