"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import editDescription from "@/lib/serveurs/editDescription";
import { serveur } from "@/lib/serveurs/userServers";
import { useState } from "react";

export default function EditServeurForm({
  serveur,
  defaultValue,
}: {
  serveur: serveur;
  defaultValue?: string | undefined;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
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
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              defaultValue={defaultValue}
              onInput={(e) => setValue(e.currentTarget.value)}
            />
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
