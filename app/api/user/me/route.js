export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token =
    req.headers.get("Authorization") ||
    req.headers.get("authorization");

  if (!token) {
    return NextResponse.json({
      user: null,
      stickers: [],
      error: "NO_TOKEN",
    });
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", token)
    .maybeSingle();

  if (!user)
    return NextResponse.json({
      user: null,
      stickers: [],
      error: "USER_NOT_FOUND",
    });

  const { data: stickers } = await supabase
    .from("stickers")
    .select("*")
    .eq("owner", token);

  return NextResponse.json({
    ok: true,
    user,
    stickers,
  });
}
