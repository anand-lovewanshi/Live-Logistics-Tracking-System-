import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#1a1a2e",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60
      }}
    >
      <Link
        to="/"
        style={{
          color: "#e94560",
          fontWeight: "bold",
          fontSize: 22,
          textDecoration: "none"
        }}
      >
        🛒 ShopMERN
      </Link>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ color: "#ccc", fontSize: 14 }}>Hi, {user.name}</span>
            {user.role === "admin" && (
              <Link
                to="/admin"
                style={{
                  color: "#e94560",
                  textDecoration: "none",
                  fontSize: 14
                }}
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                background: "#e94560",
                color: "#fff",
                border: "none",
                padding: "6px 14px",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#ccc", textDecoration: "none" }}>
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "#e94560", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
