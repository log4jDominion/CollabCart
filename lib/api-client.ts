import { toast } from "@/components/ui/use-toast"

// API base URL - can be moved to environment variable
const API_BASE_URL = "http://localhost:8080/api"

// Helper function for making API requests
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Get JWT token from cookie if available
  const token = getCookie("auth_token")

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  // Add authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Needed for cookies
    })

    // Handle non-2xx responses
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || `API request failed: ${response.status}`)
    }

    // Return JSON response
    return await response.json()
  } catch (error: any) {
    console.error("API request error:", error)
    toast({
      title: "Error",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    })
    throw error
  }
}

// Helper function to get a cookie value
function getCookie(name: string) {
  if (typeof document === "undefined") return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()
  return null
}

// Authentication endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => apiRequest("/auth/logout", { method: "POST" }),
}

// User registration
export const registerAPI = {
  register: (name: string, email: string, password: string, userType: string) =>
    apiRequest("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, userType }),
    }),
}

// Profile endpoints
export const profileAPI = {
  getInfluencerProfile: () => apiRequest("/profile/influencer"),

  updateInfluencerProfile: (profileData: any) =>
    apiRequest("/profile/influencer", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  getCompanyProfile: () => apiRequest("/profile/company"),

  updateCompanyProfile: (profileData: any) =>
    apiRequest("/profile/company", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
}

// Social account endpoints
export const socialAccountAPI = {
  getAccounts: () => apiRequest("/social-accounts"),

  addAccount: (accountData: any) =>
    apiRequest("/social-accounts", {
      method: "POST",
      body: JSON.stringify(accountData),
    }),
}

// Campaign endpoints
export const campaignAPI = {
  getCampaigns: () => apiRequest("/campaigns"),

  getCampaign: (id: string) => apiRequest(`/campaigns/${id}`),

  createCampaign: (campaignData: any) =>
    apiRequest("/campaigns", {
      method: "POST",
      body: JSON.stringify(campaignData),
    }),

  updateCampaign: (id: string, campaignData: any) =>
    apiRequest(`/campaigns/${id}`, {
      method: "PUT",
      body: JSON.stringify(campaignData),
    }),
}

// Influencer endpoints
export const influencerAPI = {
  getInfluencers: (params: Record<string, string | number> = {}) => {
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&")

    return apiRequest(`/influencers${queryString ? `?${queryString}` : ""}`)
  },

  getInfluencer: (id: string) => apiRequest(`/influencers/${id}`),
}

// Profile unlock endpoints
export const unlockAPI = {
  unlockProfile: (influencerId: string, paymentIntentId: string) =>
    apiRequest("/unlock", {
      method: "POST",
      body: JSON.stringify({ influencerId, paymentIntentId }),
    }),
}
