import { Router } from "express";
import supabase from "../utils/supabaseAuth.js";
import pool from "../utils/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const registerData = {
    email: req.body.email,
    password: req.body.password,
    package: req.body.package,
    role: req.body.role,
    username: req.body.username,
  };
  const created_at = new Date();
  const updated_at = new Date();

  try {
    const checkEmail = await pool.query(
      "select email from user_profile where email = $1 ",
      [req.body.email]
    );

    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const query = `insert into user_profile (email,role,package,user_name,created_at,updated_at) values($1,$2,$3,$4,$5,$6)`;
    const value = [
      registerData.email,
      registerData.role,
      registerData.package,
      registerData.username,
      created_at,
      updated_at,
    ];

    await pool.query(query, value);

    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      console.log(error.message);
      return res.status(500).json({
        message: error,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Registration failed",
      error_message: error,
    });
  }
  return res.status(200).json({
    message: "register successfully",
  });
});

authRouter.post("/login", async (req, res) => {
  const loginData = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
      if (error.message === "Invalid login credentials") {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }
      if (error.message === "Email not confirmed") {
        return res.status(400).json({
          message: "Email not confirmed",
        });
      }
    }
    if (data) {
      const result = await pool.query(
        "SELECT id,email, package, role ,created_at  FROM user_profile WHERE email = $1",
        [loginData.email]
      );

      // const token = data.session.access_token;
      // console.log(result.rows[0]);
      const token = jwt.sign(
        {
          data: result.rows[0],
        },
        process.env.SECRET_KEY,
        // { expiresIn: "900000" }
        { expiresIn: "43200000" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

authRouter.get("/logout", async (req, res) => {
  await supabase.auth.signOut();
  return res.json({
    message: "logout",
  });
});

export default authRouter;
