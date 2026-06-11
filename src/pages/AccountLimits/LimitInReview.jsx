// PAGE: Limit In Review
// Shown after the user submits a limit increase request.
// Tells the user their request is being processed.
// Route: /limits/in-review

import { useNavigate } from "react-router-dom"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function LimitInReview() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      fontFamily: FONT,
      padding: "32px 24px",
    }}>

      {/* ── Go home ── */}
      <div
        onClick={() => navigate("/home")}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          cursor: "pointer", width: "fit-content",
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: RED, fontFamily: FONT }}>
          Go home
        </span>
      </div>

      {/* ── Centered Content ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}>

        {/* ── Yellow Clock Icon ── */}
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          backgroundColor: "#F5C518",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 28,
        }}>
          <svg width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* ── Title ── */}
        <h2 style={{
          fontSize: 22, fontWeight: 700,
          color: "#111", margin: "0 0 12px",
          fontFamily: FONT,
        }}>
          Limit increase under review
        </h2>

        {/* ── Description ── */}
        <p style={{
          fontSize: 14, color: "#777",
          lineHeight: 1.7, margin: 0,
          maxWidth: 340, fontFamily: FONT,
        }}>
          Your request to upgrade account limits is currently being processed. Please check back later.
        </p>

      </div>
    </div>
  )
}