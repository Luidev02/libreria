"use client"

import { useState, useEffect } from "react"

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeLoans: 0,
    availableBooks: 0,
    registeredUsers: 0,
  })

  const [chartData, setChartData] = useState([])

  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Loans</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{metrics.activeLoans}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Available Books</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{metrics.availableBooks}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Registered Users</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{metrics.registeredUsers}</dd>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Activity</h3>
        <div className="h-64">
          {/* Replace this with a chart library of your choice */}
          <p className="text-gray-500">Chart placeholder: Implement with your preferred chart library</p>
        </div>
      </div>
    </div>
  )
}

