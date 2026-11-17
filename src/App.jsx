
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function random() {
    setLoading(true)

    try {
      const response = await axios.get('https://randomuser.me/api/')
      setData(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    random()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">

      <div className="bg-white rounded-lg shadow-md h-[537px] w-[669px] flex flex-col items-center justify-center mt-[67px] mb-[29px]">

        <h1 className="text-4xl font-bold mb-4">
          Random User Generator
        </h1>

        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 border-4 border-orange-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading user...
            </p>
          </div>
        ) : data && (
          <div className="flex flex-col items-center">
            <img
              src={data.results[0].picture.large}
              alt="User"
              className="rounded-full mb-4 border-[7px] border-orange-500"
            />

            <h1 className="text-2xl font-bold">
              {data.results[0].name.first} {data.results[0].name.last}
            </h1>

            <p className="text-gray-600">
              {data.results[0].email}
            </p>

            <p className="text-gray-600">
              {data.results[0].location.state}
            </p>

            <button
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded mt-4 hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              onClick={random}
              disabled={loading}
            >
              Next User
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
