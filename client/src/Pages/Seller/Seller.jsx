import companyLogo from "../../../public/clientLogo.png";
import bgImg from "../../../public/bgImg.png";
import user from "../../../public/user.png";
import { Link, useParams } from "react-router-dom";

import ProjectDetails from "../../Components/Project/ProjectDetails";
import SalesPeople from "../../Components/Seller/SalesPeople";
import { useEffect, useState } from "react";
import SalesModel from "../../Components/Model/SalesModel";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSellerState,
  setMessageEmpty,
} from "../../Features/Seller/SellerSlice";
import { getSingleSeller } from "../../Features/Seller/SellerApi";
import { calculateTotalCommissionForAllClients } from "../../Utils/CommissionCount";
import LoadingSpinner from "../../Components/LoadingSpin";
import ClientComponent from "../../Components/Seller/ClientComponent";
import ProjectComponent from "../../Components/Seller/ProjectComponent";
import StatisticComponent from "../../Components/StatisticComponent";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import Total from "../../Components/Project/Total";
import { Toastify } from "../../Utils/Tostify";

import SellerClient from "../../Components/Tables/SellerClient";
import SellerProject from "../../Components/Tables/SellerProject";
import SellerSales from "../../Components/Tables/SellerSalesTable";
import PluseIcon from "../../Icons/PluseIcon";
import AddFriendIcon from "../../Icons/AddFriendIcon";
import DueIcon from "../../Icons/DueIcon";
import PaymentIcon from "../../Icons/PaymentIcon";
import ProjectDueIcon from "../../Icons/ProjectDueIcon";
import GridIcon from "../../Icons/GridIcon";
import ListIcon from "../../Icons/ListIcon";
import BorderEmail from "../../Icons/BorderEmail";
import { XdIcon } from "../../Icons/XdIcon";
import AdIcon from "../../Icons/AdIcon";
import PdfIcon from "../../Icons/PdfIcon";
import TotalGuyIcon from "../../Icons/TotalGuyIcon";
import CustomerIcon from "../../Icons/CustomerIcon";
import TotalClientIcon from "../../Icons/TotalClientIcon";
import TotalEarnIcon from "../../Icons/TotalEarnIcon";

const Seller = () => {
  //===========================================TODO:all state
  const [model, setModel] = useState(false);
  const [menu, setMenu] = useState("Manage Sales People");
  const [view, setView] = useState("grid");
  //===============================================TODO:input state
  const [input, setInput] = useState({
    text: "",
    startDate: "",
    endDate: "",
    count: 0,
  });
  //===============================================================TODO:handle input change
  const handleOnChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //==================================================TODO:login seller
  const { loginInSeller, singleSeller, loader, message, error } =
    useSelector(getAllSellerState);

  //================================================= TODO:use params
  const { id } = useParams();
  const dispatch = useDispatch();
  //================================================TODO:get single seller
  useEffect(() => {
    if (id) {
      dispatch(getSingleSeller(id));
    }
  }, [dispatch, id]);

  //==================================TODO:toastify
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
  }, [error, message, dispatch]);

  // ========= TODO:percentage state
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const oneWeekAgo = new Date(startOfWeek);
    oneWeekAgo.setDate(startOfWeek.getDate() - 7);

    const currentWeekData = singleSeller?.client.filter(
      (item) =>
        new Date(item.createdAt) >= startOfWeek &&
        new Date(item.createdAt) <= today
    );

    const lastWeekData = singleSeller?.client.filter(
      (item) =>
        new Date(item.createdAt) >= oneWeekAgo &&
        new Date(item.createdAt) < startOfWeek
    );
    if (lastWeekData > 0) {
      const percentageChange =
        ((currentWeekData - lastWeekData) / lastWeekData) * 100;
      setPercentage(percentageChange);
    } else {
      setPercentage(0);
    }
  }, [singleSeller]);

  return (
    <>
      {/* //========================================TODO: loader  */}
      {loader && (
        <div className="w-screen bg-opacity-20 min-h-[1240px] h-screen z-[9999999999999] bg-gray-100  flex justify-center items-center absolute top-0 left-0">
          <div className="top-[45%] absolute flex justify-center items-center w-full h-full">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {/*=========================================== TODO:sales model  */}
      {model && (
        <SalesModel setModel={setModel} title="Add Sales" sellerId={id} />
      )}
      <motion.div
        initial={{ y: -15, opacity: 0.1 }}
        exit={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 2,
          type: "spring",
          stiffness: 200,
          ease: [0.17, 0.67, 0.83, 0.67],
          delay: 0.4,
        }}
        className="min-w-[1340px] scroll-smooth relative rounded-[15px] pl-[48px]  pt-[30px] mb-[30px] bg-[#FFF] min-h-auto h-[1061px] overflow-hidden "
      >
        <div className="header bg-white min-w-full flex items-center w-[1300px] h-[68px]">
          <div className="w-[640px] h-full flex items-center gap-[20px] rounded-md overflow-hidden">
            {singleSeller?.companyAvatar ? (
              <img
                className="w-[86px] h-[70px]"
                src={singleSeller?.companyAvatar}
                alt=""
              />
            ) : (
              <img className="w-[86px] h-[70px]" src={companyLogo} alt="" />
            )}
            <h1 className="text-4xl  capitalize leading-[31px] font-[600] font-['Work_Sans] tracking-[.9px]">
              Admin Dashboard
            </h1>
          </div>
          <div className="w-[600px] h-[46px] flex justify-between items-center">
            <div className="h-[68px] w-[439px] relative">
              <img className="w-full h-full " src={bgImg} alt="" />
              <div className="w-full h-full  absolute top-0 left-0 pl-[16px] pt-[7px]">
                <p className="text-xs  font-[400] font-['work_sans'] p-[2px] text-monsoon ">
                  Sales Toolkit
                </p>
                <div className="buttonGroup flex items-center mt-[5px] justify-between ml-[5px] mr-[8px]">
                  <button className="text-xs  hover:scale-105 font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon  flex items-center gap-[5px]">
                    <BorderEmail />
                    Email signature
                  </button>
                  <button className="text-xs  hover:scale-105 font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    Email setup
                  </button>
                  <button className="text-xs  hover:scale-105 font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    pricing
                  </button>
                  <Link
                    to={singleSeller?.website}
                    className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon "
                  >
                    website
                  </Link>
                  <button className="text-xs  hover:scale-105 font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    <XdIcon />
                  </button>
                  <button className="text-xs  hover:scale-105 font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    <AdIcon />
                  </button>
                  <button className="text-xs  hover:scale-105 font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    <PdfIcon />
                  </button>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="w-[140px]  gap-[14px] mt-[12px] h-[46px] flex justify-start items-center overflow-hidden "
            >
              {singleSeller?.avatar ? (
                <img
                  className=" w-[46px] h-[46px] shrink-0 mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-[rgb(14 116 144)]"
                  src={singleSeller?.avatar}
                  alt=""
                />
              ) : (
                <img
                  className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-[rgb(14 116 144)]"
                  src={user}
                  alt=""
                />
              )}
              <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                <p className="text-shipGrey  truncate w-[100px] text-sm  font-[700] font-['work_sans']">
                  {singleSeller?.name}
                </p>
                <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                  {singleSeller?.email}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="main-container pr-[36px] flex min-w-full flex-col  w-[1300px] mt-[30px]  tracking-[-.52px] h-[1072px] ">
          {/* //=================================================TODO:total  */}
          <div className="flex justify-start gap-4 total">
            <Total
              delay={0.1}
              number={
                singleSeller?.salesPerson.length > 0
                  ? singleSeller?.salesPerson.length
                  : 0
              }
              totalSalesGuy={
                singleSeller?.salesPerson ? singleSeller?.salesPerson : []
              }
              totalProjects=""
              totalClients=""
              TotalEarnings=""
              styles={`bg-cyan-100  border border-cyan-500`}
              title="Total Sales Guy"
              svg={<TotalGuyIcon />}
            />
            <Total
              delay={0.3}
              number={
                singleSeller?.projects?.length > 0
                  ? singleSeller?.projects.length
                  : 0
              }
              totalProjects={singleSeller?.Projects}
              totalClients=""
              TotalEarnings=""
              styles={`bg-green-100  border border-green-500`}
              title="Total Projects"
              percentage={percentage}
              svg={<CustomerIcon />}
            />
            <Total
              delay={0.5}
              number={
                singleSeller?.client?.length > 0
                  ? singleSeller?.client?.length
                  : 0
              }
              totalProjects=""
              TotalEarnings=""
              totalSalesGuy=""
              totalClients={singleSeller?.client ? singleSeller?.client : []}
              styles={`bg-blue-200 border border-blue-500`}
              title="Total Clients"
              svg={<TotalClientIcon />}
            />
            <Total
              delay={0.7}
              number={calculateTotalCommissionForAllClients(
                singleSeller?.projects
              )}
              totalSalesGuy=""
              totalProjects=""
              totalClients=""
              TotalEarnings=""
              styles={`bg-orange-200 border border-orange-500`}
              title="Total Earnings"
              svg={<TotalEarnIcon />}
            />
          </div>
          {/* //===================================================== search field */}
          <div className="search mt-[20px] w-full h-[38px] flex items-center justify-between">
            <div className="flex">
              <div className="sales_client_project_statistics border  w-[375px] h-[38px] flex justify-between items-center rounded-md">
                <button
                  onClick={() => setMenu("Manage Sales People")}
                  className={`${
                    menu === "Manage Sales People" ? "shadow-md" : ""
                  } text-xs  transition-all ease-in-out duration-500 hover:scale-105 font-[400] text-monsoon  font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px] delay-100`}
                >
                  Sales Guy
                </button>
                <button
                  onClick={() => setMenu("Manage Clients")}
                  className={`${
                    menu === "Manage Clients" ? "shadow-md" : ""
                  } text-xs  font-[400] transition-all ease-in-out duration-500 hover:scale-105 text-monsoon  font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px] delay-100`}
                >
                  Clients
                </button>
                <button
                  onClick={() => setMenu("Manage Projects")}
                  className={`${
                    menu === "Manage Projects" ? "shadow-md" : ""
                  } text-xs  font-[400] transition-all ease-in-out duration-500 hover:scale-105 text-monsoon  font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px] delay-100`}
                >
                  Projects
                </button>
                <button
                  onClick={() => setMenu("Manage Statistic")}
                  className={`${
                    menu === "Manage Statistic" ? "shadow-md" : ""
                  } text-xs  font-[400] transition-all ease-in-out duration-500 hover:scale-105 text-monsoon  font-['work_sans'] active:shadow-md rounded-md w-[98px] h-[32px] delay-100`}
                >
                  Statistics
                </button>
              </div>
              <div className="sales_client_project_statistics  h-[38px] flex justify-between items-center rounded-md ml-[13px] gap-1 px-[10px]">
                <motion.div
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                  }}
                  className="date_search h-[40px]  w-[224px] border rounded-[8px] flex items-center justify-between gap-[5px]  px-[15px] mr-[10px]  transition-all duration-500 ease-in-out"
                >
                  <DatePicker
                    className="text-xs  font-['Roboto'] text-gray-400 placeholder:text-xs  focus:outline-none placeholder:font-[400]  w-[70px]  capitalize"
                    selected={input.startDate}
                    placeholderText="Start Time"
                    onChange={(date) =>
                      setInput((prev) => ({ ...prev, startDate: date }))
                    }
                  />
                  -
                  <DatePicker
                    className="text-xs  font-['Roboto'] text-gray-400 placeholder:text-xs  focus:outline-none placeholder:font-[400]  w-[70px]  capitalize"
                    selected={input.endDate}
                    placeholderText="End Time"
                    onChange={(date) =>
                      setInput((prev) => ({ ...prev, endDate: date }))
                    }
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_657_266)">
                      <path
                        d="M12.7502 2.37695H10.1252V1.37695C10.1252 1.3082 10.069 1.25195 10.0002 1.25195H9.12523C9.05648 1.25195 9.00023 1.3082 9.00023 1.37695V2.37695H5.00024V1.37695C5.00024 1.3082 4.94399 1.25195 4.87524 1.25195H4.00024C3.93149 1.25195 3.87524 1.3082 3.87524 1.37695V2.37695H1.25024C0.973681 2.37695 0.750244 2.60039 0.750244 2.87695V13.252C0.750244 13.5285 0.973681 13.752 1.25024 13.752H12.7502C13.0268 13.752 13.2502 13.5285 13.2502 13.252V2.87695C13.2502 2.60039 13.0268 2.37695 12.7502 2.37695ZM12.1252 12.627H1.87524V6.68945H12.1252V12.627ZM1.87524 5.62695V3.50195H3.87524V4.25195C3.87524 4.3207 3.93149 4.37695 4.00024 4.37695H4.87524C4.94399 4.37695 5.00024 4.3207 5.00024 4.25195V3.50195H9.00023V4.25195C9.00023 4.3207 9.05648 4.37695 9.12523 4.37695H10.0002C10.069 4.37695 10.1252 4.3207 10.1252 4.25195V3.50195H12.1252V5.62695H1.87524Z"
                        fill="#757575"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_657_266">
                        <rect
                          width="14"
                          height="14"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </motion.div>
              </div>
              <div className="sales_client_project_statistics border transition-all ease-in-out duration-500 hover:scale-105 w-[225px] h-[38px] flex justify-between items-center rounded-md ml-[13px] gap-1 px-[10px]">
                <motion.button
                  initial={{ y: -15, opacity: 0.3 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4,
                  }}
                  className="w-[10%] transition-all ease-in-out duration-500 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.5325 14.4675L12.9825 11.925C13.8052 10.8768 14.2517 9.58249 14.25 8.25C14.25 7.06332 13.8981 5.90328 13.2388 4.91658C12.5795 3.92989 11.6425 3.16085 10.5461 2.70673C9.44975 2.2526 8.24335 2.13378 7.07946 2.36529C5.91558 2.5968 4.84648 3.16825 4.00736 4.00736C3.16825 4.84648 2.5968 5.91558 2.36529 7.07946C2.13378 8.24335 2.2526 9.44975 2.70673 10.5461C3.16085 11.6425 3.92989 12.5795 4.91658 13.2388C5.90328 13.8981 7.06332 14.25 8.25 14.25C9.58249 14.2517 10.8768 13.8052 11.925 12.9825L14.4675 15.5325C14.5372 15.6028 14.6202 15.6586 14.7116 15.6967C14.803 15.7347 14.901 15.7544 15 15.7544C15.099 15.7544 15.197 15.7347 15.2884 15.6967C15.3798 15.6586 15.4628 15.6028 15.5325 15.5325C15.6028 15.4628 15.6586 15.3798 15.6967 15.2884C15.7347 15.197 15.7544 15.099 15.7544 15C15.7544 14.901 15.7347 14.803 15.6967 14.7116C15.6586 14.6202 15.6028 14.5372 15.5325 14.4675ZM3.75 8.25C3.75 7.35999 4.01392 6.48996 4.50839 5.74994C5.00286 5.00992 5.70566 4.43314 6.52793 4.09254C7.3502 3.75195 8.255 3.66284 9.12791 3.83647C10.0008 4.0101 10.8026 4.43869 11.432 5.06802C12.0613 5.69736 12.4899 6.49918 12.6635 7.3721C12.8372 8.24501 12.7481 9.14981 12.4075 9.97208C12.0669 10.7943 11.4901 11.4972 10.7501 11.9916C10.01 12.4861 9.14002 12.75 8.25 12.75C7.05653 12.75 5.91194 12.2759 5.06802 11.432C4.22411 10.5881 3.75 9.44348 3.75 8.25Z"
                      fill="#878790"
                    />
                  </svg>
                </motion.button>
                <input
                  type="text"
                  name="text"
                  value={input.text}
                  onChange={handleOnChange}
                  placeholder="Search"
                  className="w-[90%] transition-all ease-in-out duration-500 hover:scale-105 focus:outline-none text-xs  font-['work_sans']"
                />
              </div>
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
                    startDate: "",
                    endDate: "",
                  })
                }
                className="w-[40px] rounded-md h-[40px] flex justify-center items-center border ml-4 border-gray-300 hover:bg-gray-200 transition-all duration-500 ease-in-out hover:scale-105"
              >
                <svg
                  fill="#7b7a7a"
                  width="20"
                  height="20"
                  viewBox="0 0 1920 1920"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                    fillRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>
            <motion.div
              initial={{ y: -15, opacity: 0.3 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.4,
              }}
              className="flex items-center gap-3"
            >
              <motion.button
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.4,
                }}
                className="w-[91px] transition-all ease-in-out duration-500 hover:scale-105 rounded-md bg-gray-400 h-[38px] flex justify-center items-center hover:bg-gray-600 text-white "
              >
                Support
              </motion.button>
              <motion.button
                initial={{ y: -15, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.7,
                }}
                disabled={
                  loginInSeller?._id !== id &&
                  loginInSeller?.role !== "super_admin"
                }
                onClick={() => setModel(!model)}
                className={
                  "w-[170px]  hover:scale-105  rounded-md h-[38px] bg-primary  flex justify-center items-center gap-2 text-white hover:bg-secondary   transition-all duration-500 ease-in-out"
                }
              >
                Add Sales Person
                <PluseIcon />
              </motion.button>
            </motion.div>
          </div>
          {/* //================================================TODO: project datiels  */}
          <div className=" mt-[20px]  flex items-center justify-between">
            <ProjectDetails
              delay={0.1}
              svg={<AddFriendIcon />}
              title="New Client Request"
              number={
                singleSeller?.projects
                  ? singleSeller?.projects.filter(
                      (item) => item.projectStatus === "pending"
                    )?.length
                  : 0
              }
            />
            <ProjectDetails
              delay={0.3}
              svg={<DueIcon />}
              title="Commission Due"
              number={
                calculateTotalCommissionForAllClients(singleSeller?.projects) -
                (singleSeller &&
                singleSeller.payment &&
                singleSeller.payment.length > 0
                  ? singleSeller.payment.reduce((acc, item) => {
                      const amount = parseFloat(item.amount) || 0;
                      return acc + amount;
                    }, 0)
                  : 0)
              }
              styles={`text-red-500`}
            />
            <ProjectDetails
              delay={0.5}
              svg={<PaymentIcon />}
              title="Payment Received"
              number={
                singleSeller?.payment && singleSeller?.payment.length > 0
                  ? singleSeller?.payment.reduce((acc, item) => {
                      const commission = parseFloat(item.amount) || 0;
                      return acc + commission;
                    }, 0)
                  : 0
              }
            />
            <ProjectDetails
              delay={0.7}
              svg={<ProjectDueIcon />}
              title="Project Due"
              number={
                singleSeller?.projects?.length > 0
                  ? singleSeller?.projects?.filter(
                      (item) => item?.projectStatus !== "complete"
                    ).length
                  : 0
              }
              styles={`text-red-500`}
            />
            <ProjectDetails
              delay={0.9}
              svg={<ProjectDueIcon />}
              title="Project Completed"
              number={
                singleSeller?.projects?.length > 0
                  ? singleSeller?.projects?.filter(
                      (item) => item.projectStatus === "complete"
                    ).length
                  : 0
              }
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <h1 className="mt-[25px] text-[22px] font-['work_sans'] tracking-[-.9px]">
              {menu}
            </h1>
            <div className="flex gap-x-2">
              {menu === "Manage Sales People" && (
                <select
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, count: e.target.value }))
                  }
                  className="font-bold border rounded-md focus:outline-none"
                  name=""
                  id=""
                >
                  <option value={10}>Top Seller</option>
                  <option value={5}>Level 1</option>
                  <option value={3}>Level 2</option>
                  <option value={0}>New Seller</option>
                </select>
              )}
              {menu !== "Manage Statistic" && (
                <div className="flex bg-gray-100 border rounded-md gap-x-4 ">
                  <button
                    className={` px-3 ${view == "grid" ? "bg-white" : ""}`}
                    onClick={() => setView("grid")}
                  >
                    <GridIcon />
                  </button>
                  <button
                    className={`px-3 ${view == "list" ? "bg-white" : ""}`}
                    onClick={() => setView("list")}
                  >
                    <ListIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* //=================================================== TODO:all sales person  */}
          {menu === "Manage Sales People" && (
            <div
              className={` mt-[27px] w-full h-full pb-[150px] overflow-y-auto ${
                view === "list" ? "" : "grid grid-cols-4"
              }  justify-between gap-y-[8px]`}
            >
              {view === "list" ? (
                singleSeller?.salesPerson?.length > 0 && (
                  <SellerSales
                    salesPerson={singleSeller?.salesPerson?.filter((seller) => {
                      return (
                        (input?.text
                          ? seller?.name
                              ?.toLowerCase()
                              .includes(input?.text?.toLowerCase())
                          : true) &&
                        (input?.startDate
                          ? new Date(seller?.date) >= new Date(input?.startDate)
                          : true) &&
                        (input?.endDate
                          ? new Date(seller?.date) <= new Date(input?.endDate)
                          : true) &&
                        (input?.status
                          ? seller?.status === input?.status
                          : true) &&
                        (input?.count
                          ? seller?.projects?.length <= input?.count &&
                            seller?.projects?.length >= input?.count
                          : true)
                      );
                    })}
                  />
                )
              ) : singleSeller?.salesPerson?.length > 0 ? (
                singleSeller?.salesPerson
                  ?.filter((seller) => {
                    return (
                      (input?.text
                        ? seller?.name
                            ?.toLowerCase()
                            .includes(input?.text?.toLowerCase())
                        : true) &&
                      (input?.startDate
                        ? new Date(seller?.date) >= new Date(input?.startDate)
                        : true) &&
                      (input?.endDate
                        ? new Date(seller?.date) <= new Date(input?.endDate)
                        : true) &&
                      (input?.status
                        ? seller?.status === input?.status
                        : true) &&
                      (input?.count
                        ? seller?.projects?.length <= input?.count &&
                          seller?.projects?.length >= input?.count
                        : true)
                    );
                  })
                  ?.map((item, index) => {
                    return (
                      <SalesPeople
                        delay={`.${index}`}
                        key={index}
                        avatar={item.avatar}
                        name={item.name}
                        title={item.employment}
                        id={item?._id}
                        sellerId={id}
                        project={
                          item?.projects?.length > 0
                            ? item?.projects?.length
                            : 0
                        }
                        clients={
                          item?.client?.length > 0 ? item?.client?.length : 0
                        }
                        earning={
                          item?.projects?.length > 0
                            ? calculateTotalCommissionForAllClients(
                                item?.projects
                              )
                            : 0
                        }
                        companyName={item?.company?.companyName}
                        ActiveClient={
                          item?.client?.length > 0 ? item?.client : []
                        }
                        companyLogo={item?.company?.companyLogo}
                        styles=""
                      />
                    );
                  })
              ) : (
                <span>No sales Guy</span>
              )}
            </div>
          )}
          {menu === "Manage Clients" && (
            <div
              className={` mt-[27px] w-full h-full pb-[150px] overflow-y-auto ${
                view === "list" ? "" : "grid grid-cols-4"
              }  justify-between gap-y-[8px]`}
            >
              {/* //=====================list view and grid view  */}
              {view === "list" ? (
                singleSeller?.client?.length > 0 && (
                  <SellerClient
                    client={singleSeller?.client?.filter((client) => {
                      return (
                        (input?.text
                          ? client?.clientName
                              ?.toLowerCase()
                              .includes(input?.text?.toLowerCase())
                          : true) &&
                        (input?.startDate
                          ? new Date(client?.date) >= new Date(input?.startDate)
                          : true) &&
                        (input?.endDate
                          ? new Date(client?.date) <= new Date(input?.endDate)
                          : true) &&
                        (input?.status
                          ? client?.projectStatus === input?.status
                          : true)
                      );
                    })}
                  />
                )
              ) : singleSeller?.client?.length > 0 ? (
                singleSeller?.client
                  ?.filter((client) => {
                    return (
                      (input?.text
                        ? client?.clientName
                            ?.toLowerCase()
                            .includes(input?.text?.toLowerCase())
                        : true) &&
                      (input?.startDate
                        ? new Date(client?.date) >= new Date(input?.startDate)
                        : true) &&
                      (input?.endDate
                        ? new Date(client?.date) <= new Date(input?.endDate)
                        : true) &&
                      (input?.status
                        ? client?.projectStatus === input?.status
                        : true)
                    );
                  })
                  ?.map((item, index) => {
                    return (
                      <ClientComponent
                        clientAvatar={item?.clientAvatar}
                        clientName={item?.clientName}
                        key={index}
                        company={item?.company}
                        email={item?.clientEmail}
                        mobile={item?.clientPhone}
                        projects={item?.projects}
                        id={item?._id}
                      />
                    );
                  })
              ) : (
                <span>No Client</span>
              )}
            </div>
          )}
          {menu === "Manage Projects" && (
            <div
              className={` mt-[27px] w-full h-full pb-[150px] overflow-y-auto ${
                view === "list" ? "" : "grid grid-cols-4"
              }  justify-between gap-y-[8px]`}
            >
              {view === "list" ? (
                singleSeller?.projects?.length > 0 && (
                  <SellerProject
                    projects={singleSeller?.projects?.filter((project) => {
                      return (
                        (input?.text
                          ? project?.clientId?.clientName
                              ?.toLowerCase()
                              .includes(input?.text?.toLowerCase())
                          : true) &&
                        (input?.startDate
                          ? new Date(project?.date) >=
                            new Date(input?.startDate)
                          : true) &&
                        (input?.endDate
                          ? new Date(project?.date) <= new Date(input?.endDate)
                          : true) &&
                        (input?.status
                          ? project?.projectStatus === input?.status
                          : true)
                      );
                    })}
                  />
                )
              ) : singleSeller?.projects?.length > 0 ? (
                singleSeller?.projects
                  ?.filter((project) => {
                    return (
                      (input?.text
                        ? project?.clientId?.clientName
                            ?.toLowerCase()
                            .includes(input?.text?.toLowerCase())
                        : true) &&
                      (input?.startDate
                        ? new Date(project?.date) >= new Date(input?.startDate)
                        : true) &&
                      (input?.endDate
                        ? new Date(project?.date) <= new Date(input?.endDate)
                        : true) &&
                      (input?.status
                        ? project?.projectStatus === input?.status
                        : true)
                    );
                  })
                  ?.map((item, index) => {
                    return (
                      <ProjectComponent
                        clientAvatar={item?.clientId?.clientAvatar}
                        clientName={item?.clientId?.clientName}
                        key={index}
                        amount={item?.amount}
                        date={item?.date}
                        timeFrame={item?.timeFrame}
                        companyName={item?.company?.companyName}
                        projectStatus={item?.projectStatus}
                        projectName={item?.projectName}
                        team={item?.team}
                        email={item?.clientId?.clientEmail}
                        mobile={item?.clientId?.clientPhone}
                        id={item?._id}
                      />
                    );
                  })
              ) : (
                <span>No Projects</span>
              )}
            </div>
          )}
          {menu === "Manage Statistic" && (
            <div className=" mt-[27px] w-full h-full pb-[150px] overflow-y-auto  gap-y-[8px]">
              <StatisticComponent data={loginInSeller?.projects} />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Seller;
