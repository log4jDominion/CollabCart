import { NextResponse } from "next/server"
import { getInfluencerProfiles, getFullInfluencerData, hasCompanyUnlockedInfluencer } from "@/lib/data"
import { getAuthUser } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const category = url.searchParams.get("category")
    const location = url.searchParams.get("location")
    const minFollowers = url.searchParams.get("minFollowers")
    const maxFollowers = url.searchParams.get("maxFollowers")

    // Get all influencer profiles
    const profiles = getInfluencerProfiles()

    // Filter by category if specified
    let filteredProfiles = profiles
    if (category) {
      filteredProfiles = filteredProfiles.filter((profile) => profile.categories.includes(category))
    }

    // Filter by location if specified
    if (location) {
      filteredProfiles = filteredProfiles.filter((profile) =>
        profile.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Get full data for each influencer
    const result = filteredProfiles.map((profile) => {
      // Check if this company has unlocked this influencer
      const isUnlocked =
        user.userType === "influencer" ||
        (user.userType === "company" && hasCompanyUnlockedInfluencer(user.id, profile.id))

      return getFullInfluencerData(profile.id, !isUnlocked)
    })

    // Filter by follower count if specified
    if (minFollowers || maxFollowers) {
      return NextResponse.json(
        result.filter((influencer) => {
          if (!influencer) return false

          // Calculate total followers across all platforms
          const totalFollowers = influencer.socialAccounts.reduce((sum, account) => sum + (account.followers || 0), 0)

          if (minFollowers && maxFollowers) {
            return totalFollowers >= Number(minFollowers) && totalFollowers <= Number(maxFollowers)
          } else if (minFollowers) {
            return totalFollowers >= Number(minFollowers)
          } else if (maxFollowers) {
            return totalFollowers <= Number(maxFollowers)
          }

          return true
        }),
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching influencers:", error)
    return NextResponse.json({ error: "An error occurred while fetching influencers" }, { status: 500 })
  }
}
