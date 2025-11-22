export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const user = req.headers.get("authorization");

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user", user)
    .order("id", { ascending: false });

  return NextResponse.json({ notif: data });
}
