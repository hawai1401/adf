"use client";

import { serveur } from "@/lib/serveurs/userServers";
import { CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import addServeur from "@/lib/serveurs/addServeur";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import textToMarkdown from "@/lib/textToMarkdown";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { existing_tags, tags } from "@/lib/tags";

export default function RequestApprouveForm({
  serveur,
  pending,
  pending_description,
  tags: tags,
  link: lien,
}: {
  serveur: serveur;
  pending: boolean;
  pending_description: string | undefined;
  tags: tags[];
  link: string | undefined;
}) {
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [action, setAction] = useState<"edit" | "see">("edit");
  const [checkedTags, setCheckedTags] = useState<tags[]>([]);
  const [isEdited, setIsEdited] = useState(false);
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise<void>(
          () =>
            new Promise((res, rej) =>
              addServeur(serveur, description, checkedTags, link)
                .then(() => res())
                .catch(() => rej())
                .finally(() => router.refresh())
            ),
          {
            loading: "Envoi en cours...",
            success: "Demande envoyée avec succès !",
            error:
              "Une erreur est survenue lors de l'enregistrement des informations !",
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
            <div className="border p-4 rounded-box cursor-not-allowed">
              {textToMarkdown(pending_description!)}
            </div>
          ) : (
            <div>
              {action === "edit" ? (
                <InputGroup>
                  <InputGroupTextarea
                    id="description"
                    defaultValue={description}
                    required
                    onInput={(e) => {
                      const value = e.currentTarget.value;
                      if (value.length > 0) setIsEdited(true);
                      setDescription(value);
                    }}
                    maxLength={1020}
                  />
                  <InputGroupAddon align="block-end" className="justify-end">
                    <InputGroupText
                      className={
                        description.length === 1020
                          ? "text-red-500"
                          : description.length > 1000
                          ? "text-red-400"
                          : description.length > 980
                          ? "text-orange-400"
                          : ""
                      }
                    >
                      {description.length}/1020
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              ) : (
                <div className="border p-4 rounded-box">
                  {textToMarkdown(description)}
                </div>
              )}
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
                  disabled={pending}
                  defaultChecked={tags.includes(t)}
                  onCheckedChange={(e: boolean) => {
                    setCheckedTags(
                      e
                        ? [...checkedTags, t]
                        : checkedTags.filter((v) => v !== t)
                    );
                    setIsEdited(true);
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
            defaultValue={lien}
            onInput={(e) => setLink(e.currentTarget.value)}
            onBlur={() => {
              if (!link.startsWith("https://discord.")) {
                setIsEdited(false);
                toast.error("Lien invalide !");
              }
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={pending || !isEdited}
        >
          {pending ? "Demande en cours de traitement" : "Envoyer une demande"}
        </Button>
      </CardFooter>
    </form>
  );
}
