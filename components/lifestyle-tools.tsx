"use client"

import { useState } from "react"
import { Calculator, Search, Bell, Leaf, Car, Home, Utensils, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EcoProduct {
  id: string
  name: string
  category: string
  rating: number
  price: string
  description: string
  ecoScore: number
  image: string
}

export function LifestyleTools() {
  const [carbonData, setCarbonData] = useState({
    transport: [20],
    energy: [150],
    food: [50],
    waste: [10],
  })

  const [greenScore, setGreenScore] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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
    },
  ]

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
    return score
  }

  const filteredProducts = ecoProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
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
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Carbon Footprint Calculator
              </CardTitle>
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
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{calculateCarbonFootprint()} kg CO₂</div>
                  <div className="text-sm text-gray-600">per week</div>
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
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold ${getScoreColor(greenScore)}`}
                >
                  {greenScore}
                </div>
                <p className="text-sm text-gray-600 mt-2">Your Green Score</p>
              </div>

              <Button
                onClick={calculateGreenScore}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
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
            </CardContent>
          </Card>
        </div>

        {/* Eco Product Finder */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              Eco-Friendly Product Finder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search eco-friendly products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
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
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <span className="text-4xl">{product.image}</span>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-green-600">{product.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={`${getScoreColor(product.ecoScore)} border-0`}>
                        Eco Score: {product.ecoScore}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        View Product
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Reminder Banner */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6" />
                <div>
                  <h4 className="font-semibold">Daily Green Reminder</h4>
                  <p className="text-green-100">Remember to bring your reusable water bottle today!</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Set Reminders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
