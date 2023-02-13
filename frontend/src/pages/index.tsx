import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

export const Home: NextPage = () => {
  return (
    <div className='flex justify-center p-10'>
      <Link href='signin'>
        <p className='text-7xl'>Login App</p>
      </Link>
    </div>
  )
}

export default Home
