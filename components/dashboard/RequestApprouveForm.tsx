"use client";

import { serveur } from "@/lib/serveurs/userServers";
import { CardContent, CardFooter } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import addServeur from "@/lib/serveurs/addServeur";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

export default function RequestApprouveForm({
  serveur,
  pending,
  pending_description,
}: {
  serveur: serveur;
  pending: boolean;
  pending_description?: string | undefined;
}) {
  const [value, setValue] = useState("");
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise<void>(
          () =>
            new Promise((res, rej) => {
              addServeur(serveur, value)
                .then(() => res())
                .finally(() => router.refresh())
                .catch(() => rej());
            }),
          {
            loading: "Envoi en cours...",
            success: "Demande envoyée avec succès !",
            error: "Une erreur est survenue lors de l'envoi de la demande !",
          }
        );
      }}
    >
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          {pending ? (
            <Textarea id="description" disabled value={pending_description} />
          ) : (
            <Textarea
              id="description"
              required
              onInput={(e) => setValue(e.currentTarget.value)}
              maxLength={1020}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={pending}
        >
          {pending ? "Demande en cours de traitement" : "Envoyer une demande"}
        </Button>
      </CardFooter>
    </form>
  );
}
