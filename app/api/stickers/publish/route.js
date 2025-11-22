import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { slug } = await req.json();
  const token = req.headers.get("authorization");

  await supabase
    .from("stickers")
    .update({ is_public: true })
    .eq("slug", slug)
    .eq("owner", token);

  return NextResponse.json({ ok: true });
}