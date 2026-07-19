import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosApi from '../../../shared/api/axios';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (loginFormPayload: LoginFormData) => {
    const { email, password } = loginFormPayload;

    try {
      const response = await axiosApi.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      console.log('🚀 ~ LoginPage.tsx:25 ~ handleLogin ~ token:', token);

      localStorage.setItem('AUTH_TOKEN', token);
      localStorage.setItem('USER', JSON.stringify(response.data.user));

      if (response.status === 201) {
        alert('User Logged In Successfully 🥳🥳');
      }

      reset();

      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col bg-white max-w-[480px] p-[45px] rounded-xl border border-gray-300 gap-[32px]'>
        {/* Logo and heading */}
        <div>
          <h1 className='font-bold text-3xl'>Welcome Back</h1>
          <p>Please your details to sign in</p>
        </div>

        {/* Labels and Input Fields */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className='flex flex-col gap-6'
        >
          <div className='flex flex-col'>
            <label>Email</label>
            <input
              type='email'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Valid email is required',
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
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            className='bg-blue-500 text-white rounded-lg py-[14px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-65'
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <button onClick={() => navigate('/signup')} className='cursor-pointer'>
          Sign-Up Page
        </button>
      </div>
    </div>
  );
}
export default LoginPage;
