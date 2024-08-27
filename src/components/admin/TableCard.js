import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios"; // For making HTTP requests
import Navbar from "./Navbar";
import styled from "styled-components";


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-top: 5rem;
  @media (max-width: 600px) {
    padding: 1rem;
    margin-top: 3rem;
  }
`;

const ResponsiveButton = styled(Button)`
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: #fff;
  text-transform: none;
  font-weight: bold;
  padding: 10px 20px;
  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const FilterButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const BasicTable = () => {
  const [rows, setRows] = React.useState([]);
  
  
  // Fetch data from the API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://192.168.1.5:3000/menu/get-current-month-menu"
        ); // Replace with your API endpoint

        // Ensure the response data is an array before setting rows
        if (Array.isArray(response.data)) {
          setRows(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setRows([]); // Set an empty array to avoid map error
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRows([]); // Set an empty array in case of an error to prevent map error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <DashboardContainer>
        <div>
          <HeaderContainer>
            <Heading>August Menu</Heading>
            <FilterButtonGroup>
              <ResponsiveButton>Filter 1</ResponsiveButton>
              <ResponsiveButton>Filter 2</ResponsiveButton>
              <ResponsiveButton>Filter 3</ResponsiveButton>
            </FilterButtonGroup>
          </HeaderContainer>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Ingredients
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Serving Size
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Day
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.ingredients}</TableCell>
                    <TableCell align="center">${row.price}</TableCell>
                    <TableCell align="center">{row.servingSize}</TableCell>
                    <TableCell align="center">
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{row.day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default BasicTable;
