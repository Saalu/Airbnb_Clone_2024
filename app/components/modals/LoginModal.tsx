'use client'

import {signIn} from 'next-auth/react';
import axios from 'axios';
import {AiFillGithub} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {useCallback,useState} from 'react';
import{
    FieldValues,
    SubmitHandler,
    useForm
}from 'react-hook-form'

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModals';
import { Modak } from 'next/font/google';
import Modals from './Modals';
import Heading from '../Heading';
import Input from '../Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const LoginModals = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        console.log('Continue Clicked');
        axios.post('/api/login', data)
            .then(() => {
                loginModal.onClose()
            })
            .catch(error =>{
                toast.error('Something went wrong')
            })
            .finally(() =>{
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
           <Heading
             title='Welcome back'
             subtitle='Login to your account'
           />
           <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
           />
           
           <Input
            id='password'
            label='Password'
            type='password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
           />
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
         <hr />
         <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => {}}
         />
         <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => {}}
         />
         <div className="font-light text-neutral-500 text-center mt-4">
           <div className="flex flex-row justify-center items-center gap-2">
           <div className="">Don't have an account? </div>
           <div onClick={registerModal.onClose} className='text-neutral-800 cursor-pointer hover:underline'>
            Sign up
           </div>
           </div>
         </div>

        </div>
    )

  return (
    <Modals 
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title='Login'
    actionLabel='Continue'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModals
