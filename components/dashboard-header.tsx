import type React from "react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-2 py-6 mb-6 border-b animate-fade-in">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      <div className="mt-4 md:mt-0 animate-slide-up">{children}</div>
    </div>
  )
}
