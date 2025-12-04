import React from "react";

const FilterBar = ({ status, setStatus }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Status: </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "0.25rem" }}
      >
        <option value="">All</option>
        <option value="NEW">New</option>
        <option value="ASSIGNED">Assigned</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>
    </div>
  );
};

export default FilterBar;
