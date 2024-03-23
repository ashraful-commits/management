import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ClientModel from "../Model/ClientModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientState } from "../../Features/Client/ClientSlice";
import { deleteClient, getSingleClient } from "../../Features/Client/ClientApi";
import swal from "sweetalert";
import EmaiIcon from "../../Icons/EmailIcon";
import MobileIcon from "../../Icons/MobileIcon";

const ClientComponent = ({
  clientAvatar,
  clientName,
  company,
  email,
  mobile,
  delay,
  id,
  projects,
}) => {
  //=========================================== TODO: all state
  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  const { singleClient } = useSelector(getAllClientState);
  //===================================TODO:handle dropdwon

  const dropdownMenu = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target.value)) {
      setManage(false);
    }
  };

  // ==================================================TODO: useEffect
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("click", dropdownMenu);

    // Remove event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", dropdownMenu);
    };
  }, []);
  //====================================================== TODO:get data
  useEffect(() => {
    if (dropId) {
      dispatch(getSingleClient(dropId));
    }
  }, [dispatch, id, dropId]);

  //====================================================== TODO DELETE
  const handleDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteClient(id));
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
      {/* =========================================dropdown menu  */}
      {dropDown && (
        <ClientModel
          setClient={setDropDrown}
          title="Edit Client"
          singleData={singleClient}
        />
      )}
      {/* ======================================= main container  */}
      <motion.div
        initial={{ y: -15, opacity: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,

          ease: [0.17, 0.67, 0.83, 0.67],
          delay: 0.1 * Math.random() * 10,
        }}
        ref={dropdownRef}
        className="rounded-md p-[22px] transition-all ease-in-out duration-500 hover:scale-105  w-[304px] h-[340px] border"
      >
        <div className="people w-full gap-[18px] flex items-center">
          {/* //============================================avatar  */}
          <div className="avatar w-[51px] h-[51px] rounded-full overflow-hidden">
            {clientAvatar ? (
              <img src={clientAvatar} className="w-full h-full" alt="" />
            ) : (
              <img src={clientAvatar} className="w-full h-full" alt="" />
            )}
          </div>
          {/* //=============================================== datials  */}
          <div className="detials">
            <h5 className="text-xl   font-[500] leading-[22px] font-['work_sans'] text-haiti ">
              {clientName}
            </h5>
            <h5 className="text-md   font-[500] leading-[22px] font-['work_sans'] text-haiti ">
              {company?.companyName}
            </h5>
          </div>
        </div>
        <div className="people w-full gap-[18px] flex items-center">
          {/* //============================================avatar  */}
          <div className="avatar w-[51px] mt-4 h-[51px] rounded-lg overflow-hidden">
            {company?.companyLogo ? (
              <img
                src={company?.companyLogo}
                className="w-full h-full"
                alt=""
              />
            ) : (
              <img src={clientAvatar} className="w-full h-full" alt="" />
            )}
          </div>
          {/* //=============================================== datials  */}
          <div className="detials">
            <h5 className="text-md   font-[500] leading-[22px] font-['work_sans'] text-haiti ">
              Company
            </h5>
            <h5 className="text-[15px]  font-[500] leading-[22px] font-['work_sans'] text-haiti ">
              {company?.companyName}
            </h5>
          </div>
        </div>
        <div className="mt-1 w-full gap-[18px] flex items-center justify-between"></div>
        <div className="mt-5 flex-col  w-full gap-[18px] flex items-start justify-between">
          <h4 className="text-lg  flex items-center gap-2 text-haiti  font-['work_sans'] font-[500]">
            <span>
              <EmaiIcon />
            </span>
            {email}
          </h4>
          <h4 className="text-lg  flex items-center gap-2 text-haiti  font-['work_sans'] font-[500]">
            <span>
              <MobileIcon />
            </span>
            {mobile}
          </h4>
        </div>
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col w-full mt-3 gap-y-1">
            <span className="items-center justify-center block rounded-md text-cyan-700 ">
              Active projects
            </span>
            <div className="flex w-full clients">
              {projects?.length > 2 && (
                <button className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-xs  hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
                  +{projects.length - 2}
                </button>
              )}
            </div>
          </div>
          <div className="relative z-0 flex flex-col w-full mt-3">
            {manage && dropId === id && (
              <div
                ref={dropMenu}
                className="w-[100px] z-[999] flex flex-col gap-3 py-3 justify-center items-center bg-white h-[130px] absolute bottom-12 rounded-md right-0 border shadow-lg"
              >
                <button
                  onClick={() => setDropDrown(!dropDown)}
                  className="w-full p-1 font-bold capitalize hover:text-gray-500 text-xs  font-['Work_sans'] "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="w-full p-1 font-bold capitalize hover:text-gray-500 text-xs  font-['Work_sans'] "
                >
                  Delete
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setManage(!manage), setDropId(id);
              }}
              className="w-[117px] h-[40px] flex justify-center items-center bg-primary   text-white hover:text-white rounded-md hover:bg-secondary   transition-all"
            >
              Manage
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ClientComponent;
