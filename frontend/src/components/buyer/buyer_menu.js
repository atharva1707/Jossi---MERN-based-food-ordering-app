import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FormGroup from "@mui/material/FormGroup";
import Fuse from 'fuse.js'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
import Table from '@mui/material/Table';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

const theme = createTheme();

const RunOnce = (props) => {

}

const Buy = (item) => {
    localStorage.setItem("item", JSON.stringify(item));
    window.location.href = "./BuyerBuyItem"
}

export default function BuyerMenu() {

    const [curr_buyer, Setcurr_buyer] = useState("");
    const [once, Setonce] = useState(0);
    const [titems, Settitems] = useState([]);
    const [items, Setitems] = useState([]);
    const [UAitems, SetUAitems] = useState([]);
    const [SortType, setSortType] = useState(0);
    const [VegType, setVegType] = useState(0);
    const [MaxPrice, SetMaxPrice] = useState(null);
    const [MinPrice, SetMinPrice] = useState(null);
    const [searchText, SetsearchText] = useState("");



    useEffect(() => {
        if (once) { return; }
        if (localStorage.getItem("user") != "buyer") { window.location.href("./"); }
        axios
            .post("/api/buyer/getbyid", { id: localStorage.getItem("id") })
            .then((response) => {
                Setcurr_buyer(response.data);
            });
        axios
            .get("/api/item/")
            .then((response) => {
                let a = response.data;
                Settitems(a);
                for (let i = 0; i < a.length; i++) {

                    a[i]["name"] = a[i].item.name;
                }
                Settitems(a);
            });
        Setonce(1);
    }, []);

    useEffect(() => {
        let result = titems;
        let temp = [];
        let ua = [];

        // Veg Non-Veg Filter
        for (let i = 0; i < result.length; i++) {
            if (VegType == 0) { temp.push(result[i]); }
            if (VegType == 1 && result[i].type == "Veg") { temp.push(result[i]); }
            if (VegType == 2 && result[i].type == "Non-Veg") { temp.push(result[i]); }
        }
        result = temp;
        temp = [];

        // Fuzzy search
        if (searchText && searchText != "") {
            const fuse = new Fuse(result, {
                keys: ["name"],
                threshold: 0.5
            });

            result = fuse.search(searchText);
            if (result.length > 0) {
                result.forEach((foodItem) => {
                    temp.push(foodItem.item);
                });
            }
            else{
            result = []
            }
            result = temp;
            temp = [];
        }

        if( MinPrice){
            for (let i = 0; i < result.length; i++) {
                if (result[i].price>=MinPrice) { temp.push(result[i]); }
            }
            result = temp;
            temp = [];
        }

        if( MaxPrice){
            for (let i = 0; i < result.length; i++) {
                if (result[i].price<=MaxPrice) { temp.push(result[i]); }
            }
            result = temp;
            temp = [];
        }

        if(SortType===1){
            result.sort(function (first, second) {
                return second.price - first.price;
            });
        }
        if(SortType===2){
            result.sort(function (first, second) {
                return -(second.price - first.price);
            });
        }
        if(SortType===3){
            result.sort(function (first, second) {
                return (second.num_rating == 0 ? second.rating : (second.rating / second.num_rating)) - (first.num_rating == 0 ? first.rating : (first.rating / first.num_rating));
            });
        }
        if(SortType===4){
            result.sort(function (first, second) {
                return -((second.num_rating == 0 ? second.rating : (second.rating / second.num_rating)) - (first.num_rating == 0 ? first.rating : (first.rating / first.num_rating)));
            });
        }


        // Opening Closing time filter
        for (let i = 0; i < result.length; i++) {
            let d = new Date();
            let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
            let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            let t = h + ':' + m;
            console.log(t);
            if (t >= result[i].vendor.start && t <= result[i].vendor.close) {
                console.log("PASSED");
                console.log(result[i].vendor.start);
                console.log(result[i].vendor.close);
                console.log(t);
                temp.push(result[i]);
            }
            else {
                console.log("FAILED");
                ua.push(result[i]);
            }
        }
        result = temp;
        console.log(result);
        console.log(ua);
        console.log(UAitems);
        if (result.length == items.length) {
            let flag = 1;
            for (let i = 0; i < result.length; i++) {
                if (result[i] != items[i]) { flag = 0; break; }
            }
            if (flag == 0) {

                Setitems(result);
            }
        }
        else {

            Setitems(result);

        }
        if (ua.length == UAitems.length) {
            let flag = 1;
            for (let i = 0; i < ua.length; i++) {
                if (ua[i] != UAitems[i]) { flag = 0; break; }
            }
            if (flag == 0) {
                console.log("HERE");
                console.log(ua);
                console.log(UAitems);
                Setitems(ua);
            }
        }
        else {
            console.log("HERE");
            console.log(ua);
            console.log(UAitems);
            SetUAitems(ua);

        }

    });





    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                <CssBaseline />
                <Grid container>
                    <Grid item sm={4}>
                        <List component="nav" aria-label="mailbox folders">
                            <TextField
                                id="standard-basic"
                                label="Search"
                                fullWidth={true}
                                onChange={(event) => {
                                    SetsearchText(event.target.value);
                                }}
                                value={searchText}
                            />
                        </List>
                    </Grid>
                    <Grid sx={3} sm={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <AccountBalanceWalletIcon color="primary" />
                                {curr_buyer.wallet}
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={SortType}
                                label="itemtype"
                                onChange={(event) => {
                                    setSortType(event.target.value);
                                }}
                            >
                                <MenuItem value={1}>Sort Price Dec</MenuItem>
                                <MenuItem value={2}>Sort Price Inc</MenuItem>
                                <MenuItem value={3}>Sort Rating Dec </MenuItem>
                                <MenuItem value={3}>Sort Rating Inc </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={1}>
                        <FormGroup>
                            <FormControlLabel
                                onChange={(event) => {
                                    setVegType(1 - VegType);
                                }}
                                disabled={VegType == 2}
                                control={<Checkbox />}
                                label="Veg"
                                sx={{ m: 1, minWidth: 80 }}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid xs={2}>
                        <FormGroup>
                            <FormControlLabel
                                onChange={(event) => {
                                    setVegType(2 - VegType);
                                }}
                                disabled={VegType == 1}
                                control={<Checkbox />}
                                label="Non-Veg"
                                sx={{ m: 1, minWidth: 80 }}
                                value={MaxPrice}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid xs={2} >
                        <TextField
                            id="minprice"
                            type="number"
                            label="Minimum Price"
                            fullWidth={true}
                            onChange={(event) => {
                                SetMinPrice(event.target.value);
                            }}
                            value={MinPrice}
                        />
                    </Grid>
                    <Grid xs={2} >
                        <TextField
                            id="minprice"
                            type="number"
                            label="Maximum Price"
                            fullWidth={true}
                            onChange={(event) => {
                                SetMaxPrice(event.target.value);
                            }}
                            value={MaxPrice}
                        />
                    </Grid>
                </Grid>
                {/* <Grid container></Grid> */}
                <div className="BuyersTable">
                    <Grid container>
                        <Grid item xs={12}>
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
                                                <TableCell align="right">{item.num_rating == 0 ? item.rating : (item.rating / item.num_rating).toFixed(2)}</TableCell>
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
                                        {UAitems.map((item, index) => (
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
                                                <TableCell align="right">{item.num_rating == 0 ? item.rating : (item.rating / item.num_rating).toFixed(2)}</TableCell>
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
                                                                    disabled
                                                                >
                                                                    CLOSED
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
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ThemeProvider>
    );
}

