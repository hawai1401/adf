import Image from "next/image";
import {
  RippleButton,
  RippleButtonRipples,
} from "@/components/animate-ui/components/buttons/ripple";
import Link from "next/link";
import ScrollFloat from "@/components/animations/ScrollFloat";
import FloatingLines from "@/components/background/FloatingLines";
import Counters from "@/components/home/Counters";
import Cards from "@/components/home/Cards";
import prisma from "@/lib/prisma";
import { serveur } from "@/lib/serveurs/userServers";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ADF | Accueil",
  description:
    "Découvrez ADF, une communauté Discord regroupant des fondateurs et gérants de serveurs FR. Consultez nos statistiques et explorez les avantages de nous rejoindre.",
};

export default async function Home() {
  const serveurs = await prisma.serveur.count({
    where: {
      approuved: true,
    },
    cacheStrategy: {
      ttl: 600,
      swr: 300,
    },
  });

  const guild: serveur = await fetch(
    `https://discord.com/api/v10/guilds/1429482388655706235?with_counts=true`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return (
    <>
      <div className="w-full h-[calc(100vh-65px)] absolute">
        <FloatingLines interactive={false} />
      </div>
      <section className="backdrop-blur-sm flex flex-col justify-center items-center gap-8 p-8 w-full h-[calc(100vh-65px)]">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="/logo.webp"
            alt="logo"
            width="150"
            height="150"
            className="rounded-full border-3"
          />
          <h1 className="text-3xl mt-4">
            Bienvenue sur le site du serveur ADF !
          </h1>
          <h2 className="italic">
            Un serveur qui réunit des fondateurs et gérants de serveurs Discord
            FR.
          </h2>
        </div>
        <RippleButton variant="outline" className="rounded-full" size={"lg"}>
          <Link href="https://discord.gg/P3dcjTuuav" target="_blank">
            Rejoindre le serveur Discord
          </Link>
          <RippleButtonRipples />
        </RippleButton>
      </section>
      <section
        id="stats"
        className="flex flex-col justify-center items-center gap-[10vh] p-8 w-full min-h-[calc(100vh-65px)] bg-base-200"
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=30%"
          scrollEnd="bottom bottom-=20%"
          stagger={0.03}
        >
          Statistiques
        </ScrollFloat>
        <Counters
          serveurs={serveurs}
          membres={guild.approximate_member_count}
          blacklists={25}
        />
      </section>
      <section
        id="cards"
        className="flex flex-col justify-around items-center p-8 w-full min-h-[calc(100vh-65px)] bg-base-300"
      >
        <Cards />
      </section>
    </>
  );
}
