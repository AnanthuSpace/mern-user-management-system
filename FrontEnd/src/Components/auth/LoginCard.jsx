import "../../assets/styles/LoginCard.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userVerification } from "../../redux/users/userThunk";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function LoginCard({ admin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userVerification({ email, password, toast }));
  };

  useEffect(() => {
    if (userData) {
      navigate("/profile");
    }
  }, [userData])


  return (
    <>
      <ToastContainer />
      <div className="main-div">
        <div className="login-card shadow-box">
          {admin ? <h1> Admin Login</h1> : <h1>Login</h1>}
          <form className="form" onSubmit={(e) => handleLogin(e)}>
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
            {admin ? (
              ""
            ) : (
              <p className="link" onClick={() => navigate("/signup")}>
                Dont't have an account Register
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginCard;
