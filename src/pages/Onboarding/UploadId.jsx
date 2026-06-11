// PAGE: Upload ID
// This is the page where the user uploads a photo of their
// government-issued ID card (front and back).
// This is Step 1 of the identity verification process.
// Route: /onboarding/upload-id

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadId.css";

const ID_TYPES = [
  "National Identification Card",
  "Driver's License",
  "Voter's Card",
  "International Passport",
];

export default function UploadId() {
  const navigate = useNavigate();

  const [idType, setIdType] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [expDate, setExpDate] = useState("");
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleNext = () => {
    if (!idType || !serialNo || !expDate || !file) {
      alert("Please fill in all fields and upload your ID.");
      return;
    }
    // Navigate to next onboarding step
    navigate("/onboarding/upload-passport");
  };

  return (
    <div className="upload-id-page">

      {/* ── Step Indicator ── */}
      <div className="uid-steps">

        {/* Step 1 — Completed */}
        <div className="uid-step">
          <div className="uid-step-box completed">✔</div>
          <span className="uid-step-label">Sign up</span>
        </div>

        <div className="uid-connector" />

        {/* Step 2 — Completed */}
        <div className="uid-step">
          <div className="uid-step-box completed">✔</div>
          <span className="uid-step-label">Verify Email</span>
        </div>

        <div className="uid-connector" />

        {/* Step 3 — Active */}
        <div className="uid-step">
          <div className="uid-step-box active">3</div>
          <span className="uid-step-label active">Upload credentials</span>
        </div>

      </div>

      {/* Divider */}
      <div className="uid-divider" />

      {/* ── Main Card ── */}
      <div className="upload-id-card">

        {/* Header */}
        <div className="uid-header">
          <h1 className="uid-title">Upload a valid ID</h1>
          <p className="uid-subtitle">
            Please upload a valid National Identification card,<br />
            driver's license or voters card
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`uid-upload-area ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {file ? (
            <>
              <div className="uid-upload-icon success">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="uid-upload-filename">{file.name}</p>
              <p className="uid-upload-hint">Tap to change file</p>
            </>
          ) : (
            <>
              <div className="uid-upload-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 12v6M9 15l3-3 3 3" />
                </svg>
              </div>
              <p className="uid-upload-label">
                <span>Click to Upload</span> or drag and drop
              </p>
              <p className="uid-upload-hint">(Max. File size: 25 MB)</p>
            </>
          )}
        </div>

        {/* Form */}
        <div className="uid-form">

          {/* Row 1 — Valid ID type & Serial no */}
          <div className="uid-form-row">
            <div className="uid-field">
              <label className="uid-label">Valid ID type</label>
              <div className="uid-select-wrapper">
                <select
                  className="uid-select"
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                >
                  <option value="">-Select-</option>
                  {ID_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="uid-select-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="uid-field">
              <label className="uid-label">Serial no</label>
              <input
                className="uid-input"
                type="text"
                placeholder=""
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 — Exp date (half width) */}
          <div style={{ width: "calc(50% - 10px)" }}>
            <div className="uid-field">
              <label className="uid-label">Exp date</label>
              <input
                className="uid-input"
                type="text"
                placeholder="DD/MM/YYYY"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => { if (!expDate) e.target.type = "text"; }}
              />
            </div>
          </div>

        </div>

        {/* Next Button */}
        <button className="uid-next-btn" onClick={handleNext}>
          Next
        </button>

      </div>
    </div>
  );
}
