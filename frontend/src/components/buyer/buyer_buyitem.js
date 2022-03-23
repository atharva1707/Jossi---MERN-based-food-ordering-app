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
import BuyerDashboard from './buyer_dashboard';

const theme = createTheme();





export default function BuyerBuyItem() {

    const item = JSON.parse(localStorage.getItem("item"));
    const [Addons, SetAddons] = useState([]);
    const [Price, SetPrice] = useState(0);
    const [Quantity, SetQuantity] = useState(1);
    const [curr_buyer, Setcurr_buyer] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user") != "buyer") { window.location.href = "./" }
        axios
            .post("/api/buyer/getbyid", { id: localStorage.getItem("id") })
            .then((response) => {
                Setcurr_buyer(response.data);
                SetPrice(item.price);
            });
    }, []);

    

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(addon, Addons, theme) {
        return {
            fontWeight:
                Addons.indexOf(addon) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const BuyItem = (event) => {
        if (Quantity < 1) {
            alert("Quantity cant be less than 1");
            return;
        }
        if (Price * Quantity > curr_buyer.wallet) {
            alert("Wallet doesnt have enough money");
            return;
        }
        const newOrder = {
            buyer_id: curr_buyer._id,
            buyer: curr_buyer,
            vendor_id: item.vendor_id,
            vendor: item.vendor,
            item: item,
            item_id: item._id,
            quantity: Quantity,
            cost: Price * Quantity,
            addons: Addons,
            date: new Date(),
        }

        const Wallet = {
            ToAdd: -Price * Quantity,
            id: curr_buyer._id,
        }
        axios
            .post("/api/order/add", newOrder)
            .then((response) => {
                console.log(response.data);
                axios
                    .post("/api/buyer/addtowallet", Wallet)
                    .then((response1) => {
                        console.log(response1.data);
                    });
                    alert("Order Placed");
                    window.location.href = "./";
            });


    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        SetPrice(item.price);
        let x = 0;
        value.forEach(element => {
            let index = item.addons.indexOf(element);
            console.log(index);
            x = x + item.addonprices[index];

        })
        SetPrice(item.price + x);
        SetAddons(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
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

                    <Typography component="h1" variant="h5">
                        Choose Addons and Quantity
                    </Typography>
                    <br></br>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={Addons}
                                    onChange={(event) => {
                                        handleChange(event);
                                    }}
                                    // input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {item.addons.map((addon, index) => (

                                        <MenuItem
                                            key={addon}
                                            value={addon}
                                        >
                                            {addon}: {item.addonprices[index]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="Quantity"
                                defaultValue={1}
                                onChange={(event) => {
                                    SetQuantity(event.target.value);
                                }}
                                number
                                required
                                fullWidth
                                id="Quantity"
                                label="Quantity"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="Amount"
                                value={Price * Quantity}
                                required
                                fullWidth
                                id="Amount"
                                label="Amount"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Your Wallet"
                                value={curr_buyer.wallet}
                                fullWidth
                                id="YourWallet"
                                label="Your Wallet"
                                autoFocus
                            />
                        </Grid>
                        <Grid item sm={12} >
                            <Button
                                onClick={BuyItem}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Buy
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}