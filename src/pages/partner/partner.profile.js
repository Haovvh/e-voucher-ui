import React, {useState, useEffect} from "react";

import {
  Card,  
  Table,  
  Input
} from "antd";
import { EyeTwoTone } from '@ant-design/icons';
import {
  SearchOutlined,
  
} from "@ant-design/icons";
import { BiHide } from 'react-icons/bi';
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import notification from "../../utils/notification";
import goongService from "../../services/goong.service";
import partnerService from "../../services/partner.service";

export default function PartnerProfile () {
    const [isLoad, setIsLoad] = useState(false);
    const [partnerId, setPartnerId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false)

  const handleChangeEmail = (event) => (
    setEmail(event.target.value)
  )
  const handleChangeName = (event) => (
    setName(event.target.value)
  )

  const handleChangeAddress = (event) => (
    setAddress(event.target.value)
  )

  const handleChangePass = (event) => (
    setPassword(event.target.value)
  )
  const handleChangeConfirmPass = (event) => (
    setConfirmPassword(event.target.value)
  )
  const clearScreen = () => {
    setName("");
    setEmail("");
    setAddress("");
    setPassword("");
    setPartnerId("");
  }
  const handleKeyDownAddress = (e) => {
    
    if (e.key === 'Enter') {
      goongService.getAddress(address).then(
        response => {
            
            if(response.data && response.data.status === 'OK') {
                const temp = response.data.results[0]
                console.log(temp)
                setAddress(temp.formatted_address);
                
            }
        }, error => {
            console.log(error)
        }
      )
    }
  }
  const handleshowPass = () =>{
    setShowPass(!showPass)
  }
  
  const handleClickUpdate = () => {
    if (email && name && address && password ) {
      partnerService.putPartnerByPartner(password, address, name).then(
        response=>{
          if(response.data && response.data.success === true) {
            alert(notification.EDIT)
            clearScreen();
            setIsLoad(!isLoad)
          }
        }
      )
    } else {
      alert(notification.INPUT)
    }
  }
  const handleClickCancel = () => {
    setIsLoad(!isLoad)
  }
  
    useEffect(()=>{   
      partnerService.getPartnerIdByPartner().then(
        response => {
          if (response.data && response.data.success === true) {                  
            console.log(response.data.data)   
            const temp = response.data.data;
            setPartnerId(temp.id)      
            setEmail(temp.email)
            setName(temp.name)
            setAddress(temp.address)
          }
          
        }, error => {
          console.log(error)
        }
      )
    },[isLoad])
    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Profile </h1> 
          </header>
          <Card >
          <Row className="container">
            <Col md={{ span: 5, offset: 4 }}>
            <Form.Group className="mb-3">
            <Form.Label>Email </Form.Label>
            <Form.Control 
            disabled
            type="email"         
            value={email}
            onChange={handleChangeEmail}
             />        
          </Form.Group>
            </Col>
              
          </Row>
          <Row className="container">
            <Col md={{ span: 5, offset: 4 }}>
            <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control 
            placeholder="Name" 
            value={name}   
            required
            onChange={handleChangeName}  
            />        
          </Form.Group>
            </Col>
              
          </Row>
          <Row className="container">
            <Col md={{ span: 5, offset: 4 }}>
            <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control 
            placeholder="Address" 
            value={address}   
            required
            onKeyDown={handleKeyDownAddress}
            onChange={handleChangeAddress}  
            />    
            
          </Form.Group>
            </Col>
              
          </Row>
          <Row className="container">
            <Col md={{ span: 5, offset: 4 }}>
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
            
            <Form.Control 
            placeholder="Password"
            type={showPass ? "password" : "text"} 
            value={password}   
            onChange={(event) => {handleChangePass(event)}}  
            
            />    
            <InputGroup.Text><BiHide onClick={handleshowPass}/></InputGroup.Text>
             
            
              
        </InputGroup>
            </Col>
              
          </Row>
          
          <Row className="container">
            <Col md={{ span: 1, offset: 4 }}>
            <Button className="btn btn-secondary" onClick={handleClickCancel}>
              Cancel
            </Button>
            </Col>
            <Col md={{ span: 1, offset: 2 }}>
            <Button className="btn btn-primary" onClick={handleClickUpdate}>
              Update
            </Button>
            </Col>
          </Row>
          
          </Card>   
        </div>
        </React.Fragment>
    )
}