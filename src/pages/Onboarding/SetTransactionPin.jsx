// PAGE: Set Transaction PIN
// This is the page where the user creates a 4-digit PIN
// that they will use to authorize every money transfer.
// This is Step 4 of the identity verification process.
// Route: /onboarding/set-pin

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const RED = "#E8402A"
const FONT = "'DM Sans', sans-serif"

// ── PinInput Component ──────────────────────────────
export function PinInput({ value, setValue }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newValue = value.split("");
    newValue[index] = val[0];
    const updated = newValue.join("").slice(0, 4);
    setValue(updated);
    if (index < 3 && val) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");
      newValue[index] = "";
      setValue(newValue.join(""));
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: 16,
      justifyContent: "center",
      margin: "32px 0",
    }}>
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          type="password"
          maxLength="1"
          value={value[i] || ""}
          ref={(el) => (inputsRef.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            width: 64,
            height: 64,
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            fontFamily: FONT,
            backgroundColor: "#F0F0F0",
            border: value[i] ? `2px solid ${RED}` : "2px solid transparent",
            borderRadius: 10,
            outline: "none",
            color: "#111",
            transition: "border 0.2s",
          }}
        />
      ))}
    </div>
  )
}

// ── SetTransactionPin Page ──────────────────────────
const SetTransactionPin = () => {
  const navigate = useNavigate()
  const [pin, setPin] = useState("")

  const handleNext = () => {
    if (pin.length < 4) {
      alert("Please enter a complete 4-digit PIN")
      return
    }
    // Save PIN temporarily in sessionStorage to compare on confirm page
    sessionStorage.setItem("transactionPin", pin)
    navigate("/onboarding/confirm-pin")
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
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

        {/* Step 1 — Completed */}
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

        {/* Step 2 — Completed */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 7,
            backgroundColor: "#E0E0E0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#999", fontFamily: FONT,
          }}>✔</div>
          <span style={{ fontSize: 14, color: "#999", fontFamily: FONT }}>Verify Email</span>
        </div>

        <div style={{ flex: 1, height: 1, backgroundColor: "#E0E0E0", margin: "0 16px" }} />

        {/* Step 3 — Active */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 7,
            backgroundColor: RED,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#fff", fontFamily: FONT,
          }}>3</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111", fontFamily: FONT }}>
            Upload credentials
          </span>
        </div>

      </div>

      {/* Divider */}
      <div style={{
        width: "100%", maxWidth: 700,
        height: 1, backgroundColor: "#E8E8E8",
        marginBottom: 40,
      }} />

      {/* ── Main Content ── */}
      <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>

        {/* Title */}
        <h1 style={{
          fontSize: 24, fontWeight: 700, color: "#111",
          margin: "0 0 12px", fontFamily: FONT,
        }}>
          Set Transaction PIN
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 14, color: "#777",
          lineHeight: 1.6, margin: "0 0 8px",
          fontFamily: FONT,
        }}>
          Create a 4-digit PIN to secure your transactions.
          <br />You will use this PIN every time you send money.
        </p>

        {/* PIN Input */}
        <PinInput value={pin} setValue={setPin} />

        {/* Next Button */}
        <button
          onClick={handleNext}
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
            cursor: "pointer",
            transition: "opacity 0.2s",
            marginTop: 8,
          }}
        >
          Next
        </button>

      </div>
    </div>
  )
}

export default SetTransactionPin
