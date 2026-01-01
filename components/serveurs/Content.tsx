"use client";

import Serveur from "./Serveur";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { FaSearch } from "react-icons/fa";
import { serveur } from "@/generated/prisma/client";
import { useState } from "react";
import { TbMoodSad } from "react-icons/tb";
import { existing_tags, tag } from "@/types/types";
import { cn } from "@/lib/utils";

export default function Content({ serveurs }: { serveurs: serveur[] }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchTags, setSearchTags] = useState<tag[]>([]);
  const displayServeurs = serveurs.filter(
    (s) =>
      s.nom.toLowerCase().includes(searchValue.toLowerCase()) &&
      s.tags.sort().join().includes(searchTags.sort().join())
  );
  const tags_class: Record<tag, string> = {
    E_Sport: "primary",
    Pub: "secondary",
    Rp: "accent",
    Art: "info",
    Communautaire: "success",
    Gaming: "warning",
    Informatique: "error",
    Micronation: "success",
    Sport: "primary",
    Audiovisuel: "warning",
  };

  return (
    <>
      <InputGroup className="rounded-full">
        <InputGroupInput
          placeholder="Rechercher..."
          onInput={(e) => setSearchValue(e.currentTarget.value)}
        />
        <InputGroupAddon>
          <FaSearch />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end" className="mb-1">
          <InputGroupText>{displayServeurs.length} serveurs</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Tags recherchés</p>
        <div className="flex flex-wrap gap-2">
          {searchTags.map((t, i) => (
            <div
              className={cn(
                "p-4 badge badge-soft border cursor-pointer",
                `badge-${tags_class[t]}`,
                `border-${tags_class[t]}`
              )}
              key={i}
              onClick={() => setSearchTags(searchTags.filter((v) => v !== t))}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Tags existants</p>
        <div className="flex flex-wrap gap-2">
          {[...existing_tags]
            .filter((t) => !searchTags.includes(t))
            .map((t, i) => (
              <div
                className={cn(
                  "p-4 badge badge-soft border cursor-pointer",
                  `badge-${tags_class[t]}`,
                  `border-${tags_class[t]}`
                )}
                key={i}
                onClick={() => setSearchTags([...searchTags, t])}
              >
                {t}
              </div>
            ))}
        </div>
      </div>
      {displayServeurs.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg-grid-cols-3 gap-4">
            {displayServeurs.map((s) => (
              <Serveur
                key={s.id}
                id={s.id}
                logo={s.logoURL}
                name={s.nom}
                member_count={s.member_count}
                description={s.description}
                tags={s.tags}
                link={s.link}
              />
            ))}
          </div>
        </>
      ) : serveurs.length > 0 ? (
        <p className="w-full text-lg flex flex-col gap-2 items-center justify-center">
          <TbMoodSad size={60} />
          Aucun serveur ne correspond à votre recherche.
        </p>
      ) : (
        <p className="w-full text-lg flex flex-col gap-2 items-center justify-center">
          <TbMoodSad size={60} />
          Il n&apos;y a aucun serveur pour le moment.
        </p>
      )}
    </>
  );
}
