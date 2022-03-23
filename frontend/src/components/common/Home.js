import { useState, useEffect } from "react";

const Home = (props) => {

  useEffect(() => {
    if(localStorage.getItem("user")==="vendor"){window.location.href = "./VendorHome"}
    if(localStorage.getItem("user")==="buyer") {window.location.href = "./BuyerHome" }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");



  return <div style={{ textAlign: "center" }}>BASKET BALL CANTEEN</div>;
};

export default Home;
