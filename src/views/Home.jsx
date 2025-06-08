// import { useContext } from "react";
import UserContext from "../../UserContext";
import Navbar from "./partials/Navbar";

const Home = () => {
  // const {count} = useContext(UserContext);
  return (
    <>
    <Navbar/>
      <p>Home page</p>
    </>
  );
};

export default Home;
