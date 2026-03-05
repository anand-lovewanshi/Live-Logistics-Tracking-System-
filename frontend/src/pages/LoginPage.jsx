import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, clearError } from "../redux/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/");
    return () => dispatch(clearError());
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  const s = {
    input: {
      width: "100%",
      padding: "12px 14px",
      border: "1px solid #ddd",
      borderRadius: 8,
      fontSize: 15,
      marginBottom: 16
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 40,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 420
        }}
      >
        <h2 style={{ marginBottom: 28, fontSize: 26, fontWeight: 700 }}>
          Welcome Back 👋
        </h2>
        {error && (
          <div
            style={{
              background: "#fdecea",
              color: "#e94560",
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 14
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            style={s.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            style={s.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#e94560",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#e94560" }}>
            Register
          </Link>
        </p>
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f9f9f9",
            borderRadius: 8,
            fontSize: 13,
            color: "#666"
          }}
        >
          <strong>Demo:</strong>
          <br />
          Admin: admin@test.com / admin123
          <br />
          User: user@test.com / user123
        </div>
      </div>
    </div>
  );
}
