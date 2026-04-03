import { NextResponse } from "next/server";
import { PLANS, type PlanTier } from "../../lib/gigguard";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { rainfall?: number; triggerType?: "rain" | "aqi" | "heat"; plan?: PlanTier };
  const rainfall = typeof body.rainfall === "number" ? body.rainfall : 60;
  const triggerType = body.triggerType ?? "rain";
  const selectedPlan: PlanTier = body.plan && body.plan in PLANS ? body.plan : "Standard";
  const payoutAmount = PLANS[selectedPlan].coverage;

  if (triggerType === "aqi") {
    const aqi = 380;
    if (aqi > 350) {
      return NextResponse.json({
        trigger: true,
        payout: payoutAmount,
        reason: "High AQI",
        rainfall,
      });
    }
  }

  if (triggerType === "heat") {
    const temperature = 46;
    if (temperature > 45) {
      return NextResponse.json({
        trigger: true,
        payout: payoutAmount,
        reason: "Extreme Heat",
        rainfall,
      });
    }
  }

  if (rainfall > 50) {
    return NextResponse.json({
      trigger: true,
      payout: payoutAmount,
      reason: "Heavy Rain",
      rainfall,
    });
  }

  return NextResponse.json({
    trigger: false,
    payout: 0,
    reason: "No Trigger",
    rainfall,
  });
}