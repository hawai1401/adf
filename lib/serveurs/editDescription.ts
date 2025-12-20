"use server";

import prisma from "../prisma";
import { serveur } from "./userServers";

type badges = "Pub" | "Rp" | "Graphisme" | "Communautaire";

export default async function editDescription(
  serveur: serveur,
  description: string,
  badges?: badges[]
) {
  if (description.length === 0) return;
  await prisma.serveur.update({
    where: {
      id: serveur.id,
    },
    data: {
      description_pending: description,
      logoURL: serveur.icon
        ? `https://cdn.discordapp.com/icons/${serveur.id}/${serveur.icon}.webp`
        : null,
      badges,
      member_count: serveur.approximate_member_count
    },
  });
}
