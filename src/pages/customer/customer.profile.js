import React, {useState, useEffect} from "react";

import {
  Card,  
  Table,  
  Input
} from "antd";

import { BiHide } from 'react-icons/bi';
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import notification from "../../utils/notification";
import goongService from "../../services/goong.service";
import customerService from "../../services/customer.service";



export default function CustomerProfile () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [partnerId, setPartnerId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [phoneNumber, setPhoneNumber] =  useState("")
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

  const handleChangeEmail = (event) => (
    setEmail(event.target.value)
  )
  const handleChangeName = (event) => (
    setName(event.target.value)
  )

  const handleChangeAddress = (event) => (
    setAddress(event.target.value)
  )
  const handleChangePhone = (event) => {
    setPhoneNumber(event.target.value)
  }

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
                setLat(temp.geometry.location.lat)
                setLong(temp.geometry.location.lng)
                
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
      customerService.putCustomerByCustomer(password, address, name, phoneNumber).then(
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
      customerService.getCustomerIdByCustomer().then(
        response => {
          if (response.data && response.data.success === true) {    
            const temp = response.data.data;
            setPartnerId(temp.id)      
            setEmail(temp.email)
            setName(temp.name)
            setPhoneNumber(temp.phoneNumber)
            setLat(temp.lat)
            setLong(temp.long)
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
            <Form.Group className="mb-3" >
            <Form.Label>Phone</Form.Label>
            <Form.Control 
            placeholder="phone" 
            value={phoneNumber}   
            required
            onChange={handleChangePhone}  
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
            type={!showPass ? "password" : "text"} 
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