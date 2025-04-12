import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getInfluencerProfileByUserId, updateInfluencerProfile, getUserById, updateUser } from "@/lib/data"

export async function GET(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "influencer") {
      return NextResponse.json({ error: "Only influencers can access this endpoint" }, { status: 403 })
    }

    const profile = getInfluencerProfileByUserId(user.id)

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get user data
    const userData = getUserById(user.id)

    return NextResponse.json({
      ...profile,
      name: userData?.name,
      email: userData?.email,
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "An error occurred while fetching the profile" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "influencer") {
      return NextResponse.json({ error: "Only influencers can update their profile" }, { status: 403 })
    }

    const { name, email, bio, location, categories, priceRange } = await req.json()

    // Get the profile
    const profile = getInfluencerProfileByUserId(user.id)

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Update user data
    if (name || email) {
      const userData = getUserById(user.id)
      if (userData) {
        updateUser(user.id, {
          name: name || userData.name,
          email: email || userData.email,
        })
      }
    }

    // Update profile data
    const updatedProfile = updateInfluencerProfile(profile.id, {
      bio,
      location,
      categories,
      priceRange,
    })

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "An error occurred while updating the profile" }, { status: 500 })
  }
}
