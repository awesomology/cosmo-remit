import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

export default function BeneficiaryEdit() {
  const { id } = useParams()  // Get the beneficiary ID from URL
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    accountName: "",
    bankLocation: "",
    accountNumber: "",
    bank: "",
  })

  // Load the beneficiary data when the page opens
  useEffect(() => {
    const fetchBeneficiary = async () => {
      try {
        const res = await fetch(`https://cosmo-remit-api.onrender.com/beneficiaries/${id}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        
        // Security check: Does this beneficiary belong to the logged-in user?
        if (data.userId !== user?.id) {
          navigate("/beneficiaries")  // Not yours! Go back
          return
        }
        
        // Fill the form with the beneficiary's current data
        setFormData({
          accountName: data.accountName || "",
          bankLocation: data.bankLocation || "",
          accountNumber: data.accountNumber || "",
          bank: data.bank || "",
        })
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

  // Handle when someone types in a field
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission (save changes)
  const handleSubmit = async (e) => {
    e.preventDefault()  // Stop the page from refreshing
    setSaving(true)
    setError("")
    
    try {
      const res = await fetch(`https://cosmo-remit-api.onrender.com/beneficiaries/${id}`, {
        method: "PUT",  // PUT means "replace everything" (like saving a document)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,  // Keep the same owner
          id: id,           // Keep the same ID
        }),
      })
      
      if (!res.ok) throw new Error("Failed to update")
      
      // Success! Go back to the details page
      navigate(`/beneficiaries/${id}`)
    } catch (err) {
      setError("Could not save changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: 40, fontFamily: FONT }}>Loading beneficiary...</div>
  }

  return (
    <div style={{ padding: "40px 36px", fontFamily: FONT, maxWidth: 600 }}>
      {/* Header with back button */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => navigate(`/beneficiaries/${id}`)}
          style={{
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            padding: "8px 12px",
          }}
        >
          ←
        </button>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
          Edit Beneficiary
        </h1>
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          backgroundColor: "#FFE5E5",
          color: RED,
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14,
        }}>
          {error}
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        padding: 32,
      }}>
        
        {/* Account Name Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: "block",
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 8,
            color: "#333",
          }}>
            Account Name *
          </label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #DDD",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: FONT,
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Bank/Country Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: "block",
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 8,
            color: "#333",
          }}>
            Bank Location / Country *
          </label>
          <input
            type="text"
            name="bankLocation"
            value={formData.bankLocation}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #DDD",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: FONT,
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Account Number Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: "block",
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 8,
            color: "#333",
          }}>
            Account Number *
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #DDD",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: FONT,
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Bank Name Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: "block",
            fontSize: 14,
            fontWeight: 500,
            marginBottom: 8,
            color: "#333",
          }}>
            Bank Name *
          </label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #DDD",
              borderRadius: 8,
              fontSize: 14,
              fontFamily: FONT,
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={() => navigate(`/beneficiaries/${id}`)}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#F0F0F0",
              color: "#333",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: RED,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}