"use client"

import { useState } from "react"
import { MapPin, Users, Calendar, Plus, Award, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CommunityEvent {
  id: string
  title: string
  location: string
  date: string
  participants: number
  type: "cleanup" | "planting" | "awareness" | "recycling"
  organizer: string
  description: string
}

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  activities: number
  badge: string
}

export function CommunityDashboard() {
  const [events] = useState<CommunityEvent[]>([
    {
      id: "1",
      title: "Beach Cleanup Drive",
      location: "Santa Monica Beach",
      date: "2024-02-15",
      participants: 45,
      type: "cleanup",
      organizer: "Green Warriors",
      description: "Join us for a community beach cleanup to protect marine life and keep our shores pristine.",
    },
    {
      id: "2",
      title: "Tree Planting Initiative",
      location: "Central Park",
      date: "2024-02-18",
      participants: 32,
      type: "planting",
      organizer: "EcoFriends",
      description: "Help us plant native trees to improve air quality and create green spaces for our community.",
    },
    {
      id: "3",
      title: "Recycling Workshop",
      location: "Community Center",
      date: "2024-02-20",
      participants: 28,
      type: "recycling",
      organizer: "Sustainable Living",
      description: "Learn proper recycling techniques and creative upcycling ideas for everyday items.",
    },
  ])

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { id: "1", name: "Sarah Chen", points: 2450, activities: 23, badge: "🌟" },
    { id: "2", name: "Mike Johnson", points: 2180, activities: 19, badge: "🏆" },
    { id: "3", name: "Emma Davis", points: 1920, activities: 17, badge: "🥉" },
    { id: "4", name: "Alex Rivera", points: 1750, activities: 15, badge: "🌱" },
    { id: "5", name: "Lisa Park", points: 1680, activities: 14, badge: "♻️" },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    type: "cleanup" as const,
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cleanup":
        return "bg-blue-100 text-blue-800"
      case "planting":
        return "bg-green-100 text-green-800"
      case "awareness":
        return "bg-purple-100 text-purple-800"
      case "recycling":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cleanup":
        return "🧹"
      case "planting":
        return "🌱"
      case "awareness":
        return "📢"
      case "recycling":
        return "♻️"
      default:
        return "🌍"
    }
  }

  return (
    <section id="community" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Community Actions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with your community and participate in local environmental initiatives
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Events Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900">Upcoming Events</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <Input
                      placeholder="Location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <Textarea
                      placeholder="Event description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                      <Camera className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getTypeIcon(event.type)}</span>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">by {event.organizer}</p>
                        </div>
                      </div>
                      <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                    </div>

                    <p className="text-gray-700 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.participants} joined
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Community Leaders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{user.name}</span>
                            <span className="text-lg">{user.badge}</span>
                          </div>
                          <p className="text-sm text-gray-600">{user.activities} activities</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{user.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white mt-6">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Community Impact</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Events</span>
                    <span className="font-bold">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Members</span>
                    <span className="font-bold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trees Planted</span>
                    <span className="font-bold">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waste Collected</span>
                    <span className="font-bold">15.2 tons</span>
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
