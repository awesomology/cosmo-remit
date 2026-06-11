// CONTEXT: AuthContext
// This stores the logged-in user's information so that every page in the app
// can access it without passing it manually.
// When a user logs in, their details are saved here.
// When they log out, it is cleared.

import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("fintech_user")) || null
  )

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("fintech_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fintech_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext