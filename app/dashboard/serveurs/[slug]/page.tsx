import SideMenu from "@/components/dashboard/SideMenu";
import Image from "next/image";
import userServers from "@/lib/userServers";

export default async function Serveurs({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serveurs = await userServers()
  const s = serveurs.find((s) => s.id === slug)!;
  return (
    <>
      <aside className="fixed top-15 left-0 w-55 h-[calc(100vh-60px)] bg-base-200">
        <SideMenu serveurs={serveurs} actual={slug} />
      </aside>

      <main className="ml-55 min-h-[calc(100vh-60px)]">
        <h1 className="text-xl font-semibold text-center p-2 bg-base-200 w-full">
          {s.icon ? (
            <Image
              src={`https://cdn.discordapp.com/icons/${s.id}/${s.icon}.webp`}
              alt="Serveur Icon"
              width={20}
              height={20}
              className="rounded-full border border-accent"
            />
          ) : (
            <div className="w-12.5 h-12.5 rounded-full border border-accent flex items-center justify-center">
              {s.name.charAt(0)}
            </div>
          )}
          {s.name}
        </h1>
      </main>
    </>
  );
}
