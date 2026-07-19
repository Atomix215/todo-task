import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosApi from '../../../shared/api/axios';
import { useForm } from 'react-hook-form';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}

function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = async (signupFormData: SignupFormData) => {
    const { fullName, email, password } = signupFormData;
    try {
      const response = await axiosApi.post('/auth/signup', {
        name: fullName,
        email,
        password,
      });
      console.log(
        '🚀 ~ SignupPage.tsx:21 ~ handleSignUp ~ response:',
        response,
      );

      if (response.status === 201) {
        alert('User Signed Up Successfully !!! 🥳🥳');
      }

      reset();
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col bg-white max-w-[480px] p-[45px] rounded-xl border border-gray-300 gap-[32px]'>
        {/* Logo and heading */}
        <div>
          <h1 className='font-bold text-3xl'>Create an account</h1>
          <p>Experience corporate-grade efficiency today.</p>
        </div>

        {/* Labels and Input Fields */}

        <form
          onSubmit={handleSubmit(handleSignUp)}
          className='flex flex-col gap-6'
        >
          <div className='flex flex-col'>
            <label>Full Name</label>
            <input
              type='text'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              {...register('fullName', {
                required: 'Full Name is Required',
              })}
            />
            {errors.fullName && (
              <p className='text-red-500'>{errors.fullName.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label>Email</label>
            <input
              type='email'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Valid Email is required',
                },
              })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label>Password</label>
            <input
              type='password'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              {...register('password', {
                required: 'Password is required',
              })}
            />
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <button
            className='bg-blue-500 text-white rounded-lg py-[14px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-65 '
            type='submit'
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Singning Up....' : 'Sign Up'}
          </button>
        </form>

        <button onClick={() => navigate('/login')} className='cursor-pointer'>
          Login Page
        </button>
      </div>
    </div>
  );
}
export default SignupPage;
