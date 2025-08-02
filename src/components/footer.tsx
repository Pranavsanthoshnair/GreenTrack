"use client"

import { Leaf, Github, Twitter, Mail, Heart, ArrowUp, MessageSquare, HelpCircle, Shield, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { useState } from "react"

export function Footer() {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedback, setFeedback] = useState({ type: "general", message: "", email: "" })
  const [newsletterEmail, setNewsletterEmail] = useState("")

  const handleSocialClick = (platform: string) => {
    const urls = {
      github: "https://github.com/greentrack",
      twitter: "https://twitter.com/greentrack",
      email: "mailto:hello@greentrack.com",
    }

    if (platform === "email") {
      window.location.href = urls[platform as keyof typeof urls]
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank")
    }
  }

  const handleNewsletterSignup = () => {
    if (newsletterEmail && newsletterEmail.includes("@")) {
      alert(
        `🌱 Welcome to the GreenTrack community!\n\nThank you for subscribing with ${newsletterEmail}\n\nYou'll receive:\n• Weekly eco-tips and sustainability insights\n• New feature announcements\n• Community highlights and success stories\n• Exclusive green product recommendations\n\nFirst newsletter arriving soon! 📧`,
      )
      setNewsletterEmail("")
    } else {
      alert("Please enter a valid email address to subscribe to our newsletter.")
    }
  }

  const handleFeedback = () => {
    if (feedback.message.trim()) {
      alert(
        `📝 Feedback Submitted!\n\nType: ${feedback.type}\nMessage: ${feedback.message}\n\nThank you for helping us improve GreenTrack! We'll review your feedback and get back to you if needed. 🌟`,
      )
      setFeedback({ type: "general", message: "", email: "" })
      setFeedbackOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "privacy":
        alert(
          "🔒 Privacy Policy\n\nYour privacy is important to us. We:\n• Never sell your personal data\n• Use encryption for all data transmission\n• Allow you to delete your account anytime\n• Only collect data necessary for app functionality\n• Comply with GDPR and CCPA regulations\n\nFull privacy policy available at greentrack.com/privacy",
        )
        break
      case "terms":
        alert(
          "📜 Terms of Service\n\nBy using GreenTrack, you agree to:\n• Use the platform responsibly\n• Respect community guidelines\n• Provide accurate information\n• Not misuse our services\n\nWe provide the service 'as is' and continuously work to improve your experience.\n\nFull terms available at greentrack.com/terms",
        )
        break
      case "help":
        alert(
          "❓ Help Center\n\nNeed assistance? We're here to help!\n\n📧 Email: support@greentrack.com\n💬 Live Chat: Available 9 AM - 6 PM PST\n📚 Knowledge Base: greentrack.com/help\n🎥 Video Tutorials: Available in-app\n\nCommon topics:\n• Getting started guide\n• Habit tracking tips\n• Community features\n• Account management",
        )
        break
      case "about":
        alert(
          "🌍 About GreenTrack\n\nMission: Empowering individuals and communities to live more sustainably through technology and gamification.\n\nFounded: 2024\nTeam: Passionate environmentalists and tech enthusiasts\nUsers: 10,000+ eco-warriors worldwide\n\nWe believe small daily actions can create massive environmental impact when multiplied across communities.\n\nJoin us in building a greener future! 🌱",
        )
        break
      case "contact":
        alert(
          "📞 Contact Us\n\nWe'd love to hear from you!\n\n📧 General: hello@greentrack.com\n🛠️ Support: support@greentrack.com\n📰 Press: press@greentrack.com\n🤝 Partnerships: partners@greentrack.com\n\n📍 Address:\nGreenTrack Inc.\n123 Eco Street\nSan Francisco, CA 94102\n\n📱 Phone: +1 (555) 123-4567\nBusiness Hours: Mon-Fri 9 AM - 6 PM PST",
        )
        break
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4 group cursor-pointer" onClick={scrollToTop}>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                GreenTrack
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Building greener communities through sustainable habits and environmental awareness. Join thousands of
              eco-warriors making a difference.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 transform hover:scale-110 transition-all duration-200"
                onClick={() => handleSocialClick("github")}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 transform hover:scale-110 transition-all duration-200"
                onClick={() => handleSocialClick("twitter")}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 transform hover:scale-110 transition-all duration-200"
                onClick={() => handleSocialClick("email")}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                {
                  name: "Habit Tracker",
                  action: () => document.getElementById("habits")?.scrollIntoView({ behavior: "smooth" }),
                },
                {
                  name: "Community",
                  action: () => document.getElementById("community")?.scrollIntoView({ behavior: "smooth" }),
                },
                {
                  name: "Eco Awareness",
                  action: () => document.getElementById("awareness")?.scrollIntoView({ behavior: "smooth" }),
                },
                {
                  name: "Lifestyle Tools",
                  action: () => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" }),
                },
                { name: "About Us", action: () => handleQuickAction("about") },
                { name: "Contact", action: () => handleQuickAction("contact") },
              ].map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white p-0 h-auto font-normal text-sm justify-start transform hover:translate-x-2 transition-all duration-200"
                    onClick={link.action}
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-green-400">Resources</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Help Center", icon: HelpCircle, action: () => handleQuickAction("help") },
                { name: "Privacy Policy", icon: Shield, action: () => handleQuickAction("privacy") },
                { name: "Terms of Service", icon: FileText, action: () => handleQuickAction("terms") },
                { name: "Send Feedback", icon: MessageSquare, action: () => setFeedbackOpen(true) },
              ].map((resource, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white p-0 h-auto font-normal text-sm justify-start transform hover:translate-x-2 transition-all duration-200 flex items-center gap-2"
                    onClick={resource.action}
                  >
                    <resource.icon className="h-3 w-3" />
                    {resource.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-green-400">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly eco-tips, sustainability insights, and community updates delivered to your inbox.
            </p>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
              />
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200"
                onClick={handleNewsletterSignup}
              >
                Subscribe
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              📊 Join 5,000+ subscribers • 📧 Weekly updates • 🔒 No spam, ever
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-400">10K+</div>
              <div className="text-xs text-gray-400">Active Users</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-400">50K+</div>
              <div className="text-xs text-gray-400">Habits Tracked</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-400">2.5M</div>
              <div className="text-xs text-gray-400">CO₂ Saved (kg)</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-orange-400">500+</div>
              <div className="text-xs text-gray-400">Communities</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © 2024 GreenTrack. Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> for the planet.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white p-0 h-auto font-normal text-sm transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Send Feedback
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Feedback Type</label>
              <select
                value={feedback.type}
                onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="general">General Feedback</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="improvement">Improvement Suggestion</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Your Message</label>
              <Textarea
                placeholder="Tell us what you think..."
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email (optional)</label>
              <Input
                placeholder="your@email.com"
                type="email"
                value={feedback.email}
                onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
              />
            </div>
            <Button
              onClick={handleFeedback}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={!feedback.message.trim()}
            >
              Send Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
