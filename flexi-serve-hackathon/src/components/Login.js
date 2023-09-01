import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useErrorBoundary } from 'react-error-boundary'

export const validate = (username, password) => {
  let result = true;
  if (username === "" || username === null) {
    result = false;
    toast.warning("Please Enter Username");
  }
  if (password === "" || password === null) {
    result = false;
    toast.warning("Please Enter Password");
  }
  return result;
};

const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate(username, password)) {
      fetch("http://localhost:8080/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else if (resp.password === password) {
            toast.success("Success");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userrole", resp.role);
            navigate("/");
          } else {
            toast.error("Please Enter valid credentials");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
          showBoundary(err);
        });
    }
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={login} className="container" data-testid="form">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="username">
                  Username <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                  id="username"
                  type="text"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                  id="password"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-link text-bg-light" to={"/register"}>
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;