"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { getUser, user } from "@/lib/utilisateurs/getMember";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { Blacklist } from "@/generated/prisma/client";
import { toast } from "sonner";

export default function Content({ blacklists }: { blacklists: Blacklist[] }) {
  const [id, setId] = useState("");
  const [user, setUser] = useState<user | null>(null);
  const [blacklistUser, setBlacklistUser] = useState<Blacklist | undefined>(
    undefined
  );

  useEffect(() => {
    if (!id) return setUser(null);

    let cancelled = false;

    getUser(id)
      .then((u) => {
        if (!cancelled) {
          setUser(u);
          setBlacklistUser(blacklists.find((v) => v.id === u.id));
        }
      })
      .catch(() => {
        setUser(null);
        setBlacklistUser(undefined);
        toast.error("Utilisateur invalide !");
      });

    return () => {
      cancelled = true;
    };
  }, [id, blacklists]);

  return (
    <>
      <InputGroup className="rounded-full">
        <InputGroupInput
          placeholder="Rechercher..."
          onInput={(e) => setId(e.currentTarget.value)}
        />
        <InputGroupAddon>
          <FaSearch />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>{blacklists.length} blacklists</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex gap-10 items-center justify-center bg-base-300 w-full h-full rounded-lg py-10 border border-white">
        <div className="flex flex-col gap-5 items-center justify-center">
          {user ? (
            user.avatar ? (
              <Image
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`}
                alt="Pdp"
                width={100}
                height={100}
                className="rounded-full border border-accent"
              />
            ) : (
              <div className="h-25 w-25 rounded-full border border-accent flex items-center justify-center text-2xl font-bold">
                {user.username.charAt(0)}
              </div>
            )
          ) : (
            <Image
              src={`https://cdn.discordapp.com/avatars/1091617877725024326/3fea6fc258e87136d9e7d1d3e4184b68.webp`}
              alt="Pdp"
              width={100}
              height={100}
              className="rounded-full border border-accent"
            />
          )}
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-xl font-semibold">
              {user?.username ?? "hawai1401"}
            </div>
            <div className="text-lg">
              ID : {user?.id ?? "1091617877725024326"}
            </div>
          </div>
          {blacklistUser ? (
            <>
              <div className="badge badge-soft badge-error p-4 border border-error">
                <CiCircleRemove size={20} /> Blacklist
              </div>
              <p>
                <span className="font-semibold">Raison : </span>
                {blacklistUser.raison}
              </p>
            </>
          ) : (
            <div className="badge badge-soft badge-success p-4 border border-success">
              <CiCircleCheck size={20} /> Non blacklist
            </div>
          )}
        </div>
      </div>
    </>
  );
}
