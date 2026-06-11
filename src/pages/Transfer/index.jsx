// PAGE: Transfer
// This is the full dedicated transfer page.
// The user selects a beneficiary from their saved list (fetched from JSON Server),
// enters the amount and currency, chooses a payment method and clicks Continue.
// Route: /transfer

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

const Transfer = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const RATE = 1700

  const [beneficiaries, setBeneficiaries] = useState([])
  const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(true)

  const [form, setForm] = useState({
    beneficiary: "",
    sendAmount: "500",
    sendCurrency: "UK",
    paymentMethod: "Bank transfer",
    receiveAmount: (500 * 1700).toLocaleString(),
    receiveCurrency: "NGN",
  })

  // ── Fetch beneficiaries from JSON Server ──────────
  useEffect(() => {
    if (!user?.id) return

    const fetchBeneficiaries = async () => {
      setLoadingBeneficiaries(true)
      try {
        const res = await fetch(`https://cosmo-remit-api.onrender.com/beneficiaries?userId=${user.id}`)
        const data = await res.json()
        setBeneficiaries(data)
      } catch (err) {
        console.error("Could not load beneficiaries", err)
      } finally {
        setLoadingBeneficiaries(false)
      }
    }

    fetchBeneficiaries()
  }, [user?.id])

  const handleSendAmountChange = (e) => {
    const amount = e.target.value
    setForm({
      ...form,
      sendAmount: amount,
      receiveAmount: amount ? (parseFloat(amount) * RATE).toLocaleString() : "",
    })
  }

  const handleSubmit = () => {
    if (!form.beneficiary) {
      alert("Please select a beneficiary")
      return
    }
    if (!form.sendAmount) {
      alert("Please enter an amount to send")
      return
    }

    const selectedBeneficiary = beneficiaries.find((b) => b.id === form.beneficiary)

    const referenceNo = Math.random().toString(36).substr(2, 16).toUpperCase()
    const now = new Date()
    const dateStr = now.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    })
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit", minute: "2-digit",
    })

    sessionStorage.setItem("transferDetails", JSON.stringify({
      referenceNo,
      recipient: selectedBeneficiary?.accountName,
      amountSent: `${form.sendAmount} ${form.sendCurrency}`,
      amountReceived: `${form.receiveCurrency} ${form.receiveAmount}`,
      bankName: selectedBeneficiary?.bank,
      accountNumber: selectedBeneficiary?.accountNumber,
      bankLocation: selectedBeneficiary?.bankLocation,
      paymentMethod: form.paymentMethod,
      transactionDate: dateStr,
      completedOn: `${dateStr}. ${timeStr}`,
      fee: "0",
      rate: `1 ${form.sendCurrency} = ${RATE} ${form.receiveCurrency}`,
      sendAmount: form.sendAmount,
      sendCurrency: form.sendCurrency,
      receiveAmount: form.receiveAmount,
      receiveCurrency: form.receiveCurrency,
    }))

    navigate("/transfer/review")
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", fontFamily: FONT }}>
      <div style={{ width: "100%", maxWidth: 520 }}>

        <h2 style={{
          fontSize: 20, fontWeight: 700, color: "#111",
          margin: "0 0 24px", fontFamily: FONT,
        }}>
          Make a Transfer
        </h2>

        <div style={{
          backgroundColor: "#fff", borderRadius: 12,
          padding: "28px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>

          {/* Select Beneficiary */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>Select beneficiary</p>
            <div style={{ backgroundColor: "#F5F5F5", borderRadius: 8, padding: "12px 14px" }}>
              <select
                value={form.beneficiary}
                onChange={(e) => setForm({ ...form, beneficiary: e.target.value })}
                style={{
                  border: "none", background: "none", fontSize: 14,
                  fontWeight: 500, color: "#111", fontFamily: FONT,
                  outline: "none", width: "100%", cursor: "pointer",
                }}
              >
                <option value="">
                  {loadingBeneficiaries ? "Loading..." : "— Select a beneficiary —"}
                </option>
                {beneficiaries.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.accountName} — {b.bank}
                  </option>
                ))}
              </select>
            </div>
            {/* No beneficiaries nudge */}
            {!loadingBeneficiaries && beneficiaries.length === 0 && (
              <p style={{
                fontSize: 12, color: RED,
                margin: "6px 0 0", fontFamily: FONT,
              }}>
                No beneficiaries found.{" "}
                <span
                  onClick={() => navigate("/beneficiaries/add")}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  Add one here
                </span>
              </p>
            )}
          </div>

          {/* You send */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>You send</p>
            <div style={{
              backgroundColor: "#F5F5F5", borderRadius: 8, padding: "12px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <input
                type="number"
                value={form.sendAmount}
                onChange={handleSendAmountChange}
                style={{
                  border: "none", background: "none", fontSize: 18,
                  fontWeight: 600, color: "#111", fontFamily: FONT,
                  outline: "none", width: "55%",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>🇬🇧</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", fontFamily: FONT }}>{form.sendCurrency}</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 11, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>Payment method</p>
            <div style={{ backgroundColor: "#F5F5F5", borderRadius: 8, padding: "12px 14px" }}>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                style={{
                  border: "none", background: "none", fontSize: 14,
                  fontWeight: 500, color: "#111", fontFamily: FONT,
                  outline: "none", width: "100%", cursor: "pointer",
                }}
              >
                <option>Bank transfer</option>
                <option>Card payment</option>
              </select>
            </div>
          </div>

          {/* Recipient gets */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>Recipient gets</p>
            <div style={{
              backgroundColor: "#F5F5F5", borderRadius: 8, padding: "12px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#111", fontFamily: FONT }}>{form.receiveAmount}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>🇳🇬</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111", fontFamily: FONT }}>{form.receiveCurrency}</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rate & Charges */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: RED }} />
                <span style={{ fontSize: 13, color: "#555", fontFamily: FONT }}>Rate</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#111", fontFamily: FONT }}>
                1 {form.sendCurrency} = {RATE} {form.receiveCurrency}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: RED }} />
                <span style={{ fontSize: 13, color: "#555", fontFamily: FONT }}>Charges</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#111", fontFamily: FONT }}>0</span>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%", height: 50,
              backgroundColor: RED, color: "#fff",
              border: "none", borderRadius: 8,
              fontSize: 15, fontWeight: 600,
              fontFamily: FONT, cursor: "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
            }}
          >
            Continue
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  )
}

export default Transfer
