import '../../assets/styles/Registration.css'
import { useNavigate } from "react-router-dom";

function Registration() {

  const navigate = useNavigate();
  return (
    <div className="main-div">
      <div className="card shadow-box">
        <h1>SignUp</h1>
        <form className="form">
        <label htmlFor="email" className="label">
            Username
          </label>
          <input
            type="text"
            className="input"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            className="input"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="input"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            SignUp
          </button>
          <p className="link" onClick={()=>(navigate('/'))}>Already have an account? Login</p>
        </form>
      </div>
    </div>
  )
}

export default Registration