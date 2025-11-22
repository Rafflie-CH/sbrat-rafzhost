import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const q = req.nextUrl.searchParams.get("q") || "";

  const { data } = await supabase
    .from("stickers")
    .select("*")
    .eq("is_public", true);

  const result = data.filter((s) =>
    s.slug.includes(q) ||
    s.url.includes(q)
  );

  return NextResponse.json({ result });
}