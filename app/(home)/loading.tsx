import { RippleButtonRipples } from "@/components/animate-ui/components/buttons/ripple";
import { RippleButton } from "@/components/animate-ui/components/buttons/ripple";
import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="w-full bg-base-200 p-4">
      <section className="bg-base-300 rounded-lg flex flex-col justify-center items-center gap-8 p-8 -translate-y-4 w-full h-[calc(100vh-65px)]">
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="/logo.webp"
            alt="logo"
            width="150"
            height="150"
            className="rounded-full border-3"
            preload
          />
          <h1 className="text-3xl mt-4">
            Bienvenue sur le site du serveur ADF !
          </h1>
          <h2 className="italic">
            Un serveur qui réunit des fondateurs et gérants de serveurs Discord
            FR.
          </h2>
        </div>
        <RippleButton variant="outline" className="rounded-full" size={"lg"}>
          <Link href="https://discord.gg/P3dcjTuuav" target="_blank">
            Rejoindre le serveur Discord
          </Link>
          <RippleButtonRipples />
        </RippleButton>
      </section>
    </main>
  );
}
