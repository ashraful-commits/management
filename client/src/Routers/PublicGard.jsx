import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicGard = () => {
  //=============================================seller state
  const { loginInSeller } = useSelector((state) => state.Seller);
  if (!localStorage.getItem("Seller") || !localStorage.getItem("Client")) {
    return <Outlet />;
  }
  //===================================================return
  return loginInSeller ? <Navigate to="/" /> : <Outlet />;
};

export default PublicGard;
