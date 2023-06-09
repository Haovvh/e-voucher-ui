
import { useState, useEffect } from "react";
import Service from "../services/auth.service"

function Logout() {
  useEffect ( ()=>{
    window.location.assign('/signin')
  })

  return (
    <>
      <div className="container">
          <header className="jumbotron">
            <h1>Logout </h1> 
          </header>
          </div>

    </>
  );
}

export default Logout;
