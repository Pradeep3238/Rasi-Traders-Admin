
import {  Routes, Route, BrowserRouter } from "react-router-dom";
import FeedbacksPage from "./pages/FeedbacksPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import CommonLayout from "./pages/CommonLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <CommonLayout>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path="/feedbacks" element={<FeedbacksPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </CommonLayout>
    </BrowserRouter>
  );
};

export default App;
