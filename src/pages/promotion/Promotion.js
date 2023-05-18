import React, {useState} from "react";
import {
  Button
} from "antd";
import LoadPromotion from './Load.Promotion'
import NewPromotion from "./New.Promotion";
export default function Promotion () {
    const [show, setShow] = useState(false);
    const handleClickNew = () => {
      setShow(true)
    }
    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Promotions </h1> 
          </header>
          {!show && (<Button  variant="primary" onClick={handleClickNew}>
            New Promotion
          </Button>)}
          <LoadPromotion show={show}/>
          <NewPromotion show={show}/>
        </div>
        </React.Fragment>
    )
}