import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import SalesModel from "../Model/SalesModel";
import {
  deleteSeller,
  getSingleSalesSeller,
} from "../../Features/Seller/SellerApi";
import swal from "sweetalert";
//=======================================salesPeople function
const SalesPeople = ({
  avatar,
  name,
  title,
  project,
  clients,
  earning,
  companyLogo,
  companyName,
  ActiveClient,
  styles,
  delay,
  sellerId,
  id,
}) => {
  //=========================================== TODO: all state
  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  const { singleSales } = useSelector(getAllSellerState);

  const dropdownMenu = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target.value)) {
      setManage(false);
    }
  };
  // ==================================================TODO: useEffect
  useEffect(() => {
    window.addEventListener("click", dropdownMenu);
    return () => {
      window.removeEventListener("click", dropdownMenu);
    };
  }, []);
  useEffect(() => {
    if (dropId) {
      dispatch(getSingleSalesSeller(dropId));
    }
  }, [dispatch, dropId]);
  //====================================================== TODO DELETE
  const handleDelete = (id, sellerId) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteSeller({ id, sellerId }));
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  };
  return (
    <>
      {dropDown && (
        <SalesModel
          setModel={setDropDrown}
          singleData={singleSales}
          title="Edit sales"
        />
      )}
      {/* ================================= main container  */}
      <motion.div
        initial={{ y: -15, opacity: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 200,
          ease: [0.17, 0.67, 0.83, 0.67],
          delay: delay,
        }}
        ref={dropdownRef}
        className="border transition-all ease-in-out duration-500 hover:scale-95 p-[22px] flex-col rounded-md w-[304px] h-[340px] flex items-center "
      >
        <div className="people w-full gap-[18px] flex items-center">
          {/* //============================================avatar  */}
          <div className="avatar w-[51px] h-[51px] rounded-full overflow-hidden">
            {avatar ? (
              <img src={avatar} className="w-full h-full" alt="" />
            ) : (
              <img src={avatar} className="w-full h-full" alt="" />
            )}
          </div>
          {/* //=============================================== datials  */}
          <div className="detials">
            <h5 className="text-xl   font-[500] leading-[22px] font-['work_sans'] text-haiti ">
              {name}
            </h5>
            <h6 className="text-sm  font-[400] leading-[18px] font-['work_sans']">
              {title}
            </h6>
          </div>
        </div>
        {/* //===================================================== work datials  */}
        <div className="flex justify-between w-full mt-5 work_detials">
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-3xl  text-haiti  font-['work_sans'] font-[600]">
              {project}
            </h4>
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Project
            </h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-3xl  text-haiti  font-['work_sans'] font-[600]">
              {clients}
            </h4>
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Clients
            </h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-3xl  text-haiti  font-['work_sans'] font-[600]">
              {earning}
            </h4>
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Earnings
            </h6>
          </div>
        </div>
        {/* //========================================================= company  */}
        <div className="flex w-full gap-2 mt-5 company ">
          <div className="companyLogo w-[41px] h-[41px] overflow-hidden rounded-md">
            {companyLogo ? (
              <img
                className="object-cover w-full h-full"
                src={companyLogo}
                alt=""
              />
            ) : (
              <img
                className="object-cover w-full h-full"
                src={
                  "https://storage.jobmarket.com.cy/static/default-company-avatar.jpg"
                }
                alt=""
              />
            )}
          </div>
          <div className="compney_detials">
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Company
            </h6>
            <h6 className="text-md  font-[500] font-['work_sans']">
              {companyName}
            </h6>
          </div>
        </div>
        {/* //========================================================== active client  */}
        <h5 className="w-full mt-10 font-['work_sans'] font-[500] text-cyan-700 ">
          Active Clients
        </h5>
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex w-full clients">
            {ActiveClient?.length > 0
              ? ActiveClient?.map((item, index) => {
                  return (
                    <Link key={index} to={`/${item?._id}`}>
                      <div className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px]">
                        {item?.clientAvatar ? (
                          <img
                            className="w-full h-full rounded-full  border-[2px] border-white"
                            src={item?.clientAvatar}
                            alt=""
                          />
                        ) : (
                          <img
                            className="w-full h-full rounded-full  border-[2px] border-white"
                            src={avatar}
                            alt=""
                          />
                        )}
                      </div>
                    </Link>
                  );
                })
              : ""}

            <button className="clientAvatar w-[29px] h-[29px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-xs  hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
              {ActiveClient > 0
                ? ActiveClient?.slice(3, ActiveClient?.length)
                : 0}
              +
            </button>
          </div>
          <div className="relative z-0 flex flex-col w-full mt-3">
            {manage && dropId === id && (
              <div
                ref={dropMenu}
                className="w-[100px] z-[999] flex flex-col gap-3 py-3 justify-center items-center bg-white h-[130px] absolute bottom-12 rounded-md right-0 border shadow-lg"
              >
                <button
                  onClick={() => setDropDrown(!dropDown)}
                  className="w-full p-1 text-xs  font-['Work_sans'] font-bold capitalize hover:text-gray-500 "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id, sellerId)}
                  className="w-full text-xs  font-['Work_sans'] p-1 font-bold capitalize hover:text-gray-500 "
                >
                  Delete
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setManage(!manage), setDropId(id);
              }}
              className="w-[117px] h-[40px] flex justify-center items-center duration-500 bg-primary   text-white hover:text-white rounded-md hover:bg-secondary   transition-all ease-in-out"
            >
              Manage
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SalesPeople;
