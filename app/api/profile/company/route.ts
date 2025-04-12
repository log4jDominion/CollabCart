import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getCompanyProfileByUserId, updateCompanyProfile, getUserById, updateUser } from "@/lib/data"

export async function GET(req: Request) {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.userType !== "company") {
      return NextResponse.json({ error: "Only companies can access this endpoint" }, { status: 403 })
    }

    const profile = getCompanyProfileByUserId(user.id)

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

    if (user.userType !== "company") {
      return NextResponse.json({ error: "Only companies can update their profile" }, { status: 403 })
    }

    const { name, email, website, industry, description, location, size } = await req.json()

    // Get the profile
    const profile = getCompanyProfileByUserId(user.id)

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
    const updatedProfile = updateCompanyProfile(profile.id, {
      website,
      industry,
      description,
      location,
      size,
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
