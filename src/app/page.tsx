"use client"

import { useState, useEffect } from "react"
import { Navbar } from "../components/navbar"
import { Hero } from "../components/hero"
import { HabitTracker } from "../components/habit-tracker"
import { CommunityDashboard } from "../components/community-dashboard"
import { EcoAwareness } from "../components/eco-awareness"
import { LifestyleTools } from "../components/lifestyle-tools"
import { Footer } from "../components/footer"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Navbar />
      <Hero />
      <HabitTracker />
      <CommunityDashboard />
      <EcoAwareness />
      <LifestyleTools />
      <Footer />
    </div>
  )
}
