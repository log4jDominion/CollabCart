import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface InfluencerCardProps {
  name: string
  category: string
  followers: string
  engagement: string
  location: string
  isAnonymized: boolean
}

export function InfluencerCard({ name, category, followers, engagement, location, isAnonymized }: InfluencerCardProps) {
  return (
    <Card className="card-hover-effect overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-pink"></div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isAnonymized ? name : "Anonymous Influencer"}</CardTitle>
            <CardDescription className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-green mr-2"></span>
              {category}
            </CardDescription>
          </div>
          {isAnonymized && (
            <div className="p-2 rounded-full bg-muted/50 animate-pulse-slow">
              <Lock className="h-4 w-4 text-brand-purple" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Followers</span>
            <span className="font-medium text-brand-purple">{followers}</span>
          </div>
          <div className="w-full bg-muted/50 h-2 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink"
              style={{
                width: followers.includes("K")
                  ? `${Math.min(Number.parseInt(followers.replace("K", "")) / 5, 100)}%`
                  : "50%",
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Engagement</span>
            <span className="font-medium text-brand-teal">{engagement}</span>
          </div>
          <div className="w-full bg-muted/50 h-2 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-brand-teal to-brand-blue"
              style={{
                width: `${Math.min(Number.parseFloat(engagement.replace("%", "")) * 10, 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="font-medium">{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isAnonymized ? (
          <Button className="w-full bg-gradient-purple-pink hover:opacity-90 transition-all">
            <Lock className="mr-2 h-4 w-4" /> Unlock Profile ($25)
          </Button>
        ) : (
          <Button className="w-full">View Full Profile</Button>
        )}
      </CardFooter>
    </Card>
  )
}
