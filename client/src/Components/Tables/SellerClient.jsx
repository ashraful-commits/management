import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClient,
  getAllClient,
  getSingleClient,
  permissionUpdate,
} from "../../Features/Client/ClientApi";
import swal from "sweetalert";
import ClientModel from "../Model/ClientModel";
import { getAllClientState } from "../../Features/Client/ClientSlice";
import { Toastify } from "../../Utils/Tostify";
import { getAllSellerState } from "./../../Features/Seller/SellerSlice";
import { PrevIcon } from "../../Icons/PrevIcon";
import NextIcon from "../../Icons/NextIcon";

const SellerClient = ({ client }) => {
  //======================================all state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //=========================================== TODO: all state
  const [manage, setManage] = useState(false);
  const [dropId, setDropId] = useState(null);
  const [dropDown, setDropDrown] = useState(false);
  const dropdownRef = useRef();
  const dropMenu = useRef();
  const dispatch = useDispatch();
  const { singleClient } = useSelector(getAllClientState);

  //========================pages
  const pages = [];
  for (let i = 1; i <= Math.ceil(client?.length / itemsPerPage); i++) {
    console.log(i);
    pages.push(i);
  }
  //===================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = client?.slice(indexOfFirstItem, indexOfLastItem);
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
      {dropDown && (
        <ClientModel
          setClient={setDropDrown}
          title="Edit Client"
          singleData={singleClient}
        />
      )}
      {/* ===================================main container  */}
      <div ref={dropMenu} className="w-full">
        <table className="w-full  min-h-[490px] h-[490px] font-['Work_sans'] text-xs  ">
          <thead className="w-full ">
            <tr className="flex items-center justify-between w-full py-2 gap-x-5">
              <th className="w-[50px] flex justify-start items-center"></th>
              <th className="w-[120px] flex justify-start items-center">
                ClientName
              </th>
              <th className="w-[120px] flex justify-start items-center">
                ClientAvatar
              </th>
              <th className="w-[120px] flex justify-start items-center">
                Company
              </th>
              <th className="w-[150px] flex justify-start items-center">
                Email
              </th>
              <th className="w-[120px] flex justify-start items-center">
                Phone
              </th>

              <th className="w-[120px] flex justify-start items-center"></th>
            </tr>
          </thead>
          {currentItems?.filter((item) => item.status === true)?.length > 0 ? (
            <tbody className="w-full">
              {currentItems?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="flex items-center justify-between w-full px-3 py-2 mb-2 border rounded-md gap-x-5"
                  >
                    <td className="w-[50px]">{index + 1}</td>
                    <td className="w-[120px] font-bold text-md ">
                      {item?.clientName}
                    </td>
                    <td className="w-[120px]">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={item?.clientAvatar}
                        alt=""
                      />
                    </td>
                    <td className="w-[120px]">{item?.company?.companyName}</td>
                    <td className="w-[150px] truncate">{item?.clientEmail}</td>
                    <td className="w-[120px]">{item?.clientPhone}</td>

                    <td className="w-[120px] flex gap-x-2">
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
          ) : (
            <p className="text-center">No Client</p>
          )}
          <tfoot className="py-2">
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
      </div>
    </>
  );
};

export default SellerClient;
