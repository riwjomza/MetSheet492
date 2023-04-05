import { DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getPatients } from '../../contrasts/patients';
import PrintTable from '../../pages/patient-history/components/printTable';
import moment from 'moment';
import Image from 'next/image'

type Props = {
  contentRef: any;
  dataTable: IDrug[];
  countHeaderTable: number
}

interface IDrug {
  datetime: any;
  dose: any;
  drugname: String;
  freq: String;
  route: String;
  dateList: any[];
}

const PrintPatientHistory = ({ contentRef, dataTable, countHeaderTable }: Props) => {
  const [dataUser, setDataUser] = useState<DocumentData>({});
  const router = useRouter()
  const { id} = router.query;

  const styled = {
    button: `
      bg-purple    
      rounded-md
      px-3
      py-1
      text-white
      flex gap-2 items-center justify-between
      h-8
    `,
    th: `
      border border-purple
      bg-purple-supperLight
      text-purple
      p-2
    ` ,
    td: `
      border border-purple
      h-full
      p-2
      text-center
    ` ,
    card: `
      bg-purple-supperLight py-2 px-3 rounded-md
      flex gap-2 items-right w-fit justify-end
      text-xs
    `}
  const getData = async (HN: any) => {
    const patients = await getPatients()
    // console.log(typeof(HN))
    if (patients) {
      const found = patients.find((item) => item.HN === HN)
      console.log(found)
      setDataUser(found ?? {})
    }
  }

  useEffect(() => {
    getData(id);
  }, [id]);
  return (
    <div ref={contentRef} className='p-24'>
      <div className="text-3xl font-bold mb-10">
        <div className="text-purple">ประวัติผู้ป่วย</div>
      </div>
      {dataUser ? (
        <React.Fragment>
          <div className="py-10 border-y-2 border-gray relative">

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 font-bold">
              <div className="flex gap-3 col-span-3">
                <div className="min-w-[30px]">ชื่อ</div>
                <div>{dataUser?.nameTH}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">Name</div>
                <div>{dataUser?.nameEN}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">อายุ</div>
                <div>{dataUser?.age}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">น้ำหนัก</div>
                <div>{dataUser?.weigh}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">HN</div>
                <div>{dataUser?.HN}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">AN</div>
                <div>{dataUser?.AN}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">เตียง</div>
                <div>{dataUser?.bed}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">ประวัติการแพ้ยา</div>
                <div>{dataUser?.history}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">การวินิจฉัย</div>
                <div>{dataUser?.diagnosis}</div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : ""}
            <div className="overflow-x-scroll">
        <table className="border-collapse border border-purple w-full my-8 text-sm">
          <thead>
            <tr>
              <td rowSpan={2} className={`${styled.th} text-center`}>
                ชื่อยา, วิธีใช้
              </td>
              <td rowSpan={2} className={`${styled.th} text-center`}>
                <div>Route</div>
              </td>
              <td rowSpan={2} className={`${styled.th} text-center`}>
                ชั่วโมงให้ยา
              </td>
              {/* {drugs.map((item, key) => (
              <React.Fragment> */}
              {Array(...new Array(countHeaderTable)).map((item, key) => (
                <React.Fragment key={key}>
                  <th colSpan={2} scope="colgroup" className={`${styled.th}`}>
                    <div>วันที่</div>
                    <div className="text-black text-sm font-thin">
                      {/* {item.datetime} */}
                    </div>
                  </th>
                </React.Fragment>
              ))}
            </tr>
            <tr>
              {Array(...new Array(countHeaderTable)).map((item, key) => (
                <React.Fragment key={key}>
                  <th scope="col" className={`${styled.th}`}>
                    เวลา
                  </th>
                  <th scope="col" className={`${styled.th}`}>
                    ผู้จ่ายยา
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item, row) => (
              <React.Fragment key={row}>
                <tr>
                  <td className={`${styled.td}`}>
                    <div className="">
                      <div className="w-[200px] text-left">{item.drugname}</div>
                    </div>
                  </td>
                  <td className={`${styled.td}`}>{item.route}</td>
                  <td className={`${styled.td}`}>{item.freq}</td>
                  {item.dateList &&
                    item.dateList.length &&
                    item.dateList.map((date, key) => (
                      <React.Fragment key={key}>
                        <td className={`${styled.td}`}>
                          <div className="flex flex-col gap-1 justify-center">
                            <div className="text-xs">
                              {moment.unix(date.time).format("MM/DD/YY")}
                            </div>
                            <div className="text-xs">
                              {moment.unix(date.time).format("h:mm:ss a")}
                            </div>
                          </div>
                        </td>
                        <td className={`${styled.td} `}>
                          {date.signer ? (
                            <div>
                              <Image
                                src={date.signer}
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex items-center justify-center cursor-pointer`}
                              onClick={() => {}}
                            >
                              <Image
                                src={"/img/icons/userIcon.svg"}
                                alt=""
                                width={20}
                                height={20}
                              />
                            </div>
                          )}
                        </td>
                      </React.Fragment>
                    ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div>
        <table className='border-collapse border border-purple w-full my-8 text-sm'>
          <thead>
            <tr>
              <td rowSpan={2} className={`${styled.th} text-center`}>ชื่อยา, วิธีใช้</td>
              <td rowSpan={2} className={`${styled.th} text-center`}>ชั่วโมงให้ยา</td>
              <th colSpan={2} scope="colgroup" className={`${styled.th}`}>
                <div>วันที่</div>
              </th>


            </tr>
            <tr>
              <th scope="col" className={`${styled.th}`}>เวลา</th>
              <th scope="col" className={`${styled.th}`}>ผู้ให้ยา</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item: any, key: any) => (
              <React.Fragment key={key}>
                <tr>
                  <td className={`${styled.td}`}>
                    <div className=''>
                      <div className='w-[200px] text-left'>
                        {item.name}
                      </div>

                    </div>
                  </td>
                  <td className={`${styled.td}`}>{item.hr}</td>
                  <td className={`${styled.td}`}>
                    <div className='flex gap-1 justify-center'>
                      <div>
                        <div className="text-xs">{moment.unix(item.time).format('MM/ DD/ YYYY')}</div>
                        <div className="text-xs">{moment.unix(item.time).format('h:mm:ss a')}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`${styled.td}`}>
                    <div className='flex gap-1 justify-center'>
                      <div>
                        <Image src={"/img/signer.png"} alt="" width={50} height={50} />
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div> */}
      {/* <PrintTable setShowModalAddDrug={undefined} setOnPrint={undefined} /> */}
    </div>
  )
}

export default PrintPatientHistory