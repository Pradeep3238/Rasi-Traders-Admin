import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Make sure to import your Redux store

import FeedbacksPage from './pages/FeedbacksPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import CommonLayout from './pages/CommonLayout';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      { path: '/', element: <ProtectedRoute element={<DashboardPage />} /> },
      { path: '/feedbacks', element: <ProtectedRoute element={<FeedbacksPage />} /> },
      { path: '/orders', element: <ProtectedRoute element={<OrdersPage />} /> },
      { path: '/customers', element: <ProtectedRoute element={<CustomersPage />} /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
