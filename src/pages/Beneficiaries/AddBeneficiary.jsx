// PAGE: Add Beneficiary
// This page lets the logged-in user add a new beneficiary.
// Fields: Account name, Bank, Account number, Bank location.
// On submit, the beneficiary is saved to JSON Server under /beneficiaries.
// Route: /beneficiaries/add

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── Field Component ──────────────────────────────────
const Field = ({ label, name, value, onChange, placeholder = "" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{
      fontSize: 13, fontWeight: 400,
      color: "#444", fontFamily: FONT,
    }}>
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      style={{
        height: 44,
        padding: "0 14px",
        backgroundColor: "#F0F0F0",
        border: "none",
        borderRadius: 6,
        fontSize: 14,
        fontFamily: FONT,
        color: "#333",
        outline: "none",
        boxSizing: "border-box",
        width: "100%",
      }}
    />
  </div>
)

// ── AddBeneficiary Page ──────────────────────────────
export default function AddBeneficiary() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [form, setForm] = useState({
    accountName: "",
    bank: "",
    accountNumber: "",
    bankLocation: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async () => {
    // Validation
    if (!form.accountName.trim()) {
      setError("Please enter the account name.")
      return
    }
    if (!form.bank.trim()) {
      setError("Please enter the bank name.")
      return
    }
    if (!form.accountNumber.trim()) {
      setError("Please enter the account number.")
      return
    }
    if (!form.bankLocation.trim()) {
      setError("Please enter the bank location.")
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
      const res = await fetch("https://cosmo-remit-api.onrender.com/beneficiaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          accountName: form.accountName.trim(),
          bank: form.bank.trim(),
          accountNumber: form.accountNumber.trim(),
          bankLocation: form.bankLocation.trim(),
        }),
      })

      if (res.ok) {
        navigate("/beneficiaries")
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
      minHeight: "100vh",
      backgroundColor: "#fff",
      fontFamily: FONT,
      padding: "40px 24px 60px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 760 }}>

        {/* ── Back Arrow ── */}
        <div
          onClick={() => navigate(-1)}
          style={{
            cursor: "pointer",
            marginBottom: 24,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#111" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>

        {/* ── Title ── */}
        <h1 style={{
          fontSize: 22, fontWeight: 700,
          color: "#111", textAlign: "center",
          margin: "0 0 40px", fontFamily: FONT,
        }}>
          Add a beneficiary
        </h1>

        {/* ── Section Title ── */}
        <h2 style={{
          fontSize: 16, fontWeight: 700,
          color: "#111", margin: "0 0 20px",
          fontFamily: FONT,
        }}>
          Bank Account Details
        </h2>

        {/* ── Form Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px 32px",
          marginBottom: 20,
        }}>
          <Field
            label="Account name"
            name="accountName"
            value={form.accountName}
            onChange={handleChange}
          />
          <Field
            label="Bank"
            name="bank"
            value={form.bank}
            onChange={handleChange}
            placeholder=""
          />
          <Field
            label="Account number"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
          />
          <Field
            label="Bank location"
            name="bankLocation"
            value={form.bankLocation}
            onChange={handleChange}
          />
        </div>

        {/* ── Warning / Error Message ── */}
        <p style={{
          fontSize: 13,
          color: RED,
          fontFamily: FONT,
          lineHeight: 1.6,
          margin: "0 0 32px",
        }}>
          {error
            ? error
            : "Please enter the correct beneficiary account information to prevent potential delays in the transaction process"}
        </p>

        {/* ── Submit Button ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              maxWidth: 420,
              height: 52,
              backgroundColor: RED,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Saving..." : "Add beneficiary"}
          </button>
        </div>

      </div>
    </div>
  )
}
