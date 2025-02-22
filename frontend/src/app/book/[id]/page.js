"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, Tag, User } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "@/lib/nav";

export default function BookDetail({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isRequesting, setIsRequesting] = useState(false);
  const [book, setBook] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const intento = async () => {
      const resolvedParams = await params;
      if (resolvedParams && resolvedParams.id) {
        const response = await axios
          .get(`${apiUrl}/api/books/${resolvedParams.id}`)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.error("Error fetching books:", error);
          });
        console.log("Books fetched successfully:", response);
        setBook(response);
      }
      setToken(localStorage.getItem("Authorization"));
    };

    intento();
  }, [params]);

  const handleLoanRequest = async () => {
    setIsRequesting(true);

    await axios.post(
      `${apiUrl}/api/loan/new/user`,
      { bookId: book.id },
      { headers: { Authorization: `${token}` } }
    )
      .then(function (response) {
        setIsRequesting(false);
        toast.success("Préstamo solicitado exitosamente!");
      })
      .catch(function (error) {
        setIsRequesting(false);
        toast.error("Hubo un error al solicitar el préstamo.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-full w-full object-cover md:h-[100%]  md:w-80 rounded-md shadow-md"
                src={
                  book.image
                    ? `${apiUrl}${book.image}`
                    : `${apiUrl}/api/image/image.jpg`
                }
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
                  Publicado en {book.publicationDate}
                </span>
              </div>

              <div className="mt-2 flex items-center">
                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">ISBN: {book.isbn}</span>
              </div>

              <div className="mt-4">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    book.stock <= 0
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {book.stock} {book.stock < 1 ? "No Disponible" : "Disponible"}
                </span>
              </div>
              <span className="mt-4 text-black">Resumen:</span>
              <p className="mt-2 text-gray-700">{book.description}</p>
              <span className="mt-4 text-black">sipnosis:</span>
              <p className="mt-2 text-gray-700">{book.synopsis}</p>
              {book.stock > 0 && (
                <div className="mt-6">
                  <button
                    onClick={handleLoanRequest}
                    disabled={isRequesting}
                    className={`${
                      isRequesting
                        ? "bg-indigo-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
                  >
                    {isRequesting ? "Solicitando..." : "Solicitar préstamo"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
