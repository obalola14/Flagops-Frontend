import { useEffect, useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE_URL || ""

export default function App() {
  const [health, setHealth] = useState(null)
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => {
        setHealth(data)
        setStatus("ok")
      })
      .catch(() => {
        setHealth(null)
        setStatus("error")
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        <img
          src="/flagops-logo.svg"
          alt="FlagOps logo"
          className="mx-auto mb-4 h-20 w-auto"
        />

        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          FlagOps Platform
        </h1>

        <span className="inline-block mt-2 mb-4 px-3 py-1 text-xs rounded-full bg-slate-200 text-slate-700">
          ENV: {import.meta.env.MODE}
        </span>

        <p className="text-slate-500 mb-6">
          Frontend → Backend Health Check
        </p>

        {status === "loading" && (
          <div className="text-slate-600">Checking backend…</div>
        )}

        {status === "ok" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-left">
            <p className="font-semibold mb-1">Backend Healthy</p>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            Backend unreachable
          </div>
        )}
      </div>
    </div>
  )
}
