"use client";

import { useState, useEffect } from "react";
import { Book, BookOpen, Calendar, Clock, User } from "lucide-react";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanHistory() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
       await axios
        .get(`${API_URL}/api/loan`, {
          headers: {
            Authorization: `${window.localStorage.getItem("Authorization")}`,
          },
        })
        .then((response) => {
          setLoans(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.localStorage.removeItem("Authorization");
            window.location.href = "/login";
          }
        });

   
    };
    fetchLoans();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "overdue":
        return "text-red-600 bg-red-100";
      case "returned":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Activo";
      case "overdue":
        return "Vencido";
      case "returned":
        return "Devuelto";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
                  className="border-transparent  text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
                  className=" border-indigo-500  text-gray-900   inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Historial de Préstamos
          </h1>

          {loans.length === 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <p className="text-gray-700">
                No tienes préstamos activos ni historial de préstamos.
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {loans.map((loan) => (
                  <li key={loan.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Book className="h-6 w-6 text-indigo-600 mr-3" />
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            {loan.Book.title } + {loan.Book.author  }
                          </h2>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <p className="text-sm text-gray-600">
                              Prestado el: {loan.loanDate}
                            </p>
                          </div>
                          {loan.status === "returned" && (
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <p className="text-sm text-gray-600">
                                Devuelto el: {loan.returnDate}
                              </p>
                            </div>
                          )}
                          {(loan.status === "active" ||
                            loan.status === "overdue") }
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                          loan.status
                        )}`}
                      >
                        {getStatusText(loan.status)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
