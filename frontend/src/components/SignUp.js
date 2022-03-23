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
import 'react-dropdown/style.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from "axios";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();




function CheckUser(props) {

    const [buyerName, setbuyerName] = useState("");
    const [buyerEmail, setbuyerEmail] = useState("");
    const [buyerContact, setbuyerContact] = useState("");
    const [buyerAge, setbuyerAge] = useState(null);
    const [buyerBatch, setbuyerBatch] = useState(0);
    const [buyerPassword, setbuyerPassword] = useState("");

    const [vendorName, setvendorName] = useState("");
    const [vendorShopName, setvendorShopName] = useState("");
    const [vendorStart, setvendorStart] = useState("");
    const [vendorClose, setvendorClose] = useState("");
    const [vendorEmail, setvendorEmail] = useState("");
    const [vendorPassword, setvendorPassword] = useState("");
    const [vendorContact, setvendorContact] = useState("");

    const onChangebuyerName = (event) => {
        setbuyerName(event.target.value);
    };
    const onChangebuyerEmail = (event) => {
        setbuyerEmail(event.target.value);
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
    const onChangevendorName = (event) => {
        setvendorName(event.target.value);
        console.log(vendorName);
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
    const onChangevendorEmail = (event) => {
        setvendorEmail(event.target.value);
    };
    const onChangevendorContact = (event) => {
        setvendorContact(event.target.value);
    };
    const onChangevendorPassword = (event) => {
        setvendorPassword(event.target.value);
    };



    const onSubmitbuyer = (event) => {
        event.preventDefault();
    
        const newBuyer = {
          name: buyerName,
          email: buyerEmail,
          contact: buyerContact,
          batch: buyerBatch,
          age: buyerAge,
          password: buyerPassword,
          date: Date.now(),
        };
    
        axios
          .post("/api/buyer/register", newBuyer)
          .then((response) => {
            if(response.data=="remail"){
                alert("Email already in use");
            }
            else{
                alert("Created\t" + response.data.name);
                console.log(response.data);
                window.location.href = "./SignIn";
            }
          });
    
      };




      const onSubmitvendor = (event) => {
        event.preventDefault();
        const newVendor = {
          name: vendorName,
          email: vendorEmail,
          contact: vendorContact,
          shopname: vendorShopName,
          password: vendorPassword,
          start: vendorStart,
          close: vendorClose,
          date: Date.now(),
        };
        console.log(newVendor.email);
        console.log(vendorEmail);
        axios
          .post("/api/vendor/register", newVendor)
          .then((response) => {
              console.log(response);
            if(response.data=="remail"){
                alert("Email already in use");
            }
            else{
                alert("Created\t" + response.data.name);
                console.log(response.data);
                window.location.href = "./SignIn";
            }
          });
    
        
      };

    if (props.user == "vendor") {
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

                        <Box component="form" noValidate onSubmit={onSubmitvendor} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="managerName"
                                        required
                                        fullWidth
                                        id="managerName"
                                        label="Manager's Name"
                                        autoFocus
                                        onChange={onChangevendorName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={onChangevendorEmail}
                                    />
                                </Grid>
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
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="contactnumber"
                                        label="Contact Number"
                                        name="contactnumber"
                                        type="number"
                                        autoComplete="contactnumber"
                                        onChange={onChangevendorContact}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="./SignIn" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
    else if (props.user == "buyer") {
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

                        <Box component="form" noValidate onSubmit={onSubmitbuyer} sx={{ mt: 3 }}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={onChangebuyerEmail}
                                        />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="contactnumber"
                                        label="Contact Number"
                                        name="contactnumber"
                                        type="number"
                                        autoComplete="contactnumber"
                                        onChange={onChangebuyerContact}
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={onChangebuyerPassword}
                                        />
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="Age"
                                        label="Age"
                                        name="Age"
                                        type="number"
                                        autoComplete="contactnumber"
                                        onChange={onChangebuyerAge}
                                        />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="./SignIn" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
    else {
        return (
            <></>
        );
    }
}



export default function SignUp() {

    useEffect(() => {
        if(localStorage.getItem("user")==="vendor"){window.location.href = "./VendorHome"}
        if(localStorage.getItem("user")==="buyer") {window.location.href = "./BuyerHome" }
      }, []);

    const [user, setUser] = React.useState('');

    const handleChange = (event) => {
        setUser(event.target.value);
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
                        Sign up
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={user}
                            label="User"
                            onChange={handleChange}
                        >
                            <MenuItem value={"buyer"}>Buyer</MenuItem>
                            <MenuItem value={"vendor"}>Vendor</MenuItem>
                        </Select>
                    </FormControl>
                    <CheckUser user={user} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}