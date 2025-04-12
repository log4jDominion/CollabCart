import { NextResponse } from "next/server"
import { getCampaignsByCompanyId, getCampaignsForInfluencer, createCampaign, getFullCompanyData } from "@/lib/data"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let campaigns = []

    if (user.userType === "company") {
      // Get campaigns created by this company
      campaigns = await getCampaignsByCompanyId(user.id)
    } else if (user.userType === "influencer") {
      // Get campaigns this influencer is part of
      campaigns = await getCampaignsForInfluencer(user.id)

      // Add company data to each campaign
      campaigns = campaigns.map(async (campaign) => {
        const companyData = await getFullCompanyData(campaign.companyId)
        return {
          ...campaign,
          company: companyData,
        }
      })

      campaigns = await Promise.all(campaigns)
    }

    return NextResponse.json(campaigns)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "An error occurred while fetching campaigns" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "company") {
      return NextResponse.json({ error: "Only companies can create campaigns" }, { status: 403 })
    }

    const { name, description, category, budget, targetAudience, targetLocation, startDate, endDate } = await req.json()

    const campaign = await createCampaign({
      companyId: user.id,
      name,
      description,
      category,
      budget,
      targetAudience,
      targetLocation,
      startDate,
      endDate,
      influencers: [],
    })

    return NextResponse.json(
      {
        message: "Campaign created successfully",
        campaign,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ error: "An error occurred while creating the campaign" }, { status: 500 })
  }
}
