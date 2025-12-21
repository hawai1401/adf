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
import textToMarkdown from "@/lib/textToMarkdown";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

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
  const [action, setAction] = useState<"edit" | "see">("edit");
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
      <CardContent className="flex flex-col w-full justify-center items-center gap-5">
        <div className="flex flex-col gap-3 w-full">
          {!pending && (
            <ToggleGroup
              type="single"
              defaultValue="edit"
              className="border self-center"
              onValueChange={(v: "edit" | "see") => setAction(v)}
            >
              <ToggleGroupItem value="edit" aria-label="Toggle edit">
                Modifier
              </ToggleGroupItem>
              <ToggleGroupItem value="see" aria-label="Toggle see">
                Prévisualiser
              </ToggleGroupItem>
            </ToggleGroup>
          )}
          <Label htmlFor="description">Description</Label>
          {pending ? (
            <div className="border p-4 rounded-box">
              {textToMarkdown(pending_description!)}
            </div>
          ) : (
            <div>
              {action === "edit" ? (
                <Textarea
                  id="description"
                  defaultValue={value}
                  required
                  onInput={(e) => setValue(e.currentTarget.value)}
                  maxLength={1020}
                />
              ) : (
                <div className="border p-4 rounded-box">
                  {textToMarkdown(value)}
                </div>
              )}
            </div>
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
