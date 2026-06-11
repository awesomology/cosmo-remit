// PAGE: Sign In
// This is the page where an existing user logs into their account.
// It has an email and password field.
// After a successful login, the user is taken to their dashboard.
// Route: /signin

// PAGE: Sign In
// This is the page where an existing user logs into their account.
// It has an email and password field.
// After a successful login, the user is taken to their dashboard.
// Route: /signin

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

const loadFont = () => {
  if (!document.getElementById("dm-sans-font")) {
    const link = document.createElement("link")
    link.id = "dm-sans-font"
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
    document.head.appendChild(link)
  }
}

const EyeOpen = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOff = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
)

const SignIn = () => {
  useEffect(() => { loadFont() }, [])

  const navigate = useNavigate()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      // Check user credentials against JSON Server
      const response = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      )
      const users = await response.json()

      if (users.length > 0) {
        // User found — save to AuthContext and go to dashboard
        login(users[0])
        navigate("/home")
      } else {
        setError("Invalid email or password. Please try again.")
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
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT,
      padding: "20px",
    }}>

      <div style={{ width: "100%", maxWidth: 460 }}>

        {/* Title */}
        <h1 style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#111",
          textAlign: "center",
          margin: "0 0 10px",
          fontFamily: FONT,
        }}>
          Welcome back!
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 14,
          color: "#666",
          textAlign: "center",
          margin: "0 0 32px",
          fontFamily: FONT,
        }}>
          New to CosmoRemit?{" "}
          <Link to="/signup" style={{
            color: RED,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: FONT,
          }}>
            Sign up
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <div style={{
            backgroundColor: "#FFF0EE",
            border: `1px solid ${RED}`,
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 20,
            fontSize: 13,
            color: RED,
            fontFamily: FONT,
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: "#333",
              marginBottom: 8,
              fontFamily: FONT,
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              style={{
                width: "100%",
                height: 48,
                padding: "0 14px",
                backgroundColor: "#F2F2F2",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontFamily: FONT,
                color: "#333",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 32 }}>
            <label style={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: "#333",
              marginBottom: 8,
              fontFamily: FONT,
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                style={{
                  width: "100%",
                  height: 48,
                  padding: "0 44px 0 14px",
                  backgroundColor: "#F2F2F2",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: FONT,
                  color: "#333",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOpen /> : <EyeOff />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
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
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
              marginBottom: 20,
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {/* Forgot password */}
        <p style={{
          textAlign: "center",
          fontSize: 14,
          color: "#888",
          fontFamily: FONT,
          cursor: "pointer",
        }}>
          Forgot password?
        </p>

      </div>
    </div>
  )
}

export default SignIn
