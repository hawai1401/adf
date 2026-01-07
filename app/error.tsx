"use client";

import { useEffect, useRef } from "react";
import { sendError } from "@/lib/sendError";
import { Button } from "@/components/animate-ui/components/buttons/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;
    sendError({
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <section className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-65px)] p-16 bg-base-200">
      <p className="text-2xl md:text-3xl text-gray-300 flex gap-2 items-center justify-center">
        Une erreur est survenue !
      </p>
      <Button variant={"destructive"} onClick={() => reset()}>Réessayer</Button>
    </section>
  );
}
