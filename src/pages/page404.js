import React ,{useEffect} from "react";
import { Link } from "react-router-dom";
import { Button,Container, Row } from "react-bootstrap";

function Page404 ()  {
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                <img
                src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                alt="not-found"
                />
                </Row>
            
                <Row>
                    <Link to="/">
                    Go Home
                    </Link>
                
                </Row>
                
            </Container>            
            
        </React.Fragment>
    )
}

export default Page404;