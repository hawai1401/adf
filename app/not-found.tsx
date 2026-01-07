import { Button } from "@/components/animate-ui/components/buttons/button";
import Link from "next/link";
import { TbMoodSad } from "react-icons/tb";

export default function NotFund() {
  return (
    <section className="flex flex-col gap-6 justify-center items-center h-[calc(100vh-65px)] p-16 bg-base-200">
      <div className="flex flex-col max-w-md text-center">
        <h2 className="font-extrabold text-8xl">404</h2>
        <p className="text-2xl md:text-3xl text-gray-300 flex gap-2 items-center justify-center">
          Page introuvable
          <TbMoodSad size={36} />
        </p>
      </div>
      <Link href={"/"}>
        <Button className="cursor-pointer rounded-lg">
          Retourner à l&apos;accueil
        </Button>
      </Link>
    </section>
  );
}
