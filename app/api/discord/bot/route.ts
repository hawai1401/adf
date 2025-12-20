import { NextRequest, NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";
import {
  APIInteraction,
  InteractionType,
  MessageFlags,
} from "discord-api-types/v10";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const body = await req.text();

  const isValid = await verifyKey(
    body,
    signature!,
    timestamp!,
    process.env.DISCORD_PUBLIC_KEY!
  );

  if (!isValid) {
    return new NextResponse("Bad request signature", { status: 401 });
  }

  const interaction = JSON.parse(body) as APIInteraction;

  // PING
  if (interaction.type === InteractionType.Ping) {
    return NextResponse.json({ type: 1 });
  }

  // SLASH COMMAND
  if (interaction.type === InteractionType.ApplicationCommand) {
    return NextResponse.json({
      type: 4,
      data: { content: "Pong 🏓" },
    });
  }

  // Serveur accepter/refuser
  if (interaction.type === InteractionType.MessageComponent) {
    const action = interaction.data.custom_id.split("_")[0]!;
    if (action !== "allowed" && action !== "denied")
      return new NextResponse("Unhandled", { status: 400 });
    const guildId = interaction.data.custom_id.split("_")[1]!;
    if (action === "allowed") {
      const serveur = (await prisma.serveur.findUnique({
        where: {
          id: guildId,
        },
      }))!;
      await prisma.serveur.update({
        where: {
          id: guildId,
        },
        data: {
          approuved: true,
          description_pending: "",
          description: serveur.description_pending,
        },
      });
      setTimeout(() => {
        fetch(
          `https://discord.com/api/v10/channels/${interaction.channel.id}/messages/${interaction.message.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
      }, 1000);
      return NextResponse.json({
        type: 4,
        data: {
          content: "✅ - Serveur accepter",
          flags: MessageFlags.Ephemeral,
        },
      });
    } else {
      await prisma.serveur.delete({
        where: {
          id: guildId,
        },
      });
      setTimeout(() => {
        fetch(
          `https://discord.com/api/v10/channels/${interaction.channel.id}/messages/${interaction.message.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
      }, 1000);
      return NextResponse.json({
        type: 4,
        data: {
          content: "❌ - Serveur refuser",
          flags: MessageFlags.Ephemeral,
        },
      });
    }
  }

  return new NextResponse("Unhandled", { status: 400 });
}
