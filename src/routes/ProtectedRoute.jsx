// ROUTE GUARD: ProtectedRoute
// This is a security guard for pages that require the user to be logged in.
// If a user who is not logged in tries to visit the dashboard,
// this automatically sends them back to the login page.

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}

export default ProtectedRoute