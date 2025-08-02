"use client"

import { useState, useEffect } from "react"
import { Check, Flame, Trophy, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Habit {
  id: string
  name: string
  icon: string
  completed: boolean
  streak: number
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Used reusable bag", icon: "🛍️", completed: false, streak: 5 },
    { id: "2", name: "Walked or biked instead of driving", icon: "🚲", completed: false, streak: 3 },
    { id: "3", name: "Saved water", icon: "💧", completed: false, streak: 7 },
    { id: "4", name: "Recycled properly", icon: "♻️", completed: false, streak: 2 },
    { id: "5", name: "Used public transport", icon: "🚌", completed: false, streak: 1 },
    { id: "6", name: "Avoided single-use plastic", icon: "🥤", completed: false, streak: 4 },
  ])

  const [totalPoints, setTotalPoints] = useState(0)
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const savedHabits = localStorage.getItem("greentrack-habits")
    const savedPoints = localStorage.getItem("greentrack-points")
    const savedLevel = localStorage.getItem("greentrack-level")

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    }
    if (savedPoints) {
      setTotalPoints(Number.parseInt(savedPoints))
    }
    if (savedLevel) {
      setLevel(Number.parseInt(savedLevel))
    }
  }, [])

  const toggleHabit = (habitId: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completed
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        return { ...habit, completed: newCompleted, streak: newStreak }
      }
      return habit
    })

    setHabits(updatedHabits)

    const newPoints = updatedHabits.reduce((total, habit) => {
      return total + (habit.completed ? 10 : 0) + habit.streak * 2
    }, 0)

    setTotalPoints(newPoints)
    setLevel(Math.floor(newPoints / 100) + 1)

    localStorage.setItem("greentrack-habits", JSON.stringify(updatedHabits))
    localStorage.setItem("greentrack-points", newPoints.toString())
    localStorage.setItem("greentrack-level", Math.floor(newPoints / 100 + 1).toString())
  }

  const completedToday = habits.filter((h) => h.completed).length
  const progressPercentage = (completedToday / habits.length) * 100

  return (
    <section id="habits" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Eco Habit Tracker</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build sustainable habits and track your daily environmental impact
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Level {level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{totalPoints} Points</div>
                <Progress value={totalPoints % 100} className="bg-white/20" />
                <p className="text-sm mt-2 text-green-100">{100 - (totalPoints % 100)} points to next level</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {completedToday}/{habits.length}
                </div>
                <Progress value={progressPercentage} className="mb-2" />
                <p className="text-sm text-gray-600">{progressPercentage.toFixed(0)}% completed today</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Best Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{Math.max(...habits.map((h) => h.streak))} days</div>
                <p className="text-sm text-gray-600">Keep it up!</p>
              </CardContent>
            </Card>
          </div>

          {/* Habits Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Daily Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        habit.completed
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 bg-white hover:border-green-200"
                      }`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{habit.icon}</span>
                          <div>
                            <h3 className="font-medium text-gray-900">{habit.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Flame className="h-4 w-4 text-orange-500" />
                              <span className="text-sm text-gray-600">{habit.streak} day streak</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={habit.completed ? "default" : "outline"}
                          className={habit.completed ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {habit.completed ? <Check className="h-4 w-4" /> : "Mark Done"}
                        </Button>
                      </div>
                      {habit.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          +10 points
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
