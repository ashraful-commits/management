import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../LoadingSpin";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import FormInput from "../FormInput/FormInput";
import {
  AddSalePerson,
  LoggedInSeller,
  SellerRegistration,
  updateSeller,
} from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import { setMessageEmpty } from "../../Features/Client/ClientSlice";
import { motion } from "framer-motion";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";
import { getAllCompany } from "../../Features/Company/CompanyApi";
import DeleteIcon from "../../Icons/DeleteIcon";

const SalesModel = ({ setModel, sellerId, singleData, title }) => {
  const {
    loader: salesLoader,
    message,
    error,
    loginInSeller,
  } = useSelector(getAllSellerState);
  const { company } = useSelector(getAllCompanyState);
  const [input, setInput] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    avatar: "",
    employment: "",
    website: "",
    company: "",
  });
  //========================================== TODO:ref
  const form = useRef();
  //================================ TODO:state
  const [avatar, setAvatar] = useState(null);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  //======================== TODO:handle Avatar

  const handleSellerAvatar = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };

  //=========================== TODO:handle inputChange
  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //============================  TODO:form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (singleData?._id) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("company", input.company);
      if (input.role) {
        formData.append("role", input.role);
      }
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      if (photo) {
        formData.append("sellerAvatar", photo);
      }

      dispatch(updateSeller({ id: singleData?._id, formData })).then(() => {
        dispatch(LoggedInSeller());
        setModel(false);
        setInput({
          name: "",
          role: "",
          email: "",
          password: "",
          avatar: "",
          employment: "",
          website: "",
          company: "",
        });
      });
    } else {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("company", input.company);
      if (input.role) {
        formData.append("role", input.role);
      }
      formData.append("website", input.website);
      formData.append("employment", input.employment);
      formData.append("sellerAvatar", photo);

      formData.append("sellerId", sellerId);
      if (photo) {
        dispatch(SellerRegistration(formData)).then(() => {
          setInput({
            name: "",
            role: "",
            email: "",
            password: "",
            avatar: "",
            employment: "",
            website: "",
            company: "",
          });
        });
      }
      if (photo && sellerId) {
        setModel(false);
        AddSalePerson(formData);
      }
    }
  };
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
  }, [error, message, dispatch, setModel]);
  useEffect(() => {
    setInput({ ...singleData, company: singleData?.company?._id });
    setAvatar(singleData?.avatar);
  }, [singleData]);
  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);
  return (
    <>
      <div className="w-screen min-h-[1240px] h-screen pt-[150px] pl-[66px] bg-gray-900 bg-opacity-90 fixed bottom-0  top-0 left-0  z-[99999] flex justify-center ">
        {/* //================================================== TODO:close button  */}
        <button
          onClick={() => setModel(false)}
          className="absolute right-16 top-10 hover:scale-105 transition-all duration-500 ease-in-out z-[99999]"
        >
          <DeleteIcon />
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
          {salesLoader && (
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
              {title ? title : "Add New"} person
            </h1>
          </div>
          {/* //========================= TODO:form  */}
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="form_content col-span-2 grid relative justify-between mt-[10px] overflow-hidden items-center"
          >
            <div className="flex flex-col justify-center w-full right">
              <div className="grid justify-center grid-cols-2 gap-2 gap-y-2">
                <FormInput
                  placeholder="Name"
                  label={"Name"}
                  name="name"
                  type="text"
                  value={input.name}
                  handleInputChange={handleInputChange}
                />
                <FormInput
                  placeholder="Email"
                  label={"Email"}
                  type="email"
                  name="email"
                  value={input.email}
                  handleInputChange={handleInputChange}
                />
                {title === "Edit sales" ||
                loginInSeller?.role === "super_admin" ? (
                  ""
                ) : (
                  <FormInput
                    placeholder="Password"
                    label={"Password"}
                    name="password"
                    value={input.password}
                    type="password"
                    handleInputChange={handleInputChange}
                  />
                )}

                <FormInput
                  placeholder="Website"
                  label={"Website"}
                  name="website"
                  value={input.website}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                <div className="flex flex-col gap-y-2">
                  <label
                    className="text-xs  text-['Work_sans'] font-[600]"
                    htmlFor=""
                  >
                    Company Name
                  </label>
                  <select
                    onChange={handleInputChange}
                    className="w-full px-2 border rounded-md h-9 focus:outline-none"
                    name="company"
                    id=""
                    value={input.company}
                  >
                    <option value="">...</option>
                    {company?.map((item, index) => {
                      return (
                        <option
                          selected={input?.company === item?._id}
                          value={item?._id}
                          key={index}
                        >
                          {item.companyName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <FormInput
                  placeholder="employment"
                  label={"Employment"}
                  name="employment"
                  value={input.employment}
                  type="text"
                  handleInputChange={handleInputChange}
                />
                {loginInSeller?.role === "super_admin" && (
                  <div className="flex flex-col gap-y-1">
                    <label
                      className="text-gray-900 text-start w-full my-2 font-[800] text-xs  font-['Lato']"
                      htmlFor=""
                    >
                      Role
                    </label>
                    <motion.select
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 * Math.random() * 10,
                      }}
                      className="border w-full focus:outline-none  text-gray-500 px-[12px] tracking-[.5px] h-[37px] my-2 font-['work_sans'] rounded-md mt-[-10px]"
                      name="role"
                      value={input.role}
                      onChange={handleInputChange}
                    >
                      <option
                        className="text-gray-500 border-none"
                        value="user"
                      >
                        User
                      </option>
                      <option
                        className="text-gray-500 border-none"
                        value="admin"
                      >
                        Admin
                      </option>
                      <option
                        className="text-gray-500 border-none"
                        value="super_admin"
                      >
                        Super admin
                      </option>
                    </motion.select>
                  </div>
                )}

                <div className="flex justify-center col-span-2 gap-5">
                  <motion.label
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * Math.random() * 10,
                    }}
                    htmlFor="uploadAvatar"
                    className="avatar border  flex justify-center items-center w-[150px] ml-[4px] overflow-hidden mt-[4px] rounded-md h-[140px]"
                  >
                    {avatar ? (
                      <img
                        className="object-cover w-full h-full"
                        src={avatar}
                      />
                    ) : (
                      "Select avatar"
                    )}
                  </motion.label>
                </div>

                <input
                  type="file"
                  onChange={handleSellerAvatar}
                  className="hidden"
                  id="uploadAvatar"
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

export default SalesModel;
