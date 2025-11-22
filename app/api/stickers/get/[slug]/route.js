export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const slug = params.slug;

  const { data } = await supabase
    .from("stickers")
    .select("*")
    .eq("slug", slug)
    .single();

  return NextResponse.json({ sticker: data });
}
