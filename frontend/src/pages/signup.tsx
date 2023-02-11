import React from 'react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const signInSchema = yup.object().shape({
  name: yup.string().required('required input'),
  email: yup.string().email('invalid email').required('required input'),
  password: yup.string().required('required input').min(8, 'at least 8 characters'),
})

const SignUp: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signInSchema)
  })
  const submit = () => {
    handleSubmit((data) => {
      console.log(data)
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
          <div className='flex justify-between'>
            <label>name</label>
            <input type="text" className='border border-black rounded-lg' id='name' {...register('name',{required: true})}/>
          </div>
          {
            errors['name'] ? <div className='text-red-800 text-sm'>{`${errors['name'].message}`}</div> : <div className='h-5'></div>
          }
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