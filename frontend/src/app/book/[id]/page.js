"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, Tag, User } from "lucide-react";
import axios from "axios";


export default function BookDetail({ params }) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [slug, setSlug] = useState(null);
  const [book , setBook] = useState({});
  useEffect(() => {
    const intento = async () => {
      const resolvedParams = await params;
      if (resolvedParams && resolvedParams.id) {
        const response = await axios
        .get(`http://localhost:3000/api/books/${resolvedParams.id}`)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error("Error fetching books:", error);
        });
        console.log("Books fetched successfully:", response);
        setBook(response)
      }
    };

    intento(); 
  }, [params]);



  const handleLoanRequest = () => {
    setIsRequesting(true);
    // Aquí iría la lógica para solicitar el préstamo
    setTimeout(() => {
      setIsRequesting(false);
      alert("Préstamo solicitado con éxito");
    }, 1000);
  };

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={"http://localhost:3000"+book.image || "http://localhost:3000/api/image/image.jpg"}
              alt={book.title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {book.title}
            </div>
            <h1 className="mt-1 text-4xl font-bold text-gray-900 leading-tight">
              {book.title}
            </h1>
            <p className="mt-2 text-gray-600">{book.author}</p>

            <div className="mt-4 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">
                Publicado en {book.createdAt}
              </span>
            </div>

            <div className="mt-2 flex items-center">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">ISBN: {book.id}</span>
            </div>

            <div className="mt-4">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  book.stock <= 0? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                }`}
              >
                {book.stock} {book.stock < 1? "No Disponible" : "Disponible" }
              </span>
            </div>

            <p className="mt-4 text-gray-700">{book.description}</p>

            {/* {isAuthenticated && book.available && (
              <div className="mt-6">
                <button
                  onClick={handleLoanRequest}
                  disabled={isRequesting}
                  className={`${
                    isRequesting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
                >
                  {isRequesting ? "Solicitando..." : "Solicitar préstamo"}
                </button>
              </div>
            )}

            {!isAuthenticated && (
              <div className="mt-6">
                <p className="text-sm text-gray-600">Inicia sesión para solicitar un préstamo.</p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
