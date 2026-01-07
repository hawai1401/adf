import Hr from "@/components/serveurs/Hr";

export default function Loading() {
  return (
    <main className="bg-base-200/80 p-4">
      <div className="bg-base-300 m-4 p-4 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center gap-4 col-span-3">
          <div className="w-25 h-25 rounded-full bg-base-200/80 skeleton" />
          <div className="w-100 h-7 skeleton bg-base-200/80 rounded-lg" />
          <div className="w-28 h-10.5 skeleton bg-base-200/80 rounded-lg" />
        </div>
        <Hr />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="w-35.5 h-8.5 rounded-full skeleton bg-base-200/80" />
          <div className="w-45 h-8.5 rounded-full skeleton bg-base-200/80" />
          <div className="w-20 h-8.5 rounded-full skeleton bg-base-200/80" />
        </div>
        <Hr />
        <div className="w-full h-120 rounded-box skeleton bg-base-200/80" />
      </div>
    </main>
  );
}
