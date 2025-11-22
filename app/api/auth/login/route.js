export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (!user)
      return NextResponse.json({ ok: false, error: "User tidak ditemukan" });

    if (user.password !== password)
      return NextResponse.json({ ok: false, error: "Password salah" });

    return NextResponse.json({
      ok: true,
      token: user.id, // FIX PALING PENTING
    });

  } catch (e) {
    return NextResponse.json({ ok: false, error: "Server error" });
  }
}
