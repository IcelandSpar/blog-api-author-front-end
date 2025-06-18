import { useParams } from "react-router-dom";

import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";

const Blog = () => {
  const { blogId } = useParams();

  return (
    <>
      <Sidebar />
      <Navbar/>
      <p>Blog number {blogId}</p>
    </>
  );
};

export default Blog;
