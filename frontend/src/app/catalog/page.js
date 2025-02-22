"use client";

import { useEffect, useState } from "react";
import { Search, User, BookOpen, BookmarkIcon } from "lucide-react";
import axios from "axios";
import Navbar from "@/lib/nav";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");

  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    availability: "all",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios
        .get(`${API_URL}/api/books`)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error("Error fetching books:", error);
        });
      setBooks(response);
      console.log("Books fetched successfully:", response);
    };

    fetchBooks();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.author === "" || book.author === filters.author) &&
      (filters.availability === "all" ||
        (filters.availability === "available" && book.stock > 0) ||
        (filters.availability === "unavailable" && book.stock === 0))
    );
  });
  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Catálogo de Libros
        </h1>



        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select
            name="author"
            onChange={handleFilterChange}
            className="block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="all">Todos</option>
            <option value="available">Disponibles</option>
            <option value="unavailable">No disponibles</option>
          </select>
        </div>

        {/* Lista de libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-sm rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <img
                  src={
                    book.image ? `${API_URL}${book.image}` : "/placeholder.svg"
                  }
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p
                  className={`text-sm ${
                    book.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.stock > 0 ? "Disponible" : "No disponible"}
                </p>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right">
                <a href={`/book/${book.id}`} className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200">
                  Ver detalles
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
