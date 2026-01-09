import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  if (!auth || !auth.user) return null; // ✅ IMPORTANT

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ borderBottom: "1px solid #ccc", marginBottom: 20 }}>
      <span>{auth.user.email}</span>{" "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
