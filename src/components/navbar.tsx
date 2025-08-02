"use client"

import { useState, useEffect } from "react"
import { Leaf, Menu, X, User, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState({ name: "Eco Warrior", email: "user@greentrack.com", avatar: "🌱" })

  const navItems = [
    { name: "Habits", href: "#habits" },
    { name: "Community", href: "#community" },
    { name: "Learn", href: "#awareness" },
    { name: "Tools", href: "#tools" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleGetStarted = () => {
    const habitsSection = document.getElementById("habits")
    if (habitsSection) {
      habitsSection.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const handleProfileUpdate = (newName: string, newEmail: string) => {
    setUser({ ...user, name: newName, email: newEmail })
    localStorage.setItem("greentrack-user", JSON.stringify({ ...user, name: newName, email: newEmail }))
    setIsProfileOpen(false)
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("greentrack-user")
      alert("Logged out successfully! 👋")
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-green-200 shadow-lg"
          : "bg-white/80 backdrop-blur-md border-b border-green-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg transform transition-transform group-hover:scale-110 group-hover:rotate-12">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              GreenTrack
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-all duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}

            {/* Profile Menu */}
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-green-50">
                  <span className="text-2xl">{user.avatar}</span>
                  <span className="hidden lg:block text-sm">{user.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Profile Settings</DialogTitle>
                </DialogHeader>
                <ProfileForm user={user} onUpdate={handleProfileUpdate} onLogout={handleLogout} />
              </DialogContent>
            </Dialog>

            <Button
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="transform transition-transform duration-200 hover:scale-110"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 border border-green-100 shadow-lg">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`block py-3 text-gray-700 hover:text-green-600 transition-all duration-200 transform hover:translate-x-2`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-2 py-2 border-t border-gray-200 mt-2 pt-4">
              <span className="text-2xl">{user.avatar}</span>
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
            <Button
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 transform transition-all duration-200 hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ProfileForm({
  user,
  onUpdate,
  onLogout,
}: {
  user: { name: string; email: string; avatar: string }
  onUpdate: (name: string, email: string) => void
  onLogout: () => void
}) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-6xl mb-2">{user.avatar}</div>
        <p className="text-sm text-gray-500">Your eco avatar</p>
      </div>
      <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={() => onUpdate(name, email)} className="flex-1 bg-green-500 hover:bg-green-600">
          <User className="h-4 w-4 mr-2" />
          Update Profile
        </Button>
        <Button
          variant="outline"
          onClick={onLogout}
          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
