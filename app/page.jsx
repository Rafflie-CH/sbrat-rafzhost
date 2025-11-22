import StickerCard from "@/components/StickerCard";

export default async function Home() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${base}/api/fyp`, { cache: "no-store" });
  const { stickers } = await res.json();

  return (
    <div className="w-full">
      {stickers.map((s) => (
        <a key={s.slug} href={`/s/${s.slug}`}>
          <StickerCard data={s} />
        </a>
      ))}
    </div>
  );
}