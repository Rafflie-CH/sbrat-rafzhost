export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { slug } = await req.json();

  await supabase.rpc("increment_like", { slug_input: slug });

  return NextResponse.json({ ok: true });
}
