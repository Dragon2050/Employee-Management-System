import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/Contexts";
import { getAccess } from "../services/authServices";

const SecureRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
	useEffect(() => {
    if (Object.keys(user).length === 0) {
      const checkAuth = async () => { 
        const currentUser = await getAccess();
        if (!currentUser) {
          navigate('/signin');
        } else {
          setUser(() => ({...currentUser}));
        }
      };
      checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return children;
};

export default SecureRoute;

