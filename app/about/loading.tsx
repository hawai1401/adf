export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-black overflow-hidden"></div>
      <div className="backdrop-blur-sm w-full px-8 py-12 flex justify-center">
        <div className="max-w-3xl flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-center bg-base-200 rounded-lg p-4">
            <h1 className="text-4xl font-semibold">
              L’Assemblée Des Fondateurs
            </h1>
            <p className="text-lg opacity-80">
              Un serveur qui réunit des fondateurs et gérants de serveurs
              Discord FR.
            </p>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Qui sommes-nous</h2>
            <div className="h-25 w-full skeleton" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Ce que nous apportons</h2>
            <div className="h-30 w-full skeleton" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Notre objectif</h2>
            <div className="h-25 w-full skeleton" />
          </section>
        </div>
      </div>
    </>
  );
}
