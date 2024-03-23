import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ViewIcon from "../../Icons/ViewIcon";
import VerticalIcon from "../../Icons/VerticalIcon";
import NextIcon from "../../Icons/NextIcon";
import { PrevIcon } from "../../Icons/PrevIcon";
import FileIcon from "../../Icons/FileIcon";

const AdminProject = ({
  project,
  input,
  handleProjectStatus,
  loginInSeller,
  handleCommission,
  handlePermission,
  handleDropdown,
  dropdown,
  dropId,
  handleEdit,
  handleDelete,
}) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(project?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = project?.slice(indexOfFirstItem, indexOfLastItem);
  //=================================handlepagenumber
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
  return (
    <>
      {currentItems && currentItems?.length > 0 ? (
        currentItems
          .filter((project) => {
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
                : true) &&
              (input?.companyName
                ? project?.company?.companyName === input?.companyName
                : true)
            );
          })
          ?.map((item, index) => {
            return (
              <motion.tr
                initial={{ y: -15, opacity: 0.1 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  type: "spring",
                  stiffness: 200,
                  ease: [0.17, 0.67, 0.83, 0.67],
                  delay: `.${index}`,
                }}
                key={index}
                className={`${
                  loginInSeller?._id === item?.sellerId?._id
                    ? "bg-gray-100 "
                    : ""
                } w-full grid grid-flow-col  transition-all duration-500 ease-in-out justify-between items-center border rounded-md py-2 my-1 h-[3.4375rem] relative text-center`}
              >
                <td className=" items-center text-sm  truncate text-start font-[500] w-[30px]  text-cyan-700 ">
                  <span className="text-sm  font-[500] px-[1rem] block text-lightGray ">
                    {index + 1}.
                  </span>{" "}
                </td>
                <td className="w-[150px] px-2 overflow-hidden -ml-14 items-center flex gap-[.3125rem] relative">
                  <Link to={`/company/${item?.company?._id}`}>
                    <span className="  capitalize truncate text-sm  font-[500] text-cyan-700  w-[70px]">
                      {item?.company?.companyName}
                    </span>
                  </Link>
                </td>
                <td className="w-[150px]  -ml-[4rem] overflow-hidden items-center flex gap-[.3125rem] relative">
                  <Link to={`/${item._id}`}>
                    <FileIcon />
                  </Link>

                  {item?.clientId?.clientAvatar ? (
                    <Link to={`/${item?._id}`}>
                      <img
                        className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                        src={item?.clientId?.clientAvatar}
                      />
                    </Link>
                  ) : (
                    <Link to={`/${item?._id}`}>
                      <img
                        className="w-[1.25rem] absolute left-3 top-2 h-[1.25rem] border-[.125rem] border-white rounded-full"
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      />
                    </Link>
                  )}

                  <span className="  capitalize truncate text-sm  font-[500] text-cyan-700  w-[100px]">
                    {item?.clientId?.clientName}
                  </span>
                </td>
                <td className=" items-center text-sm  truncate text-start font-[400] w-[100px] text-shipGrey ">
                  {item?.date}
                </td>
                <td className="w-[120px]  items-center flex text-sm  text-start font-[400] text-shipGrey  gap-[.3125rem]">
                  <div
                    className="bg-gray-200 h-[.375rem] w-[50%] overflow-hidden "
                    role="progressbar"
                    aria-label="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="10000"
                  >
                    <div
                      className="h-full bg-primary "
                      style={{
                        width: `${((100 * item?.amount) / 100000).toFixed(2)}%`,
                      }}
                    />
                  </div>
                  ${item?.amount && item?.amount}
                </td>
                {loginInSeller?.role === "user" && (
                  <td className="w-[100px]  items-center text-sm  truncate text-start font-[600] text-shipGrey ">
                    $
                    {item?.amount &&
                      ((item?.amount * 100) / 15 / 100).toFixed(2)}
                  </td>
                )}

                {loginInSeller?.role === "super_admin" && (
                  <td
                    className={`text-sm  w-[100px] flex justify-start items-center font-[400] text-shipGrey  `}
                  >
                    <button>
                      <select
                        className={` focus:outline-none w-[100px] ${
                          item?.projectStatus == "pending" &&
                          "text-fadedOrange  border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-2xs  h-[1.125rem] w-[3.75rem]   "
                        } ${
                          item?.projectStatus == "complete" &&
                          "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-2xs  h-[1.125rem] w-[3.75rem]   "
                        }  ${
                          item?.projectStatus == "on hold" &&
                          "text-[#F95959] border-[#F95959] border-[.0187rem] bg-[#FEE] rounded-[2.8125rem] text-2xs  h-[1.125rem] w-[3.75rem]   "
                        }   ${
                          item?.projectStatus == "on going" &&
                          "text-[#3AAE54] border-[#3AAE54] border-[.0187rem] bg-[#E7FBF0] rounded-[2.8125rem] text-2xs  h-[1.125rem] w-[3.75rem]   "
                        }`}
                        name="projectType"
                        id=""
                        value={item.projectStatus}
                        onChange={(e) =>
                          handleProjectStatus(item._id, e.target.value)
                        }
                      >
                        <option className="text-gray-500 " value="....">
                          ...select...
                        </option>
                        <option className="text-gray-500 " value="pending">
                          pending
                        </option>
                        <option className="text-gray-500 " value="on going">
                          on going
                        </option>
                        <option className="text-gray-500 " value="on hold">
                          on hold
                        </option>
                        <option className="text-gray-500 " value="complete">
                          complete
                        </option>
                      </select>
                    </button>
                  </td>
                )}
                {loginInSeller?.role === "super_admin" && (
                  <td
                    className={`text-sm  w-[100px] flex justify-start items-center font-[400] text-shipGrey  `}
                  >
                    <button>
                      <select
                        className={` focus:outline-none border rounded-full w-full px-2`}
                        name="commissionRate"
                        id=""
                        value={item?.commissionRate}
                        onChange={(e) =>
                          handleCommission(item._id, e.target.value)
                        }
                      >
                        <option className="text-gray-500 " value="">
                          ...
                        </option>
                        <option className="text-gray-500 " value="5">
                          5%
                        </option>
                        <option className="text-gray-500 " value="10">
                          10%
                        </option>
                        <option className="text-gray-500 " value="15">
                          15%
                        </option>
                        <option className="text-gray-500 " value="20">
                          20%
                        </option>
                        <option className="text-gray-500 " value="25">
                          25%
                        </option>
                      </select>
                    </button>
                  </td>
                )}
                {loginInSeller?.role === "admin" && (
                  <td
                    className={`text-sm  w-[100px] flex justify-start items-center font-[400] text-shipGrey  `}
                  >
                    <button>
                      <select
                        className={` focus:outline-none border rounded-full w-full px-2`}
                        name="commissionRate"
                        id=""
                        value={item?.commissionRate}
                        onChange={(e) =>
                          handleCommission(item._id, e.target.value)
                        }
                      >
                        <option className="text-gray-500 " value="">
                          ...
                        </option>
                        <option className="text-gray-500 " value="5">
                          5%
                        </option>
                        <option className="text-gray-500 " value="10">
                          10%
                        </option>
                        <option className="text-gray-500 " value="15">
                          15%
                        </option>
                        <option className="text-gray-500 " value="20">
                          20%
                        </option>
                        <option className="text-gray-500 " value="25">
                          25%
                        </option>
                      </select>
                    </button>
                  </td>
                )}
                {loginInSeller?.role == "super_admin" && (
                  <td className=" items-center text-sm  truncate text-start font-[400] w-[80px] text-shipGrey ">
                    <input
                      onChange={() => handlePermission(item._id, item.status)}
                      type="checkbox"
                      checked={item?.status}
                      className="cursor-pointer "
                    />
                  </td>
                )}
                <td className=" items-center text-sm  truncate text-start font-[400] w-[100px] text-shipGrey ">
                  {item?.projectSource}
                </td>
                <td className="  relative z-0 text-sm  flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[50px] h-full text-shipGrey  ">
                  <button
                    className="flex items-center justify-center w-full h-full transition-all duration-500 ease-in-out rounded-md cursor-pointer hover:border"
                    onClick={() => handleDropdown(item?._id)}
                  >
                    <VerticalIcon />
                  </button>
                </td>
                {dropdown && dropId === item?._id && (
                  <div className="w-[100px] h-auto flex flex-col gap-3 py-2 border shadow-xl rounded-md top-12 right-12 bg-white z-[99] absolute">
                    <Link
                      className="text-xs  font-['Work_sans']"
                      to={`/${item._id}`}
                    >
                      View
                    </Link>
                    <button
                      className="text-xs  font-['Work_sans']"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs  font-['Work_sans']"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </motion.tr>
            );
          })
      ) : (
        <span className="text-xs  font-[600] text-center w-full inline-block py-5">
          No project!
        </span>
      )}
      {/* ====================================pagination  */}
      <ul className="flex items-center justify-center gap-4 mt-5 ">
        {currentItems?.length > 0 && (
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

        {currentItems?.length > 0 && (
          <>
            {renderPage}
            {pageIncrementBtn}
          </>
        )}
        {currentItems?.length > 0 && (
          <li>
            <button
              className="flex items-center justify-center h-8 border rounded-md cursor-pointer w-7 hover:bg-gray-200"
              onClick={handleNextBtn}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
            >
              <NextIcon />
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default AdminProject;
