import Galaxy from "@/components/background/Galaxy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADF | À Propos",
  description:
    "Fondée le 11 novembre 2025, l’Assemblée des Fondateurs est une communauté Discord réservée aux fondateurs et co-fondateurs de serveurs actifs dépassant les 200 membres.",
  openGraph: {
    title: "ADF | À Propos",
    description:
      "Fondée le 11 novembre 2025, l’Assemblée des Fondateurs est une communauté Discord réservée aux fondateurs et co-fondateurs de serveurs actifs dépassant les 200 membres.",
    url: `https://adf.com/about`,
    siteName: "ADF",
  },
  twitter: {
    title: "ADF | À Propos",
    description:
      "Fondée le 11 novembre 2025, l’Assemblée des Fondateurs est une communauté Discord réservée aux fondateurs et co-fondateurs de serveurs actifs dépassant les 200 membres.",
  },
};

export default function About() {
  return (
    <>
      <div className="fixed inset-0 bg-black overflow-hidden">
        <Galaxy
          speed={0.6}
          starSpeed={0.5}
          mouseRepulsion={false}
          mouseInteraction={false}
        />
      </div>
      <div className="backdrop-blur-sm w-full px-8 py-12 flex justify-center">
        <div className="max-w-3xl flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center rounded-lg p-4">
            <h1 className="text-4xl font-semibold">
              L’Assemblée Des Fondateurs
            </h1>
            <p className="text-lg opacity-80">
              Un serveur qui réunit des fondateurs et gérants de serveurs
              Discord FR.
            </p>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Qui sommes-nous</h2>
            <p className="text-justify">
              Fondée le 11 novembre 2025, l’Assemblée des Fondateurs est une
              communauté Discord réservée aux fondateurs et co-fondateurs de
              serveurs actifs dépassant les 200 membres. Elle est née d’un
              constat simple : gérer une communauté à grande échelle soulève des
              enjeux spécifiques, rarement abordés dans les espaces publics
              classiques.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Ce que nous apportons</h2>
            <p className="text-justify">
              Nous mettons à disposition un cadre sérieux et fonctionnel :
              outils de signalement, entraide entre administrateurs, échanges
              sur la modération, la croissance et la gestion interne. Des
              assemblées mensuelles courtes permettent de faire le point, tandis
              que des discussions libres et des animations ciblées renforcent la
              cohésion. Un classement des serveurs publics valorise également
              les projets actifs et structurés.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Notre objectif</h2>
            <p className="text-justify">
              Créer un réseau fiable de fondateurs capables d’échanger sans
              bruit, sans compétition inutile, et avec un réel souci de
              progression. L’Assemblée des Fondateurs vise à transformer
              l’expérience isolée de gestion d’un serveur en une dynamique
              collective et durable.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
