"use client"

import { useState, useEffect, useRef } from "react"

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id)
    }
  }, [selectedUser])

  useEffect(() => {
    scrollToBottom()
  }, [])

  const fetchUsers = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }

  const fetchMessages = (userId) => {
    fetch(`/api/messages/${userId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() && selectedUser) {
      const message = {
        id: Date.now(),
        senderId: "admin",
        receiverId: selectedUser.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, message])
      setNewMessage("")
      // Here you would typically send the message to your API
      // fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(message)
      // })
    }
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-bold p-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? "bg-gray-300" : ""}`}
          >
            {user.name}
          </div>
        ))}
      </div>
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-white p-4 shadow">
              <h2 className="text-xl font-bold">Chat with {selectedUser.name}</h2>
            </div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.senderId === "admin" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.senderId === "admin" ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="bg-gray-100 p-4">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border rounded-l-lg p-2"
                  placeholder="Type a message..."
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Select a user to start chatting</div>
        )}
      </div>
    </div>
  )
}

