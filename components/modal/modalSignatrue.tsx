import { AnimatePresence, motion } from 'framer-motion'
import { AiFillCheckCircle } from 'react-icons/ai';
import Backdrop from './backDrop'
import Select from 'react-select'
import DefaultSelector from '../selector/defaultSelector';
import SignaturePad from 'react-signature-pad-wrapper';
import React, { useState } from 'react';
type Props = {
  handleClose: any;
  handleSave?: any;
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

const ModalSignature = ({ handleClose, open, handleSave }: Props) => {
  let sigPad = React.createRef<SignaturePad>();
  let data = '';
  const [imageURL,setImageURL] = useState("");//create a state that will contain image url

  const optionsRoute = [
    { value: 'IV', label: 'IV' },
    { value: 'IM', label: 'IM' },
    { value: 'SC', label: 'SC' },
    { value: 'Oral', label: 'Oral' }
  ]
  const optionsCount = [
    { value: 'od ac', label: 'od ac' },
    { value: 'bif ac', label: 'bif ac' },
    { value: 'tid ac', label: 'tid ac' },
    { value: 'od pc', label: 'od pc' },
    { value: 'bid pc', label: 'bid pc' },
    { value: 'hs', label: 'hs' },
    { value: 'prn', label: 'prn' },
    { value: 'od', label: 'od' },
    { value: 'q12hr', label: 'q12hr' },
    { value: 'q8hr', label: 'q8hr' },
    { value: 'q6hr', label: 'q6hr' },
    { value: 'q4hr', label: 'q4hr' },
  ]
  function clear(){
    let sig = sigPad.current
    if (sig){
      sig.instance.clear();
    }
  }

  function save(){
    let sig = sigPad.current
    if (!sig){
      return;
    }
    if(sig.isEmpty()){
      alert('Please provide a signature first.');
    }else{
      // setImageURL(sig.getTrimmedCanvas().toDataURL("image/png"));
      data = (sig.toDataURL("image/png"))
      setImageURL(data)
      handleSave(data)
      // setImageURL(sig.getTrimmedCanvas().toDataURL("image/png"));
    }
  }
  function show(){
    let sig = sigPad.current
    if(sig){
      sig.fromDataURL(data)
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <Backdrop
          onClick={handleClose}
          open={open}
        >
          
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className=" bg-white max-w-[300px] w-full h-fit rounded-lg drop-shadow-lg  overflow-hidden"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className=''>
              <div className='p-3 text-white text-center bg-purple-light text-xl'>
                ลายเซ็นผู้จ่ายยา
              </div>
              <div className='min-h-[10px]'></div>
            <SignaturePad 
            ref={sigPad}
            />

              <div className='mb-6 text-center flex gap-3 justify-evenly'>
                <button className='bg-purple-light text-white px-3 py-2 rounded-md drop-shadow-lg' onClick={save}>ยืนยัน</button>
                <button className='bg-purple-light text-white px-3 py-2 rounded-md drop-shadow-lg' onClick={clear}>Clear</button>
                {/* <button className='bg-purple-light text-white px-3 py-2 rounded-md drop-shadow-lg' onClick={show}>show</button> */}

              </div>
            </div>
          </motion.div>
          {/* {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}
        />
      ) : null} */}
        </Backdrop>
      ) : null}

      {/* {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}
        />
      ) : null} */}

    </AnimatePresence>

  )
}

export default ModalSignature