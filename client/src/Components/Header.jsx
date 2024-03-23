import { useEffect, useRef, useState } from "react";
import bgImg from "../../public/bgImg.png";
import user from "../../public/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutSeller } from "../Features/Seller/SellerApi";

import AdIcon from "../Icons/AdIcon";
import { XdIcon } from "../Icons/XdIcon";
import PdfIcon from "../Icons/PdfIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import CompanyIcon from "../Icons/CompanyIcon";
import DownArrow from "../Icons/DownArrow";
import EmailIcon from "../Icons/EmailIcon";
import Setting from "../Icons/Setting";
import BorderEmail from "../Icons/BorderEmail";
const Header = ({ loginInSeller }) => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const handleLogout = () => {
    dispatch(LogoutSeller());
    localStorage.clear("Seller");
    navigate("/login");
  };

  const handleDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };
  //===========================================handle close onclick menu
  useEffect(() => {
    window.addEventListener("click", handleDropdown);
    return () => window.removeEventListener("click", handleDropdown);
  }, []);
  return (
    <div className="" ref={dropdownRef}>
      <div className="header bg-white min-w-full flex items-center w-[1300px] h-[68px]">
        <div className="w-[640px] h-full flex items-center gap-[20px] rounded-md overflow-hidden ">
          {loginInSeller?.companyAvatar ? (
            <img
              className="w-[86px] h-[70px] object-cover"
              src={loginInSeller?.companyAvatar}
              alt=""
            />
          ) : (
            <img
              className="w-[86px] h-[70px] object-cover"
              src="https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png"
              alt=""
            />
          )}
          <h1 className="text-4xl  capitalize leading-[31px] font-[600] font-['Work_Sans] tracking-[.9px]">
            Sales Portal / {loginInSeller?.name}
          </h1>
        </div>
        <div className="w-[660px] h-[46px] flex justify-between items-center">
          <div className="h-[68px] w-[439px] relative">
            <img className="w-full h-full " src={bgImg} alt="" />
            <div className="w-full h-full  absolute top-0 left-0 pl-[16px] pt-[7px]">
              <p className="text-xs  font-[400] font-['work_sans'] p-[2px] text-monsoon ">
                Sales Toolkit
              </p>
              <div className="buttonGroup flex items-center mt-[5px] justify-between ml-[5px] mr-[8px]">
                <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon  flex items-center gap-[5px]">
                  <BorderEmail />
                  Email signature
                </button>
                <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                  Email setup
                </button>
                <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                  pricing
                </button>
                <Link
                  target="blank"
                  to={loginInSeller?.website}
                  className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon "
                >
                  website
                </Link>
                <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                  <AdIcon />
                </button>
                <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                  <XdIcon />
                </button>
                <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                  <PdfIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            {dropdown && (
              <div className="absolute rounded-md shadow-md p-3 flex flex-col gap-2 top-16 left-0 bg-white border-2 border-cyan-300 w-[140px] h-[auto]">
                <span
                  className="absolute block w-8 h-8 border shadow-2xl bg-cyan-600 -top-8 "
                  style={{ clipPath: "polygon(49% 37%, 0% 100%, 100% 100%)" }}
                ></span>
                <button className="flex justify-between gap-2 font-['work_sans'] font-[500] items-center">
                  <Setting />
                  Setting
                </button>
                <button
                  className="flex justify-between gap-2 font-['work_sans'] font-[500] items-center"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  Log out
                </button>
                <Link
                  to="/company"
                  className="flex justify-between gap-2 font-['work_sans'] font-[500] items-center"
                >
                  <CompanyIcon />
                  Companies
                </Link>
              </div>
            )}
            {localStorage.getItem("Seller") ? (
              loginInSeller?.avatar ? (
                <div className="flex items-end justify-end gap-3">
                  <img
                    onClick={() => setDropdown(!dropdown)}
                    className=" w-[46px] h-[46px] mt-[0px] cursor-pointer ml-[5px] border-[1px] rounded-full p-[2px] border-cyan"
                    src={loginInSeller?.avatar}
                    alt=""
                  />
                  <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                    <p className="text-shipGrey  truncate w-[100px] text-sm  font-[700] font-['work_sans']">
                      {loginInSeller?.name}
                    </p>
                    <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                      {loginInSeller?.email}
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-full h-[50px]">
                    <DownArrow />
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-end gap-3">
                  <img
                    onClick={() => setDropdown(!dropdown)}
                    className=" w-[46px] cursor-pointer shrink-0 h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                    src={user}
                    alt=""
                  />
                  <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                    <p className="text-shipGrey  truncate w-[100px] text-sm  font-[700] font-['work_sans']">
                      {loginInSeller?.name}
                    </p>
                    <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                      {loginInSeller?.email}
                    </span>
                  </div>
                  <div>
                    <DownArrow />
                  </div>
                </div>
              )
            ) : (
              <Link
                to="/"
                className="w-[140px]  gap-[14px] mt-[12px] h-[46px] flex justify-start items-center overflow-hidden "
              >
                {loginInSeller?.avatar ? (
                  <img
                    className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                    src={loginInSeller?.avatar}
                    alt=""
                  />
                ) : (
                  <img
                    className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                    src={user}
                    alt=""
                  />
                )}
                <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                  <p className="text-shipGrey  truncate w-[100px] text-sm  font-[700] font-['work_sans']">
                    {loginInSeller?.name}
                  </p>
                  <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                    {loginInSeller?.email}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
