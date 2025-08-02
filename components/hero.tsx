import { ArrowRight, Sparkles, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Join the Green Revolution
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Greener Communities
            </span>
            <br />
            One Habit at a Time
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Track your eco-friendly habits, connect with your community, and make a real impact on environmental
            sustainability through our gamified platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Start Your Green Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white/60 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Habits</h3>
            <p className="text-gray-600">
              Monitor your daily eco-friendly actions and build sustainable habits with our gamified tracking system.
            </p>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Join Community</h3>
            <p className="text-gray-600">
              Connect with like-minded individuals and participate in local environmental initiatives.
            </p>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Make Impact</h3>
            <p className="text-gray-600">
              See your real environmental impact and contribute to a cleaner, greener future for all.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
