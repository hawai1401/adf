import Image from "next/image";

export default function Footer() {
  return (
    <footer className="absolute bg-base-100 flex items-center justify-center footer text-neutral-content p-10">
      <aside className="flex items-center">
        <Image
          src="/logo.webp"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-full border"
        />
        <p>Tous droits réservés © {new Date().getFullYear()} | ADF</p>
      </aside>
    </footer>
  );
}
