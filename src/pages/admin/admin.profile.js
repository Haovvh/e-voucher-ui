import React, {useState} from "react";

import {
  Card,     
  
} from "antd";

import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import notification from "../../utils/notification";
import AdminService from "../../services/admin.service";

export default function AdminProfile () {
    const [confirmPass, setConfirmPass] = useState("");
    const [showChangePass,setShowChangePass] = useState(false)
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [showOldPass, setShowOldPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

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
  
  
  const handleClickSave = () => {
    if (oldPass && newPass && confirmPass) {
      if (newPass === confirmPass) {
        AdminService.putChangePassByAdmin(oldPass, newPass).then(
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