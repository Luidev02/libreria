"use client"

import { useState, useEffect } from "react"
import { User, Mail, Lock, CheckCircle, AlertCircle, BookOpen } from "lucide-react"

// Simulamos un hook de autenticación

export default function UserProfile() {

  const [name, setName] = useState( "")
  const [email, setEmail] = useState( "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState("")
  const [isSendingVerification, setIsSendingVerification] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault()
   
  }

  const handleVerifyEmail = async () => {
    setIsSendingVerification(true)
    try {
      await sendVerificationEmail()
      setUpdateMessage("Correo de verificación enviado")
    } catch (error) {
      setUpdateMessage("Error al enviar el correo de verificación")
    } finally {
      setIsSendingVerification(false)
    }
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
                className=" border-transparent text-gray-500  hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Perfil de Usuario</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Actualiza tu información personal</p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            <div className="col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="tu@ejemplo.com"
                />
              </div>
            </div>

            <div className="col-span-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nueva Contraseña (dejar en blanco para no cambiar)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Nueva contraseña"
                />
              </div>
            </div>

            <div className="col-span-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Nueva Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Confirmar nueva contraseña"
                />
              </div>
            </div>
          </div>

          {updateMessage && (
            <div
              className={`mt-4 p-4 rounded-md ${updateMessage.includes("Error") ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}
            >
              <p className="text-sm">{updateMessage}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="submit"
              disabled={isUpdating}
              className={`${
                isUpdating ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isUpdating ? "Actualizando..." : "Actualizar Perfil"}
            </button>


          </div>
        </form>
        <div className="px-4 py-4 sm:px-6 bg-gray-50">
          <div className="flex items-center">
            {/* {[user].isEmailVerified ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <p className="text-sm text-green-600">Email verificado</p>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-600">Email no verificado</p>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

