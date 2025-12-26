import Serveur from "@/components/serveurs/Serveur";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import prisma from "@/lib/prisma";
import { FaSearch } from "react-icons/fa";

export default async function Serveurs() {
  const serveurs = await prisma.serveur.findMany({
    where: {
      approuved: true,
    },
  });

  return (
    <main className="p-8 flex flex-col gap-10 bg-base-200">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-semibold">Serveurs</h1>
        <p className="text-lg opacity-80">
          Voici les serveurs des membres de notre assemblée.
        </p>
      </div>
      <InputGroup className="rounded-full">
        <InputGroupInput placeholder="Rechercher..." />
        <InputGroupAddon>
          <FaSearch />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end" className="mb-1">
          <InputGroupText>{serveurs.length} serveurs</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="">
        <div className="badge badge-soft badge-primary border border-primary">
          Primary
        </div>
        <div className="badge badge-soft badge-secondary border border-secondary">
          Secondary
        </div>
        <div className="badge badge-soft badge-accent border border-accent">
          Accent
        </div>
        <div className="badge badge-soft badge-neutral border border-neutral">
          Neutral
        </div>
        <div className="badge badge-soft badge-info border border-info">
          Info
        </div>
        <div className="badge badge-soft badge-success border border-success">
          Success
        </div>
        <div className="badge badge-soft badge-warning border border-warning">
          Warning
        </div>
        <div className="badge badge-soft badge-error border border-error">
          Error
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg-grid-cols-3 gap-4">
        {serveurs.map((s) => (
          <Serveur
            key={s.id}
            logo={s.logoURL}
            name={s.nom}
            member_count={s.member_count}
            description={s.description}
            badges={s.badges}
            link={s.link}
          />
        ))}
      </div>
    </main>
  );
}
