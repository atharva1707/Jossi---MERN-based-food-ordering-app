import { useState, useEffect } from "react";

const Logout = (props) => {

  useEffect(() => {
    localStorage.clear();
    window.location.href="./"
}, []);

  return (<div>logging out</div>);
};

export default Logout;
