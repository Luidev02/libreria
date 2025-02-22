"use client";

import { useEffect, useState } from "react";
import { Search, User, BookOpen, BookmarkIcon } from "lucide-react";
import axios from "axios";
import Buscador from "@/lib/search";
import Navbar from "@/lib/nav";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios
        .get(`${apiUrl}/api/books`)
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Área de búsqueda */}
        <Buscador />

        {/* Sección de novedades */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Novedades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-4">
                  <div className="flex items-center justify-center h-48 bg-gray-200">
                    <img
                      src={`${apiUrl}${book.image}`}
                      className="h-[100%] w-[100%] object-cover rounded-md shadow-md"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {book.title}
                  </h3>
                  <span>{book.author}</span>
                  <p className="mt-1 text-sm text-gray-500">
                    {book.description}
                  </p>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right">
                  <a
                    href={"/book/" + book.id}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                  >
                    Ver detalles
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
