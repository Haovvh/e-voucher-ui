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

export default function AdminPartner () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [partnerId, setPartnerId] = useState("");
    
    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    
    const [partners, setPartners] = useState([]);
    const [searchPartners, setSearchPartners] = useState([]);
    

  const [search, setSearch] = useState("");
  
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
  const handleEditStatus = (record) => {
    alert(record.id)
  }

  const handleClickNew = () => {
    setShow(true)
  }

  const onDeleteData = (record) => {
    
    const id = record.id
    
    
    if(window.confirm(notification.CONFIRM_DELETE)){
      
      AdminService.deletePartnerIdByAdmin(id).then(
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
    setPartnerId("");
    setDisabled(false)
  }
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempPartners = searchPartners.filter(e => e.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempPartners.length === 0) {
        const tempSearchPartners = searchPartners.filter(e => e.address.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setPartners(tempSearchPartners);
      } else {
        setPartners(tempPartners)
      }
      
      
    }
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleChangeSearch = (event) => {    
    
    setSearch(event.target.value)
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
  
  const handleClickClose = () => {
    setShow(false)
    clearScreen();
  }
  const onEditData = (record) => { 
    AdminService.getPartnerIdByAdmin(record.id).then(
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
      
      AdminService.getAllPartnerByAdmin().then(
        response => {
          if (response.data && response.data.success) {
                  
            console.log(response.data.data)
            setPartners(response.data.data)
            setSearchPartners(response.data.data)
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
              <Col  md={{ span: 2, offset: 7 }}>
              <Button  className='btn  btn-success  ' onClick={handleClickNew}>
                New Partner
              </Button>  
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
          <Modal.Title> Partner</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form.Group className="mb-3">
            <Form.Label>Email </Form.Label>
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
            onKeyDown={handleKeyDownAddress}
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