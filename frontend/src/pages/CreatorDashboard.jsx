import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/axiosAuth";

export default function CreatorDashboard() {
  const { auth } = useAuth();
  const api = authApi(auth.access);

  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const fetchSessions = async () => {
    const res = await api.get("sessions/");
    const mine = res.data.filter(
      (s) => s.creator_email === auth.user.email
    );
    setSessions(mine);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const createSession = async (e) => {
    e.preventDefault();
    await api.post("sessions/", {
      title,
      description,
      date,
      price,
    });
    setTitle("");
    setDescription("");
    setDate("");
    setPrice("");
    fetchSessions();
  };

  return (
    <div>
      <h2>Creator Dashboard</h2>

      <h3>Create Session</h3>
      <form onSubmit={createSession}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />

        <button type="submit">Create</button>
      </form>

      <h3>Your Sessions</h3>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> — ₹{s.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
