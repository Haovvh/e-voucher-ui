import React, {useState, useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,  
  Avatar,
  Space,
  Tag,  
  Typography,  
  Input
} from "antd";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import partnerService from "../../services/partner.service";

export default function Customer () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [partnerId, setPartnerId] = useState("");
    
    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("partner")

    const [partners, setPartners] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  
  const columns = [
    {
      title: "IdPartner",
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
      title: "Status",
      dataIndex: "isDeleted",
      render: (text, record) => (
        <Button onClick={()=> handleEditStatus(record)}>
          {(record.isDeleted === true) ? "True" : "False"}
        </Button>
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

  const handleClickNew = () => {
    setShow(true)
  }

  const onDeleteData = (record) => {
    
    const id = record.id
    
    
    if(window.confirm(`Are you sure you want to delete this ${id} `)){
      alert(` ${id} ${type}`)
      partnerService.deletePartnerById(id, type).then(
        response => {
          console.log(response.data)
          if(response.data && response.data.success) {
            alert("success");
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
    setPartnerId("");
    setDisabled(false)
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleClickSave = () => { 
    if(email && password && address && name) {
      if(partnerId === "") {
        partnerService.postPartner(email, password, address,name).then(
          response => {
            console.log(response.data)
            if(response.data && response.data.success === true ) {
              alert("Create Success")
              setShow(false);
              setIsLoad(!isLoad)
              clearScreen();
            }
            
          }, error => {
            console.log(error)
          }
        )
      } else {
        
        partnerService.putPartner(partnerId, password, address, name).then(
          response =>{
            if(response.data && response.data.success === true) {
              alert("Edit Success")
              setShow(false);
              setIsLoad(!isLoad)
              clearScreen();
            }
            
          }
        )
      }
      
    } else {
      alert("Vui lòng nhập đầy đủ");
    }
    
  }

 
  const handleClickClose = () => {
    setShow(false)
    clearScreen();
  }
  const onEditData = (record) => { 
    partnerService.getPartnerById(record.id).then(
      response => {
        if(response.data && response.data.success) {
          console.log(response.data.data)
          const temp = response.data.data
          setEmail(temp.email)
          setAddress(temp.address)
          setName(temp.name)
          setPartnerId(record.id)
          setShow(true)
          setDisabled(true)
        }
      }
    )
    
    
  };
    useEffect(()=>{   
      
      partnerService.getAllPartner().then(
        response => {
          if (response.data && response.data.success) {
            console.log(response.data.data)
            setIsLoad(false)          
            
            setPartners(response.data.data)
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
            <h1>Partner </h1> 
          </header>
          <Button  className='btn btn-success justify-content-end' onClick={handleClickNew}>
            New Partner
          </Button>          
          
          <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="All Partner"          
          >
            <div className="table-responsive">
            
            <Table
              columns={columns}
              dataSource={partners}
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
          <Modal.Title>Add Partner</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
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
            value={address}   
            required
            onChange={handleChangeAddress}  
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