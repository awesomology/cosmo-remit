// PAGE: Beneficiary List
// Shows all beneficiaries belonging to the logged-in user.
// Supports search by account name, view details, and delete.
// Route: /beneficiaries

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── Search Icon ──────────────────────────────────────
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
)

// ── Add Person Icon ──────────────────────────────────
const AddPersonIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6M22 11h-6" />
  </svg>
)

// ── Main Component ───────────────────────────────────
export default function Beneficiary() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState(null)

  // ── Fetch beneficiaries ──────────────────────────
  useEffect(() => {
    if (!user?.id) return

    const fetchBeneficiaries = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`http://localhost:3001/beneficiaries?userId=${user.id}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setBeneficiaries(data)
      } catch (err) {
        setError("Could not load beneficiaries. Make sure JSON Server is running.")
      } finally {
        setLoading(false)
      }
    }

    fetchBeneficiaries()
  }, [user?.id])

  // ── Delete beneficiary ───────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this beneficiary?")) return

    setDeletingId(id)
    try {
      const res = await fetch(`http://localhost:3001/beneficiaries/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setBeneficiaries((prev) => prev.filter((b) => b.id !== id))
      } else {
        alert("Failed to delete. Please try again.")
      }
    } catch (err) {
      alert("Cannot connect to server.")
    } finally {
      setDeletingId(null)
    }
  }

  // ── Filter by search ─────────────────────────────
  const filtered = beneficiaries.filter((b) =>
    search === "" ||
    b.accountName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{
      flex: 1,
      padding: "40px 36px",
      fontFamily: FONT,
      backgroundColor: "#fff",
      minHeight: "100vh",
    }}>

      {/* ── Top Row: Title + Add Button ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        flexWrap: "wrap",
        gap: 12,
      }}>
        <h1 style={{
          fontSize: 22, fontWeight: 700,
          color: "#111", margin: 0, fontFamily: FONT,
        }}>
          Beneficiary
        </h1>

        <button
          onClick={() => navigate("/beneficiaries/add")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            backgroundColor: RED, color: "#fff",
            border: "none", borderRadius: 8,
            padding: "11px 20px",
            fontSize: 14, fontWeight: 600,
            fontFamily: FONT, cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <AddPersonIcon />
          Add beneficiary
        </button>
      </div>

      {/* ── Search ── */}
      <div style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        marginBottom: 24,
      }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: 240,
            height: 38,
            padding: "0 38px 0 14px",
            backgroundColor: "#F5F5F5",
            border: "1px solid #E8E8E8",
            borderRadius: 8,
            fontSize: 13,
            fontFamily: FONT,
            color: "#333",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <span style={{ position: "absolute", right: 12 }}>
          <SearchIcon />
        </span>
      </div>

      {/* ── Table Container ── */}
      <div style={{
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        border: "1px solid #EFEFEF",
        overflow: "hidden",
      }}>

        {/* ── Table Header ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.5fr 1fr",
          padding: "14px 24px",
          borderBottom: "1px solid #EFEFEF",
        }}>
          {["Account name", "Country", ""].map((h, i) => (
            <span key={i} style={{
              fontSize: 13, fontWeight: 500,
              color: "#888", fontFamily: FONT,
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div style={{
            padding: "48px 24px", textAlign: "center",
            fontSize: 14, color: "#999", fontFamily: FONT,
          }}>
            Loading beneficiaries...
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div style={{
            padding: "48px 24px", textAlign: "center",
            fontSize: 14, color: RED, fontFamily: FONT,
          }}>
            {error}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{
            padding: "48px 24px", textAlign: "center",
            fontSize: 14, color: "#999", fontFamily: FONT,
          }}>
            {search ? "No beneficiaries match your search." : "You have no beneficiaries yet. Add one to get started."}
          </div>
        )}

        {/* ── Rows ── */}
        {!loading && !error && filtered.map((b) => (
          <div
            key={b.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1fr",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 8,
              margin: "6px 10px",
              padding: "14px 16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"}
          >
            {/* Account Name */}
            <span style={{ fontSize: 14, color: "#111", fontFamily: FONT, fontWeight: 500 }}>
              {b.accountName}
            </span>

            {/* Country / Bank Location */}
            <span style={{ fontSize: 14, color: "#555", fontFamily: FONT }}>
              {b.bankLocation}
            </span>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span
                onClick={() => navigate(`/beneficiaries/${b.id}`)}
                style={{
                  fontSize: 14, color: "#111",
                  fontFamily: FONT, cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                View
              </span>
              <span
                onClick={() => handleDelete(b.id)}
                style={{
                  fontSize: 14, color: RED,
                  fontFamily: FONT, cursor: "pointer",
                  fontWeight: 500,
                  opacity: deletingId === b.id ? 0.5 : 1,
                  pointerEvents: deletingId === b.id ? "none" : "auto",
                }}
              >
                {deletingId === b.id ? "Deleting..." : "Delete"}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
