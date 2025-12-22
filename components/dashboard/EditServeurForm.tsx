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
import { Checkbox } from "../ui/checkbox";

export default function EditServeurForm({
  serveur,
  defaultValue,
  tags,
}: {
  serveur: serveur;
  defaultValue?: string | undefined;
  tags: ("Pub" | "Rp" | "Graphisme" | "Communautaire")[];
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [action, setAction] = useState<"edit" | "see">("edit");
  const [checkedTags, setCheckedTags] = useState<{
    Pub: boolean;
    Rp: boolean;
    Graphisme: boolean;
    Communautaire: boolean;
  }>({
    Pub: false,
    Rp: false,
    Graphisme: false,
    Communautaire: false,
  });
  const existing_tags: ("Pub" | "Rp" | "Graphisme" | "Communautaire")[] = [
    "Pub",
    "Rp",
    "Graphisme",
    "Communautaire",
  ];
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
          <div className="flex flex-col justify-start gap-6 w-full">
            <Label htmlFor="tags">Tags</Label>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {existing_tags.map((t) => (
                <div className="flex gap-3" id="tags" key={t}>
                  <Checkbox
                    id={t}
                    defaultChecked={tags.includes(t)}
                    onCheckedChange={(e: boolean) => {
                      checkedTags[t] = e;
                      setCheckedTags(checkedTags);
                    }}
                  />
                  <Label htmlFor={t}>{t}</Label>
                </div>
              ))}
            </div>
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
