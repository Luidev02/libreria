"use client"
import BookManagement from "@/lib/admin/BookManagement"
import Dashboard from "@/lib/admin/dashboard"
import LoanManagement from "@/lib/admin/LoanManagement"
import Settings from "@/lib/admin/Settings"
import UserManagement from "@/lib/admin/UserManagement"
import { BookOpen } from "lucide-react"
import { useState } from "react"


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "books", label: "Books" },
    { id: "loans", label: "Loans" },
    { id: "users", label: "Users" },
    { id: "chat", label: "Chat" },
    { id: "settings", label: "Settings" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "books":
        return <BookManagement />
      case "loans":
        return <LoanManagement />
      case "users":
        return <UserManagement />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
            <div className="flex-shrink-0 flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  LibroDigital
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{renderContent()}</main>
    </div>
  )
}

