import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './Components/Body';
import Login from './Components/Login';
import Browse from './Components/Browse';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/browse',
        element: <Browse />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
