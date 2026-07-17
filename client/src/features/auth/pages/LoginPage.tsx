import { useState } from 'react';
import { useNavigate } from 'react-router';
import axiosApi from '../../../shared/api/axios';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosApi.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      console.log('🚀 ~ LoginPage.tsx:25 ~ handleLogin ~ token:', token);

      localStorage.setItem('AUTH_TOKEN', token);

      if (response.status === 201) {
        alert('User Logged In Successfully 🥳🥳');
      }

      setEmail('');
      setPassword('');

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
        <form onSubmit={handleLogin} className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <label>Email</label>
            <input
              type='email'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label>Password</label>
            <input
              type='password'
              className='p-4 rounded-md bg-white border border-gray-500'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='bg-blue-500 text-white rounded-lg py-[14px]'
          >
            Log In
          </button>
        </form>

        <button onClick={() => navigate('/signup')}>Sign-Up Page</button>
      </div>
    </div>
  );
}
export default LoginPage;
