'use client'

import Link from 'next/link' 
import Image from 'next/image'
import React from 'react'

const Rootlayout = ({children}:{children:React.ReactNode
}) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href='/' className='flex items-center gap-2' >
      <Image src='/logo.png' alt='logo'  width={198} height={198}/>
      {/* <h2 className='text-primary-100'>PrepAce</h2> */}
      </Link>
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout