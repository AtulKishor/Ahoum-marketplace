import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

function ProtectedUser({ children }) {
  const { auth } = useAuth();
  if (!auth || auth.user.role !== "USER") {
    return <p>Unauthorized</p>;
  }
  return children;
}

function ProtectedCreator({ children }) {
  const { auth } = useAuth();
  if (!auth || auth.user.role !== "CREATOR") {
    return <p>Unauthorized</p>;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedUser>
              <UserDashboard />
            </ProtectedUser>
          }
        />
        <Route
          path="/creator"
          element={
            <ProtectedCreator>
              <CreatorDashboard />
            </ProtectedCreator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
