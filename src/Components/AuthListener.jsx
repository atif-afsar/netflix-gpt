import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const AuthListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSigningUp = useSelector((state) => state.user.isSigningUp);

  // Add loading state
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {  
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );

        // Only redirect to /browse if NOT the first page load OR after sign in (not on initial load)
        if (!checkingAuth && !isSigningUp) {
          navigate('/browse');
        }
      } else {
        dispatch(removeUser());
        // Only redirect to login if NOT the first page load and not signing up
        if (!checkingAuth && !isSigningUp) {
          navigate('/');
        }
      }

      // Auth check done
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch, navigate, isSigningUp, checkingAuth]);

  if (checkingAuth) {
    // You can render a loading spinner here if you want
    return <div>Loading...</div>;
  }

  return null;
};

export default AuthListener;
