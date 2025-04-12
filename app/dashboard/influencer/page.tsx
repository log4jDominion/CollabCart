import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SocialAccountCard } from "@/components/social-account-card"
import { ProfileForm } from "@/components/profile-form"
import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react"

export default function InfluencerDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Influencer Dashboard" text="Manage your profile and social media accounts.">
        <Button>Complete Profile</Button>
      </DashboardHeader>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="accounts">Social Accounts</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-purple">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-purple">142.5K</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+20.1%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-pink">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-pink">4.3%</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+1.2%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-blue">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-blue">342</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+18%</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-teal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collaboration Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-teal">12</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+4</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>Complete your profile to increase visibility to companies.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Profile Information</div>
                      <div className="font-medium">Complete</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Social Accounts</div>
                      <div className="font-medium">2/5 Connected</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "40%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Content Categories</div>
                      <div className="font-medium">Incomplete</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "0%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Portfolio</div>
                      <div className="font-medium">Incomplete</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "0%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Your linked social media accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Instagram className="h-6 w-6 text-pink-600" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Instagram</p>
                      <p className="text-sm text-muted-foreground">@username</p>
                    </div>
                    <div className="ml-auto font-medium text-green-500 text-sm">Connected</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Youtube className="h-6 w-6 text-red-600" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">YouTube</p>
                      <p className="text-sm text-muted-foreground">@username</p>
                    </div>
                    <div className="ml-auto font-medium text-green-500 text-sm">Connected</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Twitter className="h-6 w-6 text-blue-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Twitter</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Connect
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Linkedin className="h-6 w-6 text-blue-700" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SocialAccountCard
              platform="Instagram"
              icon={<Instagram className="h-6 w-6 text-pink-600" />}
              isConnected={true}
              icon={<Instagram className="h-6 w-6 text-pink-600" />}
              isConnected={true}
              username="@username"
              followers="85.2K"
              engagement="5.2%"
            />
            <SocialAccountCard
              platform="YouTube"
              icon={<Youtube className="h-6 w-6 text-red-600" />}
              isConnected={true}
              username="@username"
              followers="32.4K"
              engagement="3.8%"
            />
            <SocialAccountCard
              platform="Twitter"
              icon={<Twitter className="h-6 w-6 text-blue-500" />}
              isConnected={false}
            />
            <SocialAccountCard
              platform="LinkedIn"
              icon={<Linkedin className="h-6 w-6 text-blue-700" />}
              isConnected={false}
            />
          </div>
        </TabsContent>
        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Opportunities</CardTitle>
              <CardDescription>Companies interested in working with you.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Beauty Brand Campaign</h3>
                      <p className="text-sm text-muted-foreground">
                        Looking for beauty influencers for a new product launch
                      </p>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          Budget: $1,000-$2,000
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          Beauty
                        </span>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Tech Gadget Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Seeking tech influencers to review our new smartphone
                      </p>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          Budget: $500-$1,000
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          Technology
                        </span>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
