import React, { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { User } from '@/types/types'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import Error from './_error'

type Props = {
  users?: User[]
  status? : number
}

const Users: NextPage = ({users, status}: Props) => {
  if (status) return <Error statusCode={status} />
  return (
    <div className='flex flex-col bg-white justify-center p-10 align-center'>
      <div className='flex justify-center text-3xl'>
        <h1>registered Users</h1>
      </div>
      <div className='flex flex-col justify-center text-2xl mt-3'>
        {
          users?.map((user, index) => (
            <div key={index} className='flex justify-center'>{user.name}</div>
          ))
        }
      </div>
    </div>
  )
}

export default Users

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context)

  const response = await fetch("http://localhost:8000/users", {
    headers: {'Authorization': `Bearer: ${token}`}
  })
  if (response.status!=200) {
    console.log(response)
    // const res = await response.json()
    // console.log(res)
    return {
      props: {
        status: response.status
      }
    }
  }
  
  const { users } = await response.json()
  return { 
    props: { 
      users 
    },
  }
}