"use client";

import { useState, useEffect } from "react";
import { Book, BookOpen, Calendar, Clock, User } from "lucide-react";

// Simulamos un hook de autenticación
const useAuth = () => {
  // En una aplicación real, esto vendría de tu sistema de autenticación
  return {
    user: { name: "Usuario Ejemplo", id: "123" },
    isAuthenticated: true,
  };
};

export default function LoanHistory() {
  const { user, isAuthenticated } = useAuth();
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una llamada a la API para obtener los préstamos del usuario
    const fetchLoans = async () => {
      // En una aplicación real, esto sería una llamada a tu API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay de red

      const mockLoans = [
        {
          id: 1,
          bookTitle: "1984",
          loanDate: "2023-05-01",
          status: "active",
          dueDate: "2023-06-01",
        },
        {
          id: 2,
          bookTitle: "Cien años de soledad",
          loanDate: "2023-04-15",
          status: "overdue",
          dueDate: "2023-05-15",
        },
        {
          id: 3,
          bookTitle: "El principito",
          loanDate: "2023-03-01",
          status: "returned",
          returnDate: "2023-03-15",
        },
        {
          id: 4,
          bookTitle: "Orgullo y prejuicio",
          loanDate: "2023-02-15",
          status: "returned",
          returnDate: "2023-03-01",
        },
      ];

      setLoans(mockLoans);
      setIsLoading(false);
    };

    if (isAuthenticated) {
      fetchLoans();
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800">
            Por favor, inicia sesión para ver tu historial de préstamos.
          </p>
        </div>
      </div>
    );
  }

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
                            {loan.bookTitle}
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
                            loan.status === "overdue") && (
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <p className="text-sm text-gray-600">
                                Fecha de vencimiento: {loan.dueDate}
                              </p>
                            </div>
                          )}
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
