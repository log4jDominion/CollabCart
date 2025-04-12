"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Settings, MessageSquare, BarChart, CreditCard } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export function DashboardNav() {
  const pathname = usePathname()

  const isInfluencer = pathname?.includes("/dashboard/influencer")
  const isCompany = pathname?.includes("/dashboard/company")

  const navItems = isInfluencer
    ? [
        {
          title: "Dashboard",
          href: "/dashboard/influencer",
          icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        },
        {
          title: "Profile",
          href: "/dashboard/influencer/profile",
          icon: <Users className="mr-2 h-4 w-4" />,
        },
        {
          title: "Messages",
          href: "/dashboard/influencer/messages",
          icon: <MessageSquare className="mr-2 h-4 w-4" />,
        },
        {
          title: "Analytics",
          href: "/dashboard/influencer/analytics",
          icon: <BarChart className="mr-2 h-4 w-4" />,
        },
        {
          title: "Earnings",
          href: "/dashboard/influencer/earnings",
          icon: <CreditCard className="mr-2 h-4 w-4" />,
        },
        {
          title: "Settings",
          href: "/dashboard/influencer/settings",
          icon: <Settings className="mr-2 h-4 w-4" />,
        },
      ]
    : [
        {
          title: "Dashboard",
          href: "/dashboard/company",
          icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
        },
        {
          title: "Campaigns",
          href: "/dashboard/company/campaigns",
          icon: <BarChart className="mr-2 h-4 w-4" />,
        },
        {
          title: "Influencers",
          href: "/dashboard/company/influencers",
          icon: <Users className="mr-2 h-4 w-4" />,
        },
        {
          title: "Messages",
          href: "/dashboard/company/messages",
          icon: <MessageSquare className="mr-2 h-4 w-4" />,
        },
        {
          title: "Billing",
          href: "/dashboard/company/billing",
          icon: <CreditCard className="mr-2 h-4 w-4" />,
        },
        {
          title: "Settings",
          href: "/dashboard/company/settings",
          icon: <Settings className="mr-2 h-4 w-4" />,
        },
      ]

  return (
    <div className="flex h-full w-full flex-col border-r bg-gradient-to-b from-white to-gray-50">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-white">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-full bg-gradient-purple-pink flex items-center justify-center text-white font-bold">
            IM
          </div>
          <span className="font-bold bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">
            InfluenceMatch
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary group my-1",
                pathname === item.href
                  ? "bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple"
                  : "hover:bg-muted/50",
              )}
            >
              {item.icon}
              {item.title}
              <div
                className={cn(
                  "ml-auto h-1 w-1 rounded-full bg-brand-purple opacity-0 transition-all",
                  pathname === item.href && "opacity-100",
                )}
              ></div>
            </Link>
          ))}
          <LogoutButton className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10 mt-auto group my-1" />
        </nav>
      </div>
    </div>
  )
}
