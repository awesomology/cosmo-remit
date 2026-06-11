// PAGE: Review Transfer (Step 2)
// This is the second step of sending money.
// Before the money is sent, the user sees a full summary of the transfer.
// They can go back to edit or click Make payment to proceed.
// Route: /transfer/review

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── Detail Row ────────────────────────────────────
const DetailRow = ({ label, value }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F5F5F5",
  }}>
    <span style={{ fontSize: 14, color: "#555", fontFamily: FONT }}>{label}</span>
    <span style={{ fontSize: 14, color: "#111", fontWeight: 500, fontFamily: FONT, textAlign: "right" }}>{value}</span>
  </div>
)

const ReviewTransfer = () => {
  const navigate = useNavigate()

  // Read transfer details from sessionStorage
  const details = JSON.parse(sessionStorage.getItem("transferDetails") || "{}")

  const [checks, setChecks] = useState({ one: false, two: false, three: false })

  const allChecked = checks.one && checks.two && checks.three

  const handleMakePayment = () => {
    if (!allChecked) {
      alert("Please agree to all terms before proceeding")
      return
    }
    navigate("/transfer/enter-pin")
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      fontFamily: FONT,
      padding: "28px 20px 60px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 560 }}>

        {/* Back arrow */}
        <div
          onClick={() => navigate("/transfer")}
          style={{ cursor: "pointer", marginBottom: 20 }}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#111" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 20, fontWeight: 700, color: "#111",
          textAlign: "center", margin: "0 0 28px", fontFamily: FONT,
        }}>
          Review
        </h2>

        {/* Transaction Details */}
        <div style={{ marginBottom: 28 }}>
          <DetailRow label="Reference No" value={details.referenceNo || "89578833456593334"} />
          <DetailRow label="Transaction date" value={details.transactionDate || "24th August, 2024"} />
          <DetailRow label="Recipient" value={details.recipient || "Musa Ibrahim"} />
          <DetailRow label="Amount to send" value={details.amountSent || "500 UK"} />
          <DetailRow label="Charges" value={details.fee || "0"} />
          <DetailRow label="Payment method" value={details.paymentMethod || "Bank transfer"} />
        </div>

        {/* Receiver Details */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{
            fontSize: 16, fontWeight: 700, color: "#111",
            margin: "0 0 4px", fontFamily: FONT,
          }}>
            Receiver details
          </h3>
          <DetailRow label="Account name" value={details.recipient || "Musa Mamman Ibrahim"} />
          <DetailRow label="Amount to receive" value={details.amountReceived || "NGN 850,000"} />
          <DetailRow label="Bank name" value={details.bankName || "United Bank For Africa"} />
          <DetailRow label="Account number" value={details.accountNumber || "2345236657"} />
        </div>

        {/* Terms Checkboxes */}
        <div style={{ marginBottom: 28 }}>

          {/* Checkbox 1 */}
          <label style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            marginBottom: 14, cursor: "pointer",
          }}>
            <input
              type="checkbox"
              checked={checks.one}
              onChange={() => setChecks({ ...checks, one: !checks.one })}
              style={{ marginTop: 2, accentColor: RED, flexShrink: 0, width: 16, height: 16 }}
            />
            <span style={{ fontSize: 12, color: RED, lineHeight: 1.6, fontFamily: FONT }}>
              Transaction will be completed upon payment confirmation in our bank account. Large/first payments may
              take up to 24 hours. Also, the rate is locked with a transaction, it will not be changed or altered even when
              the transaction has failed, cancelled or expired
            </span>
          </label>

          {/* Checkbox 2 */}
          <label style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            marginBottom: 14, cursor: "pointer",
          }}>
            <input
              type="checkbox"
              checked={checks.two}
              onChange={() => setChecks({ ...checks, two: !checks.two })}
              style={{ marginTop: 2, accentColor: RED, flexShrink: 0, width: 16, height: 16 }}
            />
            <span style={{ fontSize: 12, color: RED, lineHeight: 1.6, fontFamily: FONT }}>
              Confirm that money will be sent from your account. If not, the whole transaction will be reversed
            </span>
          </label>

          {/* Checkbox 3 */}
          <label style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            cursor: "pointer",
          }}>
            <input
              type="checkbox"
              checked={checks.three}
              onChange={() => setChecks({ ...checks, three: !checks.three })}
              style={{ marginTop: 2, accentColor: RED, flexShrink: 0, width: 16, height: 16 }}
            />
            <span style={{ fontSize: 12, color: RED, lineHeight: 1.6, fontFamily: FONT }}>
              Transaction of $4999 or more per month may require additional proof of source of funds (Payslips, bank
              statement). This does not take account your personal need or objective
            </span>
          </label>

        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16 }}>

          {/* Edit */}
          <button
            onClick={() => navigate("/transfer")}
            style={{
              flex: 1, height: 48,
              backgroundColor: "#E8E8E8",
              color: "#111", border: "none",
              borderRadius: 8, fontSize: 15,
              fontWeight: 600, fontFamily: FONT,
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          {/* Make payment */}
          <button
            onClick={handleMakePayment}
            disabled={!allChecked}
            style={{
              flex: 1, height: 48,
              backgroundColor: allChecked ? RED : "#f0a090",
              color: "#fff", border: "none",
              borderRadius: 8, fontSize: 15,
              fontWeight: 600, fontFamily: FONT,
              cursor: allChecked ? "pointer" : "not-allowed",
              transition: "background 0.2s",
            }}
          >
            Make payment
          </button>

        </div>

      </div>
    </div>
  )
}

export default ReviewTransfer