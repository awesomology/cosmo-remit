// PAGE: Transaction History
// Displays a list of the logged-in user's transactions fetched from JSON Server.
// Supports search by reference/recipient, date filter, and status filter.
// Route: /home/transactions (or wherever you mount it)

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── Status badge ────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    Successful: { color: "#17A863", bg: "#EDFBF4" },
    Pending:    { color: "#D68A00", bg: "#FFF8E6" },
    Failed:     { color: "#E8402A", bg: "#FFF0EE" },
  }
  const s = styles[status] || styles.Pending

  return (
    <span style={{
      color: s.color,
      backgroundColor: s.bg,
      borderRadius: 20,
      padding: "4px 14px",
      fontSize: 13,
      fontWeight: 600,
      fontFamily: FONT,
    }}>
      {status}
    </span>
  )
}

// ── Search Icon ──────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
)

// ── Calendar Icon ────────────────────────────────────
const CalendarIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

// ── Filter Icon ──────────────────────────────────────
const FilterIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
    <path strokeLinecap="round" d="M3 6h18M7 12h10M11 18h2" />
  </svg>
)

// ── Main Component ───────────────────────────────────
export default function TransactionHistory() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Fetch transactions for the logged-in user
  useEffect(() => {
    if (!user?.id) return

    const fetchTransactions = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`https://cosmo-remit-api.onrender.com/transactions?userId=${user.id}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setTransactions(data)
      } catch (err) {
        setError("Could not load transactions. Make sure JSON Server is running.")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [user?.id])

  // ── Filtering logic ──────────────────────────────
  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      search === "" ||
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.recipient.toLowerCase().includes(search.toLowerCase())

    const matchesDate = dateFilter === "" || tx.date === dateFilter

    const matchesStatus = statusFilter === "" || tx.status === statusFilter

    return matchesSearch && matchesDate && matchesStatus
  })

  return (
    <div style={{
      flex: 1,
      padding: "40px 36px",
      fontFamily: FONT,
      backgroundColor: "#fff",
      minHeight: "100vh",
    }}>

      {/* ── Page Title ── */}
      <h1 style={{
        fontSize: 24, fontWeight: 700,
        color: "#111", margin: "0 0 24px",
        fontFamily: FONT,
      }}>
        Transactions
      </h1>

      {/* ── Filters Row ── */}
      <div style={{
        display: "flex",
        gap: 16,
        marginBottom: 28,
        flexWrap: "wrap",
      }}>

        {/* Search */}
        <div style={{
          flex: 2,
          minWidth: 200,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: 42,
              padding: "0 40px 0 14px",
              backgroundColor: "#F5F5F5",
              border: "1px solid #E8E8E8",
              borderRadius: 8,
              fontSize: 14,
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

        {/* Date filter */}
        <div style={{
          flex: 1,
          minWidth: 160,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              width: "100%",
              height: 42,
              padding: "0 40px 0 14px",
              backgroundColor: "#F5F5F5",
              border: "1px solid #E8E8E8",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: FONT,
              color: dateFilter ? "#333" : "#999",
              outline: "none",
              boxSizing: "border-box",
              appearance: "none",
              cursor: "pointer",
            }}
          />
          <span style={{ position: "absolute", right: 12, pointerEvents: "none" }}>
            <CalendarIcon />
          </span>
        </div>

        {/* Status filter */}
        <div style={{
          flex: 1,
          minWidth: 140,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: "100%",
              height: 42,
              padding: "0 40px 0 14px",
              backgroundColor: "#F5F5F5",
              border: "1px solid #E8E8E8",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: FONT,
              color: statusFilter ? "#333" : "#999",
              outline: "none",
              boxSizing: "border-box",
              appearance: "none",
              cursor: "pointer",
            }}
          >
            <option value="">Filter</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <span style={{ position: "absolute", right: 12, pointerEvents: "none" }}>
            <FilterIcon />
          </span>
        </div>

      </div>

      {/* ── Table Container ── */}
      <div style={{
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #EFEFEF",
      }}>

        {/* ── Table Header ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 0.8fr 1.4fr 1.6fr 1.2fr",
          padding: "16px 24px",
          borderBottom: "1px solid #EFEFEF",
        }}>
          {["Reference", "Amount Sent", "Rate", "Channel", "Recipient", "Status"].map((h) => (
            <span key={h} style={{
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
            padding: "48px 24px",
            textAlign: "center",
            fontSize: 14,
            color: "#999",
            fontFamily: FONT,
          }}>
            Loading transactions...
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div style={{
            padding: "48px 24px",
            textAlign: "center",
            fontSize: 14,
            color: RED,
            fontFamily: FONT,
          }}>
            {error}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{
            padding: "48px 24px",
            textAlign: "center",
            fontSize: 14,
            color: "#999",
            fontFamily: FONT,
          }}>
            No transactions found.
          </div>
        )}

        {/* ── Transaction Rows ── */}
        {!loading && !error && filtered.map((tx, index) => (
          <div
            key={tx.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 0.8fr 1.4fr 1.6fr 1.2fr",
              padding: "18px 24px",
              backgroundColor: "#fff",
              borderRadius: 8,
              margin: "6px 10px",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"}
          >
            <span style={{ fontSize: 14, color: "#333", fontFamily: FONT }}>{tx.reference}</span>
            <span style={{ fontSize: 14, color: "#333", fontFamily: FONT }}>{tx.amountSent}</span>
            <span style={{ fontSize: 14, color: "#333", fontFamily: FONT }}>{tx.rate}</span>
            <span style={{ fontSize: 14, color: "#333", fontFamily: FONT }}>{tx.channel}</span>
            <span style={{ fontSize: 14, color: "#333", fontFamily: FONT }}>{tx.recipient}</span>
            <StatusBadge status={tx.status} />
          </div>
        ))}

      </div>
    </div>
  )
}
