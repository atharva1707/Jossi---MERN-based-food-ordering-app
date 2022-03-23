import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {(localStorage.getItem("user") === null)
            ? <Button color="inherit" onClick={() => navigate("/SignIn")}>
              Sign In
            </Button>
            : <></>}


          {(localStorage.getItem("user") === null)
            ? <Button color="inherit" onClick={() => navigate("/SignUp")}>
              Sign Up
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "vendor")
            ? <Button color="inherit" onClick={() => navigate("/VendorProfile")}>
              Profile
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "buyer")
            ? <Button color="inherit" onClick={() => navigate("/BuyerProfile")}>
              Profile
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "buyer")
            ? <Button color="inherit" onClick={() => navigate("/Wallet")}>
              Wallet
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "buyer")
            ? <Button color="inherit" onClick={() => navigate("/BuyerMenu")}>
              Dashboard
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "buyer")
            ? <Button color="inherit" onClick={() => navigate("/BuyerMyOrders")}>
              My Orders
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "vendor")
            ? <Button color="inherit" onClick={() => navigate("/VendorDashboard")}>
              My Menu
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "vendor")
            ? <Button color="inherit" onClick={() => navigate("/VendorMyOrders")}>
              My orders
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "vendor")
            ? <Button color="inherit" onClick={() => navigate("/VendorStats")}>
              Statistics
            </Button>
            : <></>}

          {(localStorage.getItem("user") === "vendor" || localStorage.getItem("user") === "buyer")
            ? <Button color="inherit" onClick={() => navigate("/Logout")}>
              Logout
            </Button>
            : <></>}


        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
