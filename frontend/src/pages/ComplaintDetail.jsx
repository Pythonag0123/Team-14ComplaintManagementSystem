import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const ComplaintDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");

  const load = async () => {
    const res = await api.get(`/complaints/${id}`);
    setData(res.data);
  };

  useEffect(() => {
    if (token) setAuthToken(token);
    load();
  }, [id, token]);

  const handleComment = async (e) => {
    e.preventDefault();
    await api.post(`/complaints/${id}/comments`, { message: comment });
    setComment("");
    load();
  };

  if (!data) return <div>Loading...</div>;

  const { complaint, comments } = data;

  return (
    <div>
      <h2>{complaint.title}</h2>
      <p>Category: {complaint.category_name}</p>
      <p>Status: {complaint.status}</p>
      <p>Priority: {complaint.priority}</p>
      <p>Description: {complaint.description}</p>
      {complaint.attachment_path && (
        <p>
          Attachment:{" "}
          <a
            href={`http://localhost:5000${complaint.attachment_path}`}
            target="_blank"
            rel="noreferrer"
          >
            View
          </a>
        </p>
      )}

      <h3>Comments</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.user_name}:</strong> {c.message}
          </li>
        ))}
      </ul>

      <form onSubmit={handleComment}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ width: "100%", minHeight: "60px" }}
        />
        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default ComplaintDetail;
