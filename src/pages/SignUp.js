
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,   
  Typography
} from "antd";
import { BiHide } from 'react-icons/bi';
import {Form, Row, Col, Card, Button, InputGroup} from 'react-bootstrap'
import signinbg from "../assets/images/voucher--scaled.jpeg";
import Service from "../services/auth.service"
import goongService from "../services/goong.service";
import notification from "../utils/notification";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignUp () {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0)
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
    
    const handleChangeEmail = (event) =>{
      setEmail(event.target.value);
    }
    const handleChangeAddress = (event) =>{
      
      setAddress(event.target.value);
    }
    const handleChangePhoneNumber = (event) =>{
      setPhoneNumber(event.target.value);
    }
    const handleChangeName = (event) =>{
      setName(event.target.value);
    }
    const handleChangePassword = (event) =>{
      setPassword(event.target.value);
    }
    const handleChangeConfirmPassword = (event) =>{
      setConfirmPassword(event.target.value);
    }
    const clearInput = () => {
      setAddress("");
      setConfirmPassword("");
      setEmail("");
      setName("");
      setPassword("");
      setPhoneNumber("");
    }
    const handleshowPass = () =>{
      setShowPass(!showPass)
    }
    const handleshowConfirmPass = () =>{
      setShowConfirmPass(!showConfirmPass)
    }

    const handleKeyDownAddress = (e) => {
    
      if (e.key === 'Enter') {
        goongService.getAddress(address).then(
          response => {
              
              if(response.data && response.data.status === 'OK') {
                  const temp = response.data.results[0]
                  console.log(temp)
                
                  console.log(temp.formatted_address)
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
  
  const handleOnClick = () =>{
    if (email && name && address && phoneNumber && password && confirmPassword) {
      console.log(email , name , address , phoneNumber , password ,  confirmPassword)
      if(password && confirmPassword && password === confirmPassword) {
        Service.Signup(email, address, phoneNumber, password, name, lat, long).then(
          response =>{
            if(response.data.success) {
              alert(notification.CREATE)              
              window.location.assign('/signin')
              clearInput();            
            }
          } , error => {
            
            if(error.response && !error.response.data.success  ) {
              alert(error.response.data.message)
            }
          }
        )
      } 
      else {
        
        alert(notification.PASSWORD)
      }
    } else {
      alert(notification.INPUT)
    }
    
        
  }
  useEffect ( () => {
    localStorage.clear();
  }, [])

  return (
    <React.Fragment>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h2>E-Voucher Pro</h2>
          </div>
        </Header>
        <Content className="signin">
        <Card>
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 6, offset: 0 }}
              lg={{ span: 6, offset: 1 }}
              md={{ span: 6 }}
            >
              <Title className="mb-15">Sign Up</Title>
              <Row>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email </Form.Label>
                  <Form.Control type="email" placeholder="Enter email" 
                      value={email}
                      onChange = {(event) =>{handleChangeEmail(event)}} />
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name </Form.Label>
                  <Form.Control type="text" placeholder="Name" 
                      value={name}
                      onChange = {(event) =>{handleChangeName(event)}} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone  </Form.Label>
                  <Form.Control type="email"  placeholder="Phone" 
                      value={phoneNumber}
                      onChange = {(event) =>{handleChangePhoneNumber(event)}} />
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address </Form.Label>
                  <Form.Control type="text" placeholder="Address" 
                      value={address}
                      onKeyDown={handleKeyDownAddress}
                      onChange = {handleChangeAddress} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 0 }}>
                
                  <Form.Label>Password  </Form.Label>
                  <InputGroup className="mb-3">
                  <Form.Control   placeholder="Password" 
                      type={!showPass ? "password" : "text"} 
                      value={password}
                      onChange = {(event) =>{handleChangePassword(event)}} />
                  <InputGroup.Text><BiHide onClick={handleshowPass}/></InputGroup.Text>
                  </InputGroup>                  
                 
                </Col>
                
              </Row>
              <Row>
              <Col md={{ span: 6, offset: 0 }}>
                
                <Form.Label>Confirm Password  </Form.Label>
                <InputGroup className="mb-3">
                <Form.Control   placeholder="Password" 
                    type={!showConfirmPass ? "password" : "text"}
                    value={confirmPassword}
                    onChange = {(event) =>{handleChangeConfirmPassword(event)}} />
                <InputGroup.Text><BiHide onClick={handleshowConfirmPass}/></InputGroup.Text>
                </InputGroup>
                
               
              </Col>
              </Row>
              <Row>
              <Col md={{ span: 6, offset: 0 }}>
              <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleOnClick()}}
                  >
                    SIGN UP
                  </Button>
                  
                  <p className="font-semibold text-muted">
                  SignIn{" "}
                  <Link to="/signin" className="text-dark font-bold">
                    Sign In
                  </Link>
                </p>
                </Col>
              </Row>
              
              </Col>
              <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 4 }}
              lg={{ span: 4 }}
              md={{ span: 4 }}
            >
              <img src={signinbg} alt="" />
            </Col>
              </Row>
              </Card>
          
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item key="1">Company</Menu.Item>
            <Menu.Item key="2">About Us</Menu.Item>
            <Menu.Item key="3">Teams</Menu.Item>
            <Menu.Item key="4">Products</Menu.Item>
            <Menu.Item key="5">Blogs</Menu.Item>
            <Menu.Item key="6">Pricing</Menu.Item>
          </Menu>
          
          <p className="copyright">              
            Copyright © 2023 E-Voucher Pro
          </p>
        </Footer>
      </Layout>
    </React.Fragment>
  );
  
}
