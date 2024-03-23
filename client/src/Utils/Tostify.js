import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Toastify = (msg, type = "success") => {
  toast[type](msg, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};
