
import React, { useState } from "react";

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


const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignUp () {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const handleChangeEmail = (event) =>{
      setEmail(event.target.value);
    }
    const handleChangeAddress = (event) =>{
      setAddress(event.target.value);
    }
    const handleChangePhone = (event) =>{
      setPhone(event.target.value);
    }
    const handleChangePassword = (event) =>{
      setPassword(event.target.value);
    }
    const handleChangeConfirmPassword = (event) =>{
      setConfirmPassword(event.target.value);
    }

  
  const handleOnClick = () =>{
    if(password && confirmPassword && password !== confirmPassword) {
      if(email && password && address && phone){
        alert(`${email} ${password} ${phone} ${address}`)
        Service.Signup(email, address, phone, password).then(
          response =>{
            console.log(response)
          }
        )
      }
    }
        
  }

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
              
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
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

                <Form.Item
                  className="username"
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone!",
                    },
                  ]}
                >
                  <Input 
                  placeholder="Phone" 
                  value={phone}
                  onChange = {(event) =>{handleChangePhone(event)}}
                  />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Address"
                  name="address"
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
                  onChange = {(event) =>{handleChangeAddress(event)}}
                  />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
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
                  label="Confirm Password"
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
                
              </Form>
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
            Copyright © 2021 E-Voucher Pro
          </p>
        </Footer>
      </Layout>
    </React.Fragment>
  );
  
}
