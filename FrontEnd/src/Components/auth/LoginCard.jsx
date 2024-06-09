import "../../assets/styles/LoginCard.css";
import { useNavigate } from 'react-router-dom'

function LoginCard({admin}) {
  const navigate = useNavigate()
  return (
    <div className="main-div">
      <div className="card shadow-box">
        {admin ? 
        <h1> Admin Login</h1> :
        <h1>Login</h1>
      }
        <form className="form">
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
            Login
          </button>
          {admin ? "" :
          <p className="link" onClick={()=>(navigate('/signup'))}>Dont't have an account Register</p>
          }
        </form>
      </div>  
    </div>
  );
}

export default LoginCard;
