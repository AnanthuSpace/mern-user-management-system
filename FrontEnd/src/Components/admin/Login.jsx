import "../../assets/styles/LoginCard.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../redux/admin/adminThunk";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.admin.adminToken);

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, toast }));
  };

  return (
    <>
    {console.log("Login page wrkg")}
      <ToastContainer />
      <div className="main-div">
        <div className="login-card shadow-box">
          <h1> Admin Login</h1>
          <form className="form" onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
