import React, {useState, useEffect} from "react";

import {
  Card,  
  Table,  
  Input
} from "antd";
import {
  SearchOutlined,
  
} from "@ant-design/icons";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

import notification from "../../utils/notification";
import AdminService from "../../services/admin.service";
export default function AdminProfile () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [partnerId, setPartnerId] = useState("");
    
    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
  

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
    setDisabled(false)
  }
  

  const handleClickSave = () => { 
    if(email && password && address && name) {
      if(partnerId === "") {
        AdminService.postPartnerByAdmin(email, password, address,name).then(
          response => {
            console.log(response.data)
            if(response.data && response.data.success === true ) {
              alert(notification.CREATE)
              setShow(false);
              setIsLoad(!isLoad)
              clearScreen();
            }
            
          }, error => {
            console.log(error)
          }
        )
      } else {
        
        AdminService.putPartnerByAdmin(partnerId, password, address, name).then(
          response =>{
            if(response.data && response.data.success === true) {
              alert(notification.EDIT)
              setShow(false);
              setIsLoad(!isLoad)
              clearScreen();
            }            
          }
        )
      }
      
    } else {
      alert(notification.INPUT);
    }    
  }
    useEffect(()=>{   
      AdminService.getAllPartnerByAdmin().then(
        response => {
          if (response.data && response.data.success) {                  
            console.log(response.data.data)            
          }
          
        }, error => {
          console.log(error)
        }
      )
    },[])
    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Profile </h1> 
          </header>
          <Card>
          <Row>
              
            </Row>
          </Card>   
        </div>
        </React.Fragment>
    )
}