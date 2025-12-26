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
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function EditServeurForm({
  serveur,
  defaultDescription,
  tags,
  link: lien,
  pending,
}: {
  serveur: serveur;
  defaultDescription: string;
  tags: ("Pub" | "Rp" | "Graphisme" | "Communautaire")[];
  link: string | undefined;
  pending: boolean;
}) {
  const [description, setDescription] = useState(defaultDescription ?? "");
  const [link, setLink] = useState(lien ?? "");
  const [action, setAction] = useState<"edit" | "see">("edit");
  const [checkedTags, setCheckedTags] = useState<{
    Pub: boolean;
    Rp: boolean;
    Graphisme: boolean;
    Communautaire: boolean;
  }>({
    Pub: tags.includes("Pub"),
    Rp: tags.includes("Rp"),
    Graphisme: tags.includes("Graphisme"),
    Communautaire: tags.includes("Communautaire"),
  });
  const [isEdited, setIsEdited] = useState(false);
  const router = useRouter();
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
              const new_tags: ("Pub" | "Rp" | "Graphisme" | "Communautaire")[] =
                [];
              for (const key in checkedTags) {
                const element =
                  checkedTags[
                    key as "Pub" | "Rp" | "Graphisme" | "Communautaire"
                  ];
                if (element)
                  new_tags.push(
                    key as "Pub" | "Rp" | "Graphisme" | "Communautaire"
                  );
              }

              if (
                description === defaultDescription &&
                link === lien &&
                new_tags.length === tags.length &&
                new_tags.sort().join() === tags.sort().join()
              )
                rej();
              editDescription(serveur, description, new_tags, link)
                .then(() => res())
                .catch(() => rej())
                .finally(() => router.refresh());
            }),
          {
            loading: "Enregistrement en cours...",
            success: "Demande de modification envoyée avec succès !",
            error:
              "Une erreur est survenue lors de la modification des informations !\nVous devez modifier une information pour pouvoir envoyer une demande de modification.",
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
              disabled={pending}
              onClick={() => setDescription(defaultDescription)}
            >
              Réinitialiser
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col w-full justify-center items-center gap-5">
          {!pending && (
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
          )}
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="description">Description</Label>
            {pending ? (
              <div className="border p-4 rounded-box cursor-not-allowed">
                {textToMarkdown(description)}
              </div>
            ) : (
              <div>
                {action === "edit" ? (
                  <Textarea
                    id="description"
                    defaultValue={description}
                    required
                    onInput={(e) => setDescription(e.currentTarget.value)}
                    maxLength={1020}
                  />
                ) : (
                  <div className="border p-4 rounded-box">
                    {textToMarkdown(description)}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start gap-5 w-full">
            <Label htmlFor="tags">Tags</Label>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {existing_tags.map((t) => (
                <div className="flex gap-3" id="tags" key={t}>
                  <Checkbox
                    id={t}
                    defaultChecked={tags.includes(t)}
                    disabled={pending}
                    onCheckedChange={(e: boolean) => {
                      setIsEdited(true);
                      checkedTags[t] = e;
                      setCheckedTags(checkedTags);
                    }}
                  />
                  <Label htmlFor={t}>{t}</Label>
                </div>
              ))}
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col gap-3 w-full",
              pending ? "cursor-not-allowed" : ""
            )}
          >
            <Label htmlFor="link">Lien</Label>
            <Input
              id="link"
              required
              disabled={pending}
              defaultValue={link}
              onInput={(e) => setLink(e.currentTarget.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={
              pending ||
              (description === defaultDescription && link === lien && !isEdited)
            }
          >
            Modifier
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
