import { NextRequest, NextResponse } from "next/server";
import { verifyKey } from "discord-interactions";
import { APIInteraction, InteractionType } from "discord-api-types/v10";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const body = await req.text();

  const isValid = await verifyKey(
    body,
    signature!,
    timestamp!,
    process.env.DISCORD_PUBLIC_KEY!
  );

  if (!isValid) {
    return new NextResponse("Bad request signature", { status: 401 });
  }

  const interaction = JSON.parse(body) as APIInteraction;

  // PING
  if (interaction.type === InteractionType.Ping) {
    return NextResponse.json({ type: 1 });
  }

  // SLASH COMMAND
  if (interaction.type === InteractionType.ApplicationCommand) {
    return NextResponse.json({
      type: 4,
      data: { content: "Pong 🏓" },
    });
  }

  return new NextResponse("Unhandled", { status: 400 });
}
