import * as React from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMonthlyMenuForm = () => {
  const [formData, setFormData] = React.useState({ date: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the single date to the required ISO format
    const formattedData = {
      date: new Date(formData.date).toISOString(),
    };

    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      // Send the formattedData object with token in headers
      await axios.post(`http://192.168.1.5:3000/menu/`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/dashboard"); // Redirect to another page or show a success message
    } catch (error) {
      console.error("Error creating menu items:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ marginTop: "80px" }}>
        <Typography variant="h4" gutterBottom>
          Add Monthly Menu
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AddMonthlyMenuForm;
