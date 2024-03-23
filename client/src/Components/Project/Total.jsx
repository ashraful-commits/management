import { Link } from "react-router-dom";

import { motion } from "framer-motion";
const Total = ({
  number,
  totalSalesGuy,
  totalProjects,
  totalClients,
  TotalEarnings,
  styles,
  title,
  svg,
  delay,
  percentage,
}) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,

        ease: [0.17, 0.67, 0.83, 0.67],
        delay: delay,
      }}
      className="border w-[304px] transition-all ease-in-out duration-500 hover:scale-105 h-[150px] rounded-md"
    >
      <div className="border-b h-[55px] flex items-center gap-2">
        <div
          className={`svg w-[27px] h-[27px] border rounded-md ml-4  flex justify-center items-center ${styles}`}
        >
          {svg}
        </div>
        <h1 className="font-['work_sans'] text-md  text-haiti  font-[500]">
          {title}
        </h1>
      </div>
      <div
        className={`flex ${
          title == "Total Projects" ? "justify-start gap-5" : "justify-between"
        } items-center h-[95px] px-[20px]`}
      >
        <h1 className="text-[35px] font-[500] text-['work_sans'] flex">
          {title === "Total Earnings" ? "$" : ""} {number ? number : "0"}
        </h1>
        <div className="flex">
          {title === "Total Projects" && (
            <div className="flex items-center justify-center gap-2">
              <button className="flex items-center w-10 gap-1 px-1 bg-gray-100 border border-green-500 rounded-md">
                {percentage}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                >
                  <path
                    d="M3.00824 0.178757C2.87788 0.180839 2.75349 0.234239 2.66156 0.327567L0.162534 2.8504C0.112764 2.89636 0.0727195 2.95201 0.0448106 3.014C0.0169017 3.07599 0.00170514 3.14306 0.000135429 3.21113C-0.00143428 3.27921 0.0106554 3.34689 0.0356768 3.41013C0.0606981 3.47336 0.098134 3.53083 0.145732 3.57908C0.193329 3.62733 0.250104 3.66534 0.31264 3.69086C0.375176 3.71638 0.442181 3.7289 0.509621 3.7276C0.577061 3.7263 0.643543 3.71121 0.705066 3.68329C0.766589 3.65538 0.82188 3.61516 0.867614 3.56511L2.51019 1.90689L2.5142 8.75269C2.5171 8.88462 2.57105 9.01015 2.6645 9.10242C2.75796 9.19469 2.88348 9.2464 3.0142 9.2464C3.14492 9.2464 3.27044 9.19469 3.3639 9.10242C3.45735 9.01015 3.5113 8.88462 3.5142 8.75269L3.51019 1.89705L5.15961 3.56511C5.25419 3.6566 5.38049 3.70707 5.51148 3.70571C5.64246 3.70435 5.76771 3.65127 5.8604 3.55783C5.95309 3.46439 6.00585 3.338 6.00738 3.20578C6.00891 3.07355 5.95909 2.94601 5.86859 2.8504L3.36957 0.327567C3.3223 0.279578 3.26595 0.241697 3.20388 0.216134C3.1418 0.190571 3.07527 0.177842 3.00824 0.178757Z"
                    fill="#3AAE54"
                  />
                </svg>
              </button>
              <span className="font-['work_sans'] text-monsoon  text-sm  font-[400]">
                This Week
              </span>
            </div>
          )}
          {/* //=====================================total projects  */}
          {title === "Total Projects" &&
            totalProjects?.slice(0, 4)?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="guy w-[29px] h-[29px] flex justify-center items-center border-white mr-[-10px] rounded-full border-[2px]"
                >
                  <img
                    className="w-full h-full rounded-full"
                    src={item?.clientAvatar}
                    alt={`User ${index + 1}`}
                  />
                </div>
              );
            })}
          {/* //==================================== total sales guy  */}
          {title === "Total Sales Guy" && (
            <div className="flex space-x-[-10px]">
              {totalSalesGuy?.slice(0, 4)?.map((item, index) => (
                <Link key={index} to={`/seller/${item?._id}`}>
                  <div className="guy w-[29px] h-[29px] flex justify-center items-center border-white mr-[-5px] rounded-full border-[2px]">
                    <img
                      className="w-full h-full rounded-full"
                      src={item?.avatar}
                      alt={`User ${index + 1}`}
                    />
                  </div>
                </Link>
              ))}
              {totalSalesGuy?.length > 4 && (
                <Link
                  to={"/"}
                  className="bg-gray-200 w-[29px] h-[29px] text-2xs  rounded-full border-[2px] border-white hover:bg-gray-300"
                >
                  more
                </Link>
              )}
            </div>
          )}
          {/* //========================================total client  */}
          {title === "Total Clients" && (
            <div className="flex space-x-[-10px]">
              {totalClients?.slice(0, 4)?.map((item, index) => (
                <div
                  key={index}
                  className="guy w-[29px] h-[29px] flex justify-center items-center border-white mr-[-5px] rounded-full border-[2px]"
                >
                  <img
                    className="w-full h-full rounded-full"
                    src={item?.clientAvatar}
                    alt={`User ${index + 1}`}
                  />
                </div>
              ))}
              {totalClients?.length > 4 && (
                <button className="w-[29px] h-[29px] flex justify-center items-center font-['work_sans'] text-2xs  rounded-full bg-gray-200 border-[2px] border-white">
                  more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Total;
