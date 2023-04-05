import React, { useState } from 'react'
import Table from './components/table'
import AddPatientForm from './components/addPatientForm'
import GoBackButton from '../../components/buttons/goBackButton'
import { useRouter } from 'next/router'
import InternalTable from '../../components/tableAirport/internalListTable'

type Props = {}

const InternalPatientListPage = (props: Props) => {
  const [showFormPatient, setShowFormPatient] = useState(false)
  const router = useRouter()
  const onBack = () => {
    if (showFormPatient) {
      setShowFormPatient(false)
    } else {
      router.push("/")
    }
  }
  return (
    <div>
         {/* <GoBackButton onBack={() => onBack()} onShow={true} /> */}
      {!showFormPatient ? (
        <>
          <div className='text-3xl font-bold mb-10'>
            <div className='text-purple'>รายชื่อผู้ป่วยใน</div>
            <div>แผนกศัลยกรรมหญิง</div>
          </div>
          <div>
            <Table setShowFormPatient ={setShowFormPatient}/>
          </div>
        </>
      ) 
      : (
        <AddPatientForm setShowFormPatient ={setShowFormPatient}/>
      )
      }
    </div>
  )
}

export default InternalPatientListPage