import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">InfluenceMatch</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-purple-pink text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=550&width=750')] opacity-10 mix-blend-overlay"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 animate-slide-up">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connect Influencers with Companies
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Our platform matches digital influencers with companies looking for the perfect marketing
                    collaborators.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register?type=influencer">
                    <Button size="lg" className="w-full bg-white text-brand-purple hover:bg-white/90 glow">
                      Join as Influencer
                    </Button>
                  </Link>
                  <Link href="/register?type=company">
                    <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10">
                      Join as Company
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md animate-float">
                  <img
                    alt="Hero"
                    className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                    src="/placeholder.svg?height=550&width=750"
                  />
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xl animate-pulse-slow">
                    New!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-blue-teal text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 animate-fade-in">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-white/80 md:text-xl">
                  Our platform makes it easy to find the perfect match for your marketing needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 card-hover-effect bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-blue font-bold text-2xl">
                  1
                </div>
                <h3 className="text-xl font-bold">Create Your Profile</h3>
                <p className="text-white/80">Sign up as an influencer or company and create your detailed profile.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 card-hover-effect bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-blue font-bold text-2xl">
                  2
                </div>
                <h3 className="text-xl font-bold">Get Matched</h3>
                <p className="text-white/80">
                  Our algorithm matches companies with the most relevant influencers based on niche, audience, and
                  budget.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 card-hover-effect bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-blue font-bold text-2xl">
                  3
                </div>
                <h3 className="text-xl font-bold">Connect & Collaborate</h3>
                <p className="text-white/80">
                  Companies unlock influencer profiles and start collaborating on successful campaigns.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-purple">
                  Join Thousands of Successful Matches
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform has helped brands and influencers create impactful collaborations across all social media
                  platforms.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 items-center justify-center py-8">
              <div className="flex items-center justify-center p-4 animate-float" style={{ animationDelay: "0s" }}>
                <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <img alt="Instagram" className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" />
                </div>
              </div>
              <div className="flex items-center justify-center p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <img alt="YouTube" className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" />
                </div>
              </div>
              <div className="flex items-center justify-center p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <img alt="TikTok" className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" />
                </div>
              </div>
              <div className="flex items-center justify-center p-4 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <img alt="LinkedIn" className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" />
                </div>
              </div>
              <div className="flex items-center justify-center p-4 animate-float" style={{ animationDelay: "2s" }}>
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <img alt="Twitter" className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-orange-pink text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to get started?</h2>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Join our platform today and start connecting with the perfect partners for your marketing campaigns.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full bg-white text-brand-pink hover:bg-white/90 glow">
                      Sign Up Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md animate-float">
                  <img
                    alt="Get Started"
                    className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                    src="/placeholder.svg?height=550&width=750"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 InfluenceMatch. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
