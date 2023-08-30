import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppHeader = () => {
  const [displayUsername, displayUsernameUpdate] = useState("");
  const [showMenu, showMenuUpdate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      showMenuUpdate(false);
    } else {
      showMenuUpdate(true);
      let username = sessionStorage.getItem("username");
      if (username === "" || username === null) {
        navigate("/login");
      } else {
        displayUsernameUpdate(username);
      }
    }
  }, [location]);
  return (
    <div>
      {showMenu && (
        <div className="header">
          <Link to={"/"}>Home</Link>
          <Link to={"/order-history"}>Order History</Link>
          <span style={{ marginLeft: "70%" }}>
            Welcome <b>{displayUsername}</b>
          </span>
          <Link style={{ float: "right" }} to={"/login"}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
