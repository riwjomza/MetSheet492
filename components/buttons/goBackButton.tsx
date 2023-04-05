import React from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri';

type Props = {
  onBack: any;
  onShow: any;
}

const GoBackButton = ({ onBack, onShow }: Props) => {
  return (
    <>
      {onShow && (
        <div className='absolute top-10 left-6 z-30 text-white cursor-pointer' onClick={onBack}>
          <RiArrowGoBackLine size={40} />
        </div>
      )}
    </>
  )
}

export default GoBackButton