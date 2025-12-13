import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
      <div className="flex flex-1 items-center gap-2">
        <Image
          src="/logo.webp"
          alt="logo"
          width="40"
          height="40"
          className="rounded-full border"
        />
        <Link href="/" className="font-semibold text-xl">ADF</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/about">À propos</Link>
          </li>
        </ul>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/serveurs">Serveurs</Link>
          </li>
        </ul>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link target="_blank" href="https://discord.gg/P3dcjTuuav">
              Discord
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
