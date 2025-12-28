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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
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
import { existing_tags, tag } from "@/types/tags";

export default function EditServeurForm({
  serveur,
  defaultDescription,
  tags,
  link: lien,
  pending,
}: {
  serveur: serveur;
  defaultDescription: string;
  tags: tag[];
  link: string | undefined;
  pending: boolean;
}) {
  const [description, setDescription] = useState(defaultDescription ?? "");
  const [link, setLink] = useState(lien ?? "");
  const [action, setAction] = useState<"edit" | "see">("edit");
  const [checkedTags, setCheckedTags] = useState<tag[]>([]);
  const [isEdited, setIsEdited] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        toast.promise<void>(
          () =>
            new Promise((res, rej) => {
              if (
                description === defaultDescription &&
                link === lien &&
                checkedTags.length === tags.length &&
                checkedTags.sort().join() === tags.sort().join()
              )
                rej();
              editDescription(serveur, description, checkedTags, link)
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
              defaultValue={link}
              onInput={(e) => setLink(e.currentTarget.value)}
              onBlur={() => {
                if (!link.startsWith("https://discord.")) {
                  toast.error("Lien invalide !");
                  setIsEdited(false);
                }
              }}
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
