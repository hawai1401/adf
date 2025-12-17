"use client";

import Image from "next/image";
import {
  RippleButton,
  RippleButtonRipples,
} from "@/components/animate-ui/components/buttons/ripple";
import Link from "next/link";
import Counter from "@/components/animations/Counter";
import ScrollFloat from "@/components/ScrollFloat";
import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/SpotlightCard";
import FloatingLines from "@/components/animations/FloatingLines";

export default function Home() {
  const counterRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState([false, false, false]);

  useEffect(() => {
    if (!counterRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay([true, false, false]);
          setTimeout(() => setPlay([true, true, false]), 750);
          setTimeout(() => setPlay([true, true, true]), 1500);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState([false, false, false]);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow([true, false, false]);
          setTimeout(() => setShow([true, true, false]), 500);
          setTimeout(() => setShow([true, true, true]), 1000);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

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
        <div className="flex justify-around flex-wrap gap-4 w-full">
          <div
            className="flex flex-col items-center justify-center border px-4 py-7 rounded-box bg-base-300 shadow-xl flex-1"
            ref={counterRef}
          >
            <h3 className="text-xl text-center">Serveurs</h3>
            <Counter
              value={play[0] ? 130 : 0}
              places={[100, 10, 1]}
              fontSize={60}
              padding={5}
              gap={10}
              textColor="white"
              fontWeight={900}
              gradientFrom="transparent"
            />
          </div>
          <div
            className="flex flex-col items-center justify-center border px-4 py-7 rounded-box bg-base-300 shadow-xl flex-1"
            ref={counterRef}
          >
            <h3 className="text-xl text-center">Membres</h3>
            <Counter
              value={play[1] ? 125 : 0}
              places={[100, 10, 1]}
              fontSize={60}
              padding={5}
              gap={10}
              textColor="white"
              fontWeight={900}
              gradientFrom="transparent"
            />
          </div>
          <div
            className="flex flex-col items-center justify-center border px-4 py-7 rounded-box bg-base-300 shadow-xl flex-1"
            ref={counterRef}
          >
            <h3 className="text-xl text-center">Blacklists</h3>
            <Counter
              value={play[2] ? 30 : 0}
              places={[100, 10, 1]}
              fontSize={60}
              padding={5}
              gap={10}
              textColor="white"
              fontWeight={900}
              gradientFrom="transparent"
            />
          </div>
        </div>
      </section>
      <section
        id="cards"
        className="flex flex-col justify-around items-center p-8 w-full min-h-[calc(100vh-65px)] bg-base-300"
      >
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=0%"
          scrollEnd="bottom bottom-=50%"
          stagger={0.03}
        >
          Pourquoi nous choisir ?
        </ScrollFloat>
        <div className="flex gap-3 flex-wrap w-full">
          <SpotlightCard
            className={cn(
              "custom-spotlight-card flex-1 transition-all duration-500 flex flex-col gap-3 min-w-75",
              show[0] ? "opacity-100" : "translate-y-10 opacity-0"
            )}
            ref={cardRef}
          >
            <FaShieldAlt size={40} className="fill-primary" />
            <h4 className="text-xl font-semibold">Sécurité</h4>
            <p className="text-justify">
              Nous avons un système de signalement qui permet aux membres de
              signaler les membres problématiques. Après vérification, ces
              membres peuvent être blacklistés pour protéger la communauté.
            </p>
          </SpotlightCard>
          <SpotlightCard
            className={cn(
              "custom-spotlight-card flex-1 transition-all duration-500 flex flex-col gap-3 min-w-75",
              show[1] ? "opacity-100" : "translate-y-10 opacity-0"
            )}
            ref={cardRef}
          >
            <FaUsers size={40} className="fill-primary" />
            <h4 className="text-xl font-semibold">Communauté</h4>
            <p className="text-justify">
              Notre grande communauté de fondateurs permet de partager des
              expériences, des conseils et de l&apos;entraide entre membres.
            </p>
          </SpotlightCard>
          <SpotlightCard
            className={cn(
              "custom-spotlight-card flex-1 transition-all duration-500 flex flex-col gap-3 min-w-75",
              show[2] ? "opacity-100" : "translate-y-10 opacity-0"
            )}
            ref={cardRef}
          >
            <FaCalendarAlt size={40} className="fill-primary" />
            <h4 className="text-xl font-semibold">Réunions</h4>
            <p className="text-justify">
              Nous organisons régulièrement des réunions pour discuter des
              problèmes et des solutions, ainsi que pour partager des idées
              innovantes.
            </p>
          </SpotlightCard>
        </div>
      </section>
    </>
  );
}
