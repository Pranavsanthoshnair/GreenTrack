"use client"

import { ArrowRight, Sparkles, Users, Target, Play, Download } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useState, useEffect } from "react"

export function Hero() {
  const [currentStat, setCurrentStat] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    { number: "10,000+", label: "Active Users", icon: "👥" },
    { number: "50,000+", label: "Habits Tracked", icon: "✅" },
    { number: "2.5M", label: "CO₂ Saved (kg)", icon: "🌍" },
    { number: "500+", label: "Communities", icon: "🏘️" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    const habitsSection = document.getElementById("habits")
    if (habitsSection) {
      habitsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLearnMore = () => {
    const awarenessSection = document.getElementById("awareness")
    if (awarenessSection) {
      awarenessSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleWatchDemo = () => {
    alert(
      "🎥 Demo Video\n\nWatch how GreenTrack helps you:\n• Track daily eco-habits\n• Connect with green communities\n• Reduce your carbon footprint\n• Make a real environmental impact\n\nFull video coming soon!",
    )
  }

  const handleDownloadApp = () => {
    alert(
      "📱 Mobile App Coming Soon!\n\nGet notified when our mobile app launches:\n• iOS App Store\n• Google Play Store\n• Progressive Web App\n\nStay tuned for the mobile experience!",
    )
  }

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Animated Badge */}
          <Button
            variant="secondary"
            size="sm"
            className={`inline-flex items-center mb-6 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
            Join the Green Revolution
          </Button>

          {/* Main Heading */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Build{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x">
              Greener Communities
            </span>
            <br />
            One Habit at a Time
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Track your eco-friendly habits, connect with your community, and make a real impact on environmental
            sustainability through our gamified platform.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transform transition-all duration-1000 delay-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg px-8 py-4"
              onClick={handleGetStarted}
            >
              Start Your Green Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 bg-white/80 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-green-700 hover:bg-green-50 transform transition-all duration-300 hover:scale-105"
              onClick={handleWatchDemo}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Animated Stats */}
          <div
            className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-green-100 shadow-lg transform transition-all duration-1000 delay-800 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2 animate-bounce">{stats[currentStat].icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats[currentStat].number}</div>
              <div className="text-sm text-gray-600">{stats[currentStat].label}</div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {stats.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStat ? "bg-green-500 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Track Habits",
              description:
                "Monitor your daily eco-friendly actions and build sustainable habits with our gamified tracking system.",
              color: "green",
              delay: "delay-1000",
            },
            {
              icon: Users,
              title: "Join Community",
              description: "Connect with like-minded individuals and participate in local environmental initiatives.",
              color: "blue",
              delay: "delay-1200",
            },
            {
              icon: Sparkles,
              title: "Make Impact",
              description: "See your real environmental impact and contribute to a cleaner, greener future for all.",
              color: "emerald",
              delay: "delay-1400",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`p-6 bg-white/60 backdrop-blur-sm border-${feature.color}-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer group ${feature.delay} ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              onClick={() => {
                const sections = ["habits", "community", "tools"]
                document.getElementById(sections[index])?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <div
                className={`bg-${feature.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Download CTA */}
        <div
          className={`text-center mt-16 transform transition-all duration-1000 delay-1600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Button
            variant="outline"
            size="lg"
            className="border-green-200 text-green-700 hover:bg-green-50 bg-white/80 backdrop-blur-sm"
            onClick={handleDownloadApp}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Mobile App
          </Button>
        </div>
      </div>
    </section>
  )
}
