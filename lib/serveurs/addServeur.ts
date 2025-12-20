"use server";

import { headers } from "next/headers";
import prisma from "../prisma";
import { serveur } from "./userServers";
import { auth } from "../auth";
import getMember from "../utilisateurs/getMember";

export default async function addServeur(
  serveur: serveur,
  description: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  await prisma.serveur.upsert({
    where: {
      id: serveur.id,
    },
    update: {},
    create: {
      id: serveur.id,
      nom: serveur.name,
      description_pending: description,
      logoURL: serveur.icon
        ? `https://cdn.discordapp.com/icons/${serveur.id}/${serveur.icon}.webp`
        : null,
      badges: [],
      owner: {
        connect: {
          id: session!.user.id,
        },
      },
    },
  });

  const guild = await prisma.serveur.findUnique({
    where: {
      id: serveur.id,
    },
  });
  if (!guild) throw new Error("Serveur introuvable");
  const owner = await prisma.user.findUnique({
    where: {
      id: guild!.userId,
    },
  });
  if (!owner) throw new Error("Owner introuvable");

  const member = await getMember(owner.name!);
  if (!member) throw new Error("Member introuvable");

  await fetch(
    `https://discord.com/api/v10/channels/1413831950078185472/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "📥 - Nouvelle demande d'approbation",
            color: 65394,
            description: `>>> **ID** : ${guild.id}\n**Nom** : ${guild.nom}`,
            fields: [
              {
                name: "💬 - Description",
                value: `>>> ${guild.description_pending}`,
              },
            ],
            author: {
              name: `${owner.name!} (${member.user.id})`,
              icon_url: owner?.image ?? "",
            },
            thumbnail: {
              url: guild.logoURL,
            },
            timestamp: new Date().toISOString(),
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                style: 3,
                type: 2,
                flowId: "248923185607610387",
                custom_id: `allowed_${serveur.id}`,
                label: "Accepter",
              },
              {
                style: 4,
                type: 2,
                flowId: "248923401714929685",
                custom_id: `denied_${serveur.id}`,
                label: "Refuser",
              },
            ],
          },
        ],
      }),
    }
  );
}
