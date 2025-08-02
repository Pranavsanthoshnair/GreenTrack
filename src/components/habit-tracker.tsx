"use client"

import { useState, useEffect } from "react"
import { Check, Flame, Trophy, TrendingUp, Plus, RotateCcw, Share2, Calendar, Target, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Habit {
  id: string
  name: string
  icon: string
  completed: boolean
  streak: number
  category: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  progress: number
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Used reusable bag",
      icon: "🛍️",
      completed: false,
      streak: 5,
      category: "waste",
      difficulty: "easy",
      points: 10,
    },
    {
      id: "2",
      name: "Walked or biked instead of driving",
      icon: "🚲",
      completed: false,
      streak: 3,
      category: "transport",
      difficulty: "medium",
      points: 15,
    },
    {
      id: "3",
      name: "Saved water",
      icon: "💧",
      completed: false,
      streak: 7,
      category: "water",
      difficulty: "easy",
      points: 10,
    },
    {
      id: "4",
      name: "Recycled properly",
      icon: "♻️",
      completed: false,
      streak: 2,
      category: "waste",
      difficulty: "easy",
      points: 10,
    },
    {
      id: "5",
      name: "Used public transport",
      icon: "🚌",
      completed: false,
      streak: 1,
      category: "transport",
      difficulty: "medium",
      points: 15,
    },
    {
      id: "6",
      name: "Avoided single-use plastic",
      icon: "🥤",
      completed: false,
      streak: 4,
      category: "waste",
      difficulty: "hard",
      points: 20,
    },
  ])

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first habit",
      icon: "🌱",
      unlocked: false,
      requirement: 1,
      progress: 0,
    },
    {
      id: "2",
      title: "Streak Master",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlocked: false,
      requirement: 7,
      progress: 0,
    },
    {
      id: "3",
      title: "Eco Warrior",
      description: "Earn 500 points",
      icon: "⚔️",
      unlocked: false,
      requirement: 500,
      progress: 0,
    },
    {
      id: "4",
      title: "Community Leader",
      description: "Complete 100 habits",
      icon: "👑",
      unlocked: false,
      requirement: 100,
      progress: 0,
    },
  ])

  const [totalPoints, setTotalPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    icon: "🌱",
    category: "general",
    difficulty: "easy" as const,
  })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [weeklyGoal, setWeeklyGoal] = useState(21) // 3 habits per day * 7 days
  const [isAnimating, setIsAnimating] = useState<string | null>(null)

  const habitIcons = ["🌱", "♻️", "💧", "🚲", "🌍", "🌳", "☀️", "🍃", "🌿", "🌾", "🔋", "🏠", "🚌", "🥬", "🌸"]
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "energy", label: "Energy" },
    { value: "water", label: "Water" },
    { value: "waste", label: "Waste" },
    { value: "transport", label: "Transport" },
    { value: "food", label: "Food" },
    { value: "general", label: "General" },
  ]

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    updateAchievements()
  }, [habits, totalPoints])

  const loadData = () => {
    const savedHabits = localStorage.getItem("greentrack-habits")
    const savedPoints = localStorage.getItem("greentrack-points")
    const savedLevel = localStorage.getItem("greentrack-level")
    const savedAchievements = localStorage.getItem("greentrack-achievements")

    if (savedHabits) setHabits(JSON.parse(savedHabits))
    if (savedPoints) setTotalPoints(Number.parseInt(savedPoints))
    if (savedLevel) setLevel(Number.parseInt(savedLevel))
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
  }

  const saveData = (updatedHabits: Habit[], points: number, newLevel: number) => {
    localStorage.setItem("greentrack-habits", JSON.stringify(updatedHabits))
    localStorage.setItem("greentrack-points", points.toString())
    localStorage.setItem("greentrack-level", newLevel.toString())
  }

  const updateAchievements = () => {
    const completedHabits = habits.filter((h) => h.completed).length
    const maxStreak = Math.max(...habits.map((h) => h.streak), 0)
    const totalCompleted = habits.reduce((sum, h) => sum + (h.completed ? 1 : 0), 0)

    const updatedAchievements = achievements.map((achievement) => {
      let progress = 0
      switch (achievement.id) {
        case "1":
          progress = completedHabits
          break
        case "2":
          progress = maxStreak
          break
        case "3":
          progress = totalPoints
          break
        case "4":
          progress = totalCompleted
          break
      }

      return {
        ...achievement,
        progress,
        unlocked: progress >= achievement.requirement,
      }
    })

    setAchievements(updatedAchievements)
    localStorage.setItem("greentrack-achievements", JSON.stringify(updatedAchievements))
  }

  const toggleHabit = (habitId: string) => {
    setIsAnimating(habitId)
    setTimeout(() => setIsAnimating(null), 600)

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
      return total + (habit.completed ? habit.points : 0) + habit.streak * 2
    }, 0)

    const newLevel = Math.floor(newPoints / 100) + 1
    setTotalPoints(newPoints)
    setLevel(newLevel)

    saveData(updatedHabits, newPoints, newLevel)

    // Show achievement notification
    if (updatedHabits.find((h) => h.id === habitId)?.completed) {
      setTimeout(() => {
        const newAchievement = achievements.find((a) => !a.unlocked && a.progress + 1 >= a.requirement)
        if (newAchievement) {
          alert(
            `🎉 Achievement Unlocked!\n\n${newAchievement.icon} ${newAchievement.title}\n${newAchievement.description}`,
          )
        }
      }, 1000)
    }
  }

  const addNewHabit = () => {
    if (newHabit.name.trim()) {
      const points = newHabit.difficulty === "easy" ? 10 : newHabit.difficulty === "medium" ? 15 : 20
      const habit: Habit = {
        id: (habits.length + 1).toString(),
        name: newHabit.name,
        icon: newHabit.icon,
        category: newHabit.category,
        difficulty: newHabit.difficulty,
        points,
        completed: false,
        streak: 0,
      }
      const updatedHabits = [...habits, habit]
      setHabits(updatedHabits)
      localStorage.setItem("greentrack-habits", JSON.stringify(updatedHabits))
      setNewHabit({ name: "", icon: "🌱", category: "general", difficulty: "easy" })
      setIsAddHabitOpen(false)
    }
  }

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset all progress? This action cannot be undone.")) {
      const resetHabits = habits.map((habit) => ({ ...habit, completed: false, streak: 0 }))
      const resetAchievements = achievements.map((a) => ({ ...a, unlocked: false, progress: 0 }))
      setHabits(resetHabits)
      setAchievements(resetAchievements)
      setTotalPoints(0)
      setLevel(1)
      saveData(resetHabits, 0, 1)
      localStorage.setItem("greentrack-achievements", JSON.stringify(resetAchievements))
    }
  }

  const shareProgress = async () => {
    const completedToday = habits.filter((h) => h.completed).length
    const shareText = `🌱 Making a difference with GreenTrack!\n\n✅ ${completedToday}/${habits.length} eco-habits completed today\n🏆 Level ${level} (${totalPoints} points)\n🔥 Best streak: ${Math.max(...habits.map((h) => h.streak))} days\n\nJoin me in building a greener future! #GreenTrack #EcoFriendly`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My GreenTrack Progress",
          text: shareText,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert("Progress copied to clipboard! Share it on your social media 📱")
    }
  }

  const setWeeklyGoalHandler = () => {
    const goal = prompt("Set your weekly habit goal (number of habits to complete):", weeklyGoal.toString())
    if (goal && !isNaN(Number(goal))) {
      setWeeklyGoal(Number(goal))
      localStorage.setItem("greentrack-weekly-goal", goal)
    }
  }

  const filteredHabits = selectedCategory === "all" ? habits : habits.filter((h) => h.category === selectedCategory)

  const completedToday = habits.filter((h) => h.completed).length
  const progressPercentage = (completedToday / habits.length) * 100
  const weeklyProgress = (completedToday / weeklyGoal) * 100

  return (
    <section id="habits" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Eco Habit Tracker</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build sustainable habits and track your daily environmental impact
          </p>
        </div>

        {/* Filter and Goal Setting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={setWeeklyGoalHandler} className="flex items-center gap-2 bg-transparent">
            <Target className="h-4 w-4" />
            Weekly Goal: {weeklyGoal}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Level Card */}
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white transform hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 animate-pulse" />
                  Level {level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{totalPoints} Points</div>
                <Progress value={totalPoints % 100} className="bg-white/20 mb-2" />
                <p className="text-sm text-green-100 mb-3">{100 - (totalPoints % 100)} points to next level</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full transform hover:scale-105 transition-all duration-200"
                  onClick={shareProgress}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Progress
                </Button>
              </CardContent>
            </Card>

            {/* Daily Progress */}
            <Card className="bg-white/60 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
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

            {/* Weekly Goal */}
            <Card className="bg-white/60 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {completedToday}/{weeklyGoal}
                </div>
                <Progress value={Math.min(weeklyProgress, 100)} className="mb-2" />
                <p className="text-sm text-gray-600">{Math.min(weeklyProgress, 100).toFixed(0)}% of weekly goal</p>
              </CardContent>
            </Card>

            {/* Best Streak */}
            <Card className="bg-white/60 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Best Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{Math.max(...habits.map((h) => h.streak))} days</div>
                <p className="text-sm text-gray-600 mb-3">Keep it up!</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent hover:bg-red-50 border-red-200 text-red-600"
                  onClick={resetProgress}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Progress
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Habits Grid */}
          <div className="lg:col-span-3">
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Daily Habits ({filteredHabits.length})
                  </CardTitle>
                  <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="transform hover:scale-105 transition-all duration-200 bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Habit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Habit</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Habit name (e.g., Use renewable energy)"
                          value={newHabit.name}
                          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                        />

                        <Select
                          value={newHabit.category}
                          onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={newHabit.difficulty}
                          onValueChange={(value: "easy" | "medium" | "hard") =>
                            setNewHabit({ ...newHabit, difficulty: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy (10 points)</SelectItem>
                            <SelectItem value="medium">Medium (15 points)</SelectItem>
                            <SelectItem value="hard">Hard (20 points)</SelectItem>
                          </SelectContent>
                        </Select>

                        <div>
                          <p className="text-sm font-medium mb-2">Choose an icon:</p>
                          <div className="grid grid-cols-5 gap-2">
                            {habitIcons.map((icon) => (
                              <Button
                                key={icon}
                                variant={newHabit.icon === icon ? "default" : "outline"}
                                size="sm"
                                className="transform hover:scale-110 transition-all duration-200"
                                onClick={() => setNewHabit({ ...newHabit, icon })}
                              >
                                {icon}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={addNewHabit}
                          className="w-full transform hover:scale-105 transition-all duration-200"
                        >
                          Add Habit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        habit.completed
                          ? "border-green-300 bg-green-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-green-200 hover:shadow-md"
                      } ${isAnimating === habit.id ? "animate-pulse scale-110" : ""}`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-2xl transition-transform duration-300 ${habit.completed ? "animate-bounce" : ""}`}
                          >
                            {habit.icon}
                          </span>
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
                          className={`transform transition-all duration-200 hover:scale-110 ${
                            habit.completed ? "bg-green-500 hover:bg-green-600" : ""
                          }`}
                        >
                          {habit.completed ? <Check className="h-4 w-4" /> : "Mark Done"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {habit.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 animate-pulse">
                            +{habit.points} points
                          </Badge>
                        )}
                        <div className="flex gap-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              habit.difficulty === "easy"
                                ? "border-green-300 text-green-700"
                                : habit.difficulty === "medium"
                                  ? "border-yellow-300 text-yellow-700"
                                  : "border-red-300 text-red-700"
                            }`}
                          >
                            {habit.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                            {habit.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/60 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        achievement.unlocked ? "border-yellow-300 bg-yellow-50 shadow-lg" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-2xl ${achievement.unlocked ? "animate-bounce" : "grayscale"}`}>
                          {achievement.icon}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress value={(achievement.progress / achievement.requirement) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.progress}/{achievement.requirement}
                        </p>
                      </div>
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
