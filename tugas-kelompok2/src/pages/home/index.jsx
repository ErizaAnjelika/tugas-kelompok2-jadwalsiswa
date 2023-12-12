import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("akun") === null) {
      return navigate("/login");
    }
  });
  // return redirect("/login");
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="ps-3 col content">
          <h1>ini home</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
