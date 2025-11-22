export default function StickerCard({ data }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen border-b dark:border-neutral-800">
      <img
        src={data.url}
        className="w-64 h-64 object-contain"
      />

      <div className="mt-4 text-center">
        <p className="font-bold text-lg">@{data.username} {data.verified && "✔"}</p>
        <p className="opacity-70 text-sm">
          {data.likes} likes • {data.downloads} downloads • {data.comments} comments
        </p>
      </div>
    </div>
  );
}