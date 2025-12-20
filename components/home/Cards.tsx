"use client"

import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import SpotlightCard from "../animations/SpotlightCard";
import { cn } from "@/lib/utils";

export default function Cards() {
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
          signaler les membres problématiques. Après vérification, ces membres
          peuvent être blacklistés pour protéger la communauté.
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
          Nous organisons régulièrement des réunions pour discuter des problèmes
          et des solutions, ainsi que pour partager des idées innovantes.
        </p>
      </SpotlightCard>
    </div>
  );
}
