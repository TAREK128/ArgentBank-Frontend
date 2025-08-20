import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import "../css/Header.css"; // استيراد ملف CSS الجديد

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div className="log_out">
        {!token ? (
          <Link className="main-nav-item" to="/login">
            <i className="fas fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fas fa-user-circle"></i>
              {user?.firstName || "User"}
            </Link>
            <button className="main-nav-item logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;