// LAYOUT: DashboardLayout
// This is the page template for all the main app pages after login.
// It includes the Sidebar on the left and the Navbar on top.
// All dashboard pages sit inside this layout.
// The sidebar stays visible on every dashboard page — SPA style.

import { useState } from "react"
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── SVG Icons ─────────────────────────────────────
const HomeIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const HistoryIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const BeneficiaryIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const LimitsIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ProfileIcon = ({ color }) => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const BellIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#888" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
)

// ── Nav Items config ───────────────────────────────
const navItems = [
  { label: "Home", to: "/home", Icon: HomeIcon },
  { label: "Transaction History", to: "/transactions", Icon: HistoryIcon },
  { label: "Beneficiaries", to: "/beneficiaries", Icon: BeneficiaryIcon },
  { label: "Account limits", to: "/limits", Icon: LimitsIcon },
  { label: "Profile", to: "/profile", Icon: ProfileIcon },
]

// ── DashboardLayout ────────────────────────────────
const DashboardLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#F2F2F2",
      fontFamily: FONT,
    }}>

      {/* ════════════════ TOP BAR ════════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 64,
        backgroundColor: "#fff",
        borderBottom: "1px solid #EFEFEF",
        flexShrink: 0,
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{
          fontSize: 26, fontWeight: 800,
          color: "#111", fontFamily: FONT,
          letterSpacing: -0.5,
        }}>
          Logo
        </div>

        {/* Right — user + bell */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

          {/* User dropdown */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", position: "relative" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {/* Avatar */}
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              backgroundColor: "#D0D0D0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "#555",
            }}>
              {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Name */}
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111", fontFamily: FONT }}>
              {user?.firstName} {user?.lastName}
            </span>

            <ChevronIcon />

            {/* Dropdown */}
            {showDropdown && (
              <div style={{
                position: "absolute",
                top: 48, right: 0,
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                padding: "8px 0",
                minWidth: 140,
                zIndex: 100,
              }}>
                <div
                  onClick={() => { setShowDropdown(false); navigate("/profile") }}
                  style={{ padding: "10px 16px", fontSize: 13, color: "#333", cursor: "pointer", fontFamily: FONT }}
                >
                  Profile
                </div>
                <div
                  onClick={handleLogout}
                  style={{ padding: "10px 16px", fontSize: 13, color: RED, cursor: "pointer", fontFamily: FONT }}
                >
                  Log out
                </div>
              </div>
            )}
          </div>

          {/* Bell */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            backgroundColor: "#F5F5F5",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            <BellIcon />
          </div>

        </div>
      </div>

      {/* ════════════════ BODY ════════════════ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── SIDEBAR ── */}
        <div style={{
          width: 210,
          backgroundColor: "#fff",
          flexShrink: 0,
          padding: "20px 12px",
          borderRight: "1px solid #EFEFEF",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}>
          {navItems.map(({ label, to, Icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 8,
                  backgroundColor: active ? RED : "transparent",
                  cursor: "pointer",
                  marginBottom: 2,
                  transition: "background 0.15s",
                }}>
                  <Icon color={active ? "#fff" : "#666"} />
                  <span style={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#fff" : "#444",
                    fontFamily: FONT,
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── PAGE CONTENT — rendered by child routes ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default DashboardLayout
