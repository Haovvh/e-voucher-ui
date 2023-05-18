import React, { useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
  
  Input, 
  Select
} from "antd";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import VoucherService from '../../services/voucher.service'



export default function NewPromotion(props) {
    
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucher, setVoucher] = useState({
      key: 0,
      voucherID: 0,
      title: "Vui lòng chọn voucher",
      description: "",
      value: ""
    });
    
    
    const [quantity, setQuantity] = useState(0)
    
    const [promotion, setPromotion] = useState([{
      title:"",
      description:"",
      start: "",
      end: ""
    }])
    


    const [voucherInPromotion, setVoucherInPromotion] = useState([])

    
    const fetchVoucher = [];

    for (let i = 1; i <= 10; i++) {
      fetchVoucher.push({
        
        voucherID: i,
        title: `Voucher ${i} %`,
        description: `Voucher mua hàng giảm giá ${i} %`,
        value: Number(`${i}2`),
        
      });
    }

    fetchVoucher.unshift({
      voucherID: 0,
      title: "Vui lòng chọn loại voucher",
      description: "      ",
      value: 0
    })
    const loadVouchers = fetchVoucher.map((item, key) => ({...item, key}))
    
    const option = loadVouchers.map((item) => {
      return (
        <option key={item.voucherID} value={item.voucherID}>
          {item.title}
        </option>
      )
    })
    
    const columns = [    
      {
        title: "TITLE",
        dataIndex: "title",        
        width: "32%",
      },
      {
        title: "DESCRIPTION",
        dataIndex: "description",
      },
    
      {
        title: "VALUE",
        dataIndex: "value",
        
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        
      },
      {
        title: "Actions",
        key: 'action',      
        render: (record) => {
          return (
            <>
              <DeleteOutlined
                onClick={() => {
                  onDeleteVoucher(record);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
            </>
          );
        },    
    
      }
      
    ];

    const onDeleteVoucher = (record) => {
      
      const id = record.voucherID

      const title = record.title;
      
      if(window.confirm(`Are you sure you want to delete this ${id} ${title}}`)){
        setVoucherInPromotion((option) =>
        option.filter((e)=> e.voucherID !== id)
        )
      }
      
    };
    
    const handleCloseVoucher = () => {
      setShowVoucher(false)
    }
  

    const handleSaveVoucher = () => {   
      if(voucher.voucherID !== 0 && quantity >0 && voucher.description && voucher.value)  {
        setShowVoucher(false)    
        setVoucherInPromotion([...voucherInPromotion, {
          
          voucherID: voucher.voucherID,
          title: voucher.title,
          description: voucher.description,
          value: voucher.value,
          quantity: quantity
        }])
        setQuantity(0)
        setVoucher({
          voucherID:0,
          description: "",
          title: ""
        })
      } else {
        alert("Vui lòng chọn voucher và số lượng")
      }
    }
    const handleShowVoucher = () => {
      setShowVoucher(true);
    }
    const handleChangeTitle = (event) => (
      setPromotion(prevState =>({
        ...prevState, title: event.target.value
      }))
    )
    const handleChangeDescription = (event) => (
      setPromotion(prevState =>({
        ...prevState, description: event.target.value
      }))
    )
    const handleChangeQuantity = (event) => (
      setQuantity(event.target.value)
    )

    const handleChangeStart = (event) => (
      setPromotion(prevState =>({
        ...prevState, start: event.target.value
      }))
    )
    
    const handleChangeEnd = (event) => (
      setPromotion(prevState =>({
        ...prevState, end: event.target.value
      }))
    )

    const handleChangeVoucher = (event) => {
      const id = parseInt(event.target.value)
      const temp = loadVouchers.filter((option) => (
        option.voucherID === id
      ))[0]  
      
      setVoucher(temp)
            
    }
    const handleClickSavePromotion = () =>{
      alert("OK")
    }
  useEffect(()=>{   
    
    
  },[])

  if(props && !props.show) {
    return (
        <>
        </>
    )
  }

  return (
    <>
    <div> 
    
    <Container>
      <Row>
        <Col>
        <Button className='btn btn-primary' onClick={handleShowVoucher}>
          Add Voucher
        </Button>
        </Col>
        <Col>
        <Button className='btn btn-success justify-content-end' onClick={handleClickSavePromotion}>
          Save
        </Button>
        </Col>
      </Row>
    </Container>
    <Container>
    <Row>
        <Col>
        <label>Title</label>
        </Col>
        <Col>
        <label>Description</label>
        </Col>
        <Col>
        <label>Start</label>
        </Col>
        <Col>
        <label>End</label>
        </Col>
      </Row>
      <Row>
        <Col>
        <Input 
          placeholder="Title" 
          value={promotion.title}
          onChange = {(event) =>{handleChangeTitle(event)}}
        /> 
        </Col>
        <Col>
        <Input 
            placeholder="Description" 
            value={promotion.description}
            onChange = {(event) =>{handleChangeDescription(event)}}
          /> 
        </Col>
        <Col>
        <Input 
            placeholder="Value" 
            type='date'
            value={promotion.start}    
            onChange = {(event) =>{handleChangeStart(event)}}        
            />    
            
        </Col>
        <Col>
        <Input 
            placeholder="Value" 
            type='date'
            value={promotion.end}  
            onChange = {(event) =>{handleChangeEnd(event)}}          
            />
        </Col>
      </Row>
    </Container>
    
    
    { voucherInPromotion && voucherInPromotion.length > 0 &&
    <Card
    bordered={false}
    className="criclebox tablespace mb-24"
    title="Voucher Table"
    >
        
        <Table
        columns={columns}
            dataSource={voucherInPromotion}
            pagination={true}
            bordered
            className="ant-border-space"
        />
        
    </Card>
    }
      

      <Modal show={showVoucher} onHide={handleCloseVoucher}>
        <Modal.Header closeButton>
          <Modal.Title>Add Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <label>Voucher</label>
        <Form.Control
        as="select" 
        value={voucher.voucherID}
        onChange={handleChangeVoucher}
        >
          
        {option}
      
      </Form.Control>
      <label>Description</label>
          <Input 
            placeholder="Description" 
            value={voucher.description}
            readOnly
          />          
        
        <label>Value</label>
        <Input 
            placeholder="Value" 
            value={voucher.value}   
            readOnly
                   
            />
          <label>Quantity</label>
          <Input 
            placeholder="Value" 
            value={quantity}   
            onChange={(event) => {handleChangeQuantity(event)}}        
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVoucher}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveVoucher}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    
    
    </div>
         
    </>
  );
}

