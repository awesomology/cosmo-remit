// PAGE: Account Limits
// The user fills in a reason for their limit increase request and the new limit they want.
// On submit it saves to JSON Server and navigates to the in-review page.
// Route: /limits

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function AccountLimits() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [reason, setReason] = useState("")
  const [limit, setLimit] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleProceed = async () => {
    if (!reason) {
      setError("Please select a reason for your request.")
      return
    }
    if (!limit.trim()) {
      setError("Please enter the limit amount you are requesting.")
      return
    }
    if (!user?.id) {
      setError("Session expired. Please sign in again.")
      navigate("/signin")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("https://cosmo-remit-api.onrender.com/limitRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          reason,
          requestedLimit: limit.trim(),
          status: "Pending",
          date: new Date().toISOString().split("T")[0],
        }),
      })

      if (res.ok) {
        navigate("/limits/in-review")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure JSON Server is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      fontFamily: FONT,
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* ── Title ── */}
        <h2 style={{
          fontSize: 20, fontWeight: 700,
          color: "#111", margin: "0 0 24px",
          fontFamily: FONT,
        }}>
          Account Limits
        </h2>

        {/* ── Card ── */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: "28px 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          border: "1.5px solid #5B9BD5",
        }}>

          {/* Reason for request */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontSize: 14, fontWeight: 500,
              color: "#111", fontFamily: FONT,
              display: "block", marginBottom: 8,
            }}>
              Reason for request
            </label>
            <div style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
              padding: "0 14px",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}>
              <select
                value={reason}
                onChange={(e) => { setReason(e.target.value); setError("") }}
                style={{
                  width: "100%",
                  height: 46,
                  border: "none",
                  background: "none",
                  fontSize: 14,
                  fontFamily: FONT,
                  color: reason ? "#111" : "#999",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                }}
              >
                <option value="">-Select-</option>
                <option value="Business expansion">Business expansion</option>
                <option value="Personal needs">Personal needs</option>
                <option value="Investment purposes">Investment purposes</option>
                <option value="Family support">Family support</option>
                <option value="Other">Other</option>
              </select>
              {/* Chevron */}
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2.5"
                style={{ position: "absolute", right: 14, pointerEvents: "none" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Enter limit */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              fontSize: 14, fontWeight: 500,
              color: "#111", fontFamily: FONT,
              display: "block", marginBottom: 8,
            }}>
              Enter limit
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => { setLimit(e.target.value); setError("") }}
              placeholder="e.g. 50,000"
              style={{
                width: "100%",
                height: 46,
                padding: "0 14px",
                backgroundColor: "#F5F5F5",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: FONT,
                color: "#333",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <p style={{
              fontSize: 13, color: RED,
              fontFamily: FONT, margin: "0 0 16px",
            }}>
              {error}
            </p>
          )}

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={loading}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: RED,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Submitting..." : "Proceed"}
          </button>

        </div>
      </div>
    </div>
  )
}