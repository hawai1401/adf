export default function Loading() {
  return (
    <main className="p-8 flex flex-col gap-10 bg-base-200">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-semibold">Serveurs</h1>
        <p className="text-lg opacity-80">
          Voici les serveurs des membres de notre assemblée.
        </p>
      </div>
      <div className="w-full h-10 rounded-full skeleton bg-base-200/80" />
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Tags recherchés</p>
        <div className="flex flex-wrap gap-2" />
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Tags existants</p>
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-8.5 rounded-full skeleton" />
          <div className="w-14.5 h-8.5 rounded-full skeleton" />
          <div className="w-12.5 h-8.5 rounded-full skeleton" />
          <div className="w-13 h-8.5 rounded-full skeleton" />
          <div className="w-33.5 h-8.5 rounded-full skeleton" />
          <div className="w-20.5 h-8.5 rounded-full skeleton" />
          <div className="w-28.5 h-8.5 rounded-full skeleton" />
          <div className="w-27 h-8.5 rounded-full skeleton" />
          <div className="w-17 h-8.5 rounded-full skeleton" />
          <div className="w-21 h-8.5 rounded-full skeleton" />
        </div>
      </div>
      <p className="font-semibold">Serveurs</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="h-120 rounded-box skeleton" />
        <div className="h-120 rounded-box skeleton hidden md:block" />
        <div className="h-120 rounded-box skeleton hidden lg:block" />
        <div className="h-120 rounded-box skeleton hidden xl:block" />
      </div>
    </main>
  );
}
