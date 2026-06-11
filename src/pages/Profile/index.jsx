// PAGE: Profile
// This is the profile page where the user can view and edit their personal details.
// It shows their name, email address, and phone number.
// The user can also log out of their account from this page.
// Route: /profile

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

const Profile = () => {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    country: user?.country || "",
    email: user?.email || "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    // TODO: save updated profile to JSON Server
    setEditing(false)
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      fontFamily: FONT,
    }}>

      {/* ── Main Card ── */}
      <div style={{
        width: "100%",
        maxWidth: 720,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: "36px 40px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>

        {/* ── Profile Header ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 36,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

            {/* Avatar */}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              backgroundColor: "#D0D0D0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 700, color: "#777",
              flexShrink: 0,
            }}>
              {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Name */}
            <span style={{
              fontSize: 20, fontWeight: 700,
              color: "#111", fontFamily: FONT,
            }}>
              {user?.firstName} {user?.lastName}
            </span>

          </div>

          {/* Edit / Save Button */}
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            style={{
              backgroundColor: RED,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer",
            }}
          >
            {editing ? "Save" : "Edit profile"}
          </button>

        </div>

        {/* ── Personal Details ── */}
        <div style={{ marginBottom: 36 }}>

          <h3 style={{
            fontSize: 16, fontWeight: 700, color: "#111",
            margin: "0 0 20px", fontFamily: FONT,
          }}>
            Personal details
          </h3>

          {/* Row 1 — First name & Last name */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 24,
          }}>
            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>
                First name
              </p>
              {editing ? (
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  style={{
                    width: "100%", height: 40, padding: "0 12px",
                    backgroundColor: "#F5F5F5", border: "none",
                    borderRadius: 6, fontSize: 15, fontFamily: FONT,
                    color: "#111", outline: "none", boxSizing: "border-box",
                  }}
                />
              ) : (
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0, fontFamily: FONT }}>
                  {user?.firstName}
                </p>
              )}
            </div>

            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>
                Last name
              </p>
              {editing ? (
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  style={{
                    width: "100%", height: 40, padding: "0 12px",
                    backgroundColor: "#F5F5F5", border: "none",
                    borderRadius: 6, fontSize: 15, fontFamily: FONT,
                    color: "#111", outline: "none", boxSizing: "border-box",
                  }}
                />
              ) : (
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0, fontFamily: FONT }}>
                  {user?.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 — Country & Email */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}>
            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>
                Country of residence
              </p>
              {editing ? (
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  style={{
                    width: "100%", height: 40, padding: "0 12px",
                    backgroundColor: "#F5F5F5", border: "none",
                    borderRadius: 6, fontSize: 15, fontFamily: FONT,
                    color: "#111", outline: "none", boxSizing: "border-box",
                  }}
                />
              ) : (
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0, fontFamily: FONT }}>
                  {user?.country}
                </p>
              )}
            </div>

            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>
                Email address
              </p>
              {editing ? (
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    width: "100%", height: 40, padding: "0 12px",
                    backgroundColor: "#F5F5F5", border: "none",
                    borderRadius: 6, fontSize: 15, fontFamily: FONT,
                    color: "#111", outline: "none", boxSizing: "border-box",
                  }}
                />
              ) : (
                <p style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0, fontFamily: FONT }}>
                  {user?.email}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "#F0F0F0", marginBottom: 28 }} />

        {/* ── Transaction Limits ── */}
        <div>
          <h3 style={{
            fontSize: 16, fontWeight: 700, color: "#111",
            margin: "0 0 20px", fontFamily: FONT,
          }}>
            Transaction limits
          </h3>

          <div style={{ display: "flex", gap: 60 }}>
            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>
                Daily limit
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0, fontFamily: FONT }}>
                20,000 UK
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 6px", fontFamily: FONT }}>
                Yearly limit
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: 0, fontFamily: FONT }}>
                1,000,000 UK
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
