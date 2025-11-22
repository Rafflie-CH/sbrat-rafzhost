import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { slug, text } = await req.json();
  const user = req.headers.get("authorization");

  await supabase.from("comments").insert({
    id: uuid(),
    slug,
    text,
    user,
  });

  return NextResponse.json({ ok: true });
}