import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SocialAccountCardProps {
  platform: string
  icon: React.ReactNode
  isConnected: boolean
  username?: string
  followers?: string
  engagement?: string
}

export function SocialAccountCard({
  platform,
  icon,
  isConnected,
  username,
  followers,
  engagement,
}: SocialAccountCardProps) {
  return (
    <Card
      className={`card-hover-effect overflow-hidden ${isConnected ? "border-brand-purple border-2" : "border-muted"}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 ${
          platform === "Instagram"
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : platform === "YouTube"
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : platform === "Twitter"
                ? "bg-gradient-to-r from-blue-400 to-blue-500"
                : platform === "LinkedIn"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700"
                  : "bg-gradient-to-r from-gray-400 to-gray-500"
        }`}
      ></div>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-muted/50">{icon}</div>
          <CardTitle>{platform}</CardTitle>
        </div>
        <CardDescription>{isConnected ? `Connected as ${username}` : "Not connected"}</CardDescription>
      </CardHeader>
      {isConnected && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Followers</span>
              <span className="font-medium text-brand-purple">{followers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Engagement</span>
              <span className="font-medium text-brand-teal">{engagement}</span>
            </div>
          </div>
        </CardContent>
      )}
      <CardFooter>
        {isConnected ? (
          <Button variant="outline" className="w-full hover:bg-brand-purple/10 hover:text-brand-purple transition-all">
            Refresh Stats
          </Button>
        ) : (
          <Button className="w-full bg-gradient-purple-pink hover:opacity-90 transition-all">Connect Account</Button>
        )}
      </CardFooter>
    </Card>
  )
}
