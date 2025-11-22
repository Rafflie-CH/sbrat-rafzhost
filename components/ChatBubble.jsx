export default function ChatBubble({ me, msg }) {
  const isMine = msg.sender === me;

  return (
    <div className={`w-full flex mb-3 ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-xl max-w-[75%] ${
          isMine
            ? "bg-blue-600 text-white"
            : "bg-neutral-200 dark:bg-neutral-800 dark:text-white"
        }`}
      >
        <p className="text-sm">{msg.text}</p>
        <p className="text-[10px] mt-1 opacity-70 text-right">{msg.time}</p>
      </div>
    </div>
  );
}