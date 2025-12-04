import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const NewComplaint = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    description: "",
    priority: "LOW"
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (token) setAuthToken(token);
    const fetchCategories = async () => {
      const res = await api.get("/complaints/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, [token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("categoryId", form.categoryId);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("priority", form.priority);
    if (file) data.append("attachment", file);

    await api.post("/complaints", data);
    navigate("/user/dashboard");
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>New Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: "100%", minHeight: "100px" }}
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div>
          <label>Attachment</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewComplaint;
