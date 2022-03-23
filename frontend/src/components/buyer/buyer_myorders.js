import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CssBaseline from '@mui/material/CssBaseline';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState, useEffect } from "react";

const theme = createTheme();

const ChangeRating = (order,rating) => {
    const data = {
        rating: rating,
        id: order._id,
    };
    axios
        .post("/api/order/rating", data)
        .then((response) => {
            console.log(response);
        });  
    

}

const BuyerMyOrders = (props) => {
    const [orders, Setorders] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("user") != "buyer") { window.location.href("./"); }
        axios
            .post("/api/order/bybuyerid", { id: localStorage.getItem("id") })
            .then((response) => {
                Setorders(response.data);
            });
    });

    const Reject = (order) => {
        console.log(order);
        axios
            .post("/api/order/next", order)
            .then((response) => {
                ;
            });
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                <CssBaseline />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Vendor Name</TableCell>
                                <TableCell align="right">Shop Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">rating</TableCell>
                                <TableCell align="right">add ons</TableCell>
                                <TableCell align="right">status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.item.name}
                                    </TableCell>
                                    <TableCell align="right">{order.date}</TableCell>
                                    <TableCell align="right">{order.item.vendor.name}</TableCell>
                                    <TableCell align="right">{order.item.vendor.shopname}</TableCell>
                                    <TableCell align="right">{order.quantity}</TableCell>
                                    <TableCell align="right">{order.cost}</TableCell>
                                    <TableCell align="right">
                                        <Rating
                                            disabled={order.rating != 0}
                                            name="simple-controlled"
                                            value={order.rating}
                                            onChange={(event, newValue) => {
                                                ChangeRating(order,newValue);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {order.addons.map((addon) => (
                                            <div>
                                                {addon}
                                            </div>

                                        ))}
                                    </TableCell>
                                    <TableCell align="right">{order.status}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ mt: 3 }} align="right">
                                            <Grid container spacing={1} align="right" >
                                                <Grid item xs={12}>
                                                    <Button
                                                        disabled={order.status != 'READY FOR PICKUP'}
                                                        fullWidth
                                                        onClick={(event) => {
                                                            Reject(order);
                                                        }}
                                                        variant="contained"
                                                    >
                                                        PICKED UP
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

export default BuyerMyOrders;
