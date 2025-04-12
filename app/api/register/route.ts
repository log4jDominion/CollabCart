import { NextResponse } from "next/server"
import { createUser, createInfluencerProfile, createCompanyProfile } from "@/lib/data"

export async function POST(req: Request) {
  try {
    const { name, email, password, userType } = await req.json()

    // Create user
    const user = await createUser({
      name,
      email,
      password,
      userType,
    })

    // Create profile based on user type
    if (userType === "influencer") {
      await createInfluencerProfile({
        userId: user.id,
        bio: "",
        location: "",
        categories: [],
        priceRange: "",
      })
    } else if (userType === "company") {
      await createCompanyProfile({
        userId: user.id,
        website: "",
        industry: "",
        description: "",
        location: "",
        size: "",
      })
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error.message || "An error occurred during registration" }, { status: 500 })
  }
}
