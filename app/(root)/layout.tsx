import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Rootlayout = ({children}:{children:React.ReactNode
}) => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href='/' className='flex items-center gap-2' />
      <Image src='/logo.png' alt='logo' width={218} height={218} />
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout