
import React, { useState } from "react";

import { Link } from "react-router-dom";
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

import signinbg from "../assets/images/img-signin.jpg";
import Service from "../services/auth.service"

const Option = Select.Option;

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignIn () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roleUser = ["Customer", "Partner", "Ddmin"];
  const [role, setRole] = useState("");

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const handleChangeEmail = (event) =>{
      setEmail(event.target.value);
    }
    const handleChangePassword = (event) =>{
      setPassword(event.target.value);
    }

  const handleChangeRole = (value) =>{
    console.log(value)
    setRole(value);
  }
  const handleOnClick = () =>{
    
    if(email && password && role){
      alert(`${email} ${password} ${role}`)
      Service.Login(email, password, role).then(
        response =>{
          console.log(response)
        }
      )
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
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
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
                label="Role"
                name="Role"  
                rules={[
                  {
                    required: true,
                    message: "Please select a Role",
                  },
                ]}               
                >
                  <Select  
                  placeholder="Please select a Role"
                  onChange = {(value) => {                
                handleChangeRole(value);
                }}> 
                  
                    {
                      roleUser && Array.isArray(roleUser) && roleUser.map(value =>{
                        return <Option key={value} value={value}>{value}</Option>
                      })
                    }                    
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleOnClick()}}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
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
