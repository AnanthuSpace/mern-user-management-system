import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const IsUser = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  if (token) {
    return children;
  }
};

export default IsUser;
