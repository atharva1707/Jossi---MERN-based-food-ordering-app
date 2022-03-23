import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState, useEffect } from "react";



const theme = createTheme();

export default function SignIn() {

  useEffect(() => {
    if(localStorage.getItem("user")==="vendor"){window.location.href = "./VendorHome"}
    if(localStorage.getItem("user")==="buyer") {window.location.href = "./BuyerHome" }
  }, []);


  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
    };
    axios
      .post("/api/buyer/login", newUser)
      .then((response) => {
        if(response.data == "Invalid email"){
          axios
            .post("/api/vendor/login", newUser)
            .then((response1) => {
              if(response1.data == "Incorrect Password"){
                alert(response1.data);
              }
              else if(response1.data == "Invalid email"){
                alert(response1.data);
              }
              else{
                localStorage.setItem("id", response1.data);
                localStorage.setItem("user", "vendor");
                window.location.href="./VendorHome"
              }
              console.log(response1.data);
            })
        }
        else{
          if(response.data == "Incorrect Password"){
            alert(response.data);
          }
          else{
            localStorage.setItem("id", response.data);
            localStorage.setItem("user", "buyer");
            window.location.href="./BuyerHome"
          }
          console.log(response.data);
        }
      });
    
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChangeEmail}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChangePassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}