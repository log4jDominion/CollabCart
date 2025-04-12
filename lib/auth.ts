import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { getUserById } from "./data"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function getAuthUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")

  if (!token) {
    return null
  }

  try {
    const decoded = verify(token.value, JWT_SECRET) as {
      id: string
      email: string
      name: string
      userType: string
    }

    // Get the user from the database to ensure they still exist
    const user = getUserById(decoded.id)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
    }
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}
