export default function Loading() {
  return (
    <main className="bg-base-200 p-8 h-[calc(100vh-65px)] flex flex-col gap-20 justify-center items-center">
      <div className="flex flex-col gap-4 text-center rounded-lg p-4">
        <h1 className="text-4xl font-semibold">Blacklists</h1>
        <p className="text-lg opacity-80">
          Vérifier si un Utilisateur est blacklist de notre groupe
        </p>
      </div>
      <div className="w-full h-20 rounded-full skeleton bg-base-200/80" />
      <div className="flex flex-col gap-5 items-center justify-center w-full h-full rounded-lg skeleton bg-base-200/80" />
    </main>
  );
}
