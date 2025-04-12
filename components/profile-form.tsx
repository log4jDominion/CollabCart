"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { profileAPI } from "@/lib/api-client"

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Fashion and lifestyle content creator based in New York. I love sharing my daily outfits and lifestyle tips.",
    location: "New York, USA",
    categories: ["Fashion", "Lifestyle"],
    priceRange: "$500-$1000",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const categories = [...prev.categories]
      if (categories.includes(category)) {
        return { ...prev, categories: categories.filter((c) => c !== category) }
      } else {
        return { ...prev, categories: [...categories, category] }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call the API to update the profile
      await profileAPI.updateInfluencerProfile(formData)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile information to help brands find you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} disabled={isLoading} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range (per post)</Label>
              <Select
                defaultValue={formData.priceRange}
                onValueChange={(value) => handleSelectChange("priceRange", value)}
                disabled={isLoading}
              >
                <SelectTrigger id="priceRange">
                  <SelectValue placeholder="Select a price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$100-$500">$100-$500</SelectItem>
                  <SelectItem value="$500-$1000">$500-$1000</SelectItem>
                  <SelectItem value="$1000-$2000">$1000-$2000</SelectItem>
                  <SelectItem value="$2000+">$2000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Content Categories</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Fashion") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Fashion")}
                disabled={isLoading}
              >
                Fashion
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Lifestyle") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Lifestyle")}
                disabled={isLoading}
              >
                Lifestyle
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Beauty") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Beauty")}
                disabled={isLoading}
              >
                Beauty
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Travel") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Travel")}
                disabled={isLoading}
              >
                Travel
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Food") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Food")}
                disabled={isLoading}
              >
                Food
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Fitness") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Fitness")}
                disabled={isLoading}
              >
                Fitness
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Technology") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Technology")}
                disabled={isLoading}
              >
                Technology
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={`rounded-full ${formData.categories.includes("Gaming") ? "bg-brand-purple/20 border-brand-purple text-brand-purple" : "bg-muted/50"}`}
                onClick={() => handleCategoryToggle("Gaming")}
                disabled={isLoading}
              >
                Gaming
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="bg-gradient-purple-pink hover:opacity-90 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
