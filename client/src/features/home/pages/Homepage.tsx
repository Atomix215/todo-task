import { Navigate } from 'react-router';

function Homepage() {
  const authToken = localStorage.getItem('AUTH_TOKEN');

  if (!authToken) {
    return <Navigate to={'/login'} />;
  }
  return <div>Homepage</div>;
}
export default Homepage;
