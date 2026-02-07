import { NextResponse } from "next/server";
import { getAllProviders } from "@/lib/providers";

export async function GET() {
  const providers = getAllProviders().map((p) => ({
    name: p.name,
    displayName: p.displayName,
    description: p.description,
    model: p.model,
    configured: p.isConfigured(),
  }));

  return NextResponse.json({ providers });
}
