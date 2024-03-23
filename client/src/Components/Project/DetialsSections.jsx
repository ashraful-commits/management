import React from "react";
import { motion } from "framer-motion";
//=========================================detials section
const DetialsSections = ({ svg, title, name, delay }) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,

        ease: [0.17, 0.67, 0.83, 0.67],
        delay: delay,
      }}
      className="w-full transition-all ease-in-out duration-500 hover:scale-105 h-[30px] flex justify-start items-center gap-[15px]"
    >
      <div className="w-[32px] h-[27px] flex justify-center items-center bg-blue-300 rounded-[5px] border-[.3px] border-[#2F80ED]">
        {svg}
      </div>
      <div className="flex flex-col items-start justify-center w-full">
        <span className="text-xs  leading-[15px] font-[400] text-monsoon  text-['work_sans']">
          {title}
        </span>
        <span className="text-xl  leading-[16px] font-[600] text-haiti  font-['work_sans']">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

export default DetialsSections;
