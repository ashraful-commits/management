import { useEffect, useState } from "react";
import useFormHook from "../../Hooks/useFormHook";
import FormInput from "../FormInput/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { createClient, updateClient } from "../../Features/Client/ClientApi";
import {
  getAllClientState,
  setMessageEmpty,
} from "./../../Features/Client/ClientSlice";
import { Toastify } from "../../Utils/Tostify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpin";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import {
  LoggedInSeller,
  getSingleSeller,
} from "../../Features/Seller/SellerApi";
import { motion } from "framer-motion";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";

const ClientModel = ({ setClient, singleData, setForm, title }) => {
  //=============================  TODO:form hook
  const { input, setInput, handleInputChange } = useFormHook({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    country: "",
    state: "",
    clientAddress: "",
    clientAvatar: "",
    password: "",
    company: "",
  });

  //========================== TODO:file preview
  const [Id, setId] = useState({});

  //================================== TODO:handle project file
  const { client, message, loader, error } = useSelector(getAllClientState);
  const { loginInSeller } = useSelector(getAllSellerState);
  const { company } = useSelector(getAllCompanyState);
  const [avatar, setAvatar] = useState(null);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //================================ TODO:handle client avatar
  const handleClientAvatar = (e) => {
    setPhoto(e.target.files[0]);
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  //====================================== TODO:handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
    const formData = new FormData();
    if (Id) {
      formData.append("clientName", input.clientName);
      formData.append("clientPhone", input.clientPhone);
      formData.append("clientEmail", input.clientEmail);
      formData.append("country", input.country);
      formData.append("state", input.state);
      formData.append("clientAddress", input.clientAddress);
      formData.append("clientAvatar", photo);
      formData.append("company", input.company);
      formData.append("sellerId", sellerId);
      dispatch(updateClient({ formData, id: Id }))
        .then(() => {
          dispatch(LoggedInSeller());
          dispatch(getSingleSeller());
        })
        .catch((error) => {
          console.error("Error updating client:", error);
        });
      setInput({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        country: "",
        state: "",
        clientAddress: "",
        companyName: "",
      });
      setId(null);
    } else {
      if (photo) {
        const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
        formData.append("clientName", input.clientName);
        formData.append("clientPhone", input.clientPhone);
        formData.append("clientEmail", input.clientEmail);
        formData.append("country", input.country);
        formData.append("state", input.state);
        formData.append("clientAddress", input.clientAddress);
        formData.append("clientAvatar", photo);
        formData.append("password", input.password);
        formData.append("company", input.company);
        formData.append("sellerId", sellerId);
        dispatch(createClient(formData));
        setInput({
          clientName: "",
          clientEmail: "",
          clientPhone: "",
          country: "",
          state: "",
          clientAddress: "",
          company: "",
        });
        setPhoto(null);
      } else {
        Toastify("Select Client Avatar", "error");
        dispatch(setMessageEmpty());
      }
    }
  };

  //=====================================  TODO:alert toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
      setClient(false);
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
      setClient(false);
    }

    // if (localStorage.getItem("Seller")) {
    //   navigate("/");
    // }
  }, [message, error, navigate, dispatch, setClient]);
  //========================================= TODO:single edit data
  useEffect(() => {
    setInput({ ...singleData });
    setId(singleData?._id);
    setAvatar(singleData?.clientAvatar);
  }, [singleData, setInput]);
  return (
    <motion.div className="w-screen h-screen pt-[50px] pl-[66px] bg-gray-900 bg-opacity-90 fixed top-0 left-0 scroll-smooth overflow-y-auto z-[99999] flex justify-center">
      {/* //==================================================== TODO:close button  */}
      <button
        onClick={() => setClient(false)}
        className="absolute right-16 top-10 z-[99999]"
      >
        <svg
          width="23px"
          height="23px"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <path
            style={{ fill: "#ffffff", stroke: "none", strokeWidth: 4 }}
            d="M 20,4 3,21 33,50 3,80 20,97 49,67 79,97 95,80 65,50 95,20 80,4 50,34 z"
          />
        </svg>
      </button>
      {/* //==================================================== TODO:main model  */}
      <motion.div
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{
          duration: 1.5,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        className="main_model z-[999999999] w-[868px] rounded-[10px] relative h-[90vh] scroll-smooth overflow-y-scroll flex justify-start items-start flex-col bg-white border-2 pt-0 p-[42px] pb-0 scrollbar-custom"
      >
        {/* //=========================================================  TODO:loader  */}
        {loader && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 1.3 }}
            className="w-full h-full absolute top-0 left-0 p-0 flex bg-opacity-30 justify-center items-center bg-primary  z-[99999999999999999]"
          >
            <div className="w-full h-full absolute top-[45%]">
              <LoadingSpinner />
            </div>
          </motion.div>
        )}
        <div className=" sticky top-0 pt-[42px] bg-white w-full">
          <div className="flex">
            <button
              className="flex justify-center items-center w-[150px] h-[40px] font-bold text-white hover:bg-secondary   transition-all duration-500 ease-in-out bg-primary  rounded-md"
              onClick={() => setForm(true)}
            >
              {title}
            </button>
          </div>
          <h1 className="text-gray-900 font-['Lato'] tracking-[.8px] text-4xl  font-[800]">
            Please add Client Details information
          </h1>
        </div>

        {/* //===============================================================  TODO:form  */}
        <form
          onSubmit={handleSubmit}
          className="form_content grid gap-[45px] relative grid-flow-col justify-between mt-[43px] scroll-smooth overflow-y-auto"
        >
          {/* //========================================================= TODO:right section  */}
          <div className="right w-[490px] flex flex-col gap-[36px]">
            <div className="flex flex-col items-start client_information">
              <h5 className="text-gray-900 tracking-[.6px] text-lg  font-['Lato'] font-[600]">
                Client Information
              </h5>
              <div className="sections w-full grid grid-cols-2 gap-[20px]">
                <div className="right_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <FormInput
                    type="text"
                    placeholder="Jone Duo"
                    label="Client Name"
                    width={"30px"}
                    name="clientName"
                    value={input.clientName}
                    handleInputChange={handleInputChange}
                  />
                  <FormInput
                    type="email"
                    placeholder="Enter Email"
                    label="Client email"
                    name="clientEmail"
                    value={input.clientEmail}
                    handleInputChange={handleInputChange}
                  />
                  {singleData ? (
                    ""
                  ) : (
                    <FormInput
                      type="password"
                      placeholder="Enter Password"
                      label="Password"
                      name="password"
                      value={input.password}
                      handleInputChange={handleInputChange}
                    />
                  )}

                  <label
                    className="text-gray-900 font-[800] text-xs  font-['Lato']"
                    htmlFor=""
                  >
                    Country
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato'] transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="country"
                    value={input.country}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>
                    <option className="text-gray-500" value="United State">
                      United State
                    </option>
                    <option className="text-gray-500" value="Bangladesh">
                      Bangladesh
                    </option>
                    <option className="text-gray-500" value="England">
                      England
                    </option>
                    <option className="text-gray-500" value="Rassia">
                      Rassia
                    </option>
                  </select>
                </div>
                <div className="left_section w-full flex flex-col gap-[19px] items-start mt-[17px]">
                  <label
                    className="text-gray-900 font-[800] text-xs  font-['Lato']"
                    htmlFor=""
                  >
                    Company Name
                  </label>
                  <select
                    className="border w-full text-gray-500 px-[12px] tracking-[.5px] h-[37px] font-['Lato']  transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="company"
                    value={input.company}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500" value="">
                      ....
                    </option>

                    {company
                      ?.filter((item) => item.status == true)
                      .map((item, i) => {
                        return (
                          <option
                            key={i}
                            className="text-gray-500"
                            value={item?._id}
                            selected={input?.company === item?._id}
                          >
                            {item?.companyName}
                          </option>
                        );
                      })}
                  </select>
                  <FormInput
                    type="text"
                    placeholder="Enter Phone"
                    label="Client Phone Number"
                    name="clientPhone"
                    value={input.clientPhone}
                    handleInputChange={handleInputChange}
                  />

                  <label
                    className="text-gray-900 font-[800] text-xs  font-['Lato']"
                    htmlFor=""
                  >
                    State
                  </label>
                  <select
                    className="border w-full h-[37px]  text-gray-500 px-[12px] tracking-[.5px]  transition-all duration-500 ease-in-out rounded-md mt-[-10px]"
                    name="state"
                    value={input.state}
                    onChange={handleInputChange}
                  >
                    <option className="text-gray-500 " value="">
                      ....
                    </option>
                    <option className="text-gray-500 " value="Texas">
                      Texas
                    </option>
                    <option className="text-gray-500 " value="Dhaka">
                      Dhaka
                    </option>
                    <option className="text-gray-500 " value="London">
                      London
                    </option>
                  </select>
                </div>
              </div>
              <label
                className="text-gray-900 font-[800] text-xs  font-['Lato'] mt-[20px]"
                htmlFor=""
              >
                Client Full Address
              </label>

              <motion.input
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * Math.random() * 10,
                }}
                name="clientAddress"
                value={input.clientAddress}
                onChange={handleInputChange}
                className="w-full border mt-[10px] h-[36px] rounded-md pl-[16px] placeholder:uppercase placeholder:font-['Lato']"
                type="text"
                placeholder="3401 STAMFORD ST LAREDO TX 78043-1972 USA"
              />
            </div>

            <div className="flex flex-col items-start project_datials">
              <div className="sections w-full items-center justify-center grid grid-cols-2 gap-[20px]"></div>
            </div>
            <div className="submit_section sticky bottom-0 bg-white flex justify-between items-start py-[42px]">
              <motion.div
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * Math.random() * 10,
                }}
                className="agree flex items-center gap-[20px]"
              >
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                <label
                  className="text-gray-900 font-[800] text-xs  font-['Lato']"
                  htmlFor="i agree with all "
                >
                  I agree with all
                  <a
                    className="text-cyan-700  hover:text-cyan-800 transition-all duration-500 pl-[5px]"
                    href=""
                  >
                    terms & condition
                  </a>
                </label>
              </motion.div>
              <motion.button
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * Math.random() * 10,
                }}
                type="submit"
                className="text-white mt-[-15px]  bg-primary  w-[145px] h-[36px] rounded-lg font-['Lato'] flex justify-center items-center text-md  font-[500] hover:bg-secondary   transition-all ease-in-out duration-500 hover:scale-105 "
              >
                Submit Now
              </motion.button>
            </div>
          </div>
          {/* //=============================================================== left section  */}
          <div className="left w-[220px] flex flex-col items-start">
            <motion.div
              initial={{ y: -15, opacity: 0.3 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * Math.random() * 10,
              }}
              className="avatar border flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]"
            >
              {avatar ? (
                <img className="object-cover w-full h-full" src={avatar} />
              ) : (
                "Select avatar"
              )}
            </motion.div>
            <motion.label
              initial={{ y: -15, opacity: 0.3 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * Math.random() * 10,
              }}
              className="border  text-gray-500 font-['Lato'] font-[600] w-[180px] h-[36px] mt-[12px] ml-[5px] flex justify-center rounded-md items-center"
              htmlFor="uploadAvatar"
            >
              Upload client avatar
            </motion.label>
            <input
              type="file"
              onChange={handleClientAvatar}
              className="hidden"
              id="uploadAvatar"
            />
            <p className="text-gray-700 font-[600] text-lg  font-['Work_Sans'] mt-[20px] ml-[5px] ">
              Contact Us
            </p>
            <p className="text-gray-400 font-['Work_Sans'] tracking-[px] text-left">
              For any quires or information contact with our support team
            </p>
            <label className="text-gray-300 mt-[15px] ml-[5px]" htmlFor="">
              Phone
            </label>
            <h4 className="text-gray-800 text-xl  font-[700] font-['Work_Sans'] ml-[5px]">
              (880) 22- 9944
            </h4>
            <label className="text-gray-300 mt-[18px] ml-[5px]" htmlFor="">
              Email
            </label>
            <h4 className="text-gray-800 text-xl  font-[600] mt-[2px] font-['Work_Sans'] ml-[6px] tracking-[-.5px]">
              info@imageappeal.com
            </h4>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ClientModel;
