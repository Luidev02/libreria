"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"

const ChatPage = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Administrador", lastMessage: "Hola, ¿en qué puedo ayudarte?", timestamp: "10:30 AM" },
    { id: 2, name: "Soporte Técnico", lastMessage: "Tu problema ha sido resuelto.", timestamp: "Ayer" },
  ])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (selectedConversation) {
      // Aquí cargarías los mensajes reales de la conversación seleccionada
      setMessages([
        { id: 1, sender: "admin", text: "Hola, ¿en qué puedo ayudarte?", timestamp: "10:30 AM" },
        { id: 2, sender: "user", text: "Hola, tengo una pregunta sobre un libro.", timestamp: "10:31 AM" },
      ])
    }
  }, [selectedConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "user", text: newMessage, timestamp: new Date().toLocaleTimeString() },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Lista de conversaciones */}
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Conversaciones</h2>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedConversation === conv.id ? "bg-indigo-50" : ""}`}
            onClick={() => setSelectedConversation(conv.id)}
          >
            <h3 className="font-medium">{conv.name}</h3>
            <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
            <span className="text-xs text-gray-400">{conv.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Área de chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-50">{message.timestamp}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="border-t p-4 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Selecciona una conversación para comenzar</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage

