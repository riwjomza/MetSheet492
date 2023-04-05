import React from 'react'
import Menu from './menu';

type Props = {
  children: any;
}

const Layout = ({ children }: Props) => {
  const Layout = children.type.layout;
  if (Layout) {
    return (
      <div>
        {children}
      </div>
    )
  }
  return (
    <div>
      <div className={`fixed w-24 h-full bg-purple-light min-h-screen z-10`} />
      <Menu />
      <div className='pl-32 lg:pl-36 p-6 lg:p-14'>
        {children}
      </div>
    </div>


  )
}

export default Layout