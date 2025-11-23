export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const token =
    req.headers.get("Authorization") ||
    req.headers.get("authorization");

  if (!token)
    return NextResponse.json({ ok: false });

  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("id", token)
    .maybeSingle();

  if (!user || user.role !== "admin")
    return NextResponse.json({ ok: false });

  return NextResponse.json({ ok: true });
}
