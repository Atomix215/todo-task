import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosApi from '../../../shared/api/axios';

function SignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

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

      setEmail('');
      setFullName('');
      setPassword('');

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

        <form onSubmit={handleSignUp} className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <label>Full Name</label>
            <input
              type='text'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label>Email</label>
            <input
              type='email'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label>Password</label>
            <input
              type='password'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            className='bg-blue-500 text-white rounded-lg py-[14px]'
            type='submit'
          >
            Sign Up
          </button>
        </form>

        <button onClick={() => navigate('/login')}>Login Page</button>
      </div>
    </div>
  );
}
export default SignupPage;
