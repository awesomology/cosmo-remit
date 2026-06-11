// PAGE: Enter PIN (Step 3)
// This is the third step of sending money.
// The user enters their 4-digit transaction PIN to authorize the transfer.
// This is the security check that happens before money is sent.
// After PIN is verified, the transaction is saved to JSON Server.
// Route: /transfer/enter-pin

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
      document.getElementById(`enter-pin-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      document.getElementById(`enter-pin-${index - 1}`).focus()
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
          id={`enter-pin-${index}`}
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

// ── EnterPin Page ───────────────────────────────────
const EnterPin = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (pin.length < 4) {
      setError("Please enter your complete 4-digit PIN")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Step 1 — Verify PIN against JSON Server
      const response = await fetch(`http://localhost:3001/users/${user.id}`)
      const userData = await response.json()

      if (userData.transactionPin !== pin) {
        setError("Incorrect PIN. Please try again.")
        setPin("")
        document.getElementById("enter-pin-0")?.focus()
        setLoading(false)
        return
      }

      // Step 2 — PIN matches, read transfer details from sessionStorage
      const details = JSON.parse(sessionStorage.getItem("transferDetails") || "{}")

      // Step 3 — Save transaction to JSON Server
      const txRes = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          reference: details.referenceNo,
          amountSent: details.amountSent,
          rate: details.rate,
          channel: details.paymentMethod,
          recipient: details.recipient,
          bankName: details.bankName,
          accountNumber: details.accountNumber,
          amountReceived: details.amountReceived,
          fee: details.fee,
          date: new Date().toISOString().split("T")[0],
          completedOn: details.completedOn,
          status: "Successful",
        }),
      })

      if (!txRes.ok) {
        console.error("Failed to save transaction to server")
      }

      // Step 4 — Go to success page
      // ⚠️ Do NOT clear sessionStorage here — receipt page still needs it
      navigate("/transfer/success")

    } catch (err) {
      setError("Cannot connect to server. Make sure JSON Server is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT,
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>

        {/* Back arrow */}
        <div
          onClick={() => navigate("/transfer/review")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            cursor: "pointer", marginBottom: 32,
            width: "fit-content",
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#111" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span style={{ fontSize: 14, color: "#111", fontFamily: FONT }}>Back</span>
        </div>

        {/* Lock icon */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          backgroundColor: "#FFF0EE",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 22, fontWeight: 700, color: "#111",
          margin: "0 0 10px", fontFamily: FONT,
        }}>
          Enter Transaction PIN
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 14, color: "#777",
          margin: "0 0 8px", fontFamily: FONT, lineHeight: 1.6,
        }}>
          Enter your 4-digit PIN to authorize this transfer
        </p>

        {/* PIN Input */}
        <PinInput value={pin} setValue={setPin} />

        {/* Error message */}
        {error && (
          <div style={{
            backgroundColor: "#FFF0EE",
            border: `1px solid ${RED}`,
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            color: RED,
            fontFamily: FONT,
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={loading || pin.length < 4}
          style={{
            width: "100%", height: 52,
            backgroundColor: RED,
            color: "#fff", border: "none",
            borderRadius: 8, fontSize: 16,
            fontWeight: 600, fontFamily: FONT,
            cursor: loading || pin.length < 4 ? "not-allowed" : "pointer",
            opacity: loading || pin.length < 4 ? 0.6 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>

      </div>
    </div>
  )
}

export default EnterPin