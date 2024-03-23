import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectState } from "../../Features/Project/ProjectSlice";
import {
  deleteProject,
  getSingleProject,
} from "../../Features/Project/ProjectApi";
import swal from "sweetalert";
import Model from "../Model/Model";
import { PrevIcon } from "../../Icons/PrevIcon";
import NextIcon from "../../Icons/NextIcon";

const SellerProject = ({ projects }) => {
  console.log(projects);
  //======================================all state

  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  //===================================TODO:get single project
  const { singleProject } = useSelector(getAllProjectState);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(projects?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects?.slice(indexOfFirstItem, indexOfLastItem);
  //=================================handle page number
  const handlePageNumber = (item) => {
    setCurrentPage(Number(item));
  };
  //====================================pages
  const renderPage = pages.map((item, index) => {
    if (item < MaxPageNumberLimit + 1 && item > MinPageNumberLimit) {
      return (
        <li
          className={`cursor-pointer w-7  h-8  flex items-center justify-center rounded-md ${
            currentPage === item ? "bg-primary text-white" : "border"
          }`}
          onClick={() => handlePageNumber(item)}
          key={index}
        >
          {item}
        </li>
      );
    } else {
      return null;
    }
  });

  //========================================handle next prev
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > MaxPageNumberLimit) {
      setMaxPageNumberLimit(MaxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(MaxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit - pageNumberLimit);
    }
  };
  //===================================page increment
  let pageIncrementBtn = null;
  if (pages.length > MaxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="cursor-pointer" onClick={handleNextBtn}>
        &hellip;
      </li>
    );
  }

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
  }, [dispatch, dropId]);
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
      {dropDown && (
        <Model
          setClient={setDropDrown}
          title="Edit Project"
          singleData={singleProject}
        />
      )}
      <div ref={dropMenu} className="w-full ">
        {currentItems?.filter((item) => item.status === true).length > 0 ? (
          <table className="  w-full min-h-[450px] h-[500px]  font-['Work_sans'] text-xs ">
            <thead>
              <tr className="flex items-center justify-between w-full py-2">
                <th className=" flex justify-start items-center  w-[50px]"></th>
                <th className=" flex justify-start items-center  w-[120px]">
                  ClientName
                </th>
                <th className=" flex justify-start items-center  w-[120px]">
                  ClientAvatar
                </th>
                <th className=" flex justify-start items-center  w-[120px]">
                  Company
                </th>
                <th className=" flex justify-start items-center  w-[120px]">
                  Assigned data
                </th>
                <th className=" flex justify-start items-center  w-[120px]">
                  Deadline
                </th>
                <th className=" flex justify-start items-center  w-[120px]">
                  Budget
                </th>
                <th className=" flex justify-start items-center  w-[150px]"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="flex items-center justify-between py-2 mb-2 border rounded-md"
                  >
                    <td className="  flex justify-start w-[50px] px-2">
                      {index + 1}
                    </td>
                    <td className="  flex justify-start w-[120px] text-md  font-bold">
                      {item?.clientId?.clientName}
                    </td>
                    <td className="  flex justify-start w-[120px]">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={item?.clientId?.clientAvatar}
                        alt=""
                      />
                    </td>
                    <td className="  flex justify-start w-[120px]">
                      {item?.company?.companyName}
                    </td>
                    <td className="  flex justify-start w-[120px]">
                      {item?.date}
                    </td>
                    <td className="  flex justify-start w-[120px]">
                      {item?.timeFrame}
                    </td>
                    <td className="  flex justify-start w-[120px]">
                      {item?.amount}
                    </td>

                    <td className="  flex justify-start gap-x-3 w-[150px] px-2">
                      <button
                        onClick={() => {
                          setDropDrown(true), setDropId(item?._id);
                        }}
                        className="px-2 transition-all duration-500 ease-in-out border rounded-md hover:bg-gray-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="px-2 transition-all duration-500 ease-in-out border rounded-md hover:bg-gray-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <ul className="flex items-center justify-center gap-4 py-2 mt-5 ">
                {currentItems?.filter((item) => item.status == true)?.length >
                  0 && (
                  <li>
                    <button
                      className="flex items-center justify-center h-8 border rounded-md cursor-pointer w-7 hover:bg-gray-200"
                      onClick={handlePrevBtn}
                      disabled={currentPage == pages[0] ? true : false}
                    >
                      <PrevIcon />
                    </button>
                  </li>
                )}

                {renderPage}
                {pageIncrementBtn}
                {currentItems?.filter((item) => item.status == true)?.length >
                  0 && (
                  <li>
                    <button
                      className="flex items-center justify-center h-8 border rounded-md cursor-pointer w-7 hover:bg-gray-200"
                      onClick={handleNextBtn}
                      disabled={
                        currentPage == pages[pages.length - 1] ? true : false
                      }
                    >
                      <NextIcon />
                    </button>
                  </li>
                )}
              </ul>
            </tfoot>
          </table>
        ) : (
          <p className="text-center">No project</p>
        )}
      </div>
    </>
  );
};

export default SellerProject;
