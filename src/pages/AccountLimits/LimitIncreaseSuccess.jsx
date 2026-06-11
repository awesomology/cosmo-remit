// PAGE: Limit Increase Success
// Shown when the admin approves the limit increase request.
// Route: /limits/success

import { useNavigate } from "react-router-dom"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function LimitIncreaseSuccess() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT,
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 480,
        textAlign: "center",
      }}>

        {/* ── Green Badge Checkmark ── */}
        <div style={{ marginBottom: 28 }}>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M55 5 
                 L63 18 L78 14 L79 30 L93 35 L88 50 
                 L100 60 L90 72 L95 87 L80 89 
                 L74 103 L59 98 L55 110 
                 L51 98 L36 103 L30 89 
                 L15 87 L20 72 L10 60 
                 L22 50 L17 35 L31 30 
                 L32 14 L47 18 Z"
              fill="#22C55E"
            />
            <path
              d="M36 55 L49 68 L74 43"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── Title ── */}
        <h2 style={{
          fontSize: 24, fontWeight: 700,
          color: "#111", margin: "0 0 12px",
          fontFamily: FONT,
        }}>
          Limit increased successfully
        </h2>

        {/* ── Description ── */}
        <p style={{
          fontSize: 14, color: "#777",
          lineHeight: 1.7, margin: "0 0 40px",
          fontFamily: FONT,
        }}>
          Your account limit has been increased!
        </p>

        {/* ── Done Button ── */}
        <button
          onClick={() => navigate("/home")}
          style={{
            width: "55%",
            height: 52,
            backgroundColor: RED,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            fontFamily: FONT,
            cursor: "pointer",
          }}
        >
          Done
        </button>

      </div>
    </div>
  )
}