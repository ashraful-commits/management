import React from "react";
import { motion } from "framer-motion";
//============================================ TODO:custom input
const FormInput = ({
  type,
  label,
  placeholder,
  value,
  name,
  handleInputChange,
}) => {
  return (
    <motion.div
      initial={{ y: -5, opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.1 * Math.random() * 10,
      }}
      className="flex flex-col items-center w-full transition-all duration-500 ease-in-out hover:scale-105"
    >
      {/* ==========================================label  */}
      <label
        className="text-gray-900 font-['Lato'] self-start font-[800] text-xs  tracking-[.6px]"
        htmlFor=""
      >
        {label}
      </label>
      {/*========================================= input field  */}
      <input
        className="border focus:outline-cyan-800 transition-all duration-500 ease-in-out mt-[10px] w-full h-[36px] rounded-[5px] pl-[20px] font-['Lato'] placeholder:font-['work_sans'] placeholder:text-2xs "
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        required
        onChange={handleInputChange}
      />
    </motion.div>
  );
};
//================================================= TODO:FormInput
export default FormInput;
