import React from 'react'
import Modal from './modal'
import { CiWarning } from 'react-icons/ci'
type Props = {
  handleClose: any;
  open: boolean;
}


const ModalWarnSelectDate = ({ handleClose, open }: Props) => {
  return (
    <Modal handleClose={handleClose} open={open}>
      <div className='flex flex-col justify-center items-center'>
        <CiWarning size={100} color='#dbbc4e'/>
        <div className='font-bold'>กรุณาเลือกวันและเวลาที่ต้องการพิมพ์</div>
      </div>
    </Modal>
  )
}

export default ModalWarnSelectDate