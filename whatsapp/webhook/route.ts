import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "WhatsApp webhook is live",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Gupshup webhook received:", body);

    return NextResponse.json({
      status: "success",
      received: true,
    });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        status: "error",
        received: false,
      },
      { status: 400 }
    );
  }
}
