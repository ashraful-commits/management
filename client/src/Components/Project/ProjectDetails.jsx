//======================================project details component
import { motion } from "framer-motion";

const ProjectDetails = ({ svg, title, number, styles, delay }) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2,
        type: "spring",
        stiffness: 200,
        ease: [0.17, 0.67, 0.83, 0.67],
        delay: delay,
      }}
      className="border transition-all ease-in-out duration-500 hover:scale-105 rounded-md gap-[10px] h-[97px] w-[240px] flex items-center justify-center"
    >
      <div className="w-[42px] h-[42px] rounded-full bg-gray-200 shrink-0 flex justify-center items-center ml-4">
        {svg}
      </div>
      {/* //================================================datails  */}
      <div className="w-full h-full flex gap-2 flex-col justify-center">
        <p className={` leading-[5px]  text-monsoon   font-[400]`}>{title}</p>
        <p
          className={`text-3xl  ${styles} leading-[32px] flex items-center gap-2 font-[600]`}
        >
          {title === "Commission Due" && "$"}
          {title === "Payment Received" && "$"}
          {number}
          {title === "Payment Received" && (
            <span className="text-xs  text-gray-400 font-[400] font-['work_sans']">
              This Week
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
