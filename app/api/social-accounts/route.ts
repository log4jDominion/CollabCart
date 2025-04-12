import { NextResponse } from "next/server"
import { getSocialAccountsByInfluencerId, createSocialAccount, updateSocialAccount } from "@/lib/data"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "influencer") {
      return NextResponse.json({ error: "Only influencers can access social accounts" }, { status: 403 })
    }

    const socialAccounts = getSocialAccountsByInfluencerId(user.id)

    return NextResponse.json(socialAccounts)
  } catch (error) {
    console.error("Error fetching social accounts:", error)
    return NextResponse.json({ error: "An error occurred while fetching social accounts" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "influencer") {
      return NextResponse.json({ error: "Only influencers can add social accounts" }, { status: 403 })
    }

    const { platform, username, profileUrl, followers, engagement } = await req.json()

    // Get existing accounts
    const existingAccounts = getSocialAccountsByInfluencerId(user.id)
    const existingAccount = existingAccounts.find((account) => account.platform === platform)

    if (existingAccount) {
      // Update existing account
      const updatedAccount = updateSocialAccount(existingAccount.id, {
        username,
        profileUrl,
        followers,
        engagement,
      })

      return NextResponse.json({
        message: "Social account updated successfully",
        account: updatedAccount,
      })
    } else {
      // Create new account
      const newAccount = createSocialAccount({
        influencerId: user.id,
        platform,
        username,
        profileUrl,
        followers,
        engagement,
      })

      return NextResponse.json(
        {
          message: "Social account added successfully",
          account: newAccount,
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("Error adding social account:", error)
    return NextResponse.json({ error: "An error occurred while adding the social account" }, { status: 500 })
  }
}
