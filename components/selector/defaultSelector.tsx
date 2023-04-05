import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
  options: any[];
  show?: boolean;
  onClose?: any;
  getDrugRoute: any
  defaultValue?: any
}

const DefaultSelector = ({ options, getDrugRoute }: Props) => {
  const [openOptions, setOpenOptions] = useState(false)
  const [selected, setSelected] = useState({
    value: "",
    label: "เลือกรายการ",
  })

  const onSelected = (value: string, label: string) => {
    if (value && label) {
      setSelected({
        value,
        label
      })
      getDrugRoute(value)

    }
  }

  // useEffect(() => {
  //  if(defaultValue){
  //   setSelected(defaultValue)
  //  }
  // }, [defaultValue])
  
  return (
    <>
      <div onClick={() => setOpenOptions(!openOptions)} className="w-full cursor-pointer">
        <div className='flex  justify-between w-full border gap-3 px-2 py-1 rounded-md items-center relative'>
          <div className=''>{selected ? selected.label: "เลือกรายการ"}</div>
          <div className={`${openOptions ? "rotate-180 transition-all" : ""}`}>
            <MdOutlineKeyboardArrowDown size={20} />
          </div>

          <div className='absolute top-10 bg-white drop-shadow-lg rounded-md w-full left-0 z-10 divide-y divide divide-black-light max-h-[200px] overflow-scroll scrollbar-hide '>
            {options && options.length && openOptions ? options.map((item, key) => (
              <div key={key} className={`py-1 px-3 text-sm bg-purple-light  transition-all hover:bg-white hover:text-purple`} onClick={() => onSelected(item.value, item.label)}>{item.label}</div>
            )) : ""}
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultSelector