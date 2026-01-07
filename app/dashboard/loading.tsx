import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";

export default function Loading() {
  const item = (className: string = "flex") => (
    <div
      className={cn(
        "bg-base-300 px-4 py-10 rounded-box items-start md:items-center justify-center flex-col gap-4 hover:scale-[1.02] h-full transition-transform",
        className
      )}
    >
      <div className="flex justify-center items-center gap-4 mb-0.5">
        <div className="w-12.5 h-12.5 rounded-full skeleton bg-base-200/80" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-15 rounded-full skeleton bg-base-200/80"></div>
          <div className="h-5 w-25 rounded-full skeleton bg-base-200/80"></div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <aside className="fixed top-15 left-0 w-55 h-[calc(100vh-65px)] bg-base-200 hidden sm:block">
        <ul className="menu menu-xs bg-base-200 rounded-box max-w-55 mt-2 h-[calc(100vh-65px)]">
          <li>
            <Link href="/dashboard">
              <IoHomeOutline size={20} />
              Accueil
            </Link>
          </li>
          <li className="h-[calc(100%-56px)]">
            <details open>
              <summary>
                <IoPeopleOutline size={20} />
                Serveurs
              </summary>
              <ul className="max-w-45 h-full">
                <li>
                  <div>
                    <div className="w-5 h-5 rounded-full skeleton" />
                    <div className="w-25 h-4 rounded-full skeleton" />
                  </div>
                </li>
                <li>
                  <div>
                    <div className="w-5 h-5 rounded-full skeleton" />
                    <div className="w-25 h-4 rounded-full skeleton" />
                  </div>
                </li>
                <li>
                  <div>
                    <div className="w-5 h-5 rounded-full skeleton" />
                    <div className="w-25 h-4 rounded-full skeleton" />
                  </div>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </aside>

      <main className="sm:ml-55 min-h-[calc(100vh-65px)]">
        <h1 className="text-xl font-semibold text-center p-2 bg-base-200 w-full">
          Choisissez un serveur à gérer
        </h1>
        <div className="relative w-full">
          <div className="h-fit w-full overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 scrollbar-hide">
            {item()}
            {item("flex sm:hidden md:flex")}
            {item("hidden lg:flex")}
            {item("hidden xl:flex")}
          </div>
        </div>
      </main>
    </>
  );
}
