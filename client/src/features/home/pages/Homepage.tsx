import { Navigate } from 'react-router';

function Homepage() {
  const authToken = localStorage.getItem('AUTH_TOKEN');

  const currentUserObject = JSON.parse(localStorage.getItem('USER'));
  console.log(
    '🚀 ~ Homepage.tsx:7 ~ Homepage ~ currentUserObject:',
    currentUserObject,
  );

  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    window.location.reload();
  };

  if (!authToken) {
    return <Navigate to={'/login'} />;
  }
  return (
    <div className='h-screen'>
      <nav className='flex justify-between items-center p-3'>
        <div>Homepage</div>

        <div className='flex gap-4'>
          <div className='flex flex-col'>
            <p>UserID : {currentUserObject.id}</p>
            <p>Email : {currentUserObject.email}</p>
            <p>Name : {currentUserObject.name}</p>
          </div>
          <button
            className='bg-blue-500 text-white p-3 rounded-lg cursor-pointer'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
export default Homepage;
