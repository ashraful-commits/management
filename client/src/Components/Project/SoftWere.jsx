import { motion } from "framer-motion";
const SoftWere = ({ svg, name, delay }) => {
  return (
    <motion.div
      initial={{ y: -15, opacity: 0.1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.17, 0.67, 0.83, 0.67],
        delay: delay * 0.01,
      }}
      className=" flex h-[30px] transition-all ease-in-out duration-500 hover:scale-105"
    >
      <button className="border flex gap-[5px] px-[10px] py-[1px] rounded-2xl bg-gray-100 hover:bg-gray-300 hover:text-white transition-all duration-500 ease-in-out justify-center items-center">
        {svg}
        <span className="text-xs  font-['work_sans']">{name}</span>
      </button>
    </motion.div>
  );
};

export default SoftWere;
