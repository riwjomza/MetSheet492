import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai';
import Backdrop from '../../../components/modal/backDrop'

type Props = {
  handleClose: any;
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

const ModalPatientCreate = ({ handleClose, open }: Props) => {
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
                แบบบันทึกข้อมูลของคนไข้
              </div>

              <form className='flex flex-col gap-6 items-center'>
                <div className='flex gap-3 items-center'>
                  <div className='min-w-[120px] text-right'>อาการ</div>
                  <input type="text" className='border rounded-md px-2 py-1' />
                </div>
                <div className='flex gap-3 items-center'>
                  <div className='min-w-[120px] text-right'>อุณหภูมิ</div>
                  <div className='relative'>
                    <input type="text" className='border rounded-md px-2 py-1' />
                    <div className='absolute top-[6px] right-2' >°C</div>
                  </div>
                </div>
                <div className='flex gap-3 items-center'>
                  <div className='min-w-[120px] text-right'>การเข้าห้องน้ำ</div>
                  <div className='relative'>
                    <input type="text" className='border rounded-md px-2 py-1' />
                    <div className='absolute top-[6px] right-2' >ครั้ง</div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <div className='min-w-[120px] text-right '>เพิ่มเติม</div>
                  <textarea name="" id="" rows={3} className="border rounded-md px-2 py-1"></textarea>
                </div>

                <div >
                  <button className='bg-purple text-white font-bold p-2 rounded-md' onClick={(e) => { e.preventDefault(); handleClose() }}>บันทึก</button>
                </div>
              </form>
            </div>
          </motion.div>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  )
}

export default ModalPatientCreate