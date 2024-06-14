import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function IsAdmin({ children }) {
  const token = useSelector((state) => state.admin.adminToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  if (token) {
    return children;
  }

}

export default IsAdmin;
