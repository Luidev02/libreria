"use client"

import { useState, useEffect, useRef } from "react"
import { BookOpen, User } from "lucide-react"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const menuRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("Authorization")
    setIsAuthenticated(!!token)

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleUserClick = () => {
    if (isAuthenticated) {
      setIsMenuOpen(!isMenuOpen)
    } else {
      router.push("/login")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("Authorization")
    setIsAuthenticated(false)
    setIsMenuOpen(false)
    router.push("/login")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">LibroDigital</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inicio
              </a>
              <a
                href="/catalog"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Catálogo
              </a>
              <a
                href="/user/loans"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Préstamos
              </a>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleUserClick}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <User className="h-6 w-6" />
            </button>

            {isAuthenticated && isMenuOpen && (
              <div className="absolute right-0 top-5 w-48 bg-white border rounded-lg shadow-lg py-2 z-[9999]">
                <a href="/messages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Mensajes
                </a>
                <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Perfil
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

