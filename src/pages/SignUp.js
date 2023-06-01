
import React, { useState, useEffect } from "react";

import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,  
  Select
} from "antd";

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
        Service.Signup(email, address, phoneNumber, password, name).then(
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
          <Row gutter={[24, 0]} justify="space-around">
            
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign Up</Title>
              <Form.Item
                  className="username"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="Email" 
                  value={email}
                  onChange = {(event) =>{handleChangeEmail(event)}}
                  />
                </Form.Item>
              
              
                
                <Row>
                <Col className="col-5">
                <Form.Item
                  className="username"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="Name" 
                  value={name}
                  onChange = {(event) =>{handleChangeName(event)}}
                  />
                </Form.Item>               
                </Col>
                <Col className="col-7">
                <Form.Item
                  className="username"
                  
                  name="PhoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phoneNumber!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="phoneNumber" 
                  value={phoneNumber}
                  onChange = {(event) =>{handleChangePhoneNumber(event)}}
                  />
                </Form.Item>
                
                </Col>
                </Row> 
                
                <Form.Item
                  
                  rules={[
                    {
                      required: true,
                      message: "Please input your Address!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="Address" 
                  value={address}
                  onKeyDown={handleKeyDownAddress}
                  onChange = {handleChangeAddress}
                  />
                </Form.Item>
                

                <Form.Item
                  className="username"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="Password" 
                  type="password"
                  value={password}
                  onChange = {(event) =>{handleChangePassword(event)}}
                  />
                </Form.Item>
                <Form.Item
                  className="username"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Confirm Password!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="Confirm Password" 
                  type="password"
                  value={confirmPassword}
                  onChange = {(event) =>{handleChangeConfirmPassword(event)}}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleOnClick()}}
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
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
