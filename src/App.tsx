
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import FeedbacksPage from "./pages/FeedbacksPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CommonLayout from "./pages/CommonLayout";

const router = createBrowserRouter([
  {
    path:'/',
    element:<CommonLayout />,
    children:[
      {path:'/',element:<DashboardPage/>},
      {path:'/feedbacks', element:<FeedbacksPage/>},
      {path:'/orders',element:<OrdersPage/>},
      {path:'/customers',element:<CustomersPage/>}
    ]
  },
  { path: "/login", element: <LoginPage /> },
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
