import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.headers.get("authorization");
  const room = req.nextUrl.searchParams.get("room");

  if (room) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("room", room)
      .order("id", { ascending: true });

    return NextResponse.json({ messages: data });
  }

  const { data } = await supabase
    .from("rooms")
    .select("*")
    .contains("members", [token]);

  return NextResponse.json({ rooms: data });
}