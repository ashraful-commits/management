import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteFiles,
  getSingleProject,
} from "../../Features/Project/ProjectApi";
import LinkIcon from "../../Icons/LinkIcon";

import swal from "sweetalert";

import VerticalIcon from "./../../Icons/VerticalIcon";

const ProjectFile = ({ svg, name, title, file, id }) => {
  const [downloadMenu, setDownloadMenu] = useState(false);
  const closeRef = useRef();
  const dispatch = useDispatch();
  const handleMenu = () => {
    setDownloadMenu(!downloadMenu);
  };
  //=============================================TODO:deleteFile
  const handleDeleteFile = (file, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteFiles({ id, file })).then(() => {
          dispatch(getSingleProject(id));
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  //=====================================handle close
  const handleWindowClose = (e) => {
    if (closeRef.current && !closeRef.current.contains(e.target.value)) {
      setDownloadMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClose);
    return () => window.removeEventListener("click", handleWindowClose);
  }, []);
  return (
    <div
      ref={closeRef}
      className="flex transition-all ease-in-out duration-500  gap-[14px] relative h-[57px]  w-[214px] items-center justify-start pl-[20px] mb-[2px] border rounded-md"
    >
      {downloadMenu && (
        <div className="absolute z-50 flex items-center justify-center w-20 h-10 gap-2 bg-white border rounded-lg shadow-lg bottom-3 right-5 download">
          <Link to={file} target="blank">
            <LinkIcon />
          </Link>
          <button
            className="text-[12px]"
            onClick={() => handleDeleteFile(file, id)}
          >
            <svg
              fill="#000000"
              width="10"
              height="10"
              viewBox="-3.5 0 19 19"
              xmlns="http://www.w3.org/2000/svg"
              class="cf-icon-svg"
            >
              <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
            </svg>
          </button>
        </div>
      )}
      <div className="w-[23px] h-[23px] overflow-hidden">{svg}</div>
      <div className="flex flex-col">
        <span className="text-md  font-bold font-['work_sans'] leading-[22px]">
          {name}
        </span>
        <Link
          target="blank"
          to={file}
          className="text-[11px] font-bold font-['work_sans']"
        >
          {`${name} Link`}
        </Link>
      </div>
      {/* //===============================================download button  */}
      <button
        onClick={() => handleMenu()}
        className="absolute px-3 py-1 rounded-md cursor-pointer justify-self-end right-3"
      >
        <VerticalIcon onClick={() => handleMenu()} />
      </button>
    </div>
  );
};

export default ProjectFile;
