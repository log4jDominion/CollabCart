import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CompanyProfileForm } from "@/components/company-profile-form"
import { CampaignForm } from "@/components/campaign-form"
import { InfluencerCard } from "@/components/influencer-card"

export default function CompanyDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Company Dashboard" text="Manage your profile and find influencers for your campaigns.">
        <Button>Create Campaign</Button>
      </DashboardHeader>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="influencers">Find Influencers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-purple">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-purple">3</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+1</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-pink">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Influencer Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-pink">12</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+5</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-blue">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-blue">1.2M</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+350K</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect overflow-hidden border-t-4 border-t-brand-teal">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-teal">$4,250</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+$1,500</span>
                  <span className="text-xs text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Your current marketing campaigns.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Summer Collection Launch</h3>
                        <p className="text-sm text-muted-foreground">Fashion influencers promoting our summer line</p>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Budget: $5,000
                          </span>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            5 Influencers
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Product Review Campaign</h3>
                        <p className="text-sm text-muted-foreground">Tech reviewers testing our new gadget</p>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Budget: $3,000
                          </span>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            3 Influencers
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Brand Awareness</h3>
                        <p className="text-sm text-muted-foreground">Lifestyle influencers sharing our brand story</p>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Budget: $2,500
                          </span>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            4 Influencers
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Connections</CardTitle>
                <CardDescription>Influencers you've recently connected with.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Fashion & Lifestyle • 120K followers</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Message
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Mike Chen</p>
                      <p className="text-sm text-muted-foreground">Tech Reviews • 85K followers</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Message
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Emma Wilson</p>
                      <p className="text-sm text-muted-foreground">Beauty • 250K followers</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <CompanyProfileForm />
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-4">
          <CampaignForm />
        </TabsContent>
        <TabsContent value="influencers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Influencers</CardTitle>
              <CardDescription>Discover influencers that match your campaign needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <InfluencerCard
                  name="Influencer #1"
                  category="Fashion & Lifestyle"
                  followers="120K"
                  engagement="4.5%"
                  location="New York, USA"
                  isAnonymized={true}
                />
                <InfluencerCard
                  name="Influencer #2"
                  category="Beauty & Skincare"
                  followers="250K"
                  engagement="3.8%"
                  location="Los Angeles, USA"
                  isAnonymized={true}
                />
                <InfluencerCard
                  name="Influencer #3"
                  category="Tech & Gaming"
                  followers="85K"
                  engagement="5.2%"
                  location="San Francisco, USA"
                  isAnonymized={true}
                />
                <InfluencerCard
                  name="Influencer #4"
                  category="Food & Cooking"
                  followers="180K"
                  engagement="6.1%"
                  location="Chicago, USA"
                  isAnonymized={true}
                />
                <InfluencerCard
                  name="Influencer #5"
                  category="Fitness & Health"
                  followers="320K"
                  engagement="4.2%"
                  location="Miami, USA"
                  isAnonymized={true}
                />
                <InfluencerCard
                  name="Influencer #6"
                  category="Travel"
                  followers="420K"
                  engagement="3.5%"
                  location="London, UK"
                  isAnonymized={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
