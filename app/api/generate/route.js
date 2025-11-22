export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { text, background, color, emojiStyle } = await req.json();

  const endpoint = `https://brat.siputzx.my.id/image?text=${encodeURIComponent(
    text
  )}&background=${background}&color=${color}&emojiStyle=${emojiStyle}`;

  const res = await fetch(endpoint);
  const buf = Buffer.from(await (await res.blob()).arrayBuffer()).toString("base64");

  return NextResponse.json({
    url: `data:image/png;base64,${buf}`,
  });
}
