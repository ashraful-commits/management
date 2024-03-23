import { Link, useNavigate } from "react-router-dom";
import FormInput from "./../Components/FormInput/FormInput";
import useFormHook from "./../Hooks/useFormHook";
import { useDispatch, useSelector } from "react-redux";
import { SellerLogin } from "../Features/Seller/SellerApi";

import { useEffect, useState } from "react";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../Features/Seller/SellerSlice";
import { Toastify } from "../Utils/Tostify";
import LoadingSpinner from "../Components/LoadingSpin";
import { motion } from "framer-motion";
import { clientLogin } from "../Features/Client/ClientApi";
import { getAllClientState } from "../Features/Client/ClientSlice";

const Login = () => {
  const { input, setInput, handleInputChange } = useFormHook({
    email: "",
    password: "",
  });
  const {
    input: input2,
    setInput: setInput2,
    handleInputChange: handleClientInputChange,
  } = useFormHook({
    clientEmail: "",
    password: "",
  });
  //====================================
  const [loginState, setLoginState] = useState("seller");
  //===================================state
  const { message, error, loader } = useSelector(getAllSellerState);
  const {
    message: clientMsg,
    error: clientError,
    loader: clientLoader,
    clientLoginData,
  } = useSelector(getAllClientState);

  //=================================== dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //====================================== handle login submit

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(SellerLogin(input));
    setInput({ email: "", password: "" });
  };
  const handleClientLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(clientLogin(input2));
    setInput2({ clientEmail: "", password: "" });
  };

  //====================================== all alert toastify
  useEffect(() => {
    if (error || clientError) {
      Toastify(error || clientError, "error");
      dispatch(setMessageEmpty());
    }
    if (message || clientMsg) {
      Toastify(message || clientMsg, "success");
      dispatch(setMessageEmpty());
    }

    if (localStorage.getItem("Seller")) {
      navigate("/");
    }
    if (localStorage.getItem("Client") && clientLoginData) {
      navigate(`/${clientLoginData[0]?._id}`);
    }
  }, [message, error, navigate, dispatch, clientError, clientMsg]);
  return (
    <>
      {/* //=================================================loader  */}
      {loader ||
        (clientLoader && (
          <div className="absolute w-screen min-h-[1240px] h-screen z-[999999999] top-0 left-0 bg-primary  bg-opacity-20">
            <div className="w-full h-full flex absolute justify-center items-center top-[50%]">
              <LoadingSpinner />
            </div>
          </div>
        ))}

      <div className="relative z-0 flex flex-col items-center justify-center min-w-full min-h-screen gap-10 overflow-hidden">
        <div className="flex justify-center gap-5 ">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-3xl  font-['work_sans']">
              Seller Login
            </h1>
          </div>
        </div>
        <div className="login w-[400px] flex justify-start items-center flex-col h-[400px] rounded-lg shadow-md  bg-white">
          <h1 className="text-2xl  font-['Lato'] mt-[25px] text-cyan-800 font-[900] uppercase">
            Login
          </h1>
          {/* //================================================form  */}
          <form
            onSubmit={handleLoginSubmit}
            action=""
            className="mt-4 flex flex-col gap-5 py-5 border-t-[2px]"
          >
            <FormInput
              label="Email"
              type="email"
              required="required"
              placeholder="Email"
              name="email"
              value={input.email}
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              value={input.password}
              required="required"
              handleInputChange={handleInputChange}
            />
            <motion.button
              initial={{ y: -15, x: -15, opacity: 0.3 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.4,
              }}
              type="submit"
              className="text-xl  hover:scale-105 uppercase bg-primary  text-white flex justify-center items-center py-[4px] font-[500] w-[235px] mt-3 rounded-[50px] hover:bg-secondary   transition-all duration-500 ease-in-out"
            >
              Login
            </motion.button>
            <p className="text-xs  text-center text-gray-500">
              Don&apos;t have an account{" "}
              <Link
                className="text-cyan-700  font-[600] hover:text-cyan-700 transition-all duration-500 ease-out"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
