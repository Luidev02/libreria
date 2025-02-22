"use client"

import { useState, useEffect } from "react"

export default function Settings() {
  const [settings, setSettings] = useState({
    maxLoanDuration: 14,
    maxBooksPerUser: 5,
    allowReservations: true,
    sendReminders: true,
  })

  useEffect(() => {
    // Fetch settings from API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
  }, [])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">System Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxLoanDuration">
            Maximum Loan Duration (days)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="maxLoanDuration"
            type="number"
            name="maxLoanDuration"
            value={settings.maxLoanDuration}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxBooksPerUser">
            Maximum Books Per User
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="maxBooksPerUser"
            type="number"
            name="maxBooksPerUser"
            value={settings.maxBooksPerUser}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="allowReservations"
              checked={settings.allowReservations}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700 text-sm font-bold">Allow Reservations</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sendReminders"
              checked={settings.sendReminders}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700 text-sm font-bold">Send Reminders</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}

