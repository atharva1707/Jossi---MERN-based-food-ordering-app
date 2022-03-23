import * as React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState, useEffect } from "react";

const theme = createTheme();

const Wallet = (props) => {
    const [curr_buyer, Setcurr_buyer] = useState('');

    useEffect(() => {
        if (localStorage.getItem("user") != "buyer") { window.location.href("./"); }
        axios
          .post("/api/buyer/getbyid", { id: localStorage.getItem("id") })
          .then((response) => {
            Setcurr_buyer(response.data);
          });
      });

    
    const [ToAdd, setToAdd] = useState(0);
      
    
      const onChangeToAdd = (event) => {
          
        setToAdd(event.target.value);
      };
    
      
      const handleSubmit = (event) => {
        event.preventDefault();
        if(ToAdd<0){alert("Cant Add Negative Value");return;}
        const Data = {
          ToAdd: ToAdd,
          id: localStorage.getItem("id"),
        };
        axios
          .post("/api/buyer/addtowallet", Data)
          .then((response) => {
                console.log("Money Added");
            }
          );
        
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
                <AccountBalanceWalletIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Wallet
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                      margin="normal"
                      value= {curr_buyer.wallet}
                      fullWidth
                      id="wallet"
                      label="wallet"
                      name="wallet"
                    />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="toadd"
                  label="ToAdd"
                  name="ToAdd"
                  onChange={onChangeToAdd}
                  autoFocus
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
};

export default Wallet;
