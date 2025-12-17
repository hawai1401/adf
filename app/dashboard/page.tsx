import SideMenu from "@/components/dashboard/SideMenu";
import Serveur from "@/components/dashboard/Serveur";
import decodeDiscordPermissions from "@/lib/decodeDiscordPermissions";
import AnimatedList from "@/components/AnimatedList";
import userServers from "@/lib/userServers";

export default async function DashBoard() {
  const serveurs = await userServers();

  return (
    <>
      <aside className="fixed top-15 left-0 w-55 h-[calc(100vh-60px)] bg-base-200">
        <SideMenu serveurs={serveurs} />
      </aside>

      <main className="ml-55 min-h-[calc(100vh-60px)]">
        <h1 className="text-xl font-semibold text-center p-2 bg-base-200 w-full">
          Choisissez un serveur à gérer
        </h1>
        <AnimatedList
          showGradients={false}
          enableArrowNavigation={true}
          items={serveurs.map((s) => {
            return (
              <Serveur
                disabled={
                  !(
                    (s.owner ||
                      decodeDiscordPermissions(s.permissions).includes(
                        "ADMINISTRATOR"
                      ) ||
                      decodeDiscordPermissions(s.permissions).includes(
                        "MANAGE_GUILD"
                      )) &&
                    s.approximate_member_count > 200
                  )
                }
                key={s.id}
                logo={
                  s.icon
                    ? `https://cdn.discordapp.com/icons/${s.id}/${s.icon}.webp`
                    : null
                }
                name={s.name}
                member_count={s.approximate_member_count}
                id={s.id}
              />
            );
          })}
        />
      </main>
    </>
  );
}
