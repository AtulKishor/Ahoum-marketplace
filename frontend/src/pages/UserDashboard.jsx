import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/axiosAuth";

export default function UserDashboard() {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const api = authApi(auth.access);
        const res = await api.get("bookings/");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [auth.access]);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2>Your Bookings</h2>

      {bookings.length === 0 && <p>No bookings yet.</p>}

      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            <strong>{b.session_title}</strong> — {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
