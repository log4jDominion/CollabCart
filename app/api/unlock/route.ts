import { NextResponse } from "next/server"
import { createProfileUnlock, getFullInfluencerData } from "@/lib/data"
import { getAuthUser } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "company") {
      return NextResponse.json({ error: "Only companies can unlock influencer profiles" }, { status: 403 })
    }

    const { influencerId, paymentIntentId } = await req.json()

    // In a real app, verify the payment was successful
    // For demo purposes, we'll assume payment was successful

    // Record the unlock
    const unlock = createProfileUnlock({
      companyId: user.id,
      influencerId,
      paymentIntentId,
    })

    // Get the full influencer profile
    const influencer = getFullInfluencerData(influencerId, false)

    return NextResponse.json({
      message: "Influencer profile unlocked successfully",
      unlock,
      influencer,
    })
  } catch (error) {
    console.error("Error unlocking profile:", error)
    return NextResponse.json({ error: "An error occurred while unlocking the profile" }, { status: 500 })
  }
}
