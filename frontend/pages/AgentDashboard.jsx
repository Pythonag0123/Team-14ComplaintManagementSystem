import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";

const AgentDashboard = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const res = await api.get("/agent/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    if (token) setAuthToken(token);
    load();
  }, [token]);

  const updateStatus = async (id, status) => {
    await api.put(`/agent/tickets/${id}/status`, { status });
    load();
  };

  return (
    <div>
      <h2>Agent Tickets</h2>
      {tickets.map((t) => (
        <div key={t.id}>
          <TicketCard ticket={t} />
          <select
            value={t.status}
            onChange={(e) => updateStatus(t.id, e.target.value)}
          >
            <option value="NEW">New</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      ))}
      {tickets.length === 0 && <p>No tickets assigned.</p>}
    </div>
  );
};

export default AgentDashboard;
