// PAGE: Verify Email
// Sends a real OTP to the user's email via EmailJS.
// User enters the 6-digit code to verify their email before proceeding.
// Route: /verify-email

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import emailjs from "@emailjs/browser"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── EmailJS Configuration ────────────────────────
const SERVICE_ID  = "service_nmb9hm6"
const TEMPLATE_ID = "template_qcjyjbr"
const PUBLIC_KEY  = "IM3yJ-3JgQylTlT8I"

// ── Generate 6-digit OTP ─────────────────────────
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

// ── OTP expiry in ms (10 minutes) ───────────────
const OTP_EXPIRY = 10 * 60 * 1000

export default function VerifyEmail() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [countdown, setCountdown] = useState(0)

  const otpRef = useRef(null)
  const timerRef = useRef(null)

  // ── Send OTP on page load ────────────────────
  useEffect(() => {
    sendOTP()
    return () => clearInterval(timerRef.current)
  }, [])

  // ── Countdown timer ──────────────────────────
  const startCountdown = () => {
    setCountdown(60)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  // ── Send OTP via EmailJS ─────────────────────
  const sendOTP = async () => {
    if (!user?.email) return
    setSending(true)
    setError("")

    const code = generateOTP()
    const expiry = Date.now() + OTP_EXPIRY

    // Store OTP and expiry in sessionStorage
    sessionStorage.setItem("emailOTP", code)
    sessionStorage.setItem("emailOTPExpiry", expiry.toString())

    const now = new Date()
    const timeStr = new Date(expiry).toLocaleTimeString("en-GB", {
      hour: "2-digit", minute: "2-digit",
    })

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        email: user.email,
        passcode: code,
        time: timeStr,
      }, PUBLIC_KEY)

      setSuccess(`OTP sent to ${user.email}`)
      startCountdown()
    } catch (err) {
      console.error("EmailJS error:", err)
      setError("Failed to send OTP. Please try again.")
    } finally {
      setSending(false)
    }
  }

  // ── Handle OTP input ─────────────────────────
  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "")
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    setError("")
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  // ── Verify OTP ───────────────────────────────
  const handleVerify = () => {
    const entered = otp.join("")
    if (entered.length < 6) {
      setError("Please enter the complete 6-digit code.")
      return
    }

    const savedOTP = sessionStorage.getItem("emailOTP")
    const expiry = parseInt(sessionStorage.getItem("emailOTPExpiry") || "0")

    if (Date.now() > expiry) {
      setError("Your OTP has expired. Please request a new one.")
      return
    }

    if (entered !== savedOTP) {
      setError("Incorrect OTP. Please try again.")
      setOtp(["", "", "", "", "", ""])
      document.getElementById("otp-0")?.focus()
      return
    }

    // OTP verified — clear and proceed
    sessionStorage.removeItem("emailOTP")
    sessionStorage.removeItem("emailOTPExpiry")
    navigate("/onboarding/upload-id")
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fff",
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
            backgroundColor: RED,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#fff", fontFamily: FONT,
          }}>2</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: FONT }}>Verify Email</span>
        </div>

        <div style={{ flex: 1, height: 1, backgroundColor: "#E0E0E0", margin: "0 16px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 7,
            backgroundColor: "#E0E0E0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#999", fontFamily: FONT,
          }}>3</div>
          <span style={{ fontSize: 14, color: "#999", fontFamily: FONT }}>Upload credentials</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: "100%", maxWidth: 700,
        height: 1, backgroundColor: "#E8E8E8",
        marginBottom: 48,
      }} />

      {/* ── Main Content ── */}
      <div style={{ width: "100%", maxWidth: 420, textAlign: "center" }}>

        {/* Email icon */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          backgroundColor: "#FFF0EE",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 style={{
          fontSize: 22, fontWeight: 700, color: "#111",
          margin: "0 0 10px", fontFamily: FONT,
        }}>
          Verify your email
        </h1>

        <p style={{
          fontSize: 14, color: "#777",
          lineHeight: 1.6, margin: "0 0 4px",
          fontFamily: FONT,
        }}>
          We sent a 6-digit code to
        </p>
        <p style={{
          fontSize: 14, fontWeight: 700, color: "#111",
          margin: "0 0 32px", fontFamily: FONT,
        }}>
          {user?.email || "your email"}
        </p>

        {/* ── OTP Inputs ── */}
        <div style={{
          display: "flex", gap: 10,
          justifyContent: "center",
          marginBottom: 24,
        }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: 52, height: 56,
                textAlign: "center",
                fontSize: 22, fontWeight: 700,
                fontFamily: FONT,
                backgroundColor: "#F0F0F0",
                border: digit ? `2px solid ${RED}` : "2px solid transparent",
                borderRadius: 10, outline: "none",
                color: "#111",
                transition: "border 0.2s",
              }}
            />
          ))}
        </div>

        {/* Success message */}
        {success && !error && (
          <p style={{
            fontSize: 13, color: "#17A863",
            fontFamily: FONT, marginBottom: 12,
          }}>
            {success}
          </p>
        )}

        {/* Error message */}
        {error && (
          <div style={{
            backgroundColor: "#FFF0EE",
            border: `1px solid ${RED}`,
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13, color: RED,
            fontFamily: FONT, textAlign: "center",
          }}>
            {error}
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={otp.join("").length < 6}
          style={{
            width: "100%", height: 52,
            backgroundColor: RED, color: "#fff",
            border: "none", borderRadius: 8,
            fontSize: 15, fontWeight: 600,
            fontFamily: FONT,
            cursor: otp.join("").length < 6 ? "not-allowed" : "pointer",
            opacity: otp.join("").length < 6 ? 0.6 : 1,
            marginBottom: 16,
            transition: "opacity 0.2s",
          }}
        >
          Verify Email
        </button>

        {/* Resend */}
        <p style={{ fontSize: 13, color: "#777", fontFamily: FONT }}>
          Didn't receive the code?{" "}
          {countdown > 0 ? (
            <span style={{ color: "#999", fontWeight: 600 }}>
              Resend in {countdown}s
            </span>
          ) : (
            <span
              onClick={sending ? undefined : sendOTP}
              style={{
                color: RED, fontWeight: 600,
                cursor: sending ? "not-allowed" : "pointer",
                opacity: sending ? 0.6 : 1,
              }}
            >
              {sending ? "Sending..." : "Resend OTP"}
            </span>
          )}
        </p>

      </div>
    </div>
  )
}