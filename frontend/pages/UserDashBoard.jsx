import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";
import FilterBar from "../components/FilterBar";

const UserDashboard = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
    const fetchTickets = async () => {
      const res = await api.get("/complaints/my");
      setTickets(res.data);
    };
    fetchTickets();
  }, [token]);

  const filtered = status
    ? tickets.filter((t) => t.status === status)
    : tickets;

  return (
    <div>
      <h2>My Complaints</h2>
      <Link to="/user/complaints/new">+ New Complaint</Link>
      <FilterBar status={status} setStatus={setStatus} />
      {filtered.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
      {filtered.length === 0 && <p>No complaints found.</p>}
    </div>
  );
};

export default UserDashboard;
