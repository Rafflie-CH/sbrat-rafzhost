export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("authorization");

  // Jika tidak ada token → langsung return
  if (!token) {
    return NextResponse.json({
      user: null,
      stickers: [],
      error: "NO_TOKEN",
    });
  }

  // Ambil user dari database
  const { data: user, error: userErr } = await supabase
    .from("users")
    .select("*")
    .eq("id", token)
    .maybeSingle(); // PENTING!!!

  // Jika user tidak ditemukan
  if (userErr || !user) {
    return NextResponse.json({
      user: null,
      stickers: [],
      error: "USER_NOT_FOUND",
    });
  }

  // Ambil stikernya
  const { data: stickers } = await supabase
    .from("stickers")
    .select("*")
    .eq("owner", token);

  return NextResponse.json({
    user,
    stickers: stickers || [],
    ok: true,
  });
}
