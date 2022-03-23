import Table from '@mui/material/Table';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
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


const Buy = (item) => {
    localStorage.setItem("item", JSON.stringify(item));
    window.location.href = "./BuyerBuyItem"
}
const theme = createTheme();

const BuyerDashboard = (props) => {

    const [items, Setitems] = useState([]);
          useEffect(() => {
        if (localStorage.getItem("user") != "buyer") { window.location.href("./"); }
        axios
            .get("/api/item/")
            .then((response) => {
                Setitems(response.data);
            });
            
        },[]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                <CssBaseline />
                {/* <div align="center" >
                <Button
                    color="success"
                    onClick={(event) => {
                        AddFood();
                    }}
                    variant="contained" >Add Food</Button>
                </div> */}

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Vendor Name</TableCell>
                                <TableCell align="right">Shop Name</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">rating</TableCell>
                                <TableCell align="right">tags</TableCell>
                                <TableCell align="right">add ons</TableCell>
                                <TableCell align="right">add on prices</TableCell>
                                <TableCell align="center">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right">{item.vendor.name}</TableCell>
                                    <TableCell align="right">{item.vendor.shopname}</TableCell>
                                    <TableCell align="right">{item.type}</TableCell>
                                    <TableCell align="right">{item.num_rating==0?item.rating:(item.rating/item.num_rating).toFixed(2)}</TableCell>
                                    <TableCell align="right">{item.tags}</TableCell>
                                    <TableCell align="right">
                                        {item.addons.map((addon) => (
                                            <div>
                                                {addon}
                                            </div>

                                        ))}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.addonprices.map((addonprice) => (
                                            <div>
                                                {addonprice}
                                            </div>

                                        ))}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ mt: 3 }} align="right">
                                            <Grid container spacing={1} align="right" >
                                                <Grid item xs={3} align="right">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            Buy(item);
                                                        }}
                                                    >
                                                        Buy
                                                    </Button>
                                                </Grid>


                                            </Grid>
                                        </Box>



                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};


export default BuyerDashboard;
