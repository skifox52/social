import Navbar from "./components/Navbar"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import NotFound from "./pages/Notfound"
import Register from "./pages/Register"

function App() {
  const location = useLocation()
  return (
    <div className="App bg-slate-200 h-screen">
      <Navbar />
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
