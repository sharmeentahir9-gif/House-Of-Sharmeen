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

    const destination = body?.payload?.source;

    if (!destination) {
      return NextResponse.json({
        status: "ignored",
        reason: "No sender number found",
      });
    }

    const apiKey = process.env.GUPSHUP_API_KEY;

    if (!apiKey) {
      throw new Error("GUPSHUP_API_KEY is missing");
    }

    const form = new URLSearchParams();

    form.append("channel", "whatsapp");
    form.append("source", "923035124661");
    form.append("destination", destination);
    form.append("src.name", "Houseofsharmeen");
    form.append(
      "message",
      JSON.stringify({
        type: "text",
        text: "Hi! Welcome to House of Sharmeen. How can we help you?",
      })
    );

    const response = await fetch(
      "https://api.gupshup.io/wa/api/v1/msg",
      {
        method: "POST",
        headers: {
          apikey: apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      }
    );

    const result = await response.json();

    console.log("Gupshup reply result:", result);

    return NextResponse.json({
      status: "success",
      reply: result,
    });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        status: "error",
      },
      { status: 500 }
    );
  }
}
