import { motion } from "framer-motion";
const Team = ({ avatar, title, name, delay }) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.1 }}
      exit={{ opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,

        ease: [0.17, 0.67, 0.83, 0.67],
        delay: delay * 0.001,
      }}
      className="flex transition-all ease-in-out duration-500 hover:scale-105 gap-[10px] h-[48px] mb-[20px]"
    >
      <div className="w-[42px] h-[42px] overflow-hidden">
        <img
          className="object-cover w-full h-full rounded-full "
          src={avatar}
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg  font-[500] font-['work_sans'] leading-[22px]">
          {name}
        </span>
        <span className="text-xs  text-monsoon  font-[400] font-['work_sans']">
          {title}
        </span>
      </div>
    </motion.div>
  );
};

export default Team;
