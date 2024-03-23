import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Layout = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0.3 }}
      transition={{ duration: 1.4 }}
      className=" min-w-[1440px] min-h-[1024px] scroll-smooth overflow-hidden shrink-0 flex justify-center items-start pt-[55px]"
    >
      <div className="min-w-[1340px] min-h-[909px] scroll-smooth overflow-hidden  ">
        <Outlet />
      </div>
    </motion.div>
  );
};

export default Layout;
