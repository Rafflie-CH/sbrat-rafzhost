import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const { username, password } = await req.json();

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (!data)
    return NextResponse.json({ ok: false, error: "User tidak ditemukan" });

  if (data.password !== password)
    return NextResponse.json({ ok: false, error: "Password salah" });

  return NextResponse.json({ ok: true, token: data.id });
}