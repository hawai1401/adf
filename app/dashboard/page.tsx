import SideMenu from "@/components/dashboard/SideMenu";
import Serveur from "@/components/dashboard/Serveur";
import AnimatedList from "@/components/animations/AnimatedList";
import userServers from "@/lib/serveurs/userServers";
import prisma from "@/lib/prisma";

export default async function DashBoard() {
  const serveurs = await userServers();
  const serveurs_db = await prisma.serveur.findMany({
    where: {
      id: {
        in: serveurs.map((s) => s.id),
      },
    },
  });

  return (
    <>
      <aside className="fixed top-15 left-0 w-55 h-[calc(100vh-60px)] bg-base-200 hidden sm:block">
        <SideMenu serveurs={serveurs} serveurs_db={serveurs_db} />
      </aside>

      <main className="sm:ml-55 min-h-[calc(100vh-60px)]">
        <h1 className="text-xl font-semibold text-center p-2 bg-base-200 w-full">
          Choisissez un serveur à gérer
        </h1>
        <AnimatedList
          showGradients={false}
          enableArrowNavigation={true}
          items={serveurs.map((s) => {
            return (
              <Serveur
                disabled={s.approximate_member_count < 200}
                key={s.id}
                logo={
                  s.icon
                    ? `https://cdn.discordapp.com/icons/${s.id}/${s.icon}.webp`
                    : null
                }
                name={s.name}
                member_count={s.approximate_member_count}
                id={s.id}
                s_db={serveurs_db.find((v) => v.id === s.id)}
              />
            );
          })}
        />
      </main>
    </>
  );
}
