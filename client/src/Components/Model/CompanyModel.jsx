import { motion } from "framer-motion";
import useFormHook from "../../Hooks/useFormHook";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompanyState,
  setMessageEmpty,
} from "../../Features/Company/CompanySlice";
import LoadingSpinner from "../LoadingSpin";
import FormInput from "../FormInput/FormInput";
import { useEffect, useState } from "react";
import {
  createCompany,
  updateCompany,
} from "../../Features/Company/CompanyApi";
import { Toastify } from "../../Utils/Tostify";

const CompanyModel = ({ setModel, title, singleData }) => {
  //============================================formhook
  const { input, setInput, handleInputChange } = useFormHook({
    companyName: "",
    location: "",
    contact: "",
    email: "",
    desc: "",
    website: "",
  });
  //======================================= TODO:state
  const { loader, error, message } = useSelector(getAllCompanyState);

  //================================================TODO all state
  const [componyAvatar, setCompanyAvatar] = useState(null);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();
  const handleCompanyAvatar = (e) => {
    setCompanyAvatar(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };
  //=========================================TODO:handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //==========================create form data
    if (singleData?._id) {
      const formData = new FormData();
      formData.append("companyName", input.companyName);
      formData.append("location", input.location);
      formData.append("contact", input.contact);
      formData.append("email", input.email);
      formData.append("desc", input.desc);
      formData.append("website", input.website);
      if (componyAvatar) {
        formData.append("companyAvatar", componyAvatar);
      }
      dispatch(updateCompany({ formData, id: singleData?._id })).then(() => {
        setModel(false);
        setInput({
          companyName: "",
          location: "",
          contact: "",
          email: "",
          desc: "",
          website: "",
        });
      });
    } else {
      const formData = new FormData();
      formData.append("companyName", input.companyName);
      formData.append("location", input.location);
      formData.append("contact", input.contact);
      formData.append("email", input.email);
      formData.append("desc", input.desc);
      formData.append("website", input.website);
      formData.append("companyAvatar", componyAvatar);
      if (componyAvatar) {
        dispatch(createCompany(formData)).then(() => {
          setModel(false);
          setInput({
            companyName: "",
            location: "",
            contact: "",
            email: "",
            desc: "",
            website: "",
          });
        });
      }
    }
  };
  //=====================================  TODO:alert toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
      setModel(false);
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
      setModel(false);
    }

    // if (localStorage.getItem("Seller")) {
    //   navigate("/");
    // }
  }, [message, error, dispatch, setModel]);
  //====================================edit
  useEffect(() => {
    setInput((prev) => ({
      ...singleData,
    }));
    setUrl(singleData?.companyLogo);
  }, [singleData, setInput]);
  return (
    <>
      <div className="w-screen min-h-[1240px] h-screen pt-[150px] pl-[66px] bg-gray-900 bg-opacity-90 fixed bottom-0  top-0 left-0  z-[99999] flex justify-center ">
        {/* //================================================== TODO:close button  */}
        <button
          onClick={() => setModel(false)}
          className="absolute right-16 top-10 hover:scale-105 transition-all duration-500 ease-in-out z-[99999]"
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
        {/* //==========================================  TODO:main model  */}
        <motion.div
          initial={{ scale: 0.3 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="main_model z-[999999999] w-[500px] rounded-[10px] h-[65vh]   justify-center items-center flex flex-col bg-white border-2 pt-0 p-[42px] pb-0 scrollbar-custom relative"
        >
          {loader && (
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 1.3 }}
              className="w-full h-full absolute top-0 left-0 p-0 flex bg-opacity-25 justify-center items-center bg-primary  z-[999999999999999999]"
            >
              <div className="absolute top-[45%]">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}
          <div className="pt-[10px] bg-white w-full col-span-2">
            <h1 className="text-gray-900 font-['Lato'] tracking-[.8px] text-4xl  font-[800]">
              {title ? title : "Add New Company"}
            </h1>
          </div>
          {/* //========================= TODO:form  */}
          <form
            onSubmit={handleSubmit}
            className="form_content col-span-2 grid relative justify-between mt-[10px] overflow-hidden items-center"
          >
            <div className="flex flex-col justify-center w-full right">
              <div className="grid justify-center grid-cols-2 gap-2 gap-y-2">
                <FormInput
                  placeholder="company name"
                  label={"company name"}
                  name="companyName"
                  type="text"
                  value={input.companyName}
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Location"
                  label={"Company location"}
                  type="text"
                  name="location"
                  value={input.location}
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="email"
                  label={" Company email"}
                  type="email"
                  name="email"
                  value={input.email}
                  handleInputChange={handleInputChange}
                />

                <FormInput
                  placeholder="Website"
                  label={"Company website"}
                  name="website"
                  value={input.website}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Contact"
                  label={"Company contact"}
                  name="contact"
                  value={input.contact}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Company Name"
                  label={"Company Name"}
                  name="companyName"
                  value={input.companyName}
                  type="text"
                  handleInputChange={handleInputChange}
                />

                <FormInput
                  placeholder="description"
                  label={"Company description"}
                  name="desc"
                  value={input.desc}
                  type="text"
                  handleInputChange={handleInputChange}
                />

                <div className="flex justify-center col-span-2 gap-5">
                  <motion.label
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    htmlFor="uploadCompanyAvatar"
                    className="avatar border  flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]"
                  >
                    {url ? (
                      <img className="object-cover w-full h-full" src={url} />
                    ) : (
                      "company Logo"
                    )}
                  </motion.label>
                </div>

                <input
                  type="file"
                  onChange={handleCompanyAvatar}
                  className="hidden"
                  id="uploadCompanyAvatar"
                />
              </div>
              <div className="flex flex-col items-center justify-center col-span-2 mt-5 bg-white submit_section ">
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * Math.random() * 10,
                  }}
                  className="agree flex w-full align-middle items-center gap-[20px]"
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
                  className="text-white hover:scale-110  mt-[15px] bg-primary  w-[100%] h-[36px] rounded-lg font-['Lato'] flex justify-center items-center text-md  font-[500] hover:bg-secondary   my-3 transition-all ease-in-out duration-500"
                >
                  Submit Now
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CompanyModel;
