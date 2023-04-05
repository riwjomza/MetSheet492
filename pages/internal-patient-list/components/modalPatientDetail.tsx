import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai';
import Backdrop from '../../../components/modal/backDrop'

type Props = {
  handleClose: any;
  switchModal: any;
  open: boolean;
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

const ModalPatientDetail = ({ handleClose, open, switchModal }: Props) => {
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
            <div>
              <div className='text-xl mb-10'>
                ข้อมูลของคนไข้
              </div>

              <form className='flex flex-col gap-6 items-center '>
                <div className='flex gap-3 items-center w-[200px]  '>
                  <div className='min-w-[120px] text-left'>อาการ</div>
                  <div>มีไข้</div>
                </div>
                <div className='flex gap-3 items-center w-[200px] '>
                  <div className='min-w-[120px] text-left'>อุณหภูมิ</div>
                  <div>38 องศา</div>
                </div>
                <div className='flex gap-3 items-center w-[200px] '>
                  <div className='min-w-[120px] text-left'>การเข้าห้องน้ำ</div>
                  <div> 3 ครั้ง</div>
                </div>
                <div className='flex gap-3 w-[200px] '>
                  <div className='min-w-[120px] text-left '>เพิ่มเติม</div>
                  <div>-</div>
                </div>

                <div className='flex gap-3 items-center'>
                  {/* <div className='bg-purple text-white font-bold p-2 rounded-md'>
                    <button>ปิด</button>
                  </div> */}
                  <div className=''>
                    <button className='bg-purple text-white font-bold p-2 rounded-md' onClick={(e) => { e.preventDefault(); switchModal("CREATE") }}>เพิ่ม note</button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  )
}

export default ModalPatientDetail