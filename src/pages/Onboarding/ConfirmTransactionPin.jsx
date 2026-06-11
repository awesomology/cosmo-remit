// PAGE: Confirm Transaction PIN
// This is the page where the user types their new PIN a second time to confirm it.
// If both PINs match, the PIN is saved to JSON Server and user goes to dashboard.
// This is Step 5 of the identity verification process.
// Route: /onboarding/confirm-pin

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── PinInput Component ──────────────────────────────
function PinInput({ value, setValue }) {
  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "")
    const arr = value.split("")
    arr[index] = val
    setValue(arr.join("").slice(0, 4))
    if (val && index < 3) {
      document.getElementById(`confirm-pin-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      document.getElementById(`confirm-pin-${index - 1}`).focus()
    }
  }

  return (
    <div style={{
      display: "flex", gap: 16,
      justifyContent: "center",
      margin: "32px 0",
    }}>
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          id={`confirm-pin-${index}`}
          type="password"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: 64, height: 64,
            textAlign: "center",
            fontSize: 28, fontWeight: 700,
            fontFamily: FONT,
            backgroundColor: "#F0F0F0",
            border: value[index] ? `2px solid ${RED}` : "2px solid transparent",
            borderRadius: 10, outline: "none",
            color: "#111",
            transition: "border 0.2s",
          }}
        />
      ))}
    </div>
  )
}

// ── ConfirmTransactionPin Page ──────────────────────
export default function ConfirmTransactionPin() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [confirmPin, setConfirmPin] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (confirmPin.length < 4) {
      alert("Please enter a complete 4-digit PIN")
      return
    }

    if (!user?.id) {
    alert("Session expired. Please sign in again.")
    navigate("/signin")
    return
  }

    // Get the PIN saved from SetTransactionPin page
    const savedPin = sessionStorage.getItem("transactionPin")

    if (confirmPin !== savedPin) {
      alert("PINs do not match ❌ Please try again")
      setConfirmPin("")
      document.getElementById("confirm-pin-0")?.focus()
      return
    }

    setLoading(true)

    try {
      // Save PIN to JSON Server against the user's account
      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionPin: confirmPin }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        // Update AuthContext with new user data including PIN
        login(updatedUser)
        // Clear PIN from sessionStorage
        sessionStorage.removeItem("transactionPin")
        // Navigate to dashboard
        navigate("/home")
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (err) {
      alert("Cannot connect to server. Make sure JSON Server is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: FONT,
      padding: "0 20px 60px",
    }}>

      {/* ── Step Indicator ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 700,
        padding: "24px 0 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 7,
            backgroundColor: "#E0E0E0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#999", fontFamily: FONT,
          }}>✔</div>
          <span style={{ fontSize: 14, color: "#999", fontFamily: FONT }}>Sign up</span>
        </div>

        <div style={{ flex: 1, height: 1, backgroundColor: "#E0E0E0", margin: "0 16px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 7,
            backgroundColor: "#E0E0E0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#999", fontFamily: FONT,
          }}>✔</div>
          <span style={{ fontSize: 14, color: "#999", fontFamily: FONT }}>Verify Email</span>
        </div>

        <div style={{ flex: 1, height: 1, backgroundColor: "#E0E0E0", margin: "0 16px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 7,
            backgroundColor: RED,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#fff", fontFamily: FONT,
          }}>3</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: FONT }}>
            Upload credentials
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: "100%", maxWidth: 700,
        height: 1, backgroundColor: "#E8E8E8",
        marginBottom: 40,
      }} />

      {/* ── Main Content ── */}
      <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>

        <h1 style={{
          fontSize: 24, fontWeight: 700, color: "#111",
          margin: "0 0 12px", fontFamily: FONT,
        }}>
          Confirm Transaction PIN
        </h1>

        <p style={{
          fontSize: 14, color: "#777",
          lineHeight: 1.6, margin: "0 0 8px",
          fontFamily: FONT,
        }}>
          Re-enter your 4-digit PIN to confirm it.
        </p>

        <PinInput value={confirmPin} setValue={setConfirmPin} />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", height: 52,
            backgroundColor: RED,
            color: "#fff", border: "none",
            borderRadius: 8, fontSize: 16,
            fontWeight: 600, fontFamily: FONT,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s",
            marginTop: 8,
          }}
        >
          {loading ? "Saving..." : "Submit"}
        </button>

      </div>
    </div>
  )
}