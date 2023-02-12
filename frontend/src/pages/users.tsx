import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'

type User = {
  name: string
  email: string
  password: string
}

const Users: NextPage = () => {
  const getUsers = async () => {
    const response = await fetch("http://localhost:8000/users")
    const res = await response.json()
    return res
  }

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    (async () => {
      const data = await getUsers()
      setUsers(data.users)
    })()
  },[])

  return (
    <div className='flex flex-col bg-white justify-center p-10 align-center'>
      <div className='flex justify-center text-3xl'>
        <h1>registered Users</h1>
      </div>
      <div className='flex flex-col justify-center text-2xl mt-3'>
        {
          users.map((user, index) => (
            <div key={index} className='flex justify-center'>{user.name}</div>
          ))
        }
      </div>
    </div>
  )
}

export default Users