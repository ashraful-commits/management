import bgImg from "../../../public/bgImg.png";
import user from "../../../public/user.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { LogoutClient } from "../../Features/Client/ClientApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import LoadingSpinner from "../../Components/LoadingSpin";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import {
  getAllProjectState,
  setMessageEmpty,
} from "../../Features/Project/ProjectSlice";
import {
  AddMoreFile,
  getSingleProject,
  updateProject,
} from "../../Features/Project/ProjectApi";
import DetialsSections from "../../Components/Project/DetialsSections";
import Team from "../../Components/Project/Team";
import SoftWere from "../../Components/Project/SoftWere";
import ProjectFile from "../../Components/Project/ProjectFile";
import ClientFeedBack from "../../Components/Project/ClientFeedBack";
import Invoices from "../../Components/Project/Invoices";
import Model from "../../Components/Model/Model";
import DeleteIcon from "../../Icons/DeleteIcon";
import BorderEmail from "../../Icons/BorderEmail";
import { XdIcon } from "../../Icons/XdIcon";
import AdIcon from "../../Icons/AdIcon";
import PdfIcon from "../../Icons/PdfIcon";
import Setting from "../../Icons/Setting";
import LogoutIcon from "../../Icons/LogoutIcon";
import CustomerIcon from "../../Icons/CustomerIcon";
import PhotoshopIcon from "../../Icons/PhotoshopIcon";
import IllustratorIcon from "../../Icons/IllustratorIcon";
import FigmaIcon from "../../Icons/FigmaIcon";
import WordIcon from "../../Icons/WordIcon";
import JpgIcon from "../../Icons/JpgIcon";
import UploadIcon from "../../Icons/UploadIcon";
import { Toastify } from "../../Utils/Tostify";
const Project = () => {
  //===================================== TODO:get all client state
  const { singleProject, loader, message, error } =
    useSelector(getAllProjectState);

  //====================================================TODO:dispatch and all state
  const dispatch = useDispatch();
  const { id } = useParams();
  const [team, setTeam] = useState(false);
  const [tools, setTools] = useState(false);
  const [pdf, setPdf] = useState(false);
  const pdfRef = useRef();
  const [selectedSalespersons, setSelectedSalespersons] = useState([]);
  const [selectTools, setSelectTools] = useState([]);
  const [menu, setMenu] = useState("Project Details");
  const [dropdown, setDropdown] = useState(false);
  const [manage, setManage] = useState(false);
  //===================================================TODO:navigate
  const navigate = useNavigate();

  //========================================================TODO:get all singleProject
  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);
  //===========================================================TODO:handle file upload
  const handleFileUpload = (e) => {
    const formData = new FormData();
    [...e.target.files].forEach((item) => {
      formData.append("projectFile", item);
    });
    dispatch(AddMoreFile({ id, formData })).then(() => {
      dispatch(getSingleProject(id));
    });
  };
  //=====================================TODO:download pdf
  const handlePdf = () => {
    setPdf(true);
    const capture = pdfRef.current;
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Fix the MIME type here
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth(); // Fix the method name here
      const componentHeight = doc.internal.pageSize.getHeight(); // Fix the method name here
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save();
      setPdf(false);
    });
  };
  //=====================================TODO:team member checkbox
  const handleInputChange = (e) => {
    const selectedValue = String(e.target.value);

    if (selectedSalespersons.includes(selectedValue)) {
      setSelectedSalespersons(
        selectedSalespersons.filter((item) => item !== selectedValue)
      );
    } else {
      setSelectedSalespersons((prev) => [...prev, selectedValue]);
    }
  };
  //=====================================TODO:tools  checkbox
  const handleToolsInputChange = (e) => {
    const selectedValue = String(e.target.value);

    if (selectTools.includes(selectedValue)) {
      setSelectTools(selectTools.filter((item) => item !== selectedValue));
    } else {
      setSelectTools((prev) => [...prev, selectedValue]);
    }
  };
  //================================= TODO:handle team update
  const handleTeamUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({ id, formData: { team: selectedSalespersons } })
    ).then(() => {
      dispatch(getSingleProject(id));
      setTeam(false);
    });
  };
  //================================= TODO:handle tools update
  const handleToolsSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProject({ id, formData: { tools: selectTools } })).then(
      () => {
        dispatch(getSingleProject(id));
        setTools(false);
      }
    );
  };
  //============================================ TODO:edit team member data
  useEffect(() => {
    let allTeam = [];
    let allTools = [];
    singleProject?.team?.forEach((item) => {
      allTeam?.push(item._id);
    });
    singleProject?.tools?.forEach((item) => {
      allTools?.push(item);
    });
    setSelectedSalespersons(allTeam);
    setSelectTools(allTools);
  }, [singleProject]);
  //========================================TODO:handleLogout
  const handleLogout = () => {
    dispatch(LogoutClient());
    localStorage.clear("Client");
    navigate("/login");
  };
  //================================all toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [message, dispatch, error]);
  //===================================================TODO:return
  return (
    <>
      {/* //================================================== TODO:loader  */}
      {loader && (
        <div className="w-screen bg-opacity-20  h-screen min-h-[1240px] z-[9999999999999] bg-primary  flex justify-center items-center fixed top-0 left-0">
          <div className="top-[40%] absolute flex justify-center items-center w-full h-full">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {/* //===================================================TODO:pdf download  */}
      {pdf && (
        <div
          ref={pdfRef}
          className="w-[50%] h-[60vh] absolute top-[10%] left-[25%] bg-white p-5"
          size="a4"
        >
          {singleProject?.projectDesc}
        </div>
      )}
      {/* //================================================ TODO:team  */}
      {tools && (
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,

            ease: [0.17, 0.67, 0.83, 0.67],
            delay: 0.1,
          }}
          className=" top-0 group left-0 w-screen flex flex-col gap-5  justify-center items-center h-screen fixed z-[999999999] bg-white bg-opacity-60 p-5"
        >
          <button
            className="flex items-center justify-center w-10 h-10 transition-all duration-500 ease-in-out bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-400 "
            onClick={() => setTools(false)}
          >
            <DeleteIcon />
          </button>
          {/* //======================================================form  */}
          <form
            onSubmit={handleToolsSubmit}
            className="w-[50vw]  rounded-md h-auto border gap-3 bg-gray-50 grid grid-cols-4 grid-flow-row overflow-y-scroll p-2"
          >
            <div className="h-[50px] p-3 shrink-0 border bg-white w-full flex  items-center relative justify-center">
              <input
                type="checkbox"
                className="absolute cursor-pointer top-3 left-3"
                checked={selectTools && selectTools.includes("Photoshop")}
                value={"Photoshop"}
                onChange={handleToolsInputChange}
              />
              <label htmlFor="">Photoshop</label>
            </div>
            <div className="h-[50px] p-3 shrink-0 border bg-white w-full flex  items-center relative justify-center">
              <input
                type="checkbox"
                className="absolute cursor-pointer top-3 left-3"
                checked={selectTools && selectTools.includes("Illustrator")}
                value={"Illustrator"}
                onChange={handleToolsInputChange}
              />
              <label htmlFor="">Illustrator</label>
            </div>
            <div className="h-[50px] p-3 shrink-0 border bg-white w-full flex  items-center relative justify-center">
              <input
                type="checkbox"
                className="absolute cursor-pointer top-3 left-3"
                checked={selectTools && selectTools.includes("Figma")}
                value={"Figma"}
                onChange={handleToolsInputChange}
              />
              <label htmlFor="">Figma</label>
            </div>
            <div className="h-[50px] p-3 shrink-0 border bg-white w-full flex  items-center relative justify-center">
              <input
                type="checkbox"
                className="absolute cursor-pointer top-3 left-3"
                checked={selectTools && selectTools.includes("Word")}
                value={"Word"}
                onChange={handleToolsInputChange}
              />
              <label htmlFor="">Word</label>
            </div>
            <div className="h-[50px] p-3 shrink-0 border bg-white w-full flex  items-center relative justify-center">
              <input
                type="checkbox"
                className="absolute cursor-pointer top-3 left-3"
                checked={selectTools && selectTools.includes("Other")}
                value={"Other"}
                onChange={handleToolsInputChange}
              />
              <label htmlFor="">Other</label>
            </div>

            <button
              type="submit"
              className="h-[30px] justify-end col-span-4 bg-primary text-white transition-all ease-in-out duration-500 hover:scale-105"
            >
              Add Tools
            </button>
          </form>
        </motion.div>
      )}
      {team && (
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,

            ease: [0.17, 0.67, 0.83, 0.67],
            delay: 0.1,
          }}
          className=" top-0 group bg-opacity-70 left-0 w-screen flex flex-col gap-5  justify-center items-center h-screen fixed z-[999999999] bg-white p-5 bg-opacity-60"
        >
          <button
            className="flex items-center justify-center w-10 h-10 transition-all duration-500 ease-in-out bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-400 "
            onClick={() => setTeam(false)}
          >
            <DeleteIcon />
          </button>
          {/* //======================================================form  */}
          <form
            onSubmit={handleTeamUpdate}
            className="w-[50vw]  rounded-md h-auto border gap-3 bg-gray-50 grid grid-cols-4 grid-flow-row overflow-y-scroll p-2"
          >
            {singleProject?.sellerId?.salesPerson?.length > 0 ? (
              singleProject?.sellerId?.salesPerson?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="h-[100px] p-3 shrink-0 border bg-white w-full flex flex-col items-center relative justify-center"
                  >
                    <input
                      type="checkbox"
                      className="absolute cursor-pointer top-3 left-3"
                      checked={selectedSalespersons?.includes(item?._id)}
                      value={item?._id}
                      onChange={handleInputChange}
                    />
                    <div className="flex flex-col items-center justify-start w-full h-full">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={item?.avatar}
                        alt=""
                      />
                      <span className="text-2xs  font-['work_sans']">
                        {item.name}
                      </span>
                      <span className="text-[8px] font-['work_sans']">
                        {item.email}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>No Team member</span>
            )}

            <button
              type="submit"
              className="h-[30px] justify-end col-span-4 bg-cyan-800 text-white transition-all ease-in-out duration-500 hover:scale-105"
            >
              Add Team Member
            </button>
          </form>
        </motion.div>
      )}
      {/* //============================================================ TODO:project  */}
      {manage && (
        <Model
          singleData={singleProject}
          title="Edit Project"
          setClient={setManage}
        />
      )}
      <motion.div
        initial={{ y: -15, opacity: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 2,
          type: "spring",
          stiffness: 200,
          ease: [0.17, 0.67, 0.83, 0.67],
          delay: 0.8,
        }}
        className="min-w-[1340px] scroll-smooth relative rounded-[15px]  pl-[48px]  pt-[30px]   min-h-[1140px] h-[1140px] grid grid-flow-row overflow-hidden mb-[30px] bg-white"
      >
        {/* //============================================================ TODO:header  */}
        <div className="header bg-white min-w-full flex items-center w-[1300px] h-[68px]">
          <div className="w-[640px] h-full flex items-center gap-[20px] rounded-md overflow-hidden ">
            {singleProject?.clientId?.companyAvatar ? (
              <img
                className="w-[86px] h-[70px] object-cover"
                src={singleProject?.clientId?.companyAvatar}
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
              Sales Portal / {singleProject?.clientId?.clientName}
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
                    to={singleProject?.website}
                    className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon "
                  >
                    website
                  </Link>
                  <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    <XdIcon />
                  </button>
                  <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    <AdIcon />
                  </button>
                  <button className="text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out bg-[#F2F2F2] p-[2px] text-monsoon ">
                    <PdfIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              {dropdown && (
                <div className="absolute rounded-md shadow-md p-3 flex flex-col gap-2 top-12 left-5 bg-white border w-[120px] h-[100px]">
                  <button className="flex justify-center gap-2 font-['work_sans'] font-[500] items-center">
                    <Setting />
                    Setting
                  </button>
                  <button
                    className="flex justify-center gap-2 font-['work_sans'] font-[500] items-center"
                    onClick={handleLogout}
                  >
                    <LogoutIcon />
                    Log out
                  </button>
                </div>
              )}
              {localStorage.getItem("Client") ? (
                singleProject?.clientId?.clientAvatar ? (
                  <div className="flex items-end justify-end gap-3">
                    <img
                      onClick={() => setDropdown(!dropdown)}
                      className=" w-[46px] h-[46px] mt-[0px] cursor-pointer ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                      src={singleProject?.clientId?.clientAvatar}
                      alt=""
                    />
                    <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                      <p className="text-shipGrey  truncate w-[100px] text-sm  font-[700] font-['work_sans']">
                        {singleProject?.clientId?.clientName}
                      </p>
                      <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                        {singleProject?.clientId?.clientEmail}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end justify-end gap-3">
                    <img
                      onClick={() => setDropdown(!dropdown)}
                      className=" w-[46px] cursor-pointer h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                      src={user}
                      alt=""
                    />
                    <div className="w-auto flex h-[46px] flex-col gap-[-5px]">
                      <p className="text-shipGrey  truncate w-[100px] text-sm  font-[700] font-['work_sans']">
                        {singleProject?.clientId?.clientName}
                      </p>
                      <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                        {singleProject?.clientId?.clientEmail}
                      </span>
                    </div>
                  </div>
                )
              ) : (
                <Link
                  to="/"
                  className="w-[140px]  gap-[14px] mt-[12px] h-[46px] flex justify-start items-center overflow-hidden "
                >
                  {singleProject?.clientId?.clientAvatar ? (
                    <img
                      className=" w-[46px] h-[46px] mt-[0px] ml-[5px] border-[1px] rounded-full p-[2px] border-cyan-600"
                      src={singleProject?.clientId?.clientAvatar}
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
                      {singleProject?.clientId?.clientName}
                    </p>
                    <span className="text-shipGrey  truncate w-[90px] text-sm  font-[400] font-['work_sans']">
                      {singleProject?.clientId?.clientEmail}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* //==========================================================TODO:main container  */}
        <div className="main-container flex min-w-full gap-[43px] w-[1300px] mt-[52px] tracking-[-.52px] h-[1072px] ">
          {/* //========================================================TODO:left section  */}
          <div className="left w-[938px] h-full">
            <h1 className="text-4xl  font-[600] text-shipGrey  font-['work_sans']">
              Real-Time Video Processing using Chromakey (Greenscreen) Effect{" "}
            </h1>
            <p className="text-xs  font-[400px] font-['work_sans'] text-monsoon  mt-[4px]">
              Visual UI / UX Design & Branding
            </p>

            {/* //===================================== TODO:client datiels section  */}
            <div className="flex gap-[px] mt-[16px]">
              <DetialsSections
                delay={0.2}
                name={singleProject?.clientId?.clientName}
                title="client Name"
                svg={<CustomerIcon />}
              />
              <DetialsSections
                delay={0.4}
                name={singleProject?.company?.companyName}
                title="Company Name"
                svg={<CustomerIcon />}
              />
              <DetialsSections
                delay={0.6}
                name={singleProject?.date}
                title="Assigned Date"
                svg={<CustomerIcon />}
              />
              <DetialsSections
                delay={0.8}
                name={singleProject?.timeFrame}
                title="Deadline"
                svg={<CustomerIcon />}
              />
              <DetialsSections
                name={singleProject?.budget}
                title="Budget"
                svg={<CustomerIcon />}
              />
            </div>
            {/* //========================================== TODO:manage project  */}
            <div className="flex items-center justify-between manageProject ">
              <div className="comment w-[375px] mt-[42px] rounded-[7px] h-[38px] border-[1px] border-[#DFDFDF] grid grid-cols-3 transition-all ease-in-out duration-500 hover:scale-105">
                <button
                  onClick={() => setMenu("Project Details")}
                  className={`${
                    menu == "Project Details" && "shadow-md"
                  } active:bg-white active:shadow-lg text-xs  font-[500] font-['work_sans']  rounded-[7px]  text-monsoon `}
                >
                  Project Details
                </button>
                <button
                  onClick={() => setMenu("Client Feedback")}
                  className={`${
                    menu == "Client Feedback" && "shadow-md"
                  } active:bg-white active:shadow-lg text-xs  font-[500] font-['work_sans']  rounded-[7px]  text-monsoon `}
                >
                  Client Feedback
                </button>
                <button className="active:bg-white active:shadow-lg text-xs  font-[400] font-['work_sans'] hover:bg-gray-200 px-[5px] transition-all duration-500 ease-in-out  rounded-[7px] text-monsoon ">
                  Client Feedback
                </button>
              </div>
              <div className="flex items-center justify-center h-full button">
                <button
                  onClick={() => setManage(true)}
                  className="bg-primary  text-md  font-[500] text-white hover:bg-secondary   transition-all duration-500 w-[134px] h-[38px] rounded-md mt-[39px] hover:scale-105"
                >
                  Manage Project
                </button>
              </div>
            </div>
            {menu === "Project Details" && (
              <>
                {/* //====================================================== project datiels  */}
                <div className="projectDatials overflow-hidden rounded-[8px] border w-full mt-[18px] h-[150px] px-[20px] py-[15px]">
                  <div className="flex justify-between">
                    <h1 className="text-haiti  font-[500] text-2xl  tracking-[.4px] font-['work_sans'] ">
                      Project Details
                    </h1>
                    <button
                      onClick={handlePdf}
                      className="w-[120px] h-[26px] flex justify-center items-center text-xs  font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400] gap-[5px] hover:bg-gray-300 transition-all duration-500 ease-in-out"
                    >
                      <PdfIcon />
                      Download PDF
                    </button>
                  </div>
                  <div className="h-full overflow-y-scroll ">
                    <p className="text-['work_sans'] font-[14px] mt-[20px] pb-10 leading-[18px]">
                      {singleProject?.projectDesc}
                    </p>
                  </div>
                </div>
                {/* //============================================== TODO:team member  */}
                <div className="teamMember overflow-hidden rounded-[8px] border w-full mt-[18px] h-[217px] px-[16px] py-[15px]">
                  <div className="flex justify-between">
                    <h1 className="text-haiti  font-[500] text-2xl  tracking-[.4px] font-['work_sans'] ">
                      Team
                    </h1>
                    <button className="w-[106px] h-[26px] flex justify-center items-center text-xs  font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400]  hover:bg-gray-300 transition-all duration-500 ease-in-out">
                      Manage Team
                    </button>
                  </div>
                  <div className="grid h-full grid-cols-4 pb-5 mt-5 overflow-y-auto">
                    {singleProject?.team?.length > 0 ? (
                      singleProject?.team?.map((item, index) => {
                        return (
                          <Team
                            key={index}
                            avatar={item?.avatar}
                            name={item?.name}
                            title={item?.employment}
                            delay={`${index}`}
                          />
                        );
                      })
                    ) : (
                      <span>No team member</span>
                    )}

                    {!localStorage.getItem("Client") && (
                      <button
                        onClick={() => setTeam(!team)}
                        className="flex p-[4px] items-center h-[42px] gap-[10px] transition-all ease-in-out duration-500 hover:scale-105"
                      >
                        <div className="w-[42px] h-[42px] border rounded-full flex justify-center items-center bg-gray-100">
                          +
                        </div>
                        <div className="text-lg  font-[500] font-['work_sans']">
                          Add Member
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                {/* //================================================== TODO:softwere tools  */}
                <div className="softwareTools overflow-hidden rounded-[8px] border w-full mt-[18px] h-[117px] px-[20px] py-[18px]">
                  <div className="flex justify-between">
                    <h1 className="text-haiti  font-[500] text-2xl  tracking-[.4px] font-['work_sans'] ">
                      Software & Tools
                    </h1>
                    <button className="w-[106px] h-[26px] flex justify-center items-center text-xs  font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400]  hover:bg-gray-300 transition-all duration-500 ease-in-out hover:scale-105">
                      Manage Tools
                    </button>
                  </div>
                  <div className="flex flex-wrap  h-full overflow-y-auto gap-[15px] mt-5 pb-10">
                    {singleProject?.tools.map((item, index) => {
                      return (
                        <SoftWere
                          key={index}
                          svg={
                            (item == "Photoshop" && <PhotoshopIcon />) ||
                            (item == "Illustrator" && <IllustratorIcon />) ||
                            (item == "Illustrator" && <IllustratorIcon />) ||
                            (item == "Figma" && <FigmaIcon />) ||
                            (item == "Word" && <WordIcon />)
                          }
                          name={item}
                          delay={`${index}`}
                        />
                      );
                    })}

                    <div className="flex  items-center  rounded-2xl w-[87px] h-[31px] gap-[10px]">
                      <button
                        onClick={() => setTools(true)}
                        className="rounded-2xl border text-xs  px-[10px] w-full h-full hover:bg-gray-300 transition-all ease-in-out duration-500 font-[400] font-['work_sans'] hover:scale-105"
                      >
                        + Add Tool
                      </button>
                    </div>
                  </div>
                </div>
                {/* //==================================================== TODO:project files  */}
                <div className="ProjectFiles overflow-hidden rounded-[8px] border w-full mt-[18px] h-[230px] px-[22px] py-[11px]">
                  <div className="flex justify-between">
                    <h1 className="text-haiti  font-[500] text-2xl  tracking-[.4px]  mt-[10px]font-['work_sans'] ">
                      Project Files
                    </h1>
                    <button className="w-[106px] h-[26px] flex justify-center items-center text-xs  font-['work_sans'] bg-gray-100 px-[6px] py-[2px] border rounded-md font-[400]  hover:bg-gray-300 transition-all duration-500 ease-in-out hover:scale-105">
                      Manage Files
                    </button>
                  </div>
                  <div className="grid gap-[15px] h-full overflow-y-auto grid-cols-4 mt-5 pb-10">
                    {singleProject?.projectFile?.length > 0 ? (
                      singleProject?.projectFile?.map((item, index) => {
                        return (
                          <ProjectFile
                            key={index}
                            svg={
                              (item?.split(".").pop() === "psd" && (
                                <PhotoshopIcon />
                              )) ||
                              (item?.split(".").pop() === "ai" && (
                                <IllustratorIcon />
                              )) ||
                              (item?.split(".").pop() === "jpg" && <JpgIcon />)
                            }
                            name={
                              (item?.split(".").pop() === "psd" &&
                                "Photoshop") ||
                              (item?.split(".").pop() === "ai" &&
                                "Illustrator") ||
                              (item?.split(".").pop() === "fig " && "Figma") ||
                              (item?.split(".").pop() === "jpg" &&
                                "JPEG Image") ||
                              (item?.split(".").pop() === "png" &&
                                "PNG Image") ||
                              (item?.split(".").pop() === "doc" && "Word") ||
                              (item?.split(".").pop() === "xls" && "Excel") ||
                              (item?.split(".").pop() === "pdf" &&
                                "PDF Document") ||
                              (item?.split(".").pop() === "txt" && "Text") ||
                              (item?.split(".").pop() === "mp4" &&
                                "MP4 Video") ||
                              (item?.split(".").pop() === "mp3" &&
                                "MP3 Audio") ||
                              (item?.split(".").pop() === "zip" &&
                                "ZIP Archive") ||
                              (item?.split(".").pop() === "html" && "HTML") ||
                              (item?.split(".").pop() === "css" && "CSS") ||
                              (item?.split(".").pop() === "js" &&
                                "JavaScript") ||
                              (item?.split(".").pop() === "xlsx" &&
                                "Excel Spreadsheet") ||
                              (item?.split(".").pop() === "pptx" &&
                                "PowerPoint") ||
                              "Unknown"
                            }
                            title="Figma Link"
                            file={item}
                            id={singleProject?._id}
                          />
                        );
                      })
                    ) : (
                      <span>No Project files</span>
                    )}

                    <div className="flex  items-center  rounded-2xl w-[150px] h-[57px] overflow-hidden gap-[10px]">
                      <label
                        htmlFor="ProjectFillUpload"
                        className="rounded-2xl cursor-pointer border  text-md   w-full h-full hover:bg-gray-300 transition-all ease-in-out duration-500 font-[400] font-['work_sans']  flex justify-center items-center gap-2 border-dotted"
                      >
                        <UploadIcon />
                        Upload File
                      </label>
                      <input
                        id="ProjectFillUpload"
                        className="hidden"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {menu === "Client Feedback" && <ClientFeedBack />}
          </div>
          {/* //====================================================== TODO:right section  */}
          <div className="right border w-[315px] overflow-hidden rounded-[8px] mt-1 flex justify-center">
            <div className="flex flex-col items-center w-full h-full ">
              <div className="flex items-center justify-center gap-2 mt-3 payment">
                <div className="w-[135px] h-[78px] flex flex-col   rounded-md justify-center items-center border pt-[10px]">
                  <h5 className="font-[400] font-['work_sans'] text-xs ">
                    Payment Received
                  </h5>
                  <h4 className="text-xl  font-bold font-['work_sans']">
                    45900$
                  </h4>
                </div>
                <div className="w-[135px] flex flex-col pt-[20px] rounded-md gap-[15px]justify-center h-[78px] items-center border">
                  <h5 className="text-monsoon  font-[400] font-['work_sans'] text-xs ">
                    Payment Due
                  </h5>
                  <h4 className="font-bold font-['work_sans'] text-xl ">
                    45900$
                  </h4>
                </div>
              </div>
              <div className="comissions border w-[277px] mt-3 h-[55px] rounded-md ">
                <p className="text-md  ml-3 mt-1 tracking-[.6px] text-monsoon ">
                  Generative Commissions
                </p>
                <div className="flex items-center gap-[5px]">
                  <input
                    type="range"
                    max={100}
                    value={
                      ((
                        singleProject?.amount -
                        (singleProject?.amount * 15) / 100
                      ).toFixed(0) *
                        100) /
                      singleProject?.amount
                    }
                    readOnly={true}
                    className="w-[75%] ml-3"
                  />
                  <span className="text-md  text-[#878769] font-[500]">
                    $
                    {(
                      singleProject?.amount -
                      (singleProject?.amount * 15) / 100
                    ).toFixed(0)}
                  </span>
                </div>
              </div>
              <div className="label w-full mt-4 px-[21px] text-md  font-[500] font-['work_sans'] text-haiti ">
                <label
                  className="text-md  font-[500] font-['work_sans']"
                  htmlFor=""
                >
                  Label
                </label>
                <div className="mt-2 flex h-[56px] overflow-y-auto justify-start flex-wrap gap-[10px]">
                  <button className="bg-gray-200 text-[9px] px-[10px] py-[5px] rounded-sm flex items-center justify-center">
                    Branding & Logo
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[10px] py-[5px] rounded-sm flex items-center justify-center">
                    UI Design
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[10px] py-[5px] rounded-sm flex items-center justify-center">
                    Ux Design
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[5px] py-[5px] rounded-sm">
                    Prototype
                  </button>
                  <button className="bg-gray-200 text-[9px] px-[5px] py-[5px] rounded-sm">
                    Front-end
                  </button>
                </div>
              </div>
              <div className="invoice overflow-hidden w-full h-[335px] mt-4 px-[21px] text-md  font-[500] font-['work_sans'] text-haiti ">
                <label
                  className="text-md  font-[500] font-['work_sans']"
                  htmlFor=""
                >
                  Invoices
                </label>
                <div className="mt-2 flex flex-col justify-start  h-full overflow-y-auto gap-[10px]">
                  <Invoices />
                  <Invoices />
                  <Invoices />
                  <Invoices />
                  <Invoices />
                  <Invoices />
                </div>
              </div>
              <div className="comments overflow-hidden w-full mt-[56px] px-[21px] text-md  font-[500] font-['work_sans'] text-haiti ">
                <label
                  className="text-md  font-[500] font-['work_sans']"
                  htmlFor=""
                >
                  Comments about project
                </label>
                <div className="mt-2 flex flex-col justify-start border h-[270px] overflow-y-auto rounded-md flex-wrap gap-[10px]"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Project;
