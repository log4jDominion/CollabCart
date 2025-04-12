import { NextResponse } from "next/server"
import { validateUser } from "@/lib/data"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await validateUser(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create a JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Set the token in a cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

export async function DELETE() {
  // Clear the auth cookie
  cookies().delete("auth_token")
  return NextResponse.json({ success: true })
}
