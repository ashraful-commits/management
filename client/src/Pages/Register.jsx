import { Link, useNavigate } from "react-router-dom";
import FormInput from "../Components/FormInput/FormInput";
import useFormHook from "../Hooks/useFormHook";
import { useDispatch, useSelector } from "react-redux";
import { SellerRegistration } from "../Features/Seller/SellerApi";
import { useEffect, useState } from "react";

import { Toastify } from "../Utils/Tostify";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../Features/Seller/SellerSlice";
import LoadingSpinner from "../Components/LoadingSpin";
import { motion } from "framer-motion";
import { getAllCompany } from "../Features/Company/CompanyApi";
import { getAllCompanyState } from "../Features/Company/CompanySlice";
const Register = () => {
  //================================================= use form hook
  const { input, setInput, handleInputChange } = useFormHook({
    name: "",
    email: "",
    password: "",
    employment: "",
    website: "",
    company: "",
  });
  //================================================get message
  const { message, error, loader } = useSelector(getAllSellerState);
  const { company } = useSelector(getAllCompanyState);
  //================================================ preview state
  const [avatar, setAvatar] = useState(null);
  //===============================================dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //==================================================== handle seller avatar
  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };
  //======================================================= handle company avatar

  //=============================================== handle submit
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    //===========================================
    if (avatar) {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      formData.append("company", input.company);
      formData.append("sellerAvatar", avatar);
      dispatch(SellerRegistration(formData));
      setAvatar(null);

      setInput({
        name: "",
        email: "",
        password: "",
        employment: "",
        website: "",
        company: "",
      });
      setAvatar(null);
    } else {
      Toastify("Select an avatar", "error");
      dispatch(setMessageEmpty());
    }
  };
  //==================================================== all message and alert toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
      navigate("/login");
    }
  }, [error, message, dispatch]);
  //=================================all company
  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);
  return (
    <>
      {/* //========================================loader  */}
      {loader && (
        <div className="absolute w-screen h-screen min-h-[1240px] z-[999999999] top-0 left-0 bg-primary  bg-opacity-20">
          <div className="w-full h-full flex absolute justify-center items-center top-[50%]">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {/* //=============================================main container  */}
      <div className="relative z-0 flex items-center justify-center min-w-full min-h-screen overflow-hidden">
        <div className="login w-[500px] flex justify-start items-center flex-col h-auto rounded-lg shadow-md  bg-white px-4">
          <h1 className="text-3xl  font-['Lato'] mt-[25px] text-cyan-800 font-[900] uppercase">
            Register
          </h1>
          {/* //================================================form  */}
          <form
            onSubmit={handleSubmitRegister}
            action=""
            className="mt-4 grid grid-cols-2 gap-5 py-5 border-t-[2px]"
          >
            <FormInput
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              value={input.email}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Employment"
              type="required"
              placeholder="employment"
              name="employment"
              value={input.employment}
              required="required"
              handleInputChange={handleInputChange}
            />
            <FormInput
              label="Website Link"
              type="text"
              placeholder="Website link"
              name="website"
              required="required"
              value={input.website}
              handleInputChange={handleInputChange}
            />
            <div className="flex flex-col ">
              <label htmlFor="">Company Name</label>
              <select
                className="mt-1 border rounded-md h-9 focus:outline-none"
                onChange={handleInputChange}
                value={input.company}
                name="company"
                id=""
              >
                <option value="">....</option>
                {company?.map((item, index) => {
                  return (
                    <option key={index} value={item?._id}>
                      {item?.companyName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center justify-center w-full col-span-2 gap-5 imgPrev">
              <motion.label
                htmlFor="sellerAvatar"
                className="w-[100px] h-[100px] border rounded-full overflow-hidden p-[5px]"
              >
                {" "}
                {avatar ? (
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={URL.createObjectURL(avatar)}
                    alt=""
                  />
                ) : (
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                    alt=""
                  />
                )}
              </motion.label>
            </div>
            <input
              type="file"
              onChange={handleAvatar}
              className="hidden"
              id="sellerAvatar"
            />

            <motion.button
              initial={{ y: -15, x: -15, opacity: 0.3 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.8,
              }}
              type="submit"
              className="text-xl  hover:scale-105 col-span-2 uppercase bg-primary  text-white flex justify-center items-center py-[4px] font-[500] w-full mt-3 rounded-[50px] hover:bg-secondary   transition-all duration-500 ease-in-out"
            >
              Register
            </motion.button>
            <p className="text-xs  col-span-2 w-full text-center text-gray-500">
              Already have an account
              <Link
                className="text-cyan-700  px-[5px] font-[600] hover:text-cyan-700 transition-all duration-500 ease-out"
                to="/Login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
