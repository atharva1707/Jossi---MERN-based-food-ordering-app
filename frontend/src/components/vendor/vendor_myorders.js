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
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState, useEffect } from "react";
import { send } from 'emailjs-com';

const theme = createTheme();



const VendorMyOrders = (props) => {
    const [orders, Setorders] = useState([]);
    const [toSend, setToSend] = useState({
        from_name: 'Vendor',
        from_email: 'atharvajoshi2603@gmail.com'
    });
    useEffect(() => {
        if (localStorage.getItem("user") != "vendor") { window.location.href("./"); }
        axios
            .post("/api/order/byvendorid", { id: localStorage.getItem("id") })
            .then((response) => {
                Setorders(response.data);
            });
    });

    const MoveNext = (order) => {
        console.log(order);
        if (order.status == "PLACED") {
            if (order.accepted + order.cooking == 10) {
                alert("Cant have more than 10 orders as cooking or accepted");
                return;
            }
            axios
                .post("/api/vendor/accepted", { id: order.vendor_id })
                .then((response) => {
                    ;
                });
            const too_send = {
                from_name: 'Vendor',
                from_email: order.buyer.email,
            }
            setToSend(too_send);
            send(
                'service_xjzi0we',
                'template_yro60x9',
                too_send,
                'user_duNrcT0qNpwmOn3Ok9SzF'
            )

        }
        if (order.status == "ACCEPTED") {
            axios
                .post("/api/vendor/cooking", { id: order.vendor_id })
                .then((response) => {
                    ;
                });

        }
        if (order.status == "COOKING") {
            axios
                .post("/api/vendor/readyforpickup", { id: order.vendor_id })
                .then((response) => {
                    ;
                });
        }
        axios
            .post("/api/order/next", order)
            .then((response) => {
                ;
            });
    }

    const Reject = (order) => {
        console.log(order);
        axios
            .post("/api/order/reject", order)
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
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">rating</TableCell>
                                <TableCell align="right">add ons</TableCell>
                                <TableCell align="right">status</TableCell>
                                <TableCell align="center">Next Stage</TableCell>
                                <TableCell align="center">Cancel</TableCell>
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
                                    <TableCell align="right">{order.quantity}</TableCell>
                                    <TableCell align="right">{order.cost}</TableCell>
                                    <TableCell align="right">{order.rating}</TableCell>
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
                                                        color="success"
                                                        disabled={order.status == "COMPLETED" || order.status == "REJECTED"|| order.status == "READY FOR PICKUP"}
                                                        onClick={(event) => {
                                                            MoveNext(order);
                                                        }}
                                                        variant="contained"
                                                    >
                                                        Move to next stage
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ mt: 3 }} align="right">
                                            <Grid container spacing={1} align="right" >
                                                <Grid item xs={12}>
                                                    <Button
                                                        color="error"
                                                        disabled={order.status != 'PLACED'}
                                                        fullWidth
                                                        onClick={(event) => {
                                                            Reject(order);
                                                        }}
                                                        variant="contained"
                                                    >
                                                        REJECT
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

export default VendorMyOrders;
