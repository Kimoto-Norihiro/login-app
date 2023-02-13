import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'

type Props = {
  statusCode: number
}

const Error: NextPage<Props> = ({statusCode}: Props) => {
  return (
    <div className='flex justify-center p-10'>
      <div className=''>
        <p className='text-5xl'>{statusCode} error</p>
        <Link href='/'>
          <p className='text-3xl'>back to home</p>
        </Link>
      </div>
    </div>
  )
}

export default Error