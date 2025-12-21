"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import editDescription from "@/lib/serveurs/editDescription";
import { serveur } from "@/lib/serveurs/userServers";
import { useState } from "react";
import textToMarkdown from "@/lib/textToMarkdown";

export default function EditServeurForm({
  serveur,
  defaultValue,
}: {
  serveur: serveur;
  defaultValue?: string | undefined;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [action, setAction] = useState<"edit" | "see">("edit");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise<void>(
          () =>
            new Promise((res, rej) => {
              editDescription(serveur, value)
                .finally(() => res())
                .catch(() => rej());
            }),
          {
            loading: "Enregistrement en cours...",
            success: "Description enregistrée avec succès !",
            error:
              "Une erreur est survenue lors de l'enregistrement de la description !",
          }
        );
      }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Modifier la description du serveur</CardTitle>
          <CardAction>
            <Button
              variant="destructive"
              type="reset"
              className="cursor-pointer"
            >
              Réinitialiser
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col w-full justify-center items-center gap-5">
          <ToggleGroup
            type="single"
            defaultValue="edit"
            className="border"
            onValueChange={(v: "edit" | "see") => setAction(v)}
          >
            <ToggleGroupItem value="edit" aria-label="Toggle edit">
              Modifier
            </ToggleGroupItem>
            <ToggleGroupItem value="see" aria-label="Toggle see">
              Prévisualiser
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="description">Description</Label>
            {action === "edit" ? (
              <Textarea
                id="description"
                required
                defaultValue={value}
                onInput={(e) => setValue(e.currentTarget.value)}
              />
            ) : (
              <div className="border p-4 rounded-box">
                {textToMarkdown(value)}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            Modifier
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
