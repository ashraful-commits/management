import { useEffect, useState } from "react";

import Model from "../../Components/Model/Model";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInSeller, LogoutSeller } from "../../Features/Seller/SellerApi";
import { Toastify } from "../../Utils/Tostify";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../../Features/Seller/SellerSlice";

import { calculateTotalCommissionForAllClients } from "../../Utils/CommissionCount";

import useFormHook from "../../Hooks/useFormHook";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { getAllCompany } from "../../Features/Company/CompanyApi";
import Header from "../../Components/Header";
import ClientModel from "../../Components/Model/ClientModel";
import TableComponent from "./../../Components/Tables/TableComponent";
import SellerTableComponent from "../../Components/Tables/SellerTableComponent";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";
import SalesModel from "../../Components/Model/SalesModel";
import { getAllClient } from "../../Features/Client/ClientApi";
import SellerClient from "../../Components/Tables/SellerClient";
import { getAllClientState } from "../../Features/Client/ClientSlice";
import CustomerIcon from "../../Icons/CustomerIcon";
import CommissionIcon from "../../Icons/CommissionIcon";
import RateIcon from "../../Icons/RateIcon";
import TotalIcon from "../../Icons/TotalIcon";
import WithdrawnIcon from "../../Icons/WithdrawnIcon";
import SearchIcon from "../../Icons/SearchIcon";
import DateIcon from "../../Icons/DateIcon";
import SortIcon from "../../Icons/SortIcon";
import ResetIcon from "../../Icons/ResetIcon";
import HelpIcon from "../../Icons/HelpIcon";
import AdminClient from "../../Components/Tables/AdminClient";
const Home = () => {
  //==============================================TODO:all state

  const [clientModel, setClientModel] = useState(false);
  const [salesModel, setSalesModel] = useState(false);
  const [Table, setTable] = useState("project");

  const [currentTime, setCurrentTime] = useState(false);
  const [Form, setForm] = useState(false);
  //====================================================TODO:use form hook
  const { input, setInput, handleInputChange } = useFormHook({
    text: "",
    endDate: "",
    startDate: "",
    status: "",
    email: "",
    role: "",
    company: "",
  });
  //====================================================== TODO:percentage state
  const [percentage, setPercentage] = useState(0);
  //=========================================== TODO:redux data
  const { error, message, loginInSeller, seller } =
    useSelector(getAllSellerState);
  //=========================================== TODO:redux data
  const { company } = useSelector(getAllCompanyState);
  const { client } = useSelector(getAllClientState);
  console.log(client);
  //===================================================== TODO:dispatch/navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //===========================================================TODO:handle logout

  //============================================================ TODO:toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, navigate]);
  //=============================================================== TODO:logged in seller data
  useEffect(() => {
    dispatch(LoggedInSeller());
    dispatch(getAllCompany());
    dispatch(getAllClient());
  }, [dispatch]);
  //================================================================== TODO:date format
  useEffect(() => {
    const currentDate = new Date();
    setCurrentTime(
      currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);
  //===================================================== TODO:percentage
  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const oneWeekAgo = new Date(startOfWeek);
    oneWeekAgo.setDate(startOfWeek.getDate() - 7);

    const currentWeekData = loginInSeller?.client.filter(
      (item) =>
        new Date(item.createdAt) >= startOfWeek &&
        new Date(item.createdAt) <= today
    );

    const lastWeekData = loginInSeller?.client.filter(
      (item) =>
        new Date(item.createdAt) >= oneWeekAgo &&
        new Date(item.createdAt) < startOfWeek
    );
    if (lastWeekData > 0) {
      const percentageChange =
        ((currentWeekData - lastWeekData) / lastWeekData) * 100;
      setPercentage(percentageChange);
    } else {
      // Handle the case where lastWeekData has zero length (to avoid division by zero)
      setPercentage(0);
    }
  }, [loginInSeller?.client]);

  //======================================================== TODO:return
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
        type: "spring",
        stiffness: 200,
        ease: [0.17, 0.67, 0.83, 0.67],
        delay: 0.2,
      }}
      className="min-w-[1340px] scroll-smooth  bg-[#fff] rounded-[15px] min-h-[909px] grid grid-flow-col overflow-hidden"
    >
      <>
        {/* //================================================ TODO:model  */}
        {clientModel && (
          <div>
            {Form ? (
              <Model
                setForm={setForm}
                title="Add Client"
                setClient={setClientModel}
              />
            ) : (
              <ClientModel
                setForm={setForm}
                title="Add project"
                setClient={setClientModel}
              />
            )}
          </div>
        )}
        {salesModel && (
          <SalesModel setModel={setSalesModel} sellerId={loginInSeller?._id} />
        )}

        {/**======================================================TODO:dashboard */}
        <div className="dashboard px-[35px] w-[1400px] mt-[58px] h-full">
          <Header loginInSeller={loginInSeller} />
          <div className="calculation mt-[30px] flex justify-between">
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.2,
              }}
              className="total_customer w-[305px] h-[150px] rounded-[8px] bg-primary  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out "
            >
              <div className="customer flex justify-start items-start mt-[10px] ml-[15px] gap-[9px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-white">
                  <CustomerIcon />
                </div>
                <p className="text-xs  text-white font-['Work_Sans'] mt-[8px] tracking-[.2px]">
                  Total Customers
                </p>
              </div>
              <div className="percentage flex justify-start px-4 gap-[10px] items-center">
                <h2 className="text-[35px] text-white mb-[10px] font-['Work_Sans']">
                  {loginInSeller?.projects?.length > 0
                    ? loginInSeller?.projects.length
                    : 0}
                </h2>
                <span className="text-[#3AAE54] border-[0.3px solid bg-[#5CCE75] text-xs  flex justify-between px-[7px] items-center gap-[5px] w-[49px] h-[19px] bg-opacity-[.1] text-[#5CCE75] rounded-md">
                  {percentage.toFixed(1)}%
                  <span>
                    <CommissionIcon />
                  </span>
                </span>

                <p className="text-white font-[400]  text-sm ">This Week</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.4,
              }}
              className="rate border w-[305px] h-[150px] rounded-[8px] bg-white  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out "
            >
              <div className="customer flex justify-start items-start w-full mt-[10px] pl-[15px]  border-b gap-[7px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center mt-[5px] bg-opacity-[.1] bg-[#5D5FEF] ">
                  <RateIcon />
                </div>
                <p className="text-xs  text-haiti  font-['Work_Sans'] mt-[11px] tracking-[.2px]">
                  Commission Rate
                </p>
              </div>
              <div className="rate mt-[12px]  px-[20px] flex justify-between gap-[5px] items-center">
                <h2 className="text-5xl  font-[500] text-haiti  mb-[10px] tracking-[.2px] font-['Work_Sans']">
                  {loginInSeller &&
                  loginInSeller?.projects &&
                  loginInSeller?.projects?.length > 0
                    ? loginInSeller?.projects?.reduce((acc, item) => {
                        const commission =
                          parseFloat(item?.commissionRate) || 0;
                        return acc + commission;
                      }, 0) / loginInSeller?.projects?.length
                    : 0}
                  %
                </h2>

                <button className="text-gray-500 font-[400] w-[98px] h-[19px] tracking-[0.7px]  text-sm  border bg-[#F5F5F5] rounded-[4px] mr-[22px] mb-[10px] hover:scale-105 duration-500 ease-in-out transition-all flex justify-center items-center">
                  view contract
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.6,
              }}
              className="total_commission w-[305px] border h-[150px] rounded-[8px] bg-white  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out"
            >
              <div className="total_earned flex justify-start items-start mt-[10px]  border-b pl-[12px] gap-[10px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-opacity-[.1] mt-[4px] bg-[#2F80ED] ">
                  <TotalIcon />
                </div>
                <p className="text-xs  text-haiti  font-['Work_Sans'] mt-[10px] tracking-[.2px]">
                  Total commissions Earned
                </p>
              </div>
              <div className="percentage flex justify-start gap-[10px] pl-[22px] items-end">
                <h2 className="text-5xl  text-haiti  mb-[10px] font-[500] font-['Work_Sans'] tracking-[.2px]">
                  ${" "}
                  {calculateTotalCommissionForAllClients(
                    loginInSeller?.projects
                  )
                    ? calculateTotalCommissionForAllClients(
                        loginInSeller?.projects
                      )
                    : 0}
                </h2>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -15, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,

                ease: [0.17, 0.67, 0.83, 0.67],
                delay: 0.8,
              }}
              className="withdrawn w-[305px] h-[150px] rounded-[8px] border bg-white  grid grid-rows-2 hover:scale-105 transition-all duration-500 ease-in-out"
            >
              <div className="customer flex justify-start items-start mt-[10px] pl-[14px] border-b gap-[9px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center mt-[5px] bg-opacity-[.1] bg-[#F2994A] ">
                  <WithdrawnIcon />
                </div>
                <p className="text-md  text-haiti  font-['Work_Sans'] mt-[10px] font-[500] tracking-[.2px]">
                  Total Withdrawn
                </p>
              </div>
              <div className="percentage flex justify-start gap-[10px] pl-[25px] items-end">
                <h2 className="text-5xl  font-[500] text-haiti  mb-[10px] font-['Work_Sans'] tracking-[.2px]">
                  $
                  {loginInSeller?.totalWithdrawn
                    ? loginInSeller?.totalWithdrawn
                    : 0}
                </h2>
              </div>
            </motion.div>
          </div>
          {/* =================================================TODO:table  */}
          <div className="table w-full h-full   mt-[20px]">
            {/*============================================= TODO:search  */}
            <div className="search  flex justify-between items-center w-full h-[40px]">
              <div className="flex w-full h-[40px] items-center">
                {Table === "project" && (
                  <motion.div
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                    }}
                    className="text_search w-[150px] border h-[40px]  shrink-0 flex items-center p-[5px] mr-[8px] rounded-[8px]  transition-all duration-500 ease-in-out"
                  >
                    <select
                      onChange={handleInputChange}
                      name="companyName"
                      className="w-full px-2 text-sm focus:outline-none"
                      id=""
                    >
                      <option value="">company</option>
                      {company?.map((item, index) => {
                        return (
                          <option value={item?.companyName} key={index}>
                            {item?.companyName}
                          </option>
                        );
                      })}
                    </select>
                  </motion.div>
                )}
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                  }}
                  className="text_search w-[222px] border h-[40px]  shrink-0 flex items-center pl-[15px] mr-[8px] rounded-[8px] transition-all duration-500 ease-in-out"
                >
                  <SearchIcon />
                  <input
                    onChange={handleInputChange}
                    value={input.text}
                    name="text"
                    className="text-xs  focus:outline-none text-monsoon  pl-[8px]"
                    type="text"
                    placeholder="Search"
                  />
                </motion.div>
                {Table === "seller" && (
                  <motion.div
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3,
                    }}
                    className="text_search h-[40px]  w-[222px] border flex items-center pl-[15px] mr-[8px] rounded-[8px]  transition-all duration-500 ease-in-out"
                  >
                    <SearchIcon />
                    <input
                      onChange={handleInputChange}
                      value={input.email}
                      name="email"
                      className="text-xs  focus:outline-none text-monsoon  pl-[8px]"
                      type="text"
                      placeholder="email"
                    />
                  </motion.div>
                )}
                {Table === "client" && (
                  <motion.div
                    initial={{ y: -15, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3,
                    }}
                    className="text_search h-[40px]  w-[222px] border flex items-center pl-[15px] mr-[8px] rounded-[8px]  transition-all duration-500 ease-in-out"
                  >
                    <SearchIcon />
                    <input
                      onChange={handleInputChange}
                      value={input.email}
                      name="email"
                      className="text-xs  focus:outline-none text-monsoon  pl-[8px]"
                      type="text"
                      placeholder="email"
                    />
                  </motion.div>
                )}
                {Table === "seller" && (
                  <motion.div className="selete_search h-[40px]  w-[117px] border overflow-hidden rounded-[8px] px-[4px] text-cyan-700 text-xs  font-[500] transition-all duration-500 ease-in-out">
                    <motion.select
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.6,
                      }}
                      className="w-full h-full focus:outline-none"
                      name="role"
                      onChange={handleInputChange}
                      value={input?.role}
                      id=""
                    >
                      <option className="text-cyan-700 " value="">
                        select role
                      </option>
                      <option className="text-cyan-700 " value="admin">
                        admin
                      </option>
                      <option className="text-cyan-700 " value="user">
                        user
                      </option>
                      <option className="text-cyan-700 " value="super_admin">
                        Super admin
                      </option>
                    </motion.select>
                  </motion.div>
                )}
                {Table === "project" && (
                  <>
                    <motion.div
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3,
                      }}
                      className="date_search h-[40px]  rounded-[8px] flex items-center justify-between gap-[5px]  px-[15px] mr-[10px]  transition-all duration-500 ease-in-out"
                    >
                      <div className="flex w-[136px] items-center border rounded-md px-2">
                        <DatePicker
                          className="text-xs   h-[40px] w-[80%] px-2 font-['Roboto'] text-gray-400 placeholder:text-xs  focus:outline-none placeholder:font-[400]   capitalize"
                          selected={input.startDate}
                          placeholderText="Start Time"
                          onChange={(date) =>
                            setInput((prev) => ({ ...prev, startDate: date }))
                          }
                        />
                        <DateIcon />
                      </div>

                      <SortIcon />
                      <div className="flex w-[136px] items-center border rounded-md px-2">
                        <DatePicker
                          className="text-xs  font-['Roboto'] text-gray-400 placeholder:text-xs  focus:outline-none placeholder:font-[400]   rounded-md h-[40px]  px-2 w-[80%]  capitalize"
                          selected={input.endDate}
                          placeholderText="End Time"
                          onChange={(date) =>
                            setInput((prev) => ({ ...prev, endDate: date }))
                          }
                        />
                        <DateIcon />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: -15, opacity: 0.3 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                      }}
                      className="selete_search  h-[40px] w-[117px] border overflow-hidden rounded-[8px] px-[4px] text-cyan-700 text-xs  font-[500] hover:scale-105 transition-all duration-500 ease-in-out"
                    >
                      <motion.select
                        initial={{ y: -15, opacity: 0.3 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6,
                        }}
                        className="w-full h-full focus:outline-none"
                        name="status"
                        onChange={handleInputChange}
                        value={input.status}
                        id=""
                      >
                        <option className="text-cyan-700 " value="">
                          Status
                        </option>
                        <option className="text-cyan-700 " value="pending">
                          Pending
                        </option>
                        <option className="text-cyan-700 " value="on going">
                          On going
                        </option>
                        <option className="text-cyan-700 " value="on hold">
                          On hold
                        </option>
                        <option className="text-cyan-700 " value="complete">
                          Complete
                        </option>
                      </motion.select>
                    </motion.div>
                  </>
                )}

                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                  }}
                  onClick={() =>
                    setInput({
                      text: "",
                      endDate: "",
                      startDate: "",
                      status: "",
                      email: "",
                      rol: "",
                    })
                  }
                  className="w-[40px] rounded-md h-[40px] flex justify-center items-center border ml-4 border-gray-300 hover:bg-gray-200 transition-all duration-500 ease-in-out hover:scale-105 group"
                >
                  <ResetIcon />
                </motion.button>
                {Table === "seller" && (
                  <button
                    onClick={() => setSalesModel(true)}
                    className="px-4 py-2 ml-4 text-xs font-bold text-white transition-all duration-500 ease-in-out rounded-md bg-primary hover:bg-secondary "
                  >
                    Add Sales Person
                  </button>
                )}
              </div>
              <div className="addClient gap-[5px] flex items-center justify-center mr-2 ">
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                  }}
                  onClick={() => setTable("client")}
                  className={` ${
                    Table === "client"
                      ? "hover:bg-secondary  bg-secondary text-white"
                      : "bg-primary hover:bg-secondary"
                  } add-client pr-[4px] w-[60px]    h-[38px] flex items-center justify-center gap-[10px]   hover:text-white  transition-all duration-500 ease-in-out text-white font-['Roboto'] text-xs  font-[500] rounded-[7px] hover:scale-105`}
                >
                  Client
                </motion.button>
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                  }}
                  className={`  ${
                    Table === "seller"
                      ? "hover:bg-secondary  bg-secondary text-white"
                      : "bg-primary hover:bg-secondary"
                  } add-client pr-[4px] w-[60px]   h-[38px] flex items-center justify-center gap-[10px]  hover:text-white  transition-all duration-500 ease-in-out text-white font-['Roboto'] text-xs  font-[500] rounded-[7px] hover:scale-105`}
                  onClick={() => {
                    setTable("seller");
                  }}
                >
                  Seller
                </motion.button>
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                  }}
                  className={` ${
                    Table === "project"
                      ? "hover:bg-secondary  bg-secondary text-white"
                      : "bg-primary hover:bg-secondary"
                  }  add-client w-[60px]   h-[38px] flex items-center justify-center gap-[10px]   hover:text-white  transition-all duration-500 ease-in-out text-white font-['Roboto'] text-xs  font-[500] rounded-[7px] hover:scale-105`}
                  onClick={() => setTable("project")}
                >
                  Project
                </motion.button>
              </div>
              <div className="addClient gap-[10px] flex items-center justify-self-end right-0">
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                  }}
                  className="help w-[40px] h-[38px] flex justify-center items-center bg-[#A4A4A61A] hover:scale-105 transition-all duration-500 ease-in-out"
                >
                  <HelpIcon />
                </motion.div>
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                  }}
                  onClick={() => setClientModel(true)}
                  className="add-client pr-[4px] w-[162px] hover:bg-secondary  h-[38px] flex items-center justify-center gap-[10px] bg-primary  hover:text-white  transition-all duration-500 ease-in-out text-white font-['Roboto'] text-xs  font-[500] rounded-[7px] hover:scale-105"
                >
                  Add New Client
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 13.7492C7.56844 13.7492 7.21875 13.3996 7.21875 12.968V3.03174C7.21875 2.60018 7.56844 2.25049 8 2.25049C8.43156 2.25049 8.78125 2.60018 8.78125 3.03174V12.968C8.78125 13.3996 8.43156 13.7492 8 13.7492Z"
                      fill="white"
                    />
                    <path
                      d="M12.9681 8.78125H3.03188C2.60031 8.78125 2.25063 8.43156 2.25063 8C2.25063 7.56844 2.60031 7.21875 3.03188 7.21875H12.9681C13.3997 7.21875 13.7494 7.56844 13.7494 8C13.7494 8.43156 13.3997 8.78125 12.9681 8.78125Z"
                      fill="white"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
            {/* ========================== TODO:table container  */}
            <div className="table_container overflow-auto mt-[20px]">
              {Table === "seller" && (
                <SellerTableComponent
                  sellerId={loginInSeller?._id}
                  input={input}
                />
              )}
              {Table === "project" && (
                <TableComponent sellerId={loginInSeller?._id} input={input} />
              )}
              {loginInSeller?.role === "super_admin"
                ? Table === "client" && (
                    <AdminClient
                      client={client.filter((item) =>
                        input?.text
                          ? item.clientName
                              ?.toLowerCase()
                              .includes(input?.text?.toLowerCase())
                          : true && input?.email
                          ? item.clientEmail
                              ?.toLowerCase()
                              .includes(input?.email?.toLowerCase())
                          : true
                      )}
                    />
                  )
                : Table === "client" && (
                    <SellerClient
                      client={loginInSeller?.client?.filter((item) =>
                        input?.text
                          ? item.clientName
                              ?.toLowerCase()
                              .includes(input?.text?.toLowerCase())
                          : true
                      )}
                    />
                  )}
            </div>
          </div>
        </div>
      </>
    </motion.div>
  );
};

export default Home;
