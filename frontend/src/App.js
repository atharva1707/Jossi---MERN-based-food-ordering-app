import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Test from "./components/Test";
import VendorHome from "./components/vendor/vendor_home";
import VendorProfile from "./components/vendor/vendor_profile";
import VendorDashboard from "./components/vendor/vendor_dashboard";
import BuyerDashboard from "./components/buyer/buyer_dashboard";
import BuyerBuyItem from "./components/buyer/buyer_buyitem";
import VendorEditFood from "./components/vendor/vendor_editfood";
import VendorMyOrders from "./components/vendor/vendor_myorders";
import VendorStats from "./components/vendor/vendor_statistics";
import BuyerMyOrders from "./components/buyer/buyer_myorders";
import BuyerMenu from "./components/buyer/buyer_menu";
import BuyerProfile from "./components/buyer/buyer_profile";
import AddFood from "./components/vendor/vendor_addfood";
import BuyerHome from "./components/buyer/buyer_home";
import Wallet from "./components/buyer/buyer_wallet";
import Logout from "./components/common/Logout";



const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="VendorHome" element={<VendorHome />} />
          <Route path="Test" element={<Test />} />
          <Route path="VendorProfile" element={<VendorProfile />} />
          <Route path="VendorDashboard" element={<VendorDashboard />} />
          <Route path="VendorEditFood" element={<VendorEditFood />} />
          <Route path="VendorMyOrders" element={<VendorMyOrders />} />
          <Route path="BuyerMyOrders" element={<BuyerMyOrders />} />
          <Route path="BuyerHome" element={<BuyerHome />} />
          <Route path="VendorStats" element={<VendorStats />} />
          <Route path="BuyerDashboard" element={<BuyerDashboard />} />
          <Route path="BuyerProfile" element={<BuyerProfile />} />
          <Route path="BuyerBuyItem" element={<BuyerBuyItem />} />
          <Route path="BuyerMenu" element={<BuyerMenu />} />
          <Route path="AddFood" element={<AddFood />} />
          <Route path="Wallet" element={<Wallet />} />
          <Route path="Logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
