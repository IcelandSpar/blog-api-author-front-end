// import { useContext } from "react";
import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";

const Home = () => {
  // const {count} = useContext(UserContext);
  return (
    <>
    <Navbar/>
    <Sidebar/>
      <p>Home page</p>
    </>
  );
};

export default Home;
