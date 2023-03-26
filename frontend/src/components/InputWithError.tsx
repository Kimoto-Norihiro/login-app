import React from 'react'
import { FieldErrors, FieldValues, Path } from 'react-hook-form'
import { SignUpFormValues } from '@/pages/signup'
import { UseFormRegister } from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
}

export const InputWithError = <T extends FieldValues>({ name, register, errors }: Props<T> ) => {
  return (
    <div>
      <div className='flex justify-between align-center'>
        <label>{name}</label>
        <input type="text" className='border border-black rounded-lg' id={name} {...register(name, {required: true})}/>
      </div>
      {
        errors[name] ? <div className='text-red-800 text-sm'>{`${errors[name]?.message}`}</div> : <div className='h-5'></div>
      }
    </div>
  )
}