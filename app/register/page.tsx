"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { registerAPI, authAPI } from "@/lib/api-client"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") || "influencer"
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (type: string, e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Register the user
      await registerAPI.register(formData.name, formData.email, formData.password, type.toUpperCase())

      // Login the user after registration
      const loginData = await authAPI.login(formData.email, formData.password)

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      })

      // Redirect to the appropriate dashboard
      router.push(`/dashboard/${type.toLowerCase()}`)
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost" className="group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] animate-fade-in">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
        </div>
        <Tabs defaultValue={defaultType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
            <TabsTrigger
              value="influencer"
              className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white transition-all"
            >
              Influencer
            </TabsTrigger>
            <TabsTrigger
              value="company"
              className="data-[state=active]:bg-gradient-blue-teal data-[state=active]:text-white transition-all"
            >
              Company
            </TabsTrigger>
          </TabsList>
          <TabsContent value="influencer" className="animate-slide-up">
            <Card className="border-t-4 border-t-brand-purple shadow-lg">
              <CardHeader>
                <CardTitle>Influencer Account</CardTitle>
                <CardDescription>
                  Create an account to showcase your social media presence and connect with brands.
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleSubmit("influencer", e)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-purple focus:ring-brand-purple"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-purple focus:ring-brand-purple"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-purple focus:ring-brand-purple"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-purple focus:ring-brand-purple"
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-purple-pink hover:opacity-90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Influencer Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="company" className="animate-slide-up">
            <Card className="border-t-4 border-t-brand-blue shadow-lg">
              <CardHeader>
                <CardTitle>Company Account</CardTitle>
                <CardDescription>
                  Create an account to find and collaborate with influencers for your marketing campaigns.
                </CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleSubmit("company", e)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your company name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-blue focus:ring-brand-blue"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your business email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-blue focus:ring-brand-blue"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-blue focus:ring-brand-blue"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="transition-all focus:border-brand-blue focus:ring-brand-blue"
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-blue-teal hover:opacity-90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Company Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-brand-purple">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-brand-purple">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-brand-purple">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
