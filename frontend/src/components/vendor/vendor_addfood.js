import React from "react";
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


const theme = createTheme();

const RenderAddOn = (props) => {
    const OnChangeAddonPrice = (i, e) => {
        console.log(e);
        let formValues = props.AddonPrices;
        formValues[i] = e;
        props.setAddonPrices(formValues);
    };

    const OnChangeAddon = (i, e) => {
        console.log(e);
        let formValues = props.Addons;
        formValues[i] = e;
        props.setAddons(formValues);
    };

    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField
                        name="Add on Name"
                        required
                        fullWidth
                        id="AddonName"
                        label="AddonName"
                        onChange={(event) => {
                            OnChangeAddon(props.index, event.target.value);
                        }}

                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="Add on Price"
                        required
                        fullWidth
                        id="AddonPrice"
                        label="AddonPrice"
                        onChange={(event) => {
                            OnChangeAddonPrice(props.index, event.target.value);
                        }}
                        autoFocus
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
const AddFood = (props) => {

    const [curr_vendor, Setcurr_vendor]= useState("");

    useEffect(() => {
        if (localStorage.getItem("user") != "vendor") { window.location.href("./"); }
        axios
          .post("/api/vendor/getbyid", { id: localStorage.getItem("id") })
          .then((response) => {
            Setcurr_vendor(response.data);
          });
      });

    const [AddonPrices, setAddonPrices] = useState([""]);
    const [Addons, setAddons] = useState([""]);
    const [NumAddon, setNumAddon] = useState(0);
    const [ItemName, setItemName] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [ItemType, setItemType] = useState("");
    const [ItemTag, setItemTags] = useState("");
    const [ItemImg, setItemImg] = useState("");


    const AddFormFields = (e) => {
        setNumAddon(NumAddon + 1);
        // setAddonPrices([...AddonPrices, ""]);
        // setAddons([...Addons, ""]);
        // console.log(AddonPrices);
    }

    const RemoveFormFields = (i) => {
        if (NumAddon) {
            setNumAddon(NumAddon - 1);
        }
        setAddons(Addons.slice(1));
        setAddonPrices(AddonPrices.slice(1));
        // console.log(AddonPrices);
    }

    const OnSubmit = (event) => {
        const newItem = {
            name: ItemName,
            price: ItemPrice,
            tag: ItemTag,
            type: ItemType,
            addons: Addons,
            numaddon: NumAddon,
            addonprices: AddonPrices,
            vendor: curr_vendor,
        }
        console.log(newItem);
        axios
          .post("/api/item/add", newItem)
          .then((response) => {
                alert("Item Added");
                window.location.href ="./VendorDashboard";
            }
          );
    }

    let a = [];

    for (let i = 0; i < NumAddon; i++) {
        a.push(<RenderAddOn index={i} setAddons={setAddons} setAddonsPrices={setAddonPrices} Addons={Addons} AddonPrices={AddonPrices} />);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate sx={{ mt: 5 }}>

                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    name="Item Name"
                                    required
                                    fullWidth
                                    id="ItemName"
                                    label="ItemName"
                                    autoFocus
                                    onChange={(event) => {
                                        setItemName(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="itemprice"
                                    label="Item Price"
                                    name="itemprice"
                                    type="number"
                                    onChange={(event) => {
                                        setItemPrice(event.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ItemType}
                                        label="itemtype"
                                        onChange={(event) => {
                                            setItemType(event.target.value);
                                        }}
                                    >
                                        <MenuItem value={"Veg"}>Veg</MenuItem>
                                        <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    id="tags"
                                    label="Tags (comma seprated)"
                                    name="tags"
                                    onChange={(event) => {
                                        setItemTags(event.target.value);
                                    }}
                                />
                            </Grid>
                            {a}
                            <Grid item   xs={12} sm={6}>
                                <Button
                                    onClick={AddFormFields}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add AddOn
                                </Button>
                            </Grid>
                            <Grid item sm={6} >
                                <Button
                                    onClick={RemoveFormFields}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Remove AddOn
                                </Button>
                            </Grid>
                                <Button
                                    onClick={OnSubmit}
                                    fullWidth
                                    variant="contained"
                                >
                                    Submit
                                </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );



};

export default AddFood