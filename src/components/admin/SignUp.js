import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const SignupContainer = styled.div`
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

const SignupForm = styled(motion.form)`
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
  width: 94%;
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

const Select = styled.select`
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

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 20px; /* Adjust this value for more or less space between the links */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* Reduce the space between the links on mobile */
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!name || !email || !password || !role) {
        toast.error("All fields are required.");
        return;
      }

      if (!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return;
      }

      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be at least 8 characters long and include letters, numbers, and special characters."
        );
        return;
      }
        await axios.post("http://192.168.1.5:3000/auth/sign-up", {
        email,
        password,
        name,
        role,
      });

      

      navigate("/verify-otp", { state: { email: email, role: role } });
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <SignupContainer>
      <SignupForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Sign Up</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div style={{ position: "relative" }}>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "20px",
              top: "38%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <Select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled>
            Select Role
          </option>
          <option value="HOSTELITE">Hostelite</option>
          <option value="OFFICE_ADMIN">Office Admin</option>
        </Select>
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </Button>
        <FooterContainer>
          <FooterText>
            Already have an account? <a href="/sign-in">Sign in</a>
          </FooterText>
          <FooterText>
            Forgot your password? <a href="/forgot-password">Click here</a>
          </FooterText>
        </FooterContainer>
      </SignupForm>
      <ToastContainer />
    </SignupContainer>
  );
};

export default Signup;
