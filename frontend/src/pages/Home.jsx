import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/axiosAuth";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("sessions/").then((res) => setSessions(res.data));
  }, []);

  const bookSession = async (sessionId) => {
    if (!auth) {
      navigate("/login");
      return;
    }

    try {
      const apiAuth = authApi(auth.access);
      await apiAuth.post("bookings/", { session: sessionId });
      alert("Session booked!");
      navigate("/user");
    } catch (err) {
      alert("Already booked or error occurred");
    }
  };

  return (
    <div>
      <h2>Sessions Catalog</h2>

      {sessions.length === 0 && <p>No sessions available.</p>}

      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> — ₹{s.price}
            <br />
            <small>By {s.creator_email}</small>
            <br />
            <button onClick={() => bookSession(s.id)}>
              Book Now
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
