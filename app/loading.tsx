import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <section className="flex flex-col gap-2 items-center justify-center h-[calc(100vh-65px)] p-16 bg-base-200">
      <Spinner className="size-15" />
      <p className="text-2xl md:text-3xl text-gray-300 flex gap-2 items-center justify-center">
        Chargement en cours...
      </p>
    </section>
  );
}
