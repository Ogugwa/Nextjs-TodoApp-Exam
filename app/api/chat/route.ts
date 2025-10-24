// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

// GET request
export async function GET() {
  return NextResponse.json({ message: "Hello from chat API" });
}

// POST request
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
