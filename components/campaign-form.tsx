"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { toast } from "@/components/ui/use-toast"
import { campaignAPI } from "@/lib/api-client"

export function CampaignForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    budget: "",
    targetAudience: "",
    targetLocation: "",
    startDate: "",
    endDate: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the API to create the campaign
      await campaignAPI.createCampaign(formData)

      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully.",
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        budget: "",
        targetAudience: "",
        targetLocation: "",
        startDate: "",
        endDate: "",
      })
    } catch (error: any) {
      toast({
        title: "Creation failed",
        description: error.message || "An error occurred while creating your campaign.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="active" className="space-y-4">
      <TabsList>
        <TabsTrigger value="active">Active Campaigns</TabsTrigger>
        <TabsTrigger value="create">Create Campaign</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Manage your ongoing marketing campaigns.</CardDescription>
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
      </TabsContent>
      <TabsContent value="create">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Set up a new marketing campaign to find influencers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Summer Collection Launch"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your campaign goals and requirements"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Product Category</Label>
                  <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="fitness">Health & Fitness</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Campaign Budget</Label>
                  <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  placeholder="e.g., Women 18-34 interested in sustainable fashion"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLocation">Target Location</Label>
                <Input
                  id="targetLocation"
                  name="targetLocation"
                  placeholder="e.g., United States, Canada"
                  value={formData.targetLocation}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Campaign"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  )
}
