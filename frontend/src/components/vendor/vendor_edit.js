import { useState, useEffect } from "react";
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
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const theme = createTheme();

const VendorEditProfile = (props) => {
    const [curr_vendor, Setcurr_vendor] = useState("");
    const [vendorName, setvendorName] = useState("");
    const [vendorShopName, setvendorShopName] = useState("");
    const [vendorStart, setvendorStart] = useState("");
    const [vendorClose, setvendorClose] = useState("");
    const [vendorPassword, setvendorPassword] = useState("");
    const [vendorContact, setvendorContact] = useState("");
    const [FieldToEdit, setFieldToEdit] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user") != "vendor") { window.location.href("./"); }
        axios
            .post("/api/vendor/getbyid", { id: localStorage.getItem("id") })
            .then((response) => {
                Setcurr_vendor(response.data);
                setvendorClose(curr_vendor.close);
                setvendorStart(curr_vendor.start);
                setvendorPassword(curr_vendor.password);
                setvendorContact(curr_vendor.contact);
                setvendorShopName(curr_vendor.shopname);
                setvendorName(curr_vendor.name);
            });
    });




    const onSubmit = (event) => {
        event.preventDefault();
        const newVendor = {
            name: vendorName,
            contact: vendorContact,
            shopname: vendorShopName,
            password: vendorPassword,
            start: vendorStart,
            close: vendorClose,
            id: localStorage.getItem("id"),
        };
        axios
            .post("/api/vendor/edit", newVendor)
            .then((response) => {
                console.log(response);
            });


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
    const onChangevendorContact = (event) => {
        setvendorContact(event.target.value);
    };
    const onChangevendorPassword = (event) => {
        setvendorPassword(event.target.value);
    };

    return (
        <ThemeProvider>
            <Container>
                <Box>
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



                        <div align="center">
                            <FormControl fullWidth>
                                <InputLabel id="batch-select-label">Field to edit</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="batch-select-label"
                                    id="field"
                                    value={FieldToEdit}
                                    label="FieldToEdit"
                                    onChange={(event) => {
                                        setFieldToEdit(event.target.value);
                                    }}
                                >
                                    <MenuItem value={1}>Manager Name</MenuItem>
                                    <MenuItem value={2}>Shop Name</MenuItem>
                                    <MenuItem value={3}>Contact</MenuItem>
                                    <MenuItem value={4}>Opening Time</MenuItem>
                                    <MenuItem value={5}>Closing Time</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Edit
                            </Button>
                        </div>
                        
                </TableContainer>
                </Box>
                </Container>
                </ThemeProvider >
                );
                
};

export default VendorEditProfile;








