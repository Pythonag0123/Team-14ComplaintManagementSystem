import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async ({ name, email, password, role }) => {
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashed, role]
  );
  return { id: result.insertId, name, email, role };
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email
  ]);
  return rows[0];
};

export const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};
