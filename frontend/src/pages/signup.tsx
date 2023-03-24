import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@/types/types'
import { useRouter } from 'next/router'
import axios from 'axios'
import { InputWithError } from '@/components/InputWithError'

const signUpSchema = yup.object().shape({
  name: yup.string().required('required input'),
  email: yup.string().email('invalid email').required('required input'),
  password: yup.string().required('required input').min(8, 'at least 8 characters'),
})

export type SignUpFormValues = Omit<User, 'id'>

const SignUp: NextPage = () => {
  const [err, setErr] = useState('')
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema)
  })

  const signUp = async (user: SignUpFormValues) => {
    const response = await axios.post('http://localhost:8000/signup', user)
    return response.data
  }

  const submit = () => {
    handleSubmit(async (data) => {
      const { result, message } = await signUp(data)
      if (result) {
        router.push('/signin')
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
        <h1>Sign Up</h1>
      </div>
      <div className='flex p-5 justify-center'>
        <form 
          className='w-96 p-3' 
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}>
          <InputWithError 
            name='name'
            register={register}
            errors={errors}
          />
          <InputWithError 
            name='email'
            register={register}
            errors={errors}
          />
          <InputWithError 
            name='password'
            register={register}
            errors={errors}
          />
          {
            err ? <div className='text-red-800 text-sm'>{err}</div> : <div className='h-5'></div>
          }
          <div>
            if you have account ... <Link href='signin' className='text-blue-700 underline'>signin</Link>
          </div>
          <div className='flex justify-center mt-5'>
            <div className='bg-gray-200 py-1 px-3 rounded-lg'>
              <button type='submit'>sign up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp