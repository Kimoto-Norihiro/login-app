import React, { useState } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@/types/types'
import { useRouter } from 'next/router'

const signInSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required input'),
  password: yup.string().required('required input').min(8, 'at least 8 characters'),
})

type signInFormValues = Omit<User, 'name'>


const SignIn: NextPage = () => {
  const router = useRouter()
  const [err, setErr] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<signInFormValues>({
    resolver: yupResolver(signInSchema)
  });

  const signIn = async (user: signInFormValues) => {
    const response = await fetch('http://localhost:8000/signin',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    })

    const res = await response.json()
    return res
  }

  const submit = () => {
    handleSubmit(async (data) => {
      const {message, token, result} = await signIn(data)
      if (result) {
        router.push('/users')
      } else {
        setErr(message)
      }
    }, () => {
      console.log('error')
    })()
  }

  return (
    <div className='flex flex-col bg-white justify-center p-10 align-center'>
      <div className='flex justify-center text-3xl'>
        <h1>Sign In</h1>
      </div>
      <div className='flex p-5 justify-center bg-white'>
        <form
          className='w-96 p-3' 
          onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}>
          <div className='flex justify-between'>
            <label>email</label>
            <input type="text" className='border border-black rounded-lg' id='email' {...register('email',{required: true})}/>
          </div>
          {
            errors['email'] ? <div className='text-red-800 text-sm'>{`${errors['email'].message}`}</div> : <div className='h-5'></div>
          }
          <div className='flex justify-between'>
            <label>password</label>
            <input type="text" className='border border-black rounded-lg' id='password' {...register('password',{required: true})}/>
          </div>
          {
            errors['password'] ? <div className='text-red-800 text-sm'>{`${errors['password'].message}`}</div> : <div className='h-5'></div>
          }
          {
            err ? <div className='text-red-800 text-sm'>{err}</div> : <div className='h-5'></div>
          }
          <div>
            if you don`t have account ... <Link href='signup' className='text-blue-700 underline'>signup</Link>
          </div>
          <div className='flex justify-center mt-5'>
            <div className='bg-gray-200 py-1 px-3 rounded-lg'>
              <button type='submit'>sign in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn