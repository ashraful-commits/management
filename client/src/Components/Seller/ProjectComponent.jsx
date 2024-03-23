import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  deleteProject,
  getSingleProject,
} from "../../Features/Project/ProjectApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectState } from "../../Features/Project/ProjectSlice";
import Model from "../Model/Model";
import swal from "sweetalert";
import ProjectIcon from "../../Icons/ProjectIcon";
import EmaiIcon from "../../Icons/EmailIcon";
import MobileIcon from "../../Icons/MobileIcon";

const ProjectComponent = ({
  clientAvatar,
  clientName,
  amount,
  date,
  timeFrame,
  companyName,
  projectStatus,
  projectName,
  team,
  email,
  mobile,
  id,
}) => {
  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  //===================================TODO:get single project
  const { singleProject } = useSelector(getAllProjectState);
  //===================================TODO:handle dropdwon
  const dropdownMenu = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
  //================================================= TODO:get single project
  useEffect(() => {
    if (dropId) {
      dispatch(getSingleProject(dropId));
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
          dispatch(deleteProject(id));
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
      {/* ==============================================TODO:model  */}
      {dropDown && (
        <Model
          setClient={setDropDrown}
          title="Edit Project"
          singleData={singleProject}
        />
      )}
      {/* ===========================================TODO:main container  */}
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
        className="rounded-md transition-all ease-in-out duration-500 hover:scale-105 p-[22px]  w-[304px] h-[340px] border"
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
              {companyName}
            </h5>
          </div>
        </div>
        <div className="mt-5 w-full gap-[18px] flex items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-xs  text-haiti  font-['work_sans'] font-[600]">
              {date}
            </h4>
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Assigned date
            </h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-xs  text-haiti  font-['work_sans'] font-[600]">
              {timeFrame}
            </h4>
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Deadline
            </h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-xs  text-haiti  font-['work_sans'] font-[600]">
              {amount}
            </h4>
            <h6 className="text-monsoon  text-sm  font-['work_sans']">
              Budget
            </h6>
          </div>
        </div>
        <div className="mt-5 flex-col  w-full gap-[18px] flex items-start justify-between">
          <h4 className="text-lg  capitalize flex gap-2 items-center text-haiti  font-['work_sans'] font-[500]">
            <span>
              <ProjectIcon />
            </span>
            {projectName}{" "}
            <span
              className={`border px-2 text-2xs  rounded-xl ${
                projectStatus == "pending" && "bg-orange-300"
              } ${projectStatus == "on going" && "bg-cyan-300"} ${
                projectStatus == "on hold" && "bg-red-300"
              } ${projectStatus == "complete" && "bg-primary  text-white"}`}
            >
              {projectStatus}
            </span>
          </h4>
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

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-center w-full mt-3">
            <span className="block text-cyan-700 ">Team </span>
            <div className="flex w-full clients">
              {team?.length > 0 &&
                team.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px]"
                  >
                    {item?.avatar ? (
                      <img
                        className="w-full h-full rounded-full border-[2px] border-white"
                        src={item?.avatar}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-full h-full rounded-full border-[2px] border-white"
                        src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                        alt=""
                      />
                    )}
                  </div>
                ))}

              {team?.length > 3 ? (
                <button className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-xs  hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
                  +{team.length - 3}
                </button>
              ) : (
                <button className="clientAvatar w-[40px] h-[40px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-xs  hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
                  0
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

export default ProjectComponent;
