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
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <FaSearch />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>{serveurs.length} serveurs</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-wrap justify-center gap-4">
        {serveurs.map((s) => (
          <Serveur
            key={s.id}
            logo={s.logoURL}
            name={s.nom}
            member_count={s.member_count}
            description={s.description}
            badges={s.badges}
          />
        ))}
      </div>
    </main>
  );
}
