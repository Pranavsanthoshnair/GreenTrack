"use client"

import { useState } from "react"
import { Lightbulb, BookOpen, Award, RefreshCw, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EcoTip {
  id: string
  title: string
  description: string
  category: "energy" | "water" | "waste" | "transport"
  impact: "low" | "medium" | "high"
  icon: string
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export function EcoAwareness() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const ecoTips: EcoTip[] = [
    {
      id: "1",
      title: "LED Light Bulbs",
      description:
        "Switching to LED bulbs can reduce energy consumption by up to 80% and last 25 times longer than traditional incandescent bulbs.",
      category: "energy",
      impact: "high",
      icon: "💡",
    },
    {
      id: "2",
      title: "Water-Saving Showerheads",
      description: "Low-flow showerheads can save up to 2,900 gallons of water per year for a family of four.",
      category: "water",
      impact: "medium",
      icon: "🚿",
    },
    {
      id: "3",
      title: "Composting at Home",
      description: "Composting food scraps can reduce household waste by 30% and create nutrient-rich soil for plants.",
      category: "waste",
      impact: "medium",
      icon: "🌱",
    },
    {
      id: "4",
      title: "Bike to Work",
      description: "Cycling just 10 miles each week can save 500 pounds of CO2 emissions per year.",
      category: "transport",
      impact: "high",
      icon: "🚲",
    },
    {
      id: "5",
      title: "Reusable Water Bottles",
      description: "Using a reusable water bottle can prevent 1,460 plastic bottles from entering landfills annually.",
      category: "waste",
      impact: "medium",
      icon: "🍶",
    },
    {
      id: "6",
      title: "Smart Thermostats",
      description:
        "Smart thermostats can reduce heating and cooling costs by 10-15% through optimized temperature control.",
      category: "energy",
      impact: "high",
      icon: "🌡️",
    },
  ]

  const quizQuestions: QuizQuestion[] = [
    {
      id: "1",
      question: "How much water can a dripping faucet waste per year?",
      options: ["100 gallons", "1,000 gallons", "3,000 gallons", "5,000 gallons"],
      correct: 2,
      explanation: "A single dripping faucet can waste over 3,000 gallons of water per year!",
    },
    {
      id: "2",
      question: "What percentage of plastic bottles are actually recycled?",
      options: ["90%", "70%", "50%", "30%"],
      correct: 3,
      explanation:
        "Only about 30% of plastic bottles are recycled, highlighting the importance of reducing single-use plastics.",
    },
    {
      id: "3",
      question: "How much CO2 can one tree absorb per year?",
      options: ["10 lbs", "25 lbs", "48 lbs", "100 lbs"],
      correct: 2,
      explanation:
        "A mature tree can absorb approximately 48 pounds of CO2 per year and produce enough oxygen for two people.",
    },
  ]

  const funFacts = [
    "🌍 If everyone in the US used energy-efficient appliances, we could prevent 175 million tons of CO2 emissions annually",
    "♻️ Recycling one aluminum can saves enough energy to power a TV for 3 hours",
    "🌳 A single tree can provide a day's supply of oxygen for up to two people",
    "💧 Taking a 5-minute shower uses 10-25 gallons of water, while a bath uses 70 gallons",
    "🚗 Walking or biking for short trips can reduce your carbon footprint by 2.6 pounds of CO2 per mile",
  ]

  const [currentFact, setCurrentFact] = useState(0)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "energy":
        return "bg-yellow-100 text-yellow-800"
      case "water":
        return "bg-blue-100 text-blue-800"
      case "waste":
        return "bg-green-100 text-green-800"
      case "transport":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setQuizScore(quizScore + 1)
    }
    setShowQuizResult(true)
  }

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
      setSelectedAnswer(null)
      setShowQuizResult(false)
    } else {
      // Quiz completed
      setCurrentQuiz(0)
      setSelectedAnswer(null)
      setShowQuizResult(false)
      setQuizScore(0)
    }
  }

  return (
    <section id="awareness" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Eco Awareness Hub</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn, discover, and test your knowledge about environmental sustainability
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Tips */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Eco Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {ecoTips.map((tip) => (
                <div
                  key={tip.id}
                  className="relative h-48 cursor-pointer"
                  onClick={() => setFlippedCard(flippedCard === tip.id ? null : tip.id)}
                >
                  <div
                    className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                      flippedCard === tip.id ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of card */}
                    <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-green-300 transition-colors">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                        <span className="text-4xl mb-3">{tip.icon}</span>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h4>
                        <div className="flex gap-2">
                          <Badge className={getCategoryColor(tip.category)}>{tip.category}</Badge>
                          <Badge className={getImpactColor(tip.impact)}>{tip.impact} impact</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Click to learn more</p>
                      </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
                      <CardContent className="p-6 flex flex-col justify-center h-full">
                        <p className="text-gray-700 text-sm leading-relaxed">{tip.description}</p>
                        <Button size="sm" className="mt-4 bg-green-500 hover:bg-green-600">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Try This Tip
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
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Eco Quiz
                </CardTitle>
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
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-4">{quizQuestions[currentQuiz].question}</h4>

                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto p-3 bg-transparent"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div
                      className={`text-4xl mb-3 ${selectedAnswer === quizQuestions[currentQuiz].correct ? "🎉" : "🤔"}`}
                    >
                      {selectedAnswer === quizQuestions[currentQuiz].correct ? "🎉" : "🤔"}
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {selectedAnswer === quizQuestions[currentQuiz].correct ? "Correct!" : "Not quite!"}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">{quizQuestions[currentQuiz].explanation}</p>
                    <Button onClick={nextQuestion} className="w-full">
                      {currentQuiz < quizQuestions.length - 1 ? "Next Question" : "Restart Quiz"}
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
                <p className="text-sm leading-relaxed mb-4">{funFacts[currentFact]}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentFact((currentFact + 1) % funFacts.length)}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Next Fact
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
