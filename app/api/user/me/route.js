import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("authorization");

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", token)
    .single();

  const { data: stickers } = await supabase
    .from("stickers")
    .select("*")
    .eq("owner", token);

  return NextResponse.json({ user, stickers });
}