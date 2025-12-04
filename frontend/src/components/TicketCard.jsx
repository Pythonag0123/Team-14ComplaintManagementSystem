import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "0.75rem",
        borderRadius: "4px"
      }}
    >
      <h3>{ticket.title}</h3>
      <p>Category: {ticket.category_name}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <Link to={`/complaints/${ticket.id}`}>View Details</Link>
    </div>
  );
};

export default TicketCard;
