import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Logout = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/')
  }, [setIsLoggedIn, navigate])

  return (
    <p>Loggin out...</p>
  )
};

export default Logout;