import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function BeneficiaryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [beneficiary, setBeneficiary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBeneficiary = async () => {
      try {
        const res = await fetch(`https://cosmo-remit-api.onrender.com/beneficiaries/${id}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        
        // Verify this beneficiary belongs to the logged-in user
        if (data.userId !== user?.id) {
          navigate("/beneficiaries")
          return
        }
        
        setBeneficiary(data)
      } catch (err) {
        setError("Could not load beneficiary details")
      } finally {
        setLoading(false)
      }
    }

    if (id && user?.id) {
      fetchBeneficiary()
    }
  }, [id, user, navigate])

  if (loading) return <div style={{ padding: 40, fontFamily: FONT }}>Loading...</div>
  if (error) return <div style={{ padding: 40, color: RED, fontFamily: FONT }}>{error}</div>
  if (!beneficiary) return <div style={{ padding: 40, fontFamily: FONT }}>Beneficiary not found</div>

  return (
    <div style={{ padding: "40px 36px", fontFamily: FONT, maxWidth: 800 }}>
      <button 
        onClick={() => navigate("/beneficiaries")}
        style={{ marginBottom: 24, cursor: "pointer", background: "none", border: "none", fontSize: 14 }}
      >
        ← Back to Beneficiaries
      </button>
      
      <div style={{ 
        backgroundColor: "#F9F9F9", 
        borderRadius: 12, 
        padding: 32,
        position: "relative"  // Needed for absolute positioning
      }}>
        {/* Header with name and edit button */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}>
          <h2 style={{ margin: 0 }}>{beneficiary.accountName}</h2>
          
          <button
            onClick={() => navigate(`/beneficiaries/${id}/edit`)}
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${RED}`,
              color: RED,
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ✏️ Edit
          </button>
        </div>
        
        <div style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <strong>Bank Name:</strong> {beneficiary.bank}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Country/Bank Location:</strong> {beneficiary.bankLocation}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Account Number:</strong> {beneficiary.accountNumber}
          </div>
        </div>
      </div>
    </div>
  )
}