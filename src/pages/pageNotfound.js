import React ,{useEffect} from "react";
import { Link } from "react-router-dom";
import { Button,Container, Row } from "react-bootstrap";

function NotFound ()  {
    useEffect(() => {
        window.location.assign('/404')
    })
    return (
        <React.Fragment>                       
            
        </React.Fragment>
    )
}

export default NotFound;