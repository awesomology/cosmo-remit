// ROUTES: App Routes
// This is the map of all the pages in the app.
// It connects every URL to its matching page component.

import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import DashboardLayout from "../layouts/DashboardLayout"

// ── Public Pages ──────────────────────────────────
import LandingPage from "../pages/LandingPage/index"
import SignIn from "../pages/Auth/SignIn"
import SignUp from "../pages/Auth/SignUp"
import VerifyEmail from "../pages/Auth/VerifyEmail"

// ── Onboarding Pages ──────────────────────────────
import UploadId from "../pages/Onboarding/UploadId"
import UploadPassport from "../pages/Onboarding/UploadPassport"
import ProofOfResidence from "../pages/Onboarding/ProofOfResidence"
import SetTransactionPin from "../pages/Onboarding/SetTransactionPin"
import ConfirmTransactionPin from "../pages/Onboarding/ConfirmTransactionPin"

// ── Core App Pages ────────────────────────────────
import Dashboard from "../pages/Dashboard/index"
import Profile from "../pages/Profile/index"
import TransactionHistory from "../pages/TransactionHistory/index"
import TransactionReceipt from "../pages/TransactionHistory/TransactionReceipt"

// ── Transfer Pages ────────────────────────────────
import Transfer from "../pages/Transfer/index"
import ReviewTransfer from "../pages/Transfer/ReviewTransfer"
import EnterPin from "../pages/Transfer/EnterPin"
import TransferReceipt from "../pages/Transfer/TransferReceipt"
import TransferSuccess from "../pages/Transfer/TransferSuccess"

// ── Beneficiary Pages ─────────────────────────────
import BeneficiaryList from "../pages/Beneficiaries/BeneficiaryList"
import AddBeneficiary from "../pages/Beneficiaries/AddBeneficiary"

// ── Account Limit Pages ───────────────────────────
import AccountLimits from "../pages/AccountLimits/index"
import UploadResidence from "../pages/AccountLimits/UploadResidence"
import UploadProofOfFunds from "../pages/AccountLimits/UploadProofOfFunds"
import LimitInReview from "../pages/AccountLimits/LimitInReview"
import LimitIncreaseSuccess from "../pages/AccountLimits/LimitIncreaseSuccess"

// ── Shared Pages ──────────────────────────────────
import ImportantNotice from "../components/shared/ImportantNotice"
import SuccessScreen from "../components/shared/SuccessScreen"

const AppRoutes = () => {
  return (
    <Routes>

      {/* ── Public Routes ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ── Onboarding Routes ── */}
      <Route path="/onboarding/upload-id" element={<UploadId />} />
      <Route path="/onboarding/upload-passport" element={<UploadPassport />} />
      <Route path="/onboarding/proof-of-residence" element={<ProofOfResidence />} />
      <Route path="/onboarding/set-pin" element={<SetTransactionPin />} />
      <Route path="/onboarding/confirm-pin" element={<ConfirmTransactionPin />} />

      {/* ── Fullscreen Transfer Pages (no sidebar) ── */}
      {/* These are outside DashboardLayout intentionally —  */}
      {/* they are fullscreen flows that don't need the sidebar */}
      <Route path="/transfer/success" element={
        <ProtectedRoute><TransferSuccess /></ProtectedRoute>
      } />
      <Route path="/transfer/receipt" element={
        <ProtectedRoute><TransferReceipt /></ProtectedRoute>
      } />
      <Route path="/transfer/enter-pin" element={
        <ProtectedRoute><EnterPin /></ProtectedRoute>
      } />
      <Route path="/transfer/review" element={
        <ProtectedRoute><ReviewTransfer /></ProtectedRoute>
      } />

      {/* ── Protected Routes — all share DashboardLayout with persistent sidebar ── */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/transactions/:id/receipt" element={<TransactionReceipt />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/beneficiaries" element={<BeneficiaryList />} />
        <Route path="/beneficiaries/add" element={<AddBeneficiary />} />
        <Route path="/limits" element={<AccountLimits />} />
        <Route path="/limits/upload-residence" element={<UploadResidence />} />
        <Route path="/limits/upload-proof-of-funds" element={<UploadProofOfFunds />} />
        <Route path="/limits/in-review" element={<LimitInReview />} />
        <Route path="/limits/success" element={<LimitIncreaseSuccess />} />
        <Route path="/notice" element={<ImportantNotice />} />
        <Route path="/success" element={<SuccessScreen />} />
      </Route>

      {/* ── 404 fallback ── */}
      <Route path="*" element={
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          minHeight: "100vh", fontFamily: "'DM Sans', sans-serif",
        }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#111" }}>404</h1>
          <p style={{ color: "#777", marginTop: 8 }}>Page not found</p>
          <a href="/" style={{ marginTop: 16, color: "#E8402A", fontWeight: 600 }}>
            Go back home
          </a>
        </div>
      } />

    </Routes>
  )
}

export default AppRoutes
