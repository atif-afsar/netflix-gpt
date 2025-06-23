import { Outlet } from 'react-router-dom';
import AuthListener from './AuthListener';

const Body = () => {
  return (
    <div>
      <AuthListener />
      {/* Your outlet or children */}
      <Outlet/>
    </div>
  );
};

export default Body;
