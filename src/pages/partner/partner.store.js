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
import partnerService from "../../services/partner.service";
import goongService from "../../services/goong.service";
import header from "../../services/header.service";

export default function PartnerStore () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [userId, setUserId] = useState("");
   
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0)

  const [search, setSearch] = useState("");
  
  const columns = [ 
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
    

  const onDeleteData = (record) => {
    
    const id = record.id
    
    
    if(window.confirm(notification.CONFIRM_DELETE)){
      partnerService.deleteStore(id).then(
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

  
  const handleChangeName = (event) => (
    setName(event.target.value)
  )

  const handleChangeAddress = (event) => (
    setAddress(event.target.value)
  )

 
  const clearScreen = () => {
    setName("");
    setAddress("");
    setUserId("");
    setLat(0);
    setLong(0);
    
  }
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempdatas = tempDatas.filter(e => e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
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
                setLat(temp.geometry.location.lat)
                setLong(temp.geometry.location.lng)
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleChangeSearch = (event) => {    
    
    setSearch(event.target.value)
  }

  const handleClickSave = () => { 
    if(address && name) {
        if(userId !== "") {
            partnerService.putStoreByPartner(name, address, lat, long, userId).then(
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
            partnerService.postStoreByPartner(name, address, lat, long).then(
                response =>{
                  if(response.data && response.data.success === true) {
                    alert(notification.CREATE)
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
    partnerService.getStoreIdByPartner(record.id).then(
      response => {
        if(response.data && response.data.success === true) {
          console.log(response.data.data)
          const temp = response.data.data
          setAddress(temp.address)
          setName(temp.name)
          setLat(temp.lat)
          setLong(temp.long)
          setUserId(record.id)
          setShow(true)
        }
      }
    )
    
    
  };
    useEffect(()=>{   
      partnerService.getAllStoreByPartner(header.getUserId()).then(
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
            <h1>Stores </h1> 
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
                New Store
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
          <Modal.Title>Store</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          
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
            onKeyDown={handleKeyDownAddress}
            required
            onChange={handleChangeAddress}  
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