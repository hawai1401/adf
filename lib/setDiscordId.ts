"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import prisma from "./prisma";
import { user } from "./utilisateurs/getMember";

export async function setDiscordId(id: string) {
  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "discord",
    },
  });
  const discord_user: user = await fetch(
    "https://discord.com/api/v10/users/@me",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  ).then((res) => res.json());
  if (!discord_user?.id) return
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      discord_id: discord_user.id,
    },
  });
}
