import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { target } = await req.json();
  const user = req.headers.get("authorization");

  // insert follow
  await supabase.from("follows").insert({
    follower: user,
    following: target,
  });

  await supabase.rpc("increment_followers", { user_input: target });

  return NextResponse.json({ ok: true });
}