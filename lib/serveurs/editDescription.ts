"use server";

import { ButtonStyle } from "discord-api-types/v10";
import prisma from "../prisma";
import { serveur } from "./userServers";
import getMember from "../utilisateurs/getMember";
import { tag } from "../../types/types";

export default async function editDescription(
  serveur: serveur,
  description: string,
  tags: tag[],
  link: string
) {
  if (description.length === 0) return;

  const guild = await prisma.serveur.update({
    where: {
      id: serveur.id,
    },
    data: {
      description_pending: description,
      logoURL: serveur.icon
        ? `https://cdn.discordapp.com/icons/${serveur.id}/${serveur.icon}.webp`
        : null,
      tags_pending: tags,
      link_pending: link,
      member_count: serveur.approximate_member_count,
      pending: true,
      nom: serveur.name,
    },
  });

  const owner = await prisma.user.findUnique({
    where: {
      id: guild!.userId,
    },
    cacheStrategy: {
      ttl: 600,
      swr: 300,
    },
  });
  if (!owner) throw new Error("Owner introuvable");

  const member = await getMember(owner.name!);
  if (!member) throw new Error("Member introuvable");

  const fields: { name: string; value: string }[] = [];
  if (guild.description !== guild.description_pending)
    fields.push({
      name: "💬 - Description",
      value: `>>> ${guild.description_pending}`,
    });
  if (guild.tags !== guild.tags_pending)
    fields.push({
      name: "🎈 - Tags",
      value: `>>> ${tags.map((t) => `- ${t}`).join("\n")}`,
    });
  if (guild.link !== guild.link_pending)
    fields.push({
      name: "🔗 - Lien",
      value: `> ${link}`,
    });

  if (fields.length === 0) throw new Error("Aucune données modifiées");

  await fetch(
    `https://discord.com/api/v10/channels/1454059004807348265/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "📥 - Nouvelle demande de modification",
            color: 16697403,
            description: `>>> **ID** : ${guild.id}\n**Nom** : ${guild.nom}`,
            fields,
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
                style: ButtonStyle.Success,
                type: 2,
                flowId: "248923185607610387",
                custom_id: `allowed_${serveur.id}_edit`,
                label: "Accepter",
              },
              {
                style: ButtonStyle.Danger,
                type: 2,
                flowId: "248923401714929685",
                custom_id: `editDenied_${serveur.id}`,
                label: "Refuser",
              },
              {
                style: ButtonStyle.Link,
                type: 2,
                url: link,
                label: "Rejoindre le serveur",
                emoji: {
                  name: "🔗",
                },
              },
            ],
          },
        ],
      }),
    }
  );
}
