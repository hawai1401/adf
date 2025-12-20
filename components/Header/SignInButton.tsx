"use client"

import useDiscordAuth from "@/hooks/useDiscordAuth";
import {
  RippleButton,
  RippleButtonRipples,
} from "@/components/animate-ui/components/buttons/ripple";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoExitOutline, IoHomeOutline } from "react-icons/io5";
import Link from "next/link";

export default function SignInButton() {
  const { signIn, user, isFetch, getUser, signOut } = useDiscordAuth();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!isFetch && user === undefined) getUser();
  }, [isFetch, user, getUser]);

  if (isFetch || !user)
    return (
      <ul className="menu menu-horizontal px-1">
        <li>
          <RippleButton
            variant="outline"
            className="rounded-full"
            size={"lg"}
            onClick={() => signIn()}
          >
            Se connecter
            <RippleButtonRipples />
          </RippleButton>
        </li>
      </ul>
    );
  return (
    <ul
      className={cn(
        "hover:bg-base-300 p-1.5 rounded-full transition-all cursor-pointer",
        showMenu ? "bg-base-300" : ""
      )}
      onClick={() => setShowMenu(!showMenu)}
    >
      <li>
        {user.image ? (
          <Image
            src={user.image}
            alt="pdp"
            width={33}
            height={33}
            className="rounded-full"
          />
        ) : (
          <div className="w-8.25 h-8.25 bg-base-200 rounded-full flex items-center justify-center text-lg font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </li>
      {showMenu && (
        <ul className="menu bg-base-200 rounded-xl w-56 absolute right-5 mt-2">
          <li>
            <Link href="/dashboard">
              <IoHomeOutline size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <div onClick={() => signOut()}>
              <IoExitOutline size={20} />
              Se déconnecter
            </div>
          </li>
        </ul>
      )}
    </ul>
  );
}
