"use client"

import { useState, useEffect } from "react"
import {
  Calculator,
  Search,
  Bell,
  Leaf,
  Car,
  Home,
  Utensils,
  ShoppingBag,
  Download,
  Share2,
  Target,
  TrendingUp,
  Zap,
  Heart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Slider } from "./ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface EcoProduct {
  id: string
  name: string
  category: string
  rating: number
  price: string
  description: string
  ecoScore: number
  image: string
  reviews: number
  inStock: boolean
  discount?: number
  features: string[]
}

interface CarbonData {
  transport: number[]
  energy: number[]
  food: number[]
  waste: number[]
}

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  difficulty: "easy" | "medium" | "hard"
  category: string
  potentialSaving: string
}

export function LifestyleTools() {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    transport: [20],
    energy: [150],
    food: [50],
    waste: [10],
  })

  const [greenScore, setGreenScore] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [favorites, setFavorites] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [showCalculatorHistory, setShowCalculatorHistory] = useState(false)
  const [calculationHistory, setCalculationHistory] = useState<
    Array<{ date: string; footprint: number; score: number }>
  >([])

  const ecoProducts: EcoProduct[] = [
    {
      id: "1",
      name: "Bamboo Toothbrush Set",
      category: "personal-care",
      rating: 4.8,
      price: "$12.99",
      description: "Biodegradable bamboo toothbrushes with soft bristles",
      ecoScore: 95,
      image: "🦷",
      reviews: 1247,
      inStock: true,
      features: ["Biodegradable", "Soft bristles", "Ergonomic handle", "4-pack"],
    },
    {
      id: "2",
      name: "Solar Power Bank",
      category: "electronics",
      rating: 4.6,
      price: "$39.99",
      description: "Portable solar charger with 20,000mAh capacity",
      ecoScore: 88,
      image: "🔋",
      reviews: 892,
      inStock: true,
      discount: 15,
      features: ["20,000mAh", "Solar charging", "Waterproof", "Fast charging"],
    },
    {
      id: "3",
      name: "Reusable Food Wraps",
      category: "kitchen",
      rating: 4.7,
      price: "$24.99",
      description: "Beeswax wraps to replace plastic wrap",
      ecoScore: 92,
      image: "🍯",
      reviews: 634,
      inStock: true,
      features: ["Beeswax coating", "Various sizes", "Washable", "1-year lifespan"],
    },
    {
      id: "4",
      name: "Organic Cotton Tote Bag",
      category: "accessories",
      rating: 4.9,
      price: "$18.99",
      description: "Durable organic cotton shopping bag",
      ecoScore: 90,
      image: "👜",
      reviews: 2156,
      inStock: true,
      features: ["Organic cotton", "Heavy duty", "Machine washable", "Large capacity"],
    },
    {
      id: "5",
      name: "LED Smart Bulbs",
      category: "home",
      rating: 4.5,
      price: "$29.99",
      description: "Energy-efficient smart LED bulbs with app control",
      ecoScore: 85,
      image: "💡",
      reviews: 1543,
      inStock: false,
      features: ["Smart control", "80% energy saving", "25-year lifespan", "Color changing"],
    },
    {
      id: "6",
      name: "Stainless Steel Water Bottle",
      category: "accessories",
      rating: 4.8,
      price: "$22.99",
      description: "Insulated stainless steel bottle keeps drinks cold/hot",
      ecoScore: 93,
      image: "🍶",
      reviews: 3421,
      inStock: true,
      discount: 20,
      features: ["Double insulation", "24h cold/12h hot", "BPA-free", "Leak-proof"],
    },
  ]

  useEffect(() => {
    loadSavedData()
    generateRecommendations()
  }, [carbonData])

  const loadSavedData = () => {
    const savedFavorites = localStorage.getItem("greentrack-favorites")
    const savedHistory = localStorage.getItem("greentrack-calculator-history")

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedHistory) setCalculationHistory(JSON.parse(savedHistory))
  }

  const generateRecommendations = () => {
    const recs: Recommendation[] = []

    if (carbonData.transport[0] > 50) {
      recs.push({
        id: "transport-1",
        title: "Consider Public Transportation",
        description: "Reduce your weekly driving by using public transport 2-3 times per week",
        impact: "high",
        difficulty: "easy",
        category: "transport",
        potentialSaving: "120kg CO₂/year",
      })
    }

    if (carbonData.energy[0] > 200) {
      recs.push({
        id: "energy-1",
        title: "Upgrade to LED Lighting",
        description: "Replace incandescent bulbs with LED alternatives throughout your home",
        impact: "medium",
        difficulty: "easy",
        category: "energy",
        potentialSaving: "85kg CO₂/year",
      })
    }

    if (carbonData.food[0] > 10) {
      recs.push({
        id: "food-1",
        title: "Try Meatless Mondays",
        description: "Reduce meat consumption by having one plant-based day per week",
        impact: "medium",
        difficulty: "easy",
        category: "food",
        potentialSaving: "65kg CO₂/year",
      })
    }

    if (carbonData.waste[0] > 20) {
      recs.push({
        id: "waste-1",
        title: "Start Composting",
        description: "Compost organic waste to reduce landfill contributions",
        impact: "high",
        difficulty: "medium",
        category: "waste",
        potentialSaving: "95kg CO₂/year",
      })
    }

    setRecommendations(recs)
  }

  const calculateCarbonFootprint = () => {
    const transport = carbonData.transport[0] * 0.4 // kg CO2 per mile
    const energy = carbonData.energy[0] * 0.5 // kg CO2 per kWh
    const food = carbonData.food[0] * 2.5 // kg CO2 per meal
    const waste = carbonData.waste[0] * 0.3 // kg CO2 per kg waste

    return (transport + energy + food + waste).toFixed(1)
  }

  const calculateGreenScore = () => {
    const transportScore = Math.max(0, 100 - carbonData.transport[0] * 2)
    const energyScore = Math.max(0, 100 - carbonData.energy[0] * 0.3)
    const foodScore = Math.max(0, 100 - carbonData.food[0] * 1.5)
    const wasteScore = Math.max(0, 100 - carbonData.waste[0] * 5)

    const score = Math.round((transportScore + energyScore + foodScore + wasteScore) / 4)
    setGreenScore(score)

    // Save to history
    const newEntry = {
      date: new Date().toLocaleDateString(),
      footprint: Number.parseFloat(calculateCarbonFootprint()),
      score,
    }

    const updatedHistory = [newEntry, ...calculationHistory.slice(0, 9)]
    setCalculationHistory(updatedHistory)
    localStorage.setItem("greentrack-calculator-history", JSON.stringify(updatedHistory))

    return score
  }

  const filteredProducts = ecoProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-20" && Number.parseFloat(product.price.replace("$", "")) < 20) ||
        (priceRange === "20-50" &&
          Number.parseFloat(product.price.replace("$", "")) >= 20 &&
          Number.parseFloat(product.price.replace("$", "")) <= 50) ||
        (priceRange === "over-50" && Number.parseFloat(product.price.replace("$", "")) > 50)

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number.parseFloat(a.price.replace("$", "")) - Number.parseFloat(b.price.replace("$", ""))
        case "price-high":
          return Number.parseFloat(b.price.replace("$", "")) - Number.parseFloat(a.price.replace("$", ""))
        case "rating":
          return b.rating - a.rating
        case "eco-score":
          return b.ecoScore - a.ecoScore
        default:
          return 0
      }
    })

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
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

  const handleViewProduct = (product: EcoProduct) => {
    const discountText = product.discount ? `\n🏷️ ${product.discount}% OFF - Limited time!` : ""
    const stockText = product.inStock ? "✅ In Stock" : "❌ Out of Stock"

    alert(
      `🛍️ ${product.name}\n\n💰 ${product.price}${discountText}\n⭐ ${product.rating}/5 (${product.reviews} reviews)\n🌱 Eco Score: ${product.ecoScore}/100\n📦 ${stockText}\n\n📝 ${product.description}\n\n✨ Features:\n${product.features.map((f) => `• ${f}`).join("\n")}\n\nThis would typically open a detailed product page with purchase options.`,
    )
  }

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId]

    setFavorites(newFavorites)
    localStorage.setItem("greentrack-favorites", JSON.stringify(newFavorites))
  }

  const handleSetReminders = () => {
    const reminderTypes = [
      "Daily eco-habit reminders",
      "Weekly carbon footprint check",
      "Monthly sustainability tips",
      "Product recommendations",
      "Community event notifications",
    ]

    const selectedReminders = reminderTypes.filter(() => Math.random() > 0.5)

    if (selectedReminders.length === 0) {
      selectedReminders.push(reminderTypes[0])
    }

    alert(
      `🔔 Reminders Set Successfully!\n\nYou'll receive:\n${selectedReminders.map((r) => `• ${r}`).join("\n")}\n\nReminders will be sent via:\n• Browser notifications\n• Email (if enabled)\n• In-app notifications\n\nYou can manage these in your profile settings.`,
    )
  }

  const shareCalculation = async () => {
    const footprint = calculateCarbonFootprint()
    const shareText = `🌍 My Carbon Footprint Analysis\n\n📊 Weekly CO₂: ${footprint}kg\n🌱 Green Score: ${greenScore}/100\n\nBreakdown:\n🚗 Transport: ${carbonData.transport[0]} miles\n⚡ Energy: ${carbonData.energy[0]} kWh\n🍽️ Food: ${carbonData.food[0]} meat meals\n🗑️ Waste: ${carbonData.waste[0]}kg\n\nCalculate yours with GreenTrack! #CarbonFootprint #Sustainability`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Carbon Footprint",
          text: shareText,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert("Carbon footprint data copied to clipboard! 📋")
    }
  }

  const exportData = () => {
    const data = {
      carbonFootprint: calculateCarbonFootprint(),
      greenScore,
      breakdown: {
        transport: carbonData.transport[0],
        energy: carbonData.energy[0],
        food: carbonData.food[0],
        waste: carbonData.waste[0],
      },
      recommendations,
      calculationHistory,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `greentrack-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sustainable Lifestyle Tools</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your impact, discover eco-friendly products, and get personalized recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Carbon Footprint Calculator */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Carbon Footprint Calculator
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowCalculatorHistory(true)}>
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={shareCalculation}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={exportData}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Car className="h-4 w-4" />
                  Weekly driving miles: {carbonData.transport[0]}
                </label>
                <Slider
                  value={carbonData.transport}
                  onValueChange={(value) => setCarbonData({ ...carbonData, transport: value })}
                  max={200}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>100</span>
                  <span>200+</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Home className="h-4 w-4" />
                  Monthly energy usage (kWh): {carbonData.energy[0]}
                </label>
                <Slider
                  value={carbonData.energy}
                  onValueChange={(value) => setCarbonData({ ...carbonData, energy: value })}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>250</span>
                  <span>500+</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Utensils className="h-4 w-4" />
                  Weekly meat meals: {carbonData.food[0]}
                </label>
                <Slider
                  value={carbonData.food}
                  onValueChange={(value) => setCarbonData({ ...carbonData, food: value })}
                  max={21}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>10</span>
                  <span>21</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <ShoppingBag className="h-4 w-4" />
                  Weekly waste (kg): {carbonData.waste[0]}
                </label>
                <Slider
                  value={carbonData.waste}
                  onValueChange={(value) => setCarbonData({ ...carbonData, waste: value })}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>25</span>
                  <span>50+</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{calculateCarbonFootprint()} kg CO₂</div>
                  <div className="text-sm text-gray-600 mb-2">per week</div>
                  <div className="text-xs text-gray-500">
                    Annual estimate: {(Number.parseFloat(calculateCarbonFootprint()) * 52).toFixed(0)} kg CO₂
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Green Score Calculator */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Green Score Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-3xl font-bold border-4 transition-all duration-500 ${getScoreColor(greenScore)} ${greenScore > 0 ? "animate-pulse" : ""}`}
                >
                  {greenScore}
                </div>
                <p className="text-sm text-gray-600 mt-2">Your Green Score</p>
                {greenScore > 0 && (
                  <div className="mt-2">
                    <Badge
                      className={getScoreColor(greenScore).replace("bg-", "border-").replace("text-", "text-")}
                      variant="outline"
                    >
                      {greenScore >= 80 ? "Excellent!" : greenScore >= 60 ? "Good!" : "Needs Improvement"}
                    </Badge>
                  </div>
                )}
              </div>

              <Button
                onClick={calculateGreenScore}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200"
              >
                <Zap className="h-4 w-4 mr-2" />
                Calculate My Score
              </Button>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Transport Impact</span>
                  <Badge
                    variant="outline"
                    className={
                      carbonData.transport[0] < 30 ? "border-green-300 text-green-700" : "border-red-300 text-red-700"
                    }
                  >
                    {carbonData.transport[0] < 30 ? "Good" : "High"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Energy Usage</span>
                  <Badge
                    variant="outline"
                    className={
                      carbonData.energy[0] < 200 ? "border-green-300 text-green-700" : "border-red-300 text-red-700"
                    }
                  >
                    {carbonData.energy[0] < 200 ? "Efficient" : "High"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Diet Impact</span>
                  <Badge
                    variant="outline"
                    className={
                      carbonData.food[0] < 10 ? "border-green-300 text-green-700" : "border-red-300 text-red-700"
                    }
                  >
                    {carbonData.food[0] < 10 ? "Plant-based" : "Meat-heavy"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Waste Generation</span>
                  <Badge
                    variant="outline"
                    className={
                      carbonData.waste[0] < 15 ? "border-green-300 text-green-700" : "border-red-300 text-red-700"
                    }
                  >
                    {carbonData.waste[0] < 15 ? "Minimal" : "High"}
                  </Badge>
                </div>
              </div>

              {/* Personalized Recommendations */}
              {recommendations.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Personalized Recommendations
                  </h4>
                  <div className="space-y-2">
                    {recommendations.slice(0, 2).map((rec) => (
                      <div key={rec.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h5 className="text-sm font-medium text-gray-900">{rec.title}</h5>
                          <Badge className={getImpactColor(rec.impact)} variant="outline">
                            {rec.impact}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-green-600 font-medium">{rec.potentialSaving}</span>
                          <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Calculator History Dialog */}
        <Dialog open={showCalculatorHistory} onOpenChange={setShowCalculatorHistory}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Calculation History</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {calculationHistory.length > 0 ? (
                calculationHistory.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">{entry.date}</div>
                      <div className="text-xs text-gray-600">{entry.footprint}kg CO₂</div>
                    </div>
                    <Badge className={getScoreColor(entry.score)} variant="outline">
                      {entry.score}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No calculations yet</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Eco Product Finder */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Eco-Friendly Product Finder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="personal-care">Personal Care</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-20">Under $20</SelectItem>
                  <SelectItem value="20-50">$20 - $50</SelectItem>
                  <SelectItem value="over-50">Over $50</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="eco-score">Eco Score</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Favorites Section */}
            {favorites.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Your Favorites ({favorites.length})
                </h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {ecoProducts
                    .filter((p) => favorites.includes(p.id))
                    .map((product) => (
                      <div key={product.id} className="flex-shrink-0 w-32 bg-gray-50 rounded-lg p-2 text-center">
                        <div className="text-2xl mb-1">{product.image}</div>
                        <div className="text-xs font-medium truncate">{product.name}</div>
                        <div className="text-xs text-gray-600">{product.price}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                >
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                      -{product.discount}%
                    </div>
                  )}

                  <CardContent className="p-4">
                    <div className="text-center mb-3 relative">
                      <span className="text-4xl">{product.image}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute top-0 right-0 p-1 ${favorites.includes(product.id) ? "text-red-500" : "text-gray-400"} hover:text-red-500 transform hover:scale-110 transition-all duration-200`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">{product.price}</span>
                        {product.discount && (
                          <span className="text-xs text-gray-500 line-through">
                            $
                            {(Number.parseFloat(product.price.replace("$", "")) / (1 - product.discount / 100)).toFixed(
                              2,
                            )}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${getScoreColor(product.ecoScore)} border-0`}>
                        Eco Score: {product.ecoScore}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={product.inStock ? "border-green-300 text-green-700" : "border-red-300 text-red-700"}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-600 mb-1">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {product.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{product.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full transform hover:scale-105 transition-all duration-200"
                      variant={product.inStock ? "default" : "secondary"}
                      disabled={!product.inStock}
                      onClick={() => handleViewProduct(product)}
                    >
                      {product.inStock ? "View Details" : "Notify When Available"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all categories</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setPriceRange("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Reminder Banner */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 animate-pulse" />
                <div>
                  <h4 className="font-semibold">Daily Green Reminder</h4>
                  <p className="text-green-100">Stay on track with personalized eco-friendly reminders and tips!</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSetReminders}
                  className="transform hover:scale-105 transition-all duration-200"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() =>
                    alert(
                      "🔔 Reminder Settings\n\nCustomize your notification preferences:\n• Frequency: Daily, Weekly, Monthly\n• Time: Morning, Afternoon, Evening\n• Types: Habits, Tips, Products, Events\n\nFull settings panel coming soon!",
                    )
                  }
                >
                  Customize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
