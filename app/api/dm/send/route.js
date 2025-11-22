export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { room, text } = await req.json();
  const from = req.headers.get("authorization");

  await supabase.from("messages").insert({
    room,
    sender: from,
    text,
  });

  return NextResponse.json({ ok: true });
}
