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
import Modal from 'react-bootstrap/Modal';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import notification from "../../utils/notification";
import AdminService from "../../services/admin.service";
import goongService from "../../services/goong.service";
export default function AdminCustomer () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [userId, setUserId] = useState("");
    
    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("")
    

  const [search, setSearch] = useState("");
  
  const columns = [
    {
      title: "Id",
      dataIndex: "id",        
      width: "5%",
      sorter: (a, b) => a.id - b.id,
    },
    
    {
      title: "Email",
      dataIndex: "email",       
      sorter: (a, b) => a.email - b.email,   
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  
    {
      title: "Address",
      dataIndex: "address"      
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber"      
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (text, record) => (
        <p>
          {record.createdAt.toString().substring(0,10)}
        </p>
       ),
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      render: (text, record) => (
        <p>
          {record.updatedAt.toString().substring(0,10)}
        </p>
       ),
    },
   
    {
      title: "Actions",
      key: 'action',      
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditData(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteData(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },    
  
    }
    
  ];
  const handleEditStatus = (record) => {
    alert(record.id)
  }
  const handleChangePhone = (event) => {
    setPhoneNumber(event.target.value)
  }
  

  const onDeleteData = (record) => {
    
    const id = record.id
    
    
    if(window.confirm(notification.CONFIRM_DELETE)){
      
      AdminService.deleteuserIdByAdmin(id).then(
        response => {
          console.log(response.data)
          if(response.data && response.data.success) {
            alert(notification.DELETE);
            setIsLoad(!isLoad);
          }
          
        }, error => {
          console.log(error)
        }
      )     
    }
    
  };

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
    setUserId("");
    setPhoneNumber("")
    setLat("");
    setLong("");
    setDisabled(false)
  }
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempdatas = tempDatas.filter(e => e.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempdatas.length === 0) {
        const temptempDatas = tempDatas.filter(e => e.address.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setDatas(temptempDatas);
      } else {
        setDatas(tempdatas)
      }     
      
    }
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleChangeSearch = (event) => {    
    
    setSearch(event.target.value)
  }

  const handleClickSave = () => { 
    if(email && password && address && name ) {
      AdminService.putCustomerByAdmin(userId, password, address, name, phoneNumber, lat, long).then(
        response =>{
          if(response.data && response.data.success === true) {
            alert(notification.EDIT)
            setShow(false);
            setIsLoad(!isLoad)
            clearScreen();
          }            
        }
      )
        
      
    } else {
      alert(notification.INPUT);
    }    
  }
  
  const handleClickClose = () => {
    setShow(false)
    clearScreen();
  }
  const onEditData = (record) => { 
    AdminService.getCustomerIdByAdmin(record.id).then(
      response => {
        if(response.data && response.data.success) {
          console.log(response.data.data)
          const temp = response.data.data
          setEmail(temp.email)
          setAddress(temp.address)
          setName(temp.name)
          setPhoneNumber(temp.phoneNumber)
          setLat(temp.lat)
          setLong(temp.long)
          setUserId(record.id)
          setShow(true)
          setDisabled(true)
        }
      }
    )
    
    
  };
    useEffect(()=>{   
      
      AdminService.getAllCustomerByAdmin().then(
        response => {
          if (response.data && response.data.success) {
                  
            console.log(response.data.data)
            setDatas(response.data.data)
            setTempDatas(response.data.data)
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
            <h1>Customer </h1> 
          </header>
          <Card>
          <Row>
              <Col md={3}>
              <Input
                value={search}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                className="header-search"
                placeholder="Type here..."
                prefix={<SearchOutlined />}
              />
              </Col>              
            </Row>
          </Card>                 
          
          <Card
          bordered={false}
          className="criclebox tablespace mb-24"
                 
          >
            
            <div className="table-responsive">
            
            <Table
              columns={columns}
              dataSource={datas}
              pagination={true}
              onChange={onChange}
              rowKey="id"
              bordered
              className="ant-border-space"
            />
          </div>
        </Card>
          
        <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Partner</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            disabled={disabled}
            type="email"         
            value={email}
            onChange={handleChangeEmail}
            placeholder="Enter email" />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" 
            value={name}
            required
            onChange={handleChangeName} 
            />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control 
            placeholder="Address" 
            onKeyDown={handleKeyDownAddress}
            value={address}   
            required
            onChange={handleChangeAddress}  
            />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Phone</Form.Label>
            <Form.Control 
            placeholder="Phone" 
            value={phoneNumber}   
            required
            onChange={handleChangePhone}  
            />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control 
            placeholder="Password"
            type="password" 
            value={password}   
            onChange={(event) => {handleChangePass(event)}}  
            />        
          </Form.Group>
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
        </div>
        </React.Fragment>
    )
}