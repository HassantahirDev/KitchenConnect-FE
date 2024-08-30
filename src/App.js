import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/admin/SignUp";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import AddMenuItemsForm from "./components/admin/AddMenuItemsForm";
import AddMonthlyMenuForm from "./components/admin/AddMonthlyMenuForm";
import VerifyOTP from "./components/admin/VerifyOTP";
import BasicTable from "./components/admin/TableCard";
import CompleteSignUp from "./components/admin/CompleteSignUp";
import HosteliteOrdersList from "./components/admin/HosteliteOrdersList";
import LandingPage from "./components/customer/tabs/Home";
import LoginPage from "./components/customer/auth/Login";
import SignUpPage from "./components/customer/auth/Signup";
import OtpVerificationPage from "./components/customer/auth/OtpVerificationPage";
import Menu from "./components/customer/tabs/Menu/Menu";
import ContactUsPage from "./components/customer/tabs/ContactUs";
import CompleteVerification from "./components/customer/auth/CompleteVerification";
import PaymentPage from "./components/customer/payment/Payment";
import OrdersPage from "./components/customer/tabs/Menu/Orders";
import ProfileSettings from "./components/customer/tabs/Profile";
import ResetPassword from "./components/customer/auth/ResetPassword";
import ForgotPasswordPage from "./components/customer/auth/ForgotPassword";
import ResetPasswordPage from "./components/customer/auth/ResetForgottenPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/current-month-menu" element={<BasicTable />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/add-menu-items" element={<AddMenuItemsForm />} />
        <Route path="/add-monthly-menu" element={<AddMonthlyMenuForm />} />
        <Route path="/complete-sign-up" element={<CompleteSignUp />} />
        <Route path="/orders/hostelite-orders" element={<HosteliteOrdersList />}/>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/complete-registration" element={<CompleteVerification />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/payment-page" element={<PaymentPage/>} />
        <Route path="/your-orders" element={<OrdersPage/>} />
        <Route path="/profile" element={<ProfileSettings/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-forgotten-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
