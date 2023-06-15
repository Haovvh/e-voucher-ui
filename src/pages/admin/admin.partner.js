import React, {useState, useEffect} from "react";

import {
  Card,  
  Table,  
  Input
} from "antd";
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
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState("0");
    const [showPass, setShowPass] = useState(false)

  const [search, setSearch] = useState("");
  
  const columns = [
        
    {
      title: "Email",
      dataIndex: "email",       
      
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
      title: "Category",
      dataIndex: "Category",
      render: (text, record) => (
        <p>
          {record.Category.type}
        </p>
       ),
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
  
  const handleClickNew = () => {
    setShow(true)
  }
  const handleChangeCategory = (event) => {
    setCategoryId(event.target.value)
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
    setCategoryId("0");
    setName("");
    setEmail("");
    setAddress("");
    setPassword("");
    setPartnerId("");
    setDisabled(false)
  }
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempPartnerEmails = searchPartners.filter(e => e.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempPartnerEmails.length === 0) {
        const tempPartnerNames = searchPartners.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        if (tempPartnerNames.length === 0) {
          const tempSearchPartners = searchPartners.filter(e => e.address.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
          setPartners(tempSearchPartners);
        } else {
          setPartners(tempPartnerNames)
        }
        
      } else {
        setPartners(tempPartnerEmails)
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
    if(email && password && address && name && categoryId !== "0") {
      if(partnerId === "") {
        AdminService.postPartnerByAdmin(email, password, address,name, categoryId).then(
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
            alert(notification.ERROR_INPUT)
          }
        )
      } else {
        
        AdminService.putPartnerByAdmin(partnerId, password, address, name, categoryId).then(
          response =>{
            if(response.data && response.data.success === true) {
              alert(notification.EDIT)
              setShow(false);
              setIsLoad(!isLoad)
              clearScreen();
            }            
          } , error => {
            console.log(error)
            alert(notification.ERROR_INPUT)
          }
        )
      }
      
    } else {
      alert(notification.INPUT);
    }    
  }
  const handleshowPass = () =>{
    setShowPass(!showPass)
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
          setCategoryId(`${temp.categoryID}`)
          
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
            const temp = response.data.data;
            console.log(temp)
            setPartners(temp)
            setSearchPartners(temp)
          }
          
        }, error => {
          console.log(error)
          alert(notification.ERROR_SERVER)
        }
      )
      AdminService.getAllCategoryByAdmin().then(
        response => {
          if(response.data && response.data.success === true) {
            const temp = response.data.data
            temp.unshift({
              id: 0,
              type: "Vui lòng chọn"
            })
            setCategories(temp)
          }
        }, error => {
          console.log(error)
          alert(notification.ERROR_SERVER)
        }
      )
    },[isLoad])
    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Partners </h1> 
          </header>
          <Card>
          <Row>
          <Col md={{ span: 3, offset: 0 }}>   
              <Form.Group  >
                <Form.Control 
                value={search}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                className="header-search"
                placeholder="Type here..."
                />        
              </Form.Group>             
              
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Category </Form.Label>
              <Form.Select value={categoryId}
              onChange={(event) => handleChangeCategory(event)}
              aria-label="Default select example">
                
                {categories && Array.isArray(categories) && categories.map((option) =>{
                  return (
                    <option key={option.id} value={option.id}>{option.type}</option>
                  )
                })}                
              </Form.Select>
              </Form.Group>
          <Form.Group className="mb-3" >
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