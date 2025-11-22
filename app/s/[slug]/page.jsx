export default async function StickerDetail({ params }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${base}/api/stickers/get/${params.slug}`, {
    cache: "no-store",
  });
  const { sticker } = await res.json();

  return (
    <div className="p-6 text-center">
      <img src={sticker.url} className="w-72 mx-auto" />

      <h1 className="text-xl font-bold mt-3">
        @{sticker.username} {sticker.verified && "✔"}
      </h1>

      <p className="opacity-70 text-sm">
        {sticker.likes} likes • {sticker.downloads} downloads • {sticker.comments} comments
      </p>

      <a
        download
        href={sticker.url}
        className="w-full block mt-4 bg-green-600 text-white p-2 rounded"
      >
        Download
      </a>

      <button className="w-full mt-2 bg-blue-600 text-white p-2 rounded">
        Export ke WA Pack
      </button>

      <button
        className="w-full mt-2 bg-gray-700 text-white p-2 rounded"
        onClick={() => navigator.share?.({ url: window.location.href })}
      >
        Share
      </button>
    </div>
  );
}