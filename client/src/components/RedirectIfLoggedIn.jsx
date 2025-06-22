import { Navigate } from 'react-router-dom';

function RedirectIfLoggedIn({ user, children }) {
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default RedirectIfLoggedIn;