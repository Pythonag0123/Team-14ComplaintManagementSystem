import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    if (token) setAuthToken(token);
    const loadTickets = async () => {
      const res = await api.get("/admin/tickets");
      setTickets(res.data);
    };
    const loadAnalytics = async () => {
      const res = await api.get("/admin/analytics/categories");
      setAnalytics(
        res.data.map((d) => ({ name: d.category, value: d.count }))
      );
    };
    loadTickets();
    loadAnalytics();
  }, [token]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Tickets</h3>
      {tickets.map((t) => (
        <TicketCard key={t.id} ticket={t} />
      ))}
      {tickets.length === 0 && <p>No tickets.</p>}

      <h3>Category Analytics</h3>
      {analytics.length > 0 ? (
        <PieChart width={400} height={300}>
          <Pie
            data={analytics}
            cx={200}
            cy={150}
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {analytics.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
