import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { url } = await req.json();
  const token = req.headers.get("authorization");

  const slug = uuid().slice(0, 8);

  await supabase.from("stickers").insert({
    slug,
    url,
    owner: token,
    is_public: false,
    likes: 0,
    downloads: 0,
    comments: 0,
    views: 0,
  });

  return NextResponse.json({ ok: true });
}