export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({
        ok: false,
        error: "User tidak ditemukan",
      });
    }

    if (user.password !== password) {
      return NextResponse.json({
        ok: false,
        error: "Password salah",
      });
    }

    // FIX: return token yg BENER (user.id)
    return NextResponse.json({
      ok: true,
      token: user.id,
    });

  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return NextResponse.json({
      ok: false,
      error: "Server error",
    });
  }
}
