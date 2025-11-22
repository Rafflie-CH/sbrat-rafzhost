export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { username, password } = await req.json();

  // Cek apakah username sudah dipakai
  const { data: exist } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (exist)
    return NextResponse.json({ ok: false, error: "Username sudah dipakai" });

  const id = uuid();

  await supabase.from("users").insert({
    id,
    username,
    password,
    verified: false,
    role: "user",
    followers: 0,
  });

  return NextResponse.json({ ok: true, token: id });
}
