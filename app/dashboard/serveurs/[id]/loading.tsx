import Link from "next/link";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";

export default function Loading() {
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

      <main className="sm:ml-55 h-[calc(100vh-65px)]">
        <h1 className="text-xl font-semibold text-center py-5 bg-base-200 w-full flex flex-wrap items-center justify-center gap-3">
          <div className="w-[30px] h-[30px] rounded-full skeleton" />
          <div className="w-100 h-[30px] rounded-full skeleton" />
        </h1>
        <div className="p-4 w-full h-full">
          <div className="w-full h-full rounded-lg skeleton bg-base-200/80" />
        </div>
      </main>
    </>
  );
}
