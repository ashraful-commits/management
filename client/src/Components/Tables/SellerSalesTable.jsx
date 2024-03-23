import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSellerState } from "../../Features/Seller/SellerSlice";
import {
  deleteSeller,
  getSingleSalesSeller,
} from "../../Features/Seller/SellerApi";
import swal from "sweetalert";
import SalesModel from "../Model/SalesModel";
import { PrevIcon } from "../../Icons/PrevIcon";
import NextIcon from "../../Icons/NextIcon";

const SellerSales = ({ salesPerson }) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  const { singleSales } = useSelector(getAllSellerState);
  //======================================= drop id and get single seller
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
  //========================pagination
  const pages = [];
  for (let i = 1; i <= Math.ceil(salesPerson?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salesPerson?.slice(indexOfFirstItem, indexOfLastItem);
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

  //========================================handle next
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > MaxPageNumberLimit) {
      setMaxPageNumberLimit(MaxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit + pageNumberLimit);
    }
  };

  //========================================handle  prev
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
  //================================= window click
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
  return (
    <>
      {dropDown && (
        <SalesModel
          singleData={singleSales}
          title="Edit sales"
          setModel={setDropDrown}
        />
      )}
      <div ref={dropdownRef} className="w-full">
        {currentItems?.filter((item) => item.status === true)?.length > 0 ? (
          <table ref={dropdownRef} className="w-full min-h-[490px] h-[480px] ">
            <thead className="w-full ">
              <tr className="text-monsoon  font-['Work_sans'] text-xs  items-center flex justify-start w-full px-2 py-2">
                <th className=" text-monsoon  font-['Work_sans'] text-xs  flex justify-start w-[200px]">
                  Name
                </th>
                <th className=" text-monsoon  font-['Work_sans'] text-xs  flex justify-start w-[150px]">
                  Employment
                </th>
                <th className="text-monsoon  font-['Work_sans'] text-xs  flex justify-start w-[300px]">
                  Statistic
                </th>
                <th className=" text-monsoon  font-['Work_sans'] text-xs  flex justify-start w-[150px]">
                  Company
                </th>

                <th className=" text-monsoon  font-['Work_sans'] text-xs  flex justify-start w-[150px]">
                  Active Client
                </th>
                <th className=" text-monsoon  font-['Work_sans'] text-xs  flex justify-start w-[120px]"></th>
              </tr>
            </thead>
            <tbody className="w-full h-full">
              {currentItems?.map((item, index) => {
                return (
                  <tr
                    className="flex items-center justify-start w-full py-2 mb-2 border rounded-md"
                    key={index}
                  >
                    <td className="flex items-center justify-start w-[200px] gap-x-2 px-2 ">
                      <img
                        className="w-[32px] h-[32px] rounded-full"
                        src={item?.avatar}
                        alt=""
                      />
                      <span className="text-haiti  font-['Work_sans'] text-md ">
                        {item?.name}
                      </span>
                    </td>

                    <td className="w-[150px] flex justify-start truncate text-monsoon  font-['Work_sans'] text-xs ">
                      {item?.employment}
                    </td>

                    <td className="flex justify-start gap-x-3 w-[300px] text-monsoon  font-['Work_sans'] text-xs ">
                      <div className=" px-2 bg-[#D9D9D9] h-[31px] rounded-full border flex items-center gap-x-2">
                        <span className="text-monsoon  font-['Work_sans'] text-xs ">
                          projects
                        </span>
                        {item?.projects?.length ? item?.projects?.length : 0}
                      </div>
                      <div className=" px-2 bg-[#D9D9D9] h-[31px] rounded-full border flex items-center gap-x-2">
                        <span className="text-monsoon  font-['Work_sans'] text-xs ">
                          clients
                        </span>
                        {item?.client?.length ? item?.client?.length : 0}
                      </div>
                      <div className=" px-2 bg-[#D9D9D9] h-[31px] rounded-full border flex items-center gap-x-2">
                        <span className="text-monsoon  font-['Work_sans'] text-xs ">
                          Earnings
                        </span>
                        {item?.client?.length ? item?.client?.length : 0}
                      </div>
                    </td>
                    <td className="flex justify-start gap-x-3 w-[150px] items-center text-monsoon  font-['Work_sans'] text-xs ">
                      <img
                        className="w-[32px] rounded-full h-[32px]"
                        src={item?.company?.companyLogo}
                        alt=""
                      />
                      {item?.company?.companyName}
                    </td>
                    <td className="flex justify-start gap-x-3 w-[150px] text-monsoon  font-['Work_sans'] text-xs ">
                      <div className="flex w-full clients">
                        {item?.client?.length > 0 &&
                          item?.client?.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="clientAvatar w-[32px] h-[32px] rounded-full overflow-hidden mr-[-10px]"
                            >
                              {item?.clientAvatar ? (
                                <img
                                  className="w-full h-full rounded-full border-[2px] border-white"
                                  src={item?.clientAvatar}
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

                        {item?.client?.length > 3 ? (
                          <button className="clientAvatar w-[32px] h-[32px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-xs  hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
                            +{item?.client.length - 3}
                          </button>
                        ) : (
                          <button className="clientAvatar w-[32px] h-[32px] rounded-full overflow-hidden mr-[-10px] bg-gray-200 flex justify-center items-center text-xs  hover:bg-gray-300 font-[500] transition-all duration-500 ease-in-out cursor-pointer">
                            0
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="w-[120px] flex justify-start items-center gap-x-2 ml-auto">
                      <div className="relative z-0 flex flex-col w-full ">
                        {manage && dropId === item?._id && (
                          <div
                            ref={dropMenu}
                            className="w-[100px] z-[99999] flex flex-col gap-3 py-3 justify-center items-center bg-white h-[130px] absolute top-6 rounded-md right-32 border shadow-lg"
                          >
                            <button
                              onClick={() => setDropDrown(!dropDown)}
                              className="w-full p-1 font-bold capitalize text-xs  font-['Work_sans'] hover:text-gray-500 "
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item?._id)}
                              className="w-full p-1 font-bold capitalize text-xs  font-['Work_sans'] hover:text-gray-500 "
                            >
                              Delete
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            setManage(!manage), setDropId(item?._id);
                          }}
                          className="w-[94px] h-[32px] z-10 flex justify-center items-center bg-primary   text-white hover:text-white rounded-md hover:bg-secondary   transition-all"
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="w-full">
              <ul className="flex items-center justify-center gap-4 py-1 mt-5">
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
                {currentItems?.filter((item) => item.status == true)?.length >
                  0 && (
                  <>
                    {renderPage}
                    {pageIncrementBtn}
                  </>
                )}

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
          <p className="text-center">No seller</p>
        )}
      </div>
    </>
  );
};

export default SellerSales;
