import React, { useState } from "react";
import { Link } from "react-router-dom";
import VerticalIcon from "../../Icons/VerticalIcon";
import { PrevIcon } from "../../Icons/PrevIcon";
import NextIcon from "../../Icons/NextIcon";

const LoginUserSeller = ({
  loginInSeller,
  input,
  handleRoleUpdate,
  handleDropdown,
  dropdown,
  dropId,
  handleEdit,
  handleDelete,
  handleStatusUpdate,
}) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //========================pages

  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(loginInSeller?.salesPerson?.length / itemsPerPage);
    i++
  ) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loginInSeller?.salesPerson.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
      {[...currentItems, loginInSeller]?.filter((item) => item.status == true)
        ?.length > 0 ? (
        [...currentItems, loginInSeller]
          .filter((seller) => {
            return (
              (input?.text
                ? seller?.name
                    ?.toLowerCase()
                    .includes(input?.text?.toLowerCase())
                : true) &&
              (input?.email
                ? seller?.email
                    ?.toLowerCase()
                    .includes(input?.email?.toLowerCase())
                : true) &&
              (input?.role ? seller?.role?.includes(input?.role) : true) &&
              seller?.status === true
            );
          })
          ?.map((item, index) => {
            return (
              <tr
                key={index}
                className="w-full  transition-all duration-500 ease-in-out grid grid-flow-col justify-between items-center border my-1 rounded-md py-2 h-[3.4375rem]  text-center relative"
              >
                <td className=" items-center justify-center flex text-sm  truncate text-start font-[500] w-[20px]  text-cyan-700 ">
                  <span className="text-sm  font-[500] px-[.125rem] text-lightGray ">
                    {index + 1}.
                  </span>
                </td>
                <td className=" items-center justify-center flex text-sm  truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  <span className="truncate text-sm  capitalize font-[500] text-cyan-700  w-[120px]">
                    {item.name}
                  </span>
                </td>
                <Link className="cursor-pointer " to={`/seller/${item._id}`}>
                  <td className=" items-center justify-center flex text-sm  truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                    {item.avatar ? (
                      <img
                        className="w-[35px] h-[35px] rounded-full"
                        src={item.avatar}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        className="w-[35px] h-[35px] rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                      />
                    )}
                  </td>
                </Link>
                <td className=" items-center justify-center flex text-sm  truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  {item?.client?.length > 0 ? (
                    <span>{item?.client?.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </td>
                <td className=" items-center justify-center flex text-sm  truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  {item?.projects?.length > 0 ? (
                    <span>{item?.projects?.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </td>
                <td className=" items-center justify-center flex text-sm  truncate text-start font-[500] w-[120px]  text-cyan-700 ">
                  {item?.salesPerson?.length > 0 ? (
                    <span>{item?.salesPerson?.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </td>
                {loginInSeller?.role === "super_admin" && (
                  <td
                    className={`text-sm  w-[120px] flex justify-start items-center font-[400] text-shipGrey  `}
                  >
                    <button>
                      <select
                        className={` focus:outline-none  ${
                          item?.role == "admin" &&
                          "text-fadedOrange  border-[#F2994A] border-[.0187rem] bg-[#FFF8F2] rounded-[2.8125rem] text-2xs  h-[1.125rem] w-[3.75rem]   "
                        } ${
                          item?.role == "user" &&
                          "text-[#FFF] border-[.0187rem] bg-[#878790] rounded-[2.8125rem] text-2xs  h-[1.425rem] w-[3.75rem]   "
                        } ${
                          item?.role == "super_admin" &&
                          "text-[#FFF] border-[.0187rem] bg-[#adff87] rounded-[2.8125rem] text-2xs  h-[1.425rem] w-[3.75rem]   "
                        }  `}
                        name="projectType"
                        id=""
                        value={item?.role}
                        onChange={(e) =>
                          handleRoleUpdate(item._id, e.target.value)
                        }
                      >
                        <option className="text-gray-200 " value="user">
                          ...select...
                        </option>
                        <option className="text-gray-200 " value="user">
                          User
                        </option>
                        <option className="text-gray-200 " value="admin">
                          Admin
                        </option>
                        <option className="text-gray-200 " value="super_admin">
                          Super admin
                        </option>
                      </select>
                    </button>
                  </td>
                )}

                {loginInSeller?.role === "super_admin" && (
                  <td className=" items-center justify-center flex text-sm  truncate text-start font-[400] w-[100px] text-shipGrey ">
                    <input
                      onChange={() => handleStatusUpdate(item._id, item.status)}
                      type="checkbox"
                      checked={item?.status}
                      value={item?.status}
                      className="cursor-pointer "
                    />
                  </td>
                )}

                <td className="  relative z-0 text-sm  flex items-center justify-center gap-2 truncate text-center pr-4 font-[400] w-[50px] h-full text-shipGrey ">
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
                      to={`/seller/${item?._id}`}
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
              </tr>
            );
          })
      ) : (
        <span className="text-xs  font-[600] text-center w-full inline-block py-5">
          No Sales Person!
        </span>
      )}
      {/* ===========================pagination  */}
      <ul className="flex items-center justify-center gap-4 mt-5 ">
        {currentItems?.filter((item) => item.status == true)?.length > 0 && (
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

        {currentItems?.filter((item) => item.status == true)?.length > 0 && (
          <>
            {renderPage}
            {pageIncrementBtn}
          </>
        )}
        {currentItems?.filter((item) => item.status == true)?.length > 0 && (
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

export default LoginUserSeller;
