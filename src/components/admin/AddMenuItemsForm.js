import * as React from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const categories = [
  { value: "FAST_FOOD", label: "Fast Food" },
  { value: "DESI", label: "Main Course" },
  // Add more categories as needed
];

const AddMenuItemsForm = () => {
  const [formData, setFormData] = React.useState([
    {
      name: "",
      ingredients: "",
      price: "",
      servingSize: "",
      date: "",
      category: "",
    },
  ]);
  const [menuId, setMenuId] = React.useState("");
  const [months, setMonths] = React.useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in"); // Redirect to login page if no token is found
    }
    // Fetch available months from API
    axios
      .get("http://192.168.1.5:3000/menu")
      .then((response) => {
        const monthsFromApi = response.data.map((menu) => ({
          month: menu.month,
          id: menu.id,
        }));
        setMonths(monthsFromApi);
      })
      .catch((error) => console.error("Error fetching menu months:", error));
  }, [navigate]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);
  };

  const handleAddField = () => {
    setFormData([
      ...formData,
      {
        name: "",
        ingredients: "",
        price: "",
        servingSize: "",
        date: "",
        category: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    const selectedMenuId =
      months.find((menu) => menu.month === selectedMonth)?.id || "";
    setMenuId(selectedMenuId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://192.168.1.5:3000/menu/daily-menu-items/${menuId}`,
        { dailyMenuItems: formData }
      );
      toast.success("Menu items added successfully!"); // Success message
      navigate("/dashboard"); // Redirect to another page or show a success message
    } catch (error) {
      console.error("Error creating menu items:", error);
      toast.error("Failed to add menu items. Please try again."); // Error message
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ marginTop: "80px" }}>
        <Typography variant="h4" gutterBottom>
          Add Menu Items
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  required
                >
                  {months.map((menu) => (
                    <MenuItem key={menu.id} value={menu.month}>
                      {menu.month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {formData.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ingredients"
                    name="ingredients"
                    value={item.ingredients}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Serving Size"
                    name="servingSize"
                    value={item.servingSize}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    name="date"
                    InputLabelProps={{ shrink: true }}
                    value={item.date}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={item.category}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveField(index)}
                  >
                    Remove Item
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddField}
              >
                Add Another Item
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer /> {/* Include ToastContainer to display toasts */}
      </Container>
    </>
  );
};

export default AddMenuItemsForm;
