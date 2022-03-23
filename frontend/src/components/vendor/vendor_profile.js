
import Table from '@mui/material/Table';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Button from '@mui/material/Button';
import 'react-dropdown/style.css';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from "axios";
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const theme = createTheme();






const Edit = (props) => {

  const [vendorName, setvendorName] = useState("");
  const [vendorShopName, setvendorShopName] = useState("");
  const [vendorStart, setvendorStart] = useState("");
  const [vendorClose, setvendorClose] = useState("");
  const [vendorPassword, setvendorPassword] = useState("");
  const [vendorContact, setvendorContact] = useState("");

  const onChangevendorName = (event) => {
    setvendorName(event.target.value);
  };
  const onChangevendorShopName = (event) => {
    setvendorShopName(event.target.value);
  };
  const onChangevendorStart = (event) => {
    setvendorStart(event.target.value);
  };
  const onChangevendorClose = (event) => {
    setvendorClose(event.target.value);
  };
  const onChangevendorContact = (event) => {
    setvendorContact(event.target.value);
  };
  const onChangevendorPassword = (event) => {
    setvendorPassword(event.target.value);
  };

  const OnEditName = (event) => {
    axios
      .post("/api/vendor/editname", { id: localStorage.getItem("id"),name: vendorName })
      .then((response) => {
        console.log(response);
      });
  }



  const OnEditShopName = (props) => {
    axios
      .post("/api/vendor/editshopname", { id: localStorage.getItem("id"),shopname: vendorShopName })
      .then((response) => {
        console.log(response);
      });

  }

  const OnEditOpen = (props) => {
    axios
      .post("/api/vendor/editopen", { id: localStorage.getItem("id"),open: vendorStart })
      .then((response) => {
        console.log(response);
      });

  }

  const OnEditClose = (props) => {
    axios
      .post("/api/vendor/editclose", { id: localStorage.getItem("id"),close: vendorClose })
      .then((response) => {
        console.log(response);
      });

  }

  const OnEditContact = (props) => {
    axios
      .post("/api/vendor/editcontact", { id: localStorage.getItem("id"),contact: vendorContact })
      .then((response) => {
        console.log(response);
      });

  }

  const OnEditPassword = (props) => {
    axios
      .post("/api/vendor/editpassword", { id: localStorage.getItem("id"),password: vendorPassword })
      .then((response) => {
        console.log(response);
      });

  }

  if (props.field == "name") {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" noValidate onSubmit={OnEditName} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    onChange={onChangevendorName}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  else if (props.field == "shopname") {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" noValidate onSubmit={OnEditShopName} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    id="shopName"
                    label="Shop Name"
                    name="shopName"
                    autoComplete="family-name"
                    onChange={onChangevendorShopName}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  else if (props.field == "open") {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" noValidate onSubmit={OnEditOpen} sx={{ mt: 3 }} align="center" >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="openingtime"
                    label="Opening Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    onChange={onChangevendorStart}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  else if (props.field == "close") {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" noValidate onSubmit={OnEditClose} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="closingtime"
                    label="Closing Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{ width: 150 }}
                    onChange={onChangevendorClose}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  else if (props.field == "contact") {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" noValidate onSubmit={OnEditContact} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    required
                    id="contactnumber"
                    label="Contact Number"
                    name="contactnumber"
                    type="number"
                    autoComplete="contactnumber"
                    onChange={onChangevendorContact}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  else if (props.field == "password") {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Box component="form" noValidate onSubmit={OnEditPassword} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={onChangevendorPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  else { return <></> }
};

const VendorProfile = (props) => {

  const [curr_vendor, Setcurr_vendor] = useState("");
  const [FieldToEdit, setFieldToEdit] = useState("");




  useEffect(() => {
    if (localStorage.getItem("user") != "vendor") { window.location.href("./"); }
    axios
      .post("/api/vendor/getbyid", { id: localStorage.getItem("id") })
      .then((response) => {
        Setcurr_vendor(response.data);
      });
  });

  const handleChange = (event) => {
    setFieldToEdit(event.target.value);

  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="center">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Manager Name</TableCell>
                <TableCell align="center">{curr_vendor.name}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Shop Name</TableCell>
                <TableCell align="center">{curr_vendor.shopname}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">{curr_vendor.email}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Opening Time</TableCell>
                <TableCell align="center">{curr_vendor.start}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Closing Time</TableCell>
                <TableCell align="center">{curr_vendor.close}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Contact</TableCell>
                <TableCell align="center">{curr_vendor.contact}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            marginTop: 8,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div align="center">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Field to edit</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={FieldToEdit}
                label="FieldToEdit"
                onChange={handleChange}
              >
                <MenuItem value={"name"}>Manager Name</MenuItem>
                <MenuItem value={"shopname"}>Shop Name</MenuItem>
                <MenuItem value={"open"}>Opening Time</MenuItem>
                <MenuItem value={"close"}>Closing Time</MenuItem>
                <MenuItem value={"contact"}>Contact</MenuItem>
                <MenuItem value={"password"}>Password</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <Edit field={FieldToEdit} />


      </Container>
    </ThemeProvider>
  );




};

export default VendorProfile;








