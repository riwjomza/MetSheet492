import React, { useState } from 'react'

type Props = {
  onClose: any;
  onShow: any;
  handleClick: any
  handleAddValue: any
  numTime: any;
}

const AccordionDrug = ({ onClose, onShow, handleClick, handleAddValue, numTime }: Props) => {
  const [open, setOpen] = useState(false)
  const [valueInput, setValueInput] = useState({
    date: "",
    time: "",
  })
  const onChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    if (!name && !value) return
    setValueInput(input => ({ ...input, [name]: value }))
  }
  const onSave = (value: any) => {
    if (!value.date) return
    console.log(value)
    handleAddValue(valueInput)
    setOpen(false)
  }
  return (
    <div className=' text-center p-3 rounded-md bg-purple-supperLight'>
      <div onClick={() => setOpen(!open)} className={`${open ? "mb-3" : "mb-0"} transition-all duration-500 font-bold`}>เพิ่มรายการ ครั้งที่ {numTime}</div>
      <form onChange={onChange}>
        <div className={`max-h-0 overflow-hidden transition-all duration-500 ${open ? "max-h-[500px]" : ""}`}>
          <div className='flex flex-col gap-3'>
            <div className="flex gap-3 items-center ">
              <div className="min-w-[130px] text-right">วันที่ ครั้งที่ {numTime}</div>
              <div className=" w-[238px]">
                <div className="relative">
                  <input
                    type="date"
                    className="relative w-[238px]  border rounded-md px-2 py-1"
                    name="date"
                    value={valueInput.date}
                  // defaultValue={`${mode == "UPDATE" && drugDate1}`}
                  // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                  // onChange={(e) => {
                  //   getDate1(e.currentTarget.value);
                  // }}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center ">
              <div className="min-w-[130px] text-right">เวลา ครั้งที่ {numTime}</div>
              <div className=" w-[238px]">
                <div className="relative">
                  <input
                    type="time"
                    className="relative w-[238px]  border rounded-md px-2 py-1"
                    name="time"
                    value={valueInput.time}
                  // defaultValue={`${mode == "UPDATE" && drugTime1}`}
                  // onChange={(e) => {
                  //   getTime1(e.currentTarget.value);
                  // }}
                  />
                </div>
              </div>
            </div>
            <div onClick={() => onSave(valueInput)} className="bg-purple text-white font-bold p-2 rounded-md min-w-[80px] text-center w-fit mx-auto">บันทึกวันเวลา</div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccordionDrug