"use client";

import { useEffect, useState } from "react";
import { Search, User, BookOpen, BookmarkIcon } from "lucide-react";
import axios from "axios";

export default function Catalog() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState({
      genre: "",
      author: "",
      availability: "all",
    })
  
    // Datos de ejemplo para los libros
    const books = [
      {
        id: 1,
        title: "1984",
        author: "George Orwell",
        genre: "Ciencia ficción",
        available: true,
        cover: "/placeholder.svg",
      },
      {
        id: 2,
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        genre: "Realismo mágico",
        available: false,
        cover: "/placeholder.svg",
      },
      {
        id: 3,
        title: "El principito",
        author: "Antoine de Saint-Exupéry",
        genre: "Fábula",
        available: true,
        cover: "/placeholder.svg",
      },
      {
        id: 4,
        title: "Orgullo y prejuicio",
        author: "Jane Austen",
        genre: "Novela romántica",
        available: true,
        cover: "/placeholder.svg",
      },
      {
        id: 5,
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes",
        genre: "Novela",
        available: false,
        cover: "/placeholder.svg",
      },
      {
        id: 6,
        title: "Harry Potter y la piedra filosofal",
        author: "J.K. Rowling",
        genre: "Fantasía",
        available: true,
        cover: "/placeholder.svg",
      },
    ]
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value)
    }
  
    const handleFilterChange = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      })
    }
  
    const filteredBooks = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filters.genre === "" || book.genre === filters.genre) &&
        (filters.author === "" || book.author === filters.author) &&
        (filters.availability === "all" ||
          (filters.availability === "available" && book.available) ||
          (filters.availability === "unavailable" && !book.available))
      )
    })
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
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
              <a
                href="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inicio
              </a>
              <a
                href="/catalog"
                className=" border-indigo-500 text-gray-900   inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Catálogo de Libros</h1>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              placeholder="Buscar libros..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select
            name="genre"
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos los géneros</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Realismo mágico">Realismo mágico</option>
            <option value="Fábula">Fábula</option>
            <option value="Novela romántica">Novela romántica</option>
            <option value="Novela">Novela</option>
            <option value="Fantasía">Fantasía</option>
          </select>

          <select
            name="author"
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Todos los autores</option>
            {[...new Set(books.map((book) => book.author))].map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          <select
            name="availability"
            onChange={handleFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">Todos</option>
            <option value="available">Disponibles</option>
            <option value="unavailable">No disponibles</option>
          </select>
        </div>

        {/* Lista de libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-4">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-sm text-gray-500">{book.genre}</p>
                <p className={`text-sm ${book.available ? "text-green-600" : "text-red-600"}`}>
                  {book.available ? "Disponible" : "No disponible"}
                </p>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right">
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      </main>
    </div>
  );
}
