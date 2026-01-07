"use server";

import { field } from "@/types/types";

export async function sendError(
  erreur: {
    message: string;
    stack?: string | undefined;
  } & { digest?: string }
) {
  if (process.env.NODE_ENV === "development") return;
  const fields: field[] = [
    {
      name: "💬 - Message",
      value: `>>> ${erreur.message}`,
    },
  ];
  if (erreur.digest)
    fields.push({
      name: "ℹ️ - Digest",
      value: `>>> ${erreur.digest}`,
    });
  if (erreur.stack)
    fields.push({
      name: "💻 - Stack",
      value: `>>> ${erreur.stack.slice(0, 1020)}`,
    });
  await fetch(
    `https://discord.com/api/v10/channels/1458012892522745959/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            color: 16669789,
            description: `### :x: - Une erreur est survenue sur le site !`,
            fields,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    }
  );
}
