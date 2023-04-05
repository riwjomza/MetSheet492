import { motion } from "framer-motion";
import { useEffect } from "react";
import useBlockScroll from "../../hooks/useBlockScroll";
type Props = {
  children: any;
  onClick: any;
  open:any;
}
const Backdrop = ({ children, onClick, open}: Props) => {

  // this function for block user scrolling when user open then modal
  // if you want to arrow scroll you can page props boolean value false like this: useBlockScroll(false)
  useBlockScroll(true)
  return (
    <motion.div
      onClick={onClick}
      className="fixed top-0 left-0 min-h-screen w-full backdrop-opacity-10 backdrop-invert bg-white/70 flex items-center justify-center z-50 px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;