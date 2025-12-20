import SideMenu from "@/components/dashboard/SideMenu";
import Image from "next/image";
import userServers from "@/lib/serveurs/userServers";
import EditServeurForm from "@/components/dashboard/EditServeurForm";
import prisma from "@/lib/prisma";
import RequestApprouveForm from "@/components/dashboard/RequestApprouveForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Serveurs({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serveurs = await userServers();
  const s = serveurs.find((s) => s.id === slug)!;
  const s_db = await prisma.serveur.findUnique({
    where: {
      id: s.id,
    },
  });
  return (
    <>
      <aside className="fixed top-15 left-0 w-55 h-[calc(100vh-60px)] bg-base-200 hidden sm:block">
        <SideMenu serveurs={serveurs} actual={slug} />
      </aside>

      <main className="sm:ml-55 min-h-[calc(100vh-60px)]">
        <h1 className="text-xl font-semibold text-center py-5 bg-base-200 w-full flex flex-wrap items-center justify-center gap-3">
          {s.icon ? (
            <Image
              src={`https://cdn.discordapp.com/icons/${s.id}/${s.icon}.webp`}
              alt="Serveur Icon"
              width={30}
              height={30}
              className="rounded-full border border-accent"
            />
          ) : (
            <div className="w-12.5 h-12.5 rounded-full border border-accent flex items-center justify-center">
              {s.name.charAt(0)}
            </div>
          )}
          {`${s.name} (${s.id})`}
        </h1>

        <div className="p-4">
          {s_db && s_db.approuved ? (
            <EditServeurForm serveur={s} defaultValue={s_db?.description} />
          ) : (
            <>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Serveur non vérifié</CardTitle>
                  <CardDescription>
                    Ce serveur n&apos;est pas encore approuvé, si vous souhaitez
                    qu&apos;il apparaisse sur le site, vous pouvez envoyez une
                    demande avec une description du serveur.
                    <br />
                    Il sera ensuite vérifier manuellement avant d&apos;être
                    afficher.
                  </CardDescription>
                </CardHeader>
                <RequestApprouveForm
                  serveur={s}
                  pending={s_db?.pending ?? false}
                  pending_description={s_db?.description_pending}
                />
              </Card>
            </>
          )}
        </div>
      </main>
    </>
  );
}
