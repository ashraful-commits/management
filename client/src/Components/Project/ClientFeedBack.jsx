import { motion } from "framer-motion";

const ClientFeedBack = () => {
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
        delay: 0.5,
      }}
      className="border  mt-5 rounded-lg w-full  min-h-[765px] p-[20px]"
    >
      ClientFeedBack
    </motion.div>
  );
};

export default ClientFeedBack;
