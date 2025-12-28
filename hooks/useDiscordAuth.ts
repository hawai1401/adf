import { setDiscordId } from "@/lib/setDiscordId";
import authClient from "@/lib/auth-client";
import getMember from "@/lib/utilisateurs/getMember";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function useDiscordAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isFetch, setIsFetch] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "discord",
    });
  };

  const signOut = async () => {
    await authClient.signOut();
    router.push("/");
    setUser(null);
  };

  const getUser = async () => {
    setIsFetch(true);
    const session = await authClient.getSession();
    if (session.data?.user) {
      const member = await getMember(session.data.user.name);
      if (!member) {
        await authClient.signOut();
        toast.error("Vous n'êtes pas dans la liste des membres de l'ADF !");
        return;
      } else {
        if (!member.roles.includes("1432328421010313256")) {
          await authClient.signOut();
          toast.error(
            "Vous n'êtes pas dans la liste des fondateurs de l'ADF !"
          );
          return;
        }
      }
      setDiscordId(session.data.user.id);
      setUser(session.data.user);
    } else {
      setUser(null);
    }
    setIsFetch(false);
  };

  return { signIn, signOut, getUser, user, isFetch };
}
