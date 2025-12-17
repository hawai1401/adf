import authClient from "@/lib/auth-client";
import { User } from "better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useDiscordAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isFetch, setIsFetch] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "http://localhost:3000/dashboard",
    });
  };

  const getUser = async () => {
    setIsFetch(true);
    const session = await authClient.getSession();
    setUser(session.data?.user ?? null);
    setIsFetch(false);
  };

  const signOut = async () => {
    await authClient.signOut();
    router.push("/");
    setUser(null);
  };

  return { signIn, signOut, getUser, user, isFetch };
}
