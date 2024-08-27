import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const VerifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f7fa;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const VerifyForm = styled(motion.form)`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.875rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const ResendLink = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const role = location.state?.role;

  const handleChange = (otp) => setOtp(otp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
  
      await axios.post(
        "http://192.168.1.5:3000/auth/verify-user",
        { email, otp }
      );
  
      if (role === 'OFFICE_ADMIN') {
        navigate("/complete-sign-up", { state: { email } }); 
      } else {
        navigate("/sign-in");
      }
  
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  

  return (
    <VerifyContainer>
      <VerifyForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Enter your OTP</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          separator={<span>-</span>}
          isInputNum={true}
          containerStyle={{ justifyContent: "center", marginBottom: "1.5rem" }}
          inputStyle={{
            width: "3rem",
            height: "3rem",
            margin: "0 0.5rem",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            textAlign: "center",
            outline: "none",
          }}
          focusStyle={{
            border: "1px solid #007bff",
          }}
          renderInput={(props) => <input {...props} />}
        />
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Verify OTP
        </Button>
        <ResendLink>
          Didn't receive the code? <a href="/resend-otp">Resend OTP</a>
        </ResendLink>
      </VerifyForm>
      <ToastContainer />
    </VerifyContainer>
  );
};

export default VerifyOTP;
