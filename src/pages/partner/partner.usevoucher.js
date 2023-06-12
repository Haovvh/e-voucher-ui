import React, {useState, useEffect} from "react";

import {
  Card,  
  Table,  
  Input
} from "antd";
import {
  SearchOutlined, SketchOutlined,
  
} from "@ant-design/icons";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import notification from "../../utils/notification";
import partnerService from "../../services/partner.service";



export default function PartnerUseVoucher () {
  const [show, setShow] = useState(false);
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    const [code, setCode] = useState("")

    const handleClickNew = () => {
      setShow(true)
    }
  
  const columns = [        
    
    {
      title: "Title",
      dataIndex: "title",
    },
  
    {
      title: "Description",
      dataIndex: "description"      
    },
    {
        title: "Value",
        dataIndex: "value"      
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
    }  
  ];
  const handleClickClose = () => {
    setShow(false)
    setCode("")
  }
  const handleChangeCode = (event) => {        
    setCode(event.target.value)
  }
  const handleClickSave = () => {
    partnerService.useVoucherByPartner(code).then(
      response =>{
        if(response.data && response.data.success === true) {
          alert("Thành công");
          setShow(false)
        }
      }, error => {
        if(error.response && error.response.data && error.response.status ===400) {
          alert(notification.WRONG_VOUCHER)
        }
      }
    )
  }  
    useEffect(()=>{   
      partnerService.getAllVoucherByPartner().then(
        response => {
          if (response.data && response.data.success) {
                  
            // setDatas(response.data.data)
            // setTempDatas(response.data.data)
          }
          
        }, error => {
          console.log(error)
        }
      )
    },[])

    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Vouchers Is Use</h1> 
          </header>                        
          <Card>
          <Row>
              
              <Col  md={{ span: 2, offset: 7 }}>
              <Button  className='btn  btn-success  ' onClick={handleClickNew}>
                Use Voucher
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
              
              rowKey="id"
              bordered
              className="ant-border-space"
            />
          </div>
        </Card>          
       
        </div>
        <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          
          <Form.Group className="mb-3" >
            <Form.Label>Voucher Code</Form.Label>
            <Form.Control placeholder="Code" 
            value={code}
            required
            onChange={handleChangeCode} 
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
        </React.Fragment>
    )
}