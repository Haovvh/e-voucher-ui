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
import { EditOutlined, UpSquareOutlined , PlusOutlined  } from "@ant-design/icons";
import notification from "../../utils/notification";
import customerService from "../../services/customer.service";
import header from "../../services/header.service";


export default function CustomerVoucher () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    
    const [code, setCode] = useState("");
    const [expDate, setExpDate] = useState("");
    const [stores, setStores] = useState([])
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    const [email, setEmail] = useState("");
    const [rewardID, setRewardID] = useState("");
  const [search, setSearch] = useState("");
  
  const columns = [    
    {
      title: "Title",
      dataIndex: "Voucher",
      render: (text, record) => (
        <p>
          {record.Voucher.title}
        </p>
       ),
    },
    {
      title: "VoucherCode",
      dataIndex: "code  ",
      render: (text, record) => (
        <p>
          {record.code}
        </p>
       ), 
  },
  
    {
      title: "Description",
      dataIndex: "Voucher",
      render: (text, record) => (
        <p>
          {record.Voucher.description}
        </p>
       ),
    },
    {
        title: "Value",
        dataIndex: "Voucher",
        render: (text, record) => (
          <p>
            {record.Voucher.value}
          </p>
         ), 
    },
    
    
    {
      title: "Exp",
      dataIndex: "expDate"      
    },  
    {
      title: "Actions",
      key: 'action',      
      render: (record) => {
        return (
          <>
            <UpSquareOutlined
            style={{ color: "blue", marginLeft: 12 }}
              onClick={() => {
                onEditData(record);
              }}
            />            
          </>
        );
      },    
  
    }
    
  ];
  
  const handleChangeEmail = (event) => (
    setEmail(event.target.value)
  )
  
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempdatas = tempDatas.filter(e => e.Voucher.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempdatas.length === 0) {
        const temptempDatas = tempDatas.filter(e => e.Voucher.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setDatas(temptempDatas);
      } else {
        setDatas(tempdatas)
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
    if (email && rewardID) {
      if (email.toLocaleLowerCase() !== header.email().toLocaleLowerCase()) {
        customerService.putRewardByCustomer(email,rewardID, code, expDate, stores).then(
          response => {
            console.log(response.data)
            if(response.data && response.data.success === true) {
              alert(notification.SEND_VOUCHER_SUCCESS)
              setEmail("")
              setRewardID("");
              setShow(false)
              setIsLoad(!isLoad)
            }
          }, error =>{
            if(error.response && error.response.status === 404 && error.response.data && error.response.data.success === false) {
              alert(notification.ERROR_EMAIL)
            }
            console.log(error.response)
          }
        )
      } else {
        alert(notification.CHECK_EMAIL)
      }
      
    } else {
      alert(notification.INPUT);
    }    
  }
  
  const handleClickClose = () => {
    setShow(false)
    setEmail("");
  }
  const onEditData = (record) => { 
    console.log(record)
    setCode(record.code);
    setExpDate(record.expDate)
    setStores(record.Partner.Stores)
   setRewardID(record.id);
   setShow(true)
  }

    useEffect(()=>{   
      customerService.getAllRewardByCustomer().then(
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
            <h1>Your Vouchers </h1> 
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
          <Modal.Title>Email</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          
          <Form.Group className="mb-3" >
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" 
            value={email}
            required
            onChange={handleChangeEmail} 
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