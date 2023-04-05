import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai';
import Backdrop from './backDrop'

type Props = {
  handleClose: any;
  open: boolean;
  children: JSX.Element;
}
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, open, children }: Props) => {
  return (
    <AnimatePresence>
      {open ? (
        <Backdrop
          onClick={handleClose}
          open={open}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className=" bg-white max-w-[600px] w-full h-fit p-6 rounded-lg drop-shadow-lg"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal