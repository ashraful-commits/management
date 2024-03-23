import { RouterProvider } from "react-router-dom";
import PageRouter from "./Routers/PageRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoggedInSeller } from "./Features/Seller/SellerApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoggedInSeller());
  }, [dispatch]);
  return (
    <>
      <AnimatePresence initial={true} mode="wait">
        <RouterProvider router={PageRouter} />
        <ToastContainer />
      </AnimatePresence>
    </>
  );
}

export default App;
