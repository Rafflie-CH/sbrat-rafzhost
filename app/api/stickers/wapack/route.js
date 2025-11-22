export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req) {
  const { stickers } = await req.json(); // array base64 PNG

  const zip = new JSZip();

  zip.file(
    "manifest.json",
    JSON.stringify({
      name: "SBRAT Pack",
      publisher: "Rafzhost",
      stickers: stickers.map((_, i) => `s${i}.png`),
    })
  );

  stickers.forEach((b64, i) => {
    zip.file(`s${i}.png`, b64.split(",")[1], { base64: true });
  });

  const out = await zip.generateAsync({ type: "base64" });

  return NextResponse.json({ zip: out });
}
