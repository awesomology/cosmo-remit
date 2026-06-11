// PAGE: Proof of Residence
// This is the page where the user uploads a document that proves where they live.
// For example a utility bill or a bank statement.
// This is Step 3 of the identity verification process.
// Route: /onboarding/proof-of-residence

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function ProofOfResidence() {
  const navigate = useNavigate()
  const fileInputRef = useRef()
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) setFile(selected)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleNext = () => {
    if (!file) {
      alert("Please upload a proof of residence document")
      return
    }
    navigate("/onboarding/set-pin")
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

        {/* Step 1 — Completed */}
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

        {/* Step 2 — Completed */}
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

        {/* Step 3 — Active */}
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
      <div style={{ width: "100%", maxWidth: 500, textAlign: "center" }}>

        {/* Title */}
        <h1 style={{
          fontSize: 24, fontWeight: 700, color: "#111",
          margin: "0 0 10px", fontFamily: FONT,
        }}>
          Upload proof of residence
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 14, color: "#777",
          margin: "0 0 28px", fontFamily: FONT,
          lineHeight: 1.6,
        }}>
          Please upload a document that proves where you reside
        </p>

        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? RED : "#C0C0C0"}`,
            borderRadius: 10,
            padding: "48px 20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: dragOver ? "#FFF5F5" : "#ffffff",
            marginBottom: 28,
            transition: "border-color 0.2s, background-color 0.2s",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {file ? (
            <>
              {/* Success state */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
                color: "#28a745",
              }}>
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p style={{
                fontSize: 14, fontWeight: 600, color: "#28a745",
                margin: "0 0 4px", fontFamily: FONT,
              }}>
                {file.name}
              </p>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0, fontFamily: FONT }}>
                Tap to change file
              </p>
            </>
          ) : (
            <>
              {/* Upload icon */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px", color: RED,
              }}>
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6M9 15l3-3 3 3" />
                </svg>
              </div>
              <p style={{ fontSize: 14, margin: "0 0 6px", fontFamily: FONT, color: "#333" }}>
                <span style={{ color: RED, fontWeight: 600, cursor: "pointer" }}>
                  Click to Upload
                </span>{" "}
                or drag and drop
              </p>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0, fontFamily: FONT }}>
                (Max. File size: 25 MB)
              </p>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            width: "60%",
            height: 52,
            backgroundColor: RED,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            fontFamily: FONT,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          Next
        </button>

      </div>
    </div>
  )
}
