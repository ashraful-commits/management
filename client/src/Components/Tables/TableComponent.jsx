import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getAllProject,
  permissionUpdate,
  projectStatusUpdate,
  updateCommissionRate,
  updateSalesCommissionRate,
} from "../../Features/Project/ProjectApi";
import { setMessageEmpty } from "../../Features/Project/ProjectSlice";
import Model from "../Model/Model";
import swal from "sweetalert";
import LoadingSpinner from "../LoadingSpin";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import { Toastify } from "../../Utils/Tostify";
import { LoggedInSeller } from "../../Features/Seller/SellerApi";
import { motion } from "framer-motion";
import { getAllProjectState } from "../../Features/Project/ProjectSlice";
import AdminProject from "./AdminProject";
import LoginUserProject from "./LoginUserProject";

// main container
const TableComponent = ({ sellerId, input }) => {
  const { project, loader, error, message } = useSelector(getAllProjectState);
  const { loginInSeller, loader: sellerLoader } =
    useSelector(getAllSellerState);
  const dispatch = useDispatch();

  //======================================================================================edit model
  const [editModel, setEditModel] = useState(false);
  //========================================================================================== singleData
  const [singleData, setSingleData] = useState({});

  //========================================================================================set limit
  const [dropdown, setDropdown] = useState(false);
  //=======================================================================================dropId
  const [dropId, setDropId] = useState(null);
  //================================all ref
  const dropdownRef = useRef();
  //========================================= handledrop down men
  const handleDropdown = (id) => {
    setDropdown(!dropdown);
    setDropId(id);
  };
  //===================================================================================handle edit
  const handleEdit = (id) => {
    setEditModel(true);
    setSingleData(project.find((item) => item._id == id));
  };
  //===============================================================================handle edit
  const handleSellerEdit = (id) => {
    setEditModel(true);
    setSingleData(loginInSeller?.projects?.find((item) => item._id == id));
  };
  //===============================================================================handle delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProject(id)).then(() => {
          dispatch(LoggedInSeller());
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  //===============================================================================handle permission
  const handlePermission = (id, status) => {
    dispatch(permissionUpdate({ id, status })).then(() => {
      dispatch(LoggedInSeller());
    });
  };
  //===============================================================================handle permission
  const handleProjectStatus = (id, projectStatus) => {
    dispatch(projectStatusUpdate({ id, projectStatus })).then(() => {
      dispatch(LoggedInSeller());
    });
  };
  //============================================================================== handle commission
  const handleCommission = (id, commissionRate) => {
    dispatch(updateCommissionRate({ id, commissionRate })).then(() => {
      dispatch(LoggedInSeller());
    });
  };
  //=============================================================================handle sale commission
  const handleSalesCommission = (id, salesCommissionRate) => {
    dispatch(updateSalesCommissionRate({ id, salesCommissionRate })).then(
      () => {
        dispatch(LoggedInSeller());
      }
    );
  };
  //===================================================================================get user client
  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  //====================================================================================== toastify
  useEffect(() => {
    if (error) {
      Toastify(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      Toastify(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [message, error, dispatch]);
  //===================================window dorpdown menu
  const handleWindowDropdwon = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target.value)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleWindowDropdwon);
    return () => window.removeEventListener("click", handleWindowDropdwon);
  }, []);
  //=========================================================================return
  return (
    <div ref={dropdownRef}>
      {/* //=============================================edit model  */}
      {editModel && (
        <Model
          setClient={setEditModel}
          title="Edit Project"
          singleData={singleData}
        />
      )}
      <table className="w-full  min-h-[490px] rounded-md ">
        {/* //======================================table header  */}
        <thead>
          <tr className="w-full min-h-[1.875rem] h-full  grid pr-6 grid-flow-col justify-between  py-2 text-center">
            <th className="text-sm  font-['work_sans'] w-[30px]  text-start font-[400]"></th>
            <th className="text-sm  font-['work_sans'] -ml-[3rem] w-[150px]  text-start font-[400]">
              Company Name
            </th>
            <th className="text-sm  font-['work_sans'] -ml-[4rem] w-[150px]  text-start font-[400]">
              Client Name
            </th>
            <th className="text-sm  w-[100px] font-['work_sans'] text-start font-[400]">
              Data Signed
            </th>
            <th className="text-sm  font-['work_sans'] w-[120px]  text-start font-[400]">
              Contact Amount
            </th>
            {loginInSeller?.role === "user" && (
              <th className="text-sm  font-['work_sans'] w-[100px]  text-start font-[400]">
                Commission
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-sm  font-['work_sans'] w-[100px]  text-start font-[400]">
                Project status
              </th>
            )}
            {loginInSeller?.role === "admin" && (
              <th className="text-sm  font-['work_sans'] w-[120px]  text-start font-[400]">
                commission rate
              </th>
            )}
            {loginInSeller?.role === "super_admin" && (
              <th className="text-sm  font-['work_sans'] w-[120px]  text-start font-[400]">
                commission rate
              </th>
            )}

            {loginInSeller?.role === "super_admin" && (
              <th className="text-sm  font-['work_sans'] w-[80px]  text-start font-[400]">
                Permission
              </th>
            )}
            <th className="text-sm  font-['work_sans'] w-[100px]  text-start font-[400]">
              Client source
            </th>
            <th className="text-sm  w-[50px] font-['work_sans'] flex justify-end items-start  font-[400]"></th>
          </tr>
        </thead>
        {/* //==========================================table body  */}
        <tbody className="relative w-full h-full ">
          {(loader || sellerLoader) && (
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 1.3 }}
              className="absolute top-0 left-0 w-full h-full bg-primary bg-opacity-20"
            >
              <div className="w-full absolute h-full top-[45%]">
                <LoadingSpinner />
              </div>
            </motion.div>
          )}
          {loginInSeller?.role === "super_admin" ? (
            //===================================admin project
            <AdminProject
              project={project}
              input={input}
              handleProjectStatus={handleProjectStatus}
              loginInSeller={loginInSeller}
              handleCommission={handleCommission}
              handlePermission={handlePermission}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dropId={dropId}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            //===================================any other user project
            <LoginUserProject
              input={input}
              handleProjectStatus={handleProjectStatus}
              loginInSeller={loginInSeller}
              handleCommission={handleCommission}
              handlePermission={handlePermission}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dropId={dropId}
              handleDelete={handleDelete}
              handleSalesCommission={handleSalesCommission}
              handleSellerEdit={handleSellerEdit}
            />
          )}
        </tbody>
        {/* //=======================================table footer  */}
      </table>
    </div>
  );
};

export default TableComponent;
