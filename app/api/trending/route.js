import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// trending = views + likes*4 + downloads*2 + comments*3

export async function GET() {
  const { data } = await supabase
    .from("stickers")
    .select("*")
    .eq("is_public", true);

  data.sort((a, b) => {
    const scoreA = a.views + a.likes * 4 + a.downloads * 2 + a.comments * 3;
    const scoreB = b.views + b.likes * 4 + b.downloads * 2 + b.comments * 3;
    return scoreB - scoreA;
  });

  return NextResponse.json({ stickers: data });
}