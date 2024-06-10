import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registration } from "../../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Registration.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registration({
      username,
      email,
      password,
      repassword,
      toast,
    });
    if (response === "success") {
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="main-div">
        <div className="card shadow-box">
          <h1>SignUp</h1>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <label className="label">Username</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label">Email</label>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Conifrm Password</label>
            <input
              type="password"
              className="input"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <button type="submit" className="button">
              SignUp
            </button>
            <p className="link" onClick={() => navigate("/")}>
              Already have an account? Login
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
