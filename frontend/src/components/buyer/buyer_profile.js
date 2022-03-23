
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

  const [buyerName, setbuyerName] = useState("");
  const [buyerAge, setbuyerAge] = useState(0);
  const [buyerBatch, setbuyerBatch] = useState("");
  const [buyerPassword, setbuyerPassword] = useState("");
  const [buyerContact, setbuyerContact] = useState("");

  const onChangebuyerName = (event) => {
    setbuyerName(event.target.value);
  };

  const onChangebuyerContact = (event) => {
    setbuyerContact(event.target.value);
  };
  const onChangebuyerAge = (event) => {
    setbuyerAge(event.target.value);
  };
  const onChangebuyerPassword = (event) => {
    setbuyerPassword(event.target.value);
  };

  const OnEditName = (event) => {
    axios
      .post("/api/buyer/editname", { id: localStorage.getItem("id"), name: buyerName })
      .then((response) => {
        console.log(response);
      });
  }



  const OnEditAge = (props) => {
    console.log(buyerAge);
    axios
      .post("/api/buyer/editage", { id: localStorage.getItem("id"), age: buyerAge })
      .then((response) => {
        console.log(response);
      });

  }

  const OnEditBatch = (props) => {
    axios
      .post("/api/buyer/editbatch", { id: localStorage.getItem("id"), batch: buyerBatch })
      .then((response) => {
        console.log(response);
      });

  }



  const OnEditContact = (props) => {
    axios
      .post("/api/buyer/editcontact", { id: localStorage.getItem("id"), contact: buyerContact })
      .then((response) => {
        console.log(response);
      });

  }

  const OnEditPassword = (props) => {
    axios
      .post("/api/buyer/editpassword", { id: localStorage.getItem("id"), password: buyerPassword })
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
                    onChange={onChangebuyerName}
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
  else if (props.field == "age") {
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

            <Box component="form" noValidate onSubmit={OnEditAge} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="age"
                    label="Age"
                    name="age"
                    autoComplete="Age"
                    onChange={onChangebuyerAge}
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
  else if (props.field == "batch") {
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

            <Box component="form" noValidate onSubmit={OnEditBatch} sx={{ mt: 3 }} align="center">
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <InputLabel id="batch-select-label">Batch</InputLabel>
                    <Select
                      fullWidth
                      labelId="batch-select-label"
                      id="batch"
                      value={buyerBatch}
                      label="Batch"
                      onChange={(event) => {
                        setbuyerBatch(event.target.value);
                      }}
                    >
                      <MenuItem value={1}>UG1</MenuItem>
                      <MenuItem value={2}>UG2</MenuItem>
                      <MenuItem value={3}>UG3</MenuItem>
                      <MenuItem value={4}>UG4</MenuItem>
                      <MenuItem value={5}>UG5</MenuItem>
                    </Select>
                  </FormControl>
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
                    onChange={onChangebuyerContact}
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
                    onChange={onChangebuyerPassword}
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

const BuyerProfile = (props) => {

  const [curr_buyer, Setcurr_buyer] = useState("");
  const [FieldToEdit, setFieldToEdit] = useState("");




  useEffect(() => {
    if (localStorage.getItem("user") != "buyer") { window.location.href("./"); }
    axios
      .post("/api/buyer/getbyid", { id: localStorage.getItem("id") })
      .then((response) => {
        Setcurr_buyer(response.data);
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
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">{curr_buyer.name}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">{curr_buyer.age}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">{curr_buyer.email}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Batch</TableCell>
                <TableCell align="center">{curr_buyer.batch}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">Contact</TableCell>
                <TableCell align="center">{curr_buyer.contact}</TableCell>
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
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"age"}>Age</MenuItem>
                <MenuItem value={"batch"}>Batch</MenuItem>
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

export default BuyerProfile;








