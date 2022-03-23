import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import CssBaseline from '@mui/material/CssBaseline';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState, useEffect } from "react";
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

const theme = createTheme();

var juicy = [{}];
var juicy2 = [{}];
const VendorStats = (props) => {
    const [items, Setitems] = useState([]);
    const [dict1, Setdict1] = useState([{
        argument: 0,
        value: 0,
    }]);
    const [dict2, Setdict2] = useState([{
        argument: 0,
        value: 0,
    }]);
    const [stats, Setstats] = useState({
        total: "",
        accepted: "",
        rejected: ""
    });

    useEffect(() => {
        const data = {
            id: localStorage.getItem("id")
        }
        if (localStorage.getItem("user") != "vendor") { window.location.href("./"); }

        axios
            .post("/api/order/top", data)
            .then((response) => {
                Setitems(response.data.slice(0, 5));
            });
        axios
            .post("/api/order/stat", data)
            .then((response) => {
                Setstats(response.data);
            });
        axios
            .post("/api/order/agewise", data)
            .then((response) => {
                let data11 = [];
                for (const [key, value] of Object.entries(response.data)) {
                    data11.push({ argument: key, value: value })
                }
                Setdict1(data11);
                console.log(dict1);
            });
        axios
            .post("/api/order/batchwise", data)
            .then((response) => {
                let data11 = [];
                console.log(response.data);
                for (const [key, value] of Object.entries(response.data)) {
                    data11.push({ argument: key, value: value })
                    console.log(data11);
                }
                Setdict2(data11);
            });
    }, []);

    // const graph11 = [] ;
    // const graph12 = [] ;
    // for(let i=0;i<dict1.length;i++){graph11.push(dict1[i][0]);graph12.push(dict1[i][1]);}
    // console.log(graph11);
    // console.log(graph12);
    const data = [
        { argument: 'Monday', value: 30 },
        { argument: 'Tuesday', value: 20 },
        { argument: 'Wednesday', value: 10 },
        { argument: 'Thursday', value: 50 },
        { argument: 'Friday', value: 60 },
    ];

    const Age = () => {
        console.log("AA");
        console.log(dict1);
        console.log(dict2);

        juicy = dict1;
        juicy2 = dict2;
        console.log(juicy);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs" >
                <CssBaseline />
                <Typography component="h1" variant="h5" align="center" margin-bottom="10px">
                    Top 5 Items
                </Typography>
                <TableContainer component={Paper} maxWidth="10px" >
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="left">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Item</TableCell>
                                <TableCell align="center">Orders</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item, index) => (

                                <TableRow
                                    key={item[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{item[0]}</TableCell>
                                    <TableCell align="center">{item[1]}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br></br>
                <hr></hr>
                <br></br>
                <TableContainer component={Paper} maxWidth="10px" >
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table" align="left">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Orders</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">PLACED</TableCell>
                                <TableCell align="center">{stats.total}</TableCell>

                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">PENDING</TableCell>
                                <TableCell align="center">{stats.total - stats.completed - stats.rejected}</TableCell>

                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">COMPLETED</TableCell>
                                <TableCell align="center">{stats.completed}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Button

                fullWidth
                onClick={(event) => {
                    Age();
                }}
                variant="contained"
            >
                Age wise graph, (x axis-age) (y axis- num orders)
            </Button>

            {/* <div>
                <Chart style={{ height: "100px", width: "500px" }} data={dict2}
                >
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries valueField="value" argumentField="argument" />
                </Chart>
            </div> */}
            <Chart style={{ height: "100px", width: "500px" }} data={dict1}
            >
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries valueField="value" argumentField="argument" />
            </Chart>

            <Button

                fullWidth
                onClick={(event) => {
                    Age();
                }}
                variant="contained"
            >
                Batch wise graph, (x axis-batch) (y axis- num orders)
            </Button>
            <Chart style={{ height: "100px", width: "500px" }} data={dict2}
            >
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries valueField="value" argumentField="argument" />
            </Chart>
        </ThemeProvider>
    );
};

export default VendorStats;
