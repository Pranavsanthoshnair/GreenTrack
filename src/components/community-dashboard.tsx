"use client"

import { useState, useEffect } from "react"
import {
  MapPin,
  Users,
  Calendar,
  Plus,
  Award,
  Camera,
  Filter,
  Search,
  Heart,
  MessageCircle,
  Share2,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface CommunityEvent {
  id: string
  title: string
  location: string
  date: string
  participants: number
  type: "cleanup" | "planting" | "awareness" | "recycling"
  organizer: string
  description: string
  likes: number
  comments: number
  isJoined: boolean
  isLiked: boolean
  image?: string
}

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  activities: number
  badge: string
  level: number
  streak: number
}

export function CommunityDashboard() {
  const [events, setEvents] = useState<CommunityEvent[]>([
    {
      id: "1",
      title: "Beach Cleanup Drive",
      location: "Santa Monica Beach",
      date: "2024-02-15",
      participants: 45,
      type: "cleanup",
      organizer: "Green Warriors",
      description: "Join us for a community beach cleanup to protect marine life and keep our shores pristine.",
      likes: 23,
      comments: 8,
      isJoined: false,
      isLiked: false,
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
      likes: 31,
      comments: 12,
      isJoined: true,
      isLiked: true,
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
      likes: 18,
      comments: 5,
      isJoined: false,
      isLiked: false,
    },
  ])

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { id: "1", name: "Sarah Chen", points: 2450, activities: 23, badge: "🌟", level: 12, streak: 15 },
    { id: "2", name: "Mike Johnson", points: 2180, activities: 19, badge: "🏆", level: 11, streak: 8 },
    { id: "3", name: "Emma Davis", points: 1920, activities: 17, badge: "🥉", level: 10, streak: 12 },
    { id: "4", name: "Alex Rivera", points: 1750, activities: 15, badge: "🌱", level: 9, streak: 6 },
    { id: "5", name: "Lisa Park", points: 1680, activities: 14, badge: "♻️", level: 9, streak: 10 },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    type: "cleanup" as const,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    // Load saved data
    const savedEvents = localStorage.getItem("greentrack-events")
    const savedNotifications = localStorage.getItem("greentrack-notifications")

    if (savedEvents) setEvents(JSON.parse(savedEvents))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cleanup":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planting":
        return "bg-green-100 text-green-800 border-green-200"
      case "awareness":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "recycling":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.location && newEvent.date) {
      const event: CommunityEvent = {
        id: (events.length + 1).toString(),
        ...newEvent,
        participants: 1,
        organizer: "You",
        likes: 0,
        comments: 0,
        isJoined: true,
        isLiked: false,
      }
      const updatedEvents = [event, ...events]
      setEvents(updatedEvents)
      localStorage.setItem("greentrack-events", JSON.stringify(updatedEvents))

      setNewEvent({ title: "", location: "", date: "", description: "", type: "cleanup" })
      setIsDialogOpen(false)

      // Add notification
      const newNotification = `Your event "${event.title}" has been created successfully! 🎉`
      const updatedNotifications = [newNotification, ...notifications.slice(0, 4)]
      setNotifications(updatedNotifications)
      localStorage.setItem("greentrack-notifications", JSON.stringify(updatedNotifications))
    }
  }

  const handleJoinEvent = (eventId: string) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        const newParticipants = event.isJoined ? event.participants - 1 : event.participants + 1
        const newNotification = event.isJoined
          ? `You left "${event.title}" event`
          : `You joined "${event.title}" event! 🌟`

        if (!event.isJoined) {
          const updatedNotifications = [newNotification, ...notifications.slice(0, 4)]
          setNotifications(updatedNotifications)
          localStorage.setItem("greentrack-notifications", JSON.stringify(updatedNotifications))
        }

        return {
          ...event,
          participants: newParticipants,
          isJoined: !event.isJoined,
        }
      }
      return event
    })

    setEvents(updatedEvents)
    localStorage.setItem("greentrack-events", JSON.stringify(updatedEvents))
  }

  const handleLikeEvent = (eventId: string) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        const newLikes = event.isLiked ? event.likes - 1 : event.likes + 1
        return {
          ...event,
          likes: newLikes,
          isLiked: !event.isLiked,
        }
      }
      return event
    })

    setEvents(updatedEvents)
    localStorage.setItem("greentrack-events", JSON.stringify(updatedEvents))
  }

  const handleShareEvent = async (event: CommunityEvent) => {
    const shareText = `🌍 Join me at "${event.title}"!\n\n📍 ${event.location}\n📅 ${new Date(event.date).toLocaleDateString()}\n👥 ${event.participants} people joining\n\n${event.description}\n\n#GreenTrack #CommunityAction`

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareText,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert("Event details copied to clipboard! Share it with your friends 📱")
    }
  }

  const handleCommentEvent = (eventId: string) => {
    const event = events.find((e) => e.id === eventId)
    const comment = prompt(`Add a comment to "${event?.title}":`)

    if (comment && comment.trim()) {
      const updatedEvents = events.map((e) => {
        if (e.id === eventId) {
          return { ...e, comments: e.comments + 1 }
        }
        return e
      })

      setEvents(updatedEvents)
      localStorage.setItem("greentrack-events", JSON.stringify(updatedEvents))

      alert(`Comment added: "${comment}" 💬`)
    }
  }

  const handleFollowUser = (userId: string) => {
    const user = leaderboard.find((u) => u.id === userId)
    if (user) {
      const notification = `You are now following ${user.name}! 👥`
      const updatedNotifications = [notification, ...notifications.slice(0, 4)]
      setNotifications(updatedNotifications)
      localStorage.setItem("greentrack-notifications", JSON.stringify(updatedNotifications))
      alert(`Now following ${user.name}! You'll get updates about their eco activities. 🌟`)
    }
  }

  const clearNotifications = () => {
    setNotifications([])
    localStorage.removeItem("greentrack-notifications")
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || event.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <section id="community" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Community Actions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with your community and participate in local environmental initiatives
          </p>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Bell className="h-5 w-5" />
                  Recent Activity ({notifications.length})
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={clearNotifications} className="text-blue-600">
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div
                    key={index}
                    className="text-sm text-blue-700 bg-white/50 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {notification}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Events Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <h3 className="text-2xl font-semibold text-gray-900">Upcoming Events</h3>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 transform hover:scale-105 transition-all duration-200">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
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
                    <Select
                      value={newEvent.type}
                      onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleanup">Cleanup</SelectItem>
                        <SelectItem value="planting">Tree Planting</SelectItem>
                        <SelectItem value="awareness">Awareness</SelectItem>
                        <SelectItem value="recycling">Recycling</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Event description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 transform hover:scale-105 transition-all duration-200"
                      onClick={handleCreateEvent}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="cleanup">Cleanup</SelectItem>
                  <SelectItem value="planting">Tree Planting</SelectItem>
                  <SelectItem value="awareness">Awareness</SelectItem>
                  <SelectItem value="recycling">Recycling</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                      <Badge className={`${getTypeColor(event.type)} border`}>{event.type}</Badge>
                    </div>

                    <p className="text-gray-700 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between mb-4">
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
                    </div>

                    {/* Event Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`p-2 ${event.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-500 transform hover:scale-110 transition-all duration-200`}
                          onClick={() => handleLikeEvent(event.id)}
                        >
                          <Heart className={`h-4 w-4 ${event.isLiked ? "fill-current" : ""}`} />
                          <span className="ml-1 text-sm">{event.likes}</span>
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 text-gray-500 hover:text-blue-500 transform hover:scale-110 transition-all duration-200"
                          onClick={() => handleCommentEvent(event.id)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="ml-1 text-sm">{event.comments}</span>
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 text-gray-500 hover:text-green-500 transform hover:scale-110 transition-all duration-200"
                          onClick={() => handleShareEvent(event)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant={event.isJoined ? "default" : "outline"}
                        className={`transform hover:scale-105 transition-all duration-200 ${
                          event.isJoined
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                        }`}
                        onClick={() => handleJoinEvent(event.id)}
                      >
                        {event.isJoined ? "Joined ✓" : "Join Event"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredEvents.length === 0 && (
                <Card className="bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery || filterType !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "Be the first to create an event in your community!"}
                    </p>
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500"
                    >
                      Create First Event
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Leaderboard */}
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
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : index === 1
                                ? "bg-gradient-to-r from-gray-400 to-gray-600"
                                : index === 2
                                  ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{user.name}</span>
                            <span className="text-lg">{user.badge}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>Level {user.level}</span>
                            <span>🔥 {user.streak}d</span>
                            <span>{user.activities} activities</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{user.points}</div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs p-1 h-auto text-blue-600 hover:text-blue-800"
                          onClick={() => handleFollowUser(user.id)}
                        >
                          Follow
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Community Impact
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Events</span>
                    <span className="font-bold text-2xl">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Members</span>
                    <span className="font-bold text-2xl">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Trees Planted</span>
                    <span className="font-bold text-2xl">2,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Waste Collected</span>
                    <span className="font-bold text-2xl">15.2 tons</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-green-400">
                  <div className="text-center">
                    <div className="text-sm text-green-100 mb-1">This Month's Goal</div>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="w-full bg-green-400 rounded-full h-2 mt-2">
                      <div className="bg-white rounded-full h-2 w-[85%] transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-500" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { tag: "#PlasticFree", count: 234, color: "bg-blue-100 text-blue-800" },
                    { tag: "#TreePlanting", count: 189, color: "bg-green-100 text-green-800" },
                    { tag: "#ZeroWaste", count: 156, color: "bg-purple-100 text-purple-800" },
                    { tag: "#CleanEnergy", count: 143, color: "bg-yellow-100 text-yellow-800" },
                    { tag: "#SustainableLiving", count: 128, color: "bg-pink-100 text-pink-800" },
                  ].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Badge variant="secondary" className={topic.color}>
                        {topic.tag}
                      </Badge>
                      <span className="text-sm text-gray-500">{topic.count} posts</span>
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
