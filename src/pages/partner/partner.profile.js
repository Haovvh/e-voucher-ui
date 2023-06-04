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
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    const [confirmPass, setConfirmPass] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [showChangePass,setShowChangePass] = useState(false)
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [showOldPass, setShowOldPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

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
  const handleshowOldPass = () =>{
    setShowOldPass(!oldPass)
  }
  const handleshowNewPass = () =>{
    setShowNewPass(!newPass)
  }
  const handleshowConfirmPass = () =>{
    setShowConfirmPass(!confirmPass)
  }
  const handleClickClose = () => {
    clearChangePass();
    setShowChangePass(false)
  }
  const clearChangePass = () => {
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setShowChangePass(false)
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
        } , error =>{
          if (error.response && error.response.status === 401 && error.response.data.success === false) {
            console.log(error.response)
            alert(notification.WRONG_PASSWORD)
          }
        }
      )
    } else {
      alert(notification.INPUT)
    }
  }
  const handleClickSave = () => {
    if (oldPass && newPass && confirmPass) {
      if (newPass === confirmPass) {
        partnerService.putPasswordPartnerByPartner(oldPass, newPass).then(
          response => {
            if(response.data && response.data.success === true) {
              alert(notification.CHANGE_PASSWORD_SUCCESS)
              clearChangePass();
            }
          }, error => {
            if (error.response && error.response.status === 401 && error.response.data.success === false){
              console.log(error.response)
              alert(notification.WRONG_PASSWORD)
            }            
          }
        )
      } else {
        alert(notification.PASSWORD)
      }
    } else {
      alert(notification.INPUT)
    }
  }
  const handleClickCancel = () => {
    setIsLoad(!isLoad)
  }
  const handleClickChangePass = () => {
    setShowChangePass(true);
  }
  const handleChangeOldPass = (event) => {
    setOldPass(event.target.value);
  }
  const handleChangeNewPass = (event) => {
    setNewPass(event.target.value);
  }
  const handleChangeConfirmPass = (event) => {
    setConfirmPass(event.target.value);
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
          <Col md={{ span: 5, offset: 10 }}>
            <Button onClick={handleClickChangePass}>
              Change Pass
            </Button>
          </Col>
          </Row>
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
            type={!showPass ? "password" : "text"} 
            value={password}   
            onChange={(event) => {handleChangePass(event)}}              
            />    
            
            <InputGroup.Text>{showPass ? <BsEye onClick={handleshowPass}/> : <BsEyeSlash onClick={handleshowPass}/>}</InputGroup.Text>
                     
              
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

        <Modal show={showChangePass} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Row className="container">
            <Col md={{ span: 8, offset: 2}}>
            <Form.Label>Old Password</Form.Label>
            <InputGroup className="mb-3">
            
            <Form.Control 
            placeholder="Old Password"
            type={!showOldPass ? "password" : "text"} 
            value={oldPass}   
            onChange={(event) => {handleChangeOldPass(event)}}  
            
            />    
            <InputGroup.Text>{showOldPass ? <BsEye onClick={handleshowOldPass}/> : <BsEyeSlash onClick={handleshowOldPass}/>}</InputGroup.Text>

        </InputGroup>
            </Col>              
          </Row>  
          <Row className="container">
            <Col md={{ span: 8, offset: 2 }}>
            <Form.Label>New Password</Form.Label>
            <InputGroup className="mb-3">
            
            <Form.Control 
            placeholder="New Password"
            type={!showNewPass ? "password" : "text"} 
            value={newPass}   
            onChange={(event) => {handleChangeNewPass(event)}}  
            
            />    
            <InputGroup.Text>{showNewPass ? <BsEye onClick={handleshowNewPass}/> : <BsEyeSlash onClick={handleshowNewPass}/>}</InputGroup.Text>
            
        </InputGroup>
            </Col>              
          </Row>
          <Row className="container">
            <Col md={{ span: 8, offset: 2 }}>
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup className="mb-3">
            
            <Form.Control 
            placeholder="New Password"
            type={!showConfirmPass ? "password" : "text"} 
            value={confirmPass}   
            onChange={(event) => {handleChangeConfirmPass(event)}}  
            
            />    
            <InputGroup.Text>{showConfirmPass ? <BsEye onClick={handleshowConfirmPass}/> : <BsEyeSlash onClick={handleshowConfirmPass}/>}</InputGroup.Text>
            
        </InputGroup>
            </Col>              
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
        </React.Fragment>
    )
}