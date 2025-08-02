"use client"

import { useState, useEffect } from "react"
import { Lightbulb, BookOpen, Award, RefreshCw, ChevronRight, Star, Clock, TrendingUp, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"

interface EcoTip {
  id: string
  title: string
  description: string
  category: "energy" | "water" | "waste" | "transport"
  impact: "low" | "medium" | "high"
  icon: string
  difficulty: "beginner" | "intermediate" | "advanced"
  timeToImplement: string
  carbonSaving: string
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  category: string
}

interface UserProgress {
  quizzesTaken: number
  correctAnswers: number
  tipsImplemented: string[]
  streak: number
  level: number
}

export function EcoAwareness() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    quizzesTaken: 0,
    correctAnswers: 0,
    tipsImplemented: [],
    streak: 0,
    level: 1,
  })

  const ecoTips: EcoTip[] = [
    {
      id: "1",
      title: "LED Light Bulbs",
      description:
        "Switching to LED bulbs can reduce energy consumption by up to 80% and last 25 times longer than traditional incandescent bulbs. They also produce less heat, reducing cooling costs.",
      category: "energy",
      impact: "high",
      icon: "💡",
      difficulty: "beginner",
      timeToImplement: "5 minutes",
      carbonSaving: "50kg CO₂/year",
    },
    {
      id: "2",
      title: "Water-Saving Showerheads",
      description:
        "Low-flow showerheads can save up to 2,900 gallons of water per year for a family of four while maintaining excellent water pressure through innovative design.",
      category: "water",
      impact: "medium",
      icon: "🚿",
      difficulty: "beginner",
      timeToImplement: "15 minutes",
      carbonSaving: "25kg CO₂/year",
    },
    {
      id: "3",
      title: "Composting at Home",
      description:
        "Composting food scraps can reduce household waste by 30% and create nutrient-rich soil for plants. It also reduces methane emissions from landfills.",
      category: "waste",
      impact: "medium",
      icon: "🌱",
      difficulty: "intermediate",
      timeToImplement: "30 minutes setup",
      carbonSaving: "75kg CO₂/year",
    },
    {
      id: "4",
      title: "Bike to Work",
      description:
        "Cycling just 10 miles each week can save 500 pounds of CO2 emissions per year. It also improves your health and saves money on fuel and parking.",
      category: "transport",
      impact: "high",
      icon: "🚲",
      difficulty: "intermediate",
      timeToImplement: "Plan your route",
      carbonSaving: "230kg CO₂/year",
    },
    {
      id: "5",
      title: "Reusable Water Bottles",
      description:
        "Using a reusable water bottle can prevent 1,460 plastic bottles from entering landfills annually. Choose stainless steel or glass for best results.",
      category: "waste",
      impact: "medium",
      icon: "🍶",
      difficulty: "beginner",
      timeToImplement: "Immediate",
      carbonSaving: "15kg CO₂/year",
    },
    {
      id: "6",
      title: "Smart Thermostats",
      description:
        "Smart thermostats can reduce heating and cooling costs by 10-15% through optimized temperature control and learning your schedule patterns.",
      category: "energy",
      impact: "high",
      icon: "🌡️",
      difficulty: "advanced",
      timeToImplement: "1-2 hours",
      carbonSaving: "180kg CO₂/year",
    },
  ]

  const quizQuestions: QuizQuestion[] = [
    {
      id: "1",
      question: "How much water can a dripping faucet waste per year?",
      options: ["100 gallons", "1,000 gallons", "3,000 gallons", "5,000 gallons"],
      correct: 2,
      explanation:
        "A single dripping faucet can waste over 3,000 gallons of water per year! That's enough water for 180 showers.",
      difficulty: "easy",
      category: "water",
    },
    {
      id: "2",
      question: "What percentage of plastic bottles are actually recycled globally?",
      options: ["90%", "70%", "50%", "30%"],
      correct: 3,
      explanation:
        "Only about 30% of plastic bottles are recycled globally, highlighting the importance of reducing single-use plastics and improving recycling systems.",
      difficulty: "medium",
      category: "waste",
    },
    {
      id: "3",
      question: "How much CO2 can one mature tree absorb per year?",
      options: ["10 lbs", "25 lbs", "48 lbs", "100 lbs"],
      correct: 2,
      explanation:
        "A mature tree can absorb approximately 48 pounds of CO2 per year and produce enough oxygen for two people daily.",
      difficulty: "medium",
      category: "energy",
    },
    {
      id: "4",
      question: "Which transportation method has the lowest carbon footprint per mile?",
      options: ["Electric car", "Bus", "Bicycle", "Train"],
      correct: 2,
      explanation:
        "Bicycles have virtually zero carbon emissions per mile, making them the most environmentally friendly transportation option.",
      difficulty: "easy",
      category: "transport",
    },
    {
      id: "5",
      question: "How much energy can proper home insulation save?",
      options: ["5-10%", "15-20%", "25-30%", "40-50%"],
      correct: 3,
      explanation:
        "Proper home insulation can reduce energy consumption by 40-50%, significantly lowering both costs and carbon emissions.",
      difficulty: "hard",
      category: "energy",
    },
  ]

  const funFacts = [
    "🌍 If everyone in the US used energy-efficient appliances, we could prevent 175 million tons of CO2 emissions annually",
    "♻️ Recycling one aluminum can saves enough energy to power a TV for 3 hours",
    "🌳 A single tree can provide a day's supply of oxygen for up to two people",
    "💧 Taking a 5-minute shower uses 10-25 gallons of water, while a bath uses 70 gallons",
    "🚗 Walking or biking for short trips can reduce your carbon footprint by 2.6 pounds of CO2 per mile",
    "🏠 Buildings consume 40% of global energy and produce 36% of CO2 emissions",
    "🌊 The ocean absorbs about 30% of human-produced CO2, helping to regulate climate",
    "⚡ Solar panels can generate electricity for 25-30 years with minimal maintenance",
  ]

  const [currentFact, setCurrentFact] = useState(0)

  useEffect(() => {
    const savedProgress = localStorage.getItem("greentrack-eco-progress")
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  const saveProgress = (progress: UserProgress) => {
    setUserProgress(progress)
    localStorage.setItem("greentrack-eco-progress", JSON.stringify(progress))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "energy":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "water":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "waste":
        return "bg-green-100 text-green-800 border-green-200"
      case "transport":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === quizQuestions[currentQuiz].correct

    if (isCorrect) {
      setQuizScore(quizScore + 1)
    }

    setShowQuizResult(true)

    // Update progress
    const newProgress = {
      ...userProgress,
      quizzesTaken: userProgress.quizzesTaken + 1,
      correctAnswers: userProgress.correctAnswers + (isCorrect ? 1 : 0),
      streak: isCorrect ? userProgress.streak + 1 : 0,
      level: Math.floor((userProgress.correctAnswers + (isCorrect ? 1 : 0)) / 5) + 1,
    }
    saveProgress(newProgress)
  }

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
      setSelectedAnswer(null)
      setShowQuizResult(false)
    } else {
      // Quiz completed
      const finalScore = quizScore + (selectedAnswer === quizQuestions[currentQuiz].correct ? 1 : 0)
      const percentage = (finalScore / quizQuestions.length) * 100

      let message = `🎉 Quiz Complete!\n\nScore: ${finalScore}/${quizQuestions.length} (${percentage.toFixed(0)}%)\n\n`

      if (percentage >= 80) {
        message += "🌟 Excellent! You're an eco-expert!"
      } else if (percentage >= 60) {
        message += "👍 Good job! Keep learning!"
      } else {
        message += "📚 Keep studying to become an eco-warrior!"
      }

      alert(message)

      setCurrentQuiz(0)
      setSelectedAnswer(null)
      setShowQuizResult(false)
      setQuizScore(0)
    }
  }

  const handleTryTip = (tip: EcoTip) => {
    if (!userProgress.tipsImplemented.includes(tip.id)) {
      const newProgress = {
        ...userProgress,
        tipsImplemented: [...userProgress.tipsImplemented, tip.id],
      }
      saveProgress(newProgress)

      alert(
        `🌱 Great choice! "${tip.title}" has been added to your implemented tips.\n\n💡 Estimated savings: ${tip.carbonSaving}\n⏱️ Implementation time: ${tip.timeToImplement}\n\nCheck your habit tracker for related habits!`,
      )
    } else {
      alert(`✅ You've already implemented "${tip.title}"!\n\nKeep up the great work! 🌟`)
    }
    setFlippedCard(null)
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setQuizScore(0)
    setSelectedAnswer(null)
    setShowQuizResult(false)
  }

  const shareKnowledge = async () => {
    const accuracy =
      userProgress.quizzesTaken > 0 ? ((userProgress.correctAnswers / userProgress.quizzesTaken) * 100).toFixed(0) : 0
    const shareText = `🧠 Expanding my eco-knowledge with GreenTrack!\n\n📊 Quiz Stats:\n• Level ${userProgress.level} Eco-Learner\n• ${accuracy}% accuracy rate\n• ${userProgress.tipsImplemented.length} tips implemented\n• ${userProgress.streak} question streak\n\nJoin me in learning about sustainability! #GreenTrack #EcoEducation`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Eco-Learning Progress",
          text: shareText,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert("Learning progress copied to clipboard! Share your eco-knowledge 🧠")
    }
  }

  return (
    <section id="awareness" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Eco Awareness Hub</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn, discover, and test your knowledge about environmental sustainability
          </p>
        </div>

        {/* User Progress Dashboard */}
        <Card className="mb-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{userProgress.level}</div>
                <div className="text-sm text-purple-100">Eco Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userProgress.quizzesTaken}</div>
                <div className="text-sm text-purple-100">Quizzes Taken</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userProgress.tipsImplemented.length}</div>
                <div className="text-sm text-purple-100">Tips Implemented</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userProgress.streak}</div>
                <div className="text-sm text-purple-100">Current Streak</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                variant="secondary"
                onClick={shareKnowledge}
                className="transform hover:scale-105 transition-all duration-200"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Tips */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Interactive Eco Tips</h3>
              <Badge variant="outline" className="text-sm">
                {userProgress.tipsImplemented.length}/{ecoTips.length} implemented
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {ecoTips.map((tip) => (
                <div
                  key={tip.id}
                  className="relative h-64 cursor-pointer group"
                  onClick={() => setFlippedCard(flippedCard === tip.id ? null : tip.id)}
                >
                  <div
                    className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                      flippedCard === tip.id ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-green-300 transition-all duration-300 transform group-hover:scale-105">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative mb-3">
                          <span className="text-4xl">{tip.icon}</span>
                          {userProgress.tipsImplemented.includes(tip.id) && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h4>
                        <div className="flex flex-wrap gap-2 justify-center mb-2">
                          <Badge className={getCategoryColor(tip.category)} variant="outline">
                            {tip.category}
                          </Badge>
                          <Badge className={getImpactColor(tip.impact)} variant="outline">
                            {tip.impact} impact
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tip.timeToImplement}
                          </div>
                          <Badge className={getDifficultyColor(tip.difficulty)} variant="outline">
                            {tip.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">Click to learn more</p>
                      </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
                      <CardContent className="p-6 flex flex-col justify-center h-full">
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">{tip.description}</p>
                        <div className="bg-white/80 rounded-lg p-3 mb-4">
                          <div className="text-xs text-gray-600 mb-1">Potential CO₂ savings:</div>
                          <div className="font-bold text-green-600">{tip.carbonSaving}</div>
                        </div>
                        <Button
                          size="sm"
                          className={`transform hover:scale-105 transition-all duration-200 ${
                            userProgress.tipsImplemented.includes(tip.id)
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTryTip(tip)
                          }}
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          {userProgress.tipsImplemented.includes(tip.id) ? "Implemented ✓" : "Try This Tip"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz and Fun Facts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quiz Section */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Eco Quiz
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetQuiz} className="text-xs">
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!showQuizResult ? (
                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>
                          Question {currentQuiz + 1} of {quizQuestions.length}
                        </span>
                        <span>
                          Score: {quizScore}/{currentQuiz}
                        </span>
                      </div>
                      <Progress value={((currentQuiz + 1) / quizQuestions.length) * 100} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{quizQuestions[currentQuiz].category}</span>
                        <Badge className={getDifficultyColor(quizQuestions[currentQuiz].difficulty)} variant="outline">
                          {quizQuestions[currentQuiz].difficulty}
                        </Badge>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-4">{quizQuestions[currentQuiz].question}</h4>

                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto p-3 bg-transparent hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <span className="mr-3 font-bold text-blue-600">{String.fromCharCode(65 + index)}</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-3">
                      {selectedAnswer === quizQuestions[currentQuiz].correct ? "🎉" : "🤔"}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2 text-lg">
                      {selectedAnswer === quizQuestions[currentQuiz].correct ? "Correct!" : "Not quite!"}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                    </div>
                    {selectedAnswer === quizQuestions[currentQuiz].correct && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-center gap-2 text-green-700">
                          <Star className="h-4 w-4" />
                          <span className="text-sm font-medium">+10 XP earned!</span>
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={nextQuestion}
                      className="w-full transform hover:scale-105 transition-all duration-200"
                    >
                      {currentQuiz < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fun Facts */}
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Did You Know?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🌍</div>
                  <p className="text-sm leading-relaxed">{funFacts[currentFact]}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentFact((currentFact + 1) % funFacts.length)}
                    className="transform hover:scale-105 transition-all duration-200"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Next Fact
                  </Button>
                  <div className="text-xs text-purple-200">
                    {currentFact + 1}/{funFacts.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{userProgress.streak}</div>
                  <p className="text-sm text-gray-600 mb-4">
                    {userProgress.streak === 0
                      ? "Start your learning streak!"
                      : `${userProgress.streak} correct answers in a row!`}
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(Math.min(userProgress.streak, 10))].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    ))}
                    {userProgress.streak > 10 && (
                      <span className="text-xs text-orange-500 ml-2">+{userProgress.streak - 10}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
