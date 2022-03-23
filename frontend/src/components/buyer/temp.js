import { useState, useEffect } from "react";
import * as React from "react";

import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";
import ls from "local-storage";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import SortIcon from "@mui/icons-material/Sort";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

const theme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ItemsList = (props) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [value, setValue] = React.useState(0);
  const [sortName, setSortName] = useState(true);

  const [walletAmount, setWalletAmount] = React.useState(
    ls.get("walletamount")
  );

  const [ItemName, setItemName] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [Quantity, setQuantity] = React.useState("");
  const [Type, setType] = React.useState("");
  const [AddOns, setAddOns] = React.useState("");
  const [AddOnsPrice, setAddOnsPrice] = React.useState("");
  const [Image, setImage] = React.useState("");
  const [Tags, setTags] = React.useState("");

  const [refresh, setRefresh] = useState(false);

  const onChangeItemName = (event) => {
    setItemName(event.target.value);
  };
  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const onChangeType = (event) => {
    setType(event.target.value);
  };
  const onChangeAddOns = (event) => {
    setAddOns(event.target.value);
  };
  const onChangeAddOnsPrice = (event) => {
    setAddOnsPrice(event.target.value);
  };
  const onChangeImage = (event) => {
    setImage(event.target.value);
  };
  const onChangeTags = (event) => {
    setTags(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const takeInput = (event) => {
    setSearchText(event.target.value);
  };

  const resetSearch = () => {
    setSearchText("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const search = {
      search: searchText,
    };

    axios
      .post("/api/item/search", search)
      .then((response) => {
        console.log("Found items: ", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetSearch();
  }, [refresh]);

  const handleSearch = (event) => {
    event.preventDefault();
    const search = {
      search: searchText,
    };

    axios
      .post("/api/item/search", search)
      .then((response) => {
        console.log("Found items: ", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetSearch();
  };

  const handlePriceSortA = (event) => {
    event.preventDefault();
    const search = {
      search: searchText,
    };

    axios
      .post("/api/item/sortByPriceA", search)
      .then((response) => {
        console.log("Found items: ", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetSearch();
  };
  const handlePriceSortD = (event) => {
    event.preventDefault();
    const search = {
      search: searchText,
    };

    axios
      .post("/api/item/sortByPriceD", search)
      .then((response) => {
        console.log("Found items: ", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetSearch();
  };

  const handleRatingSortA = (event) => {
    event.preventDefault();
    const search = {
      search: searchText,
    };

    axios
      .post("/api/item/sortByRatingA", search)
      .then((response) => {
        console.log("Found items: ", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetSearch();
  };
  const handleRatingSortD = (event) => {
    event.preventDefault();
    const search = {
      search: searchText,
    };

    axios
      .post("/api/item/sortByRatingD", search)
      .then((response) => {
        console.log("Found items: ", response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    resetSearch();
  };

  const handleFinalOrder = (event) => {
    if (walletAmount < ls.get("toOrderItem").Price * Quantity) {
      alert("Insufficient funds");
      return;
    }
    if (ls.get("toOrderItem").Quantity < Quantity) {
      alert("Insufficient quantity");
      return;
    }

    const item = ls.get("toOrderItem");
    const order = {
      ItemId: item._id,
      ItemName: item.ItemName,
      Price: item.Price,
      Quantity: Quantity,
      VendorEmailId: item.VendorEmailId,
      BuyerEmailId: ls.get("email"),
    };

    // Place Order
    console.log("Order: ", order);
    axios
      .post("/api/order/addOrder", order)
      .then((response) => {
        console.log("Order added: ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Update quantity in Items DB
    axios
      .put("/api/item/updateQuantity", {
        ItemId: item._id,
        Quantity: item.Quantity - Quantity,
      })
      .then((response) => {
        console.log("Quantity updated: ", response.data);
      });

    // Update Wallet amount in User DB
    setWalletAmount(walletAmount - item.Price);
    axios
      .put("/api/wallet/redAmount", {
        Email: ls.get("email"),
        WalletAmount: walletAmount - item.Price * Quantity,
      })
      .then((response) => {
        console.log(response);
      });
    ls.set("walletamount", walletAmount - item.Price * Quantity);

    // Reset Quantity
    setQuantity("");
    setOpen(false);
    setRefresh(!refresh);
  };

  const handlePreFinalOrder = (item) => {
    ls.set("toOrderItem", item);
    setItemName(item.ItemName);
    setPrice(item.Price);

    // const item = ls.get("toOrderItem");
    const order = {
      ItemId: item._id,
      ItemName: item.ItemName,
      Price: item.Price,
      Quantity: Quantity,
      VendorEmailId: item.VendorEmailId,
      BuyerEmailId: ls.get("email"),
    };

    // console.log("Order: ", order);
    // Find Opening and closing time of the vendor
    axios
      .post("/api/vendor/getOpeningAndClosingTime", order)
      .then((response) => {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        let ch = currentHours.toString();
        const currentMinutes = currentTime.getMinutes();
        let cm = currentMinutes.toString();
        let timeNow = ch.concat(":", cm);

        const openingTime = response.data[0].OpeningTime;
        console.log("Opening Time: ", openingTime);
        const closingTime = response.data[0].ClosingTime;
        console.log("Closing Time: ", closingTime);

        console.log(timeNow);

        if (
          timeNow.localeCompare(openingTime) < 0 ||
          timeNow.localeCompare(closingTime) > 0
        ) {
          alert("Vendor is closed now");
          return;
        } else {
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditItem = (item) => {
    ls.set("toEditItem", item);
    setItemName(item.ItemName);
    setPrice(item.Price);
    setQuantity(item.Quantity);
    setType(item.Type);
    setAddOns(item.AddOns);
    setAddOnsPrice(item.AddOnsPrice);
    setImage(item.Image);
    setTags(item.Tags);

    setOpen(true);
  };

  const handleSaveChanges = (event) => {
    axios
      .put("/api/vendor/editItem", {
        ItemId: ls.get("toEditItem")._id,
        ItemName: ItemName,
        Price: Price,
        Quantity: Quantity,
        Type: Type,
        AddOns: AddOns,
        AddOnsPrice: AddOnsPrice,
        Image: Image,
        Tags: Tags,
      })
      .then((response) => {
        console.log(response.data);
      });

    setOpen(false);
    setRefresh(!refresh);
  };

  const handleAddFav = (item) => {
    const fav = {
      ItemId: item._id,
      ItemName: item.ItemName,
      Price: item.Price,
      Rating: item.Rating,
      VendorEmailId: item.VendorEmailId,
      BuyerEmailId: ls.get("email"),
    };

    axios
      .post("/api/favourite/findP", fav)
      .then((response) => {
        if (response.data.length !== 0) {
          alert("Item already added to favourites");
        } else {
          console.log("Fav: ", fav);
          axios
            .post("/api/favourite/addFavourite", fav)
            .then((response) => {
              console.log("Fav added: ", response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={1} lg={2}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text></ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={8}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              onChange={takeInput}
              value={searchText}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon onClick={handleSearch} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          md={1}
          lg={0}
          style={{
            border: "1px solid gray",
            marginLeft: "5%",
            padding: "0px",
            borderRadius: "5px",
          }}
        >
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              {/* <h3 style={{ margin: "0px" }}>DISCOVER AND ORDER</h3> */}
              <AccountBalanceWalletIcon fontSize="large" color="primary" />
              <span style={{ marginLeft: "20px" }}>
                &#8377; {ls.get("walletamount")}
              </span>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          endIcon={<SortIcon />}
          color="primary"
          onClick={handlePriceSortA}
        >
          SORT PRICE ASC
        </Button>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          endIcon={<SortIcon />}
          color="primary"
          onClick={handlePriceSortD}
        >
          SORT PRICE DESC
        </Button>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          endIcon={<SortIcon />}
          color="primary"
          onClick={handleRatingSortA}
        >
          SORT RATING ASC
        </Button>
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          endIcon={<SortIcon />}
          color="primary"
          onClick={handleRatingSortD}
        >
          SORT RATING DESC
        </Button>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Veg"
            sx={{ m: 1, minWidth: 80 }}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Non-Veg"
            sx={{ m: 1, minWidth: 80 }}
          />
        </FormGroup>
      </Grid>
      {/* <Grid container></Grid> */}
      <TabPanel value={value} index={0}>
        <div className="BuyersTable">
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell> SR. NO.</TableCell>
                      <TableCell> ITEM NAME</TableCell>
                      <TableCell> ITEM IMAGE</TableCell>
                      <TableCell> PRICE</TableCell>
                      <TableCell> RATING</TableCell>
                      <TableCell> TYPE</TableCell>
                      <TableCell> VENDOR ID</TableCell>
                      <TableCell> QUANTITY LEFT</TableCell>
                      <TableCell> TAGS</TableCell>
                      <TableCell> ADD ONS</TableCell>
                      <TableCell> ADD TO FAVOURITES </TableCell>
                      <TableCell> BUY NOW </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((user, ind) => (
                      <TableRow key={ind}>
                        <TableCell>{ind}</TableCell>
                        <TableCell>{user.ItemName}</TableCell>
                        <TableCell>
                          <img
                            src={user.Image}
                            alt="Item Pic"
                            style={{ height: "100px", width: "150px" }}
                          />
                        </TableCell>
                        <TableCell>&#8377; {user.Price}</TableCell>
                        <TableCell>
                          <Rating
                            name="read-only"
                            value={user.Rating}
                            readOnly
                          />
                        </TableCell>
                        <TableCell>{user.Type}</TableCell>
                        <TableCell>{user.VendorEmailId}</TableCell>
                        <TableCell>{user.Quantity}</TableCell>
                        <TableCell>{user.Price}</TableCell>
                        <TableCell>
                          {user.AddOns.map((addon) => (
                            <div>{addon}</div>
                          ))}
            
                        </TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            variant="contained"
                            style={{ margin: "10px" }}
                            endIcon={<FavoriteIcon />}
                            onClick={() => handleAddFav(user)}
                          >
                            ADD To FAV
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            color="success"
                            variant="contained"
                            style={{ margin: "10px" }}
                            endIcon={<ShoppingCartIcon />}
                            onClick={() => handlePreFinalOrder(user)}
                          >
                            BUY NOW
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <ThemeProvider theme={theme}>
                      <Container component="main" maxWidth="xs">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography component="h1" variant="h5">
                            Buy Item
                          </Typography>
                          <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  autoFocus
                                  required
                                  fullWidth
                                  id="itemname"
                                  label="Item Name"
                                  name="itemname"
                                  autoComplete="itemname"
                                  value={ItemName}
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  autoComplete="given-name"
                                  name="quantity"
                                  required
                                  fullWidth
                                  id="quantity"
                                  label="Quantity"
                                  value={Quantity}
                                  onChange={onChangeQuantity}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  required
                                  fullWidth
                                  id="price"
                                  label="Price"
                                  name="price"
                                  autoComplete="family-name"
                                  value={Price}
                                  disabled
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  fullWidth
                                  name="addons"
                                  label="Add-Ons"
                                  type="addons"
                                  id="addons"
                                  autoComplete="new-addons"
                                  value={AddOns}
                                  onChange={onChangeAddOns}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      type="submit"
                      color="error"
                      variant="contained"
                      onClick={handleClose}
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      onClick={handleFinalOrder}
                    >
                      PLACE ORDER
                    </Button>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </TabPanel>
    </>
  );
};

export default ItemsList;