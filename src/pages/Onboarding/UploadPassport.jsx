// PAGE: Upload Passport
// This is the page where the user uploads a photo of their passport.
// This is Step 2 of the identity verification process.
// Route: /onboarding/upload-passport

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function UploadPassport() {
  const navigate = useNavigate()
  const fileInputRef = useRef()
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleNext = () => {
    if (!photo) {
      alert("Please take or upload a passport photograph")
      return
    }
    navigate("/onboarding/proof-of-residence")
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
          margin: "0 0 40px", fontFamily: FONT,
        }}>
          Take a passport photograph
        </h1>

        {/* Photo Circle */}
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            width: 200, height: 200,
            borderRadius: "50%",
            backgroundColor: preview ? "transparent" : "#3D3D3D",
            margin: "0 auto 48px",
            cursor: "pointer",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="passport"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />

        {/* Helper text */}
        {!preview && (
          <p style={{
            fontSize: 13, color: "#aaa",
            margin: "-32px 0 40px",
            fontFamily: FONT,
          }}>
            Click the circle to take or upload a photo
          </p>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            width: "100%",
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