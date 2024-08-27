import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const LoginForm = styled(motion.form)`
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CompleteSignUp = () => {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(
        "http://192.168.1.5:3000/auth/complete-sign-up",
        {
            email,
            companyName,
            numberOfEmployees, 
        },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      console.log("above token", response);

      // Fetch the token from the response headers
      const token = response.data.token;
      console.log("token", token);
      // Store the token in local storage
      localStorage.setItem("token", token);

      // Redirect to the dashboard or another protected route
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Complete Sign Up</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
       
        <Input
          type="companyName"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
         <Input
          type="numberOfEmployees"
          placeholder="Number Of Employees"
          value={numberOfEmployees}
          onChange={(e) => setNumberOfEmployees(e.target.value)}
          required
        />
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Complete Sign Up
        </Button>
      </LoginForm>
      <FooterContainer>
        <FooterText>
          Don't have an account? <a href="/sign-up">Sign up</a>
        </FooterText>
        <FooterText>
          Forgot your password? <a href="/forgot-password">Click here</a>
        </FooterText>
      </FooterContainer>
    </LoginContainer>
  );
};

export default CompleteSignUp;
