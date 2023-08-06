import { Route, Routes, Navigate } from "react-router-dom";

import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

// Bootstrap Bundle CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const user = localStorage.getItem("token")

  return (
    <Routes>
      {user && <Route path="/" element={<Main />} />}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/api/reset-password/:_id/:token" element={<ResetPassword />}></Route>
    </Routes>
  )
}

export default App
