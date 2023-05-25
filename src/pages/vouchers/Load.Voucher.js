import React, { useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,  
  Avatar,
  Space,
  Tag,
  Button,
  Typography,
  Form,
  Input
} from "antd";

import Modal from 'react-bootstrap/Modal';
import VoucherService from '../../services/voucher.service'



export default function NewVoucher() {
  const [show, setShow] = useState(false);
  const [voucherID, setVoucherID] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [vouchers, setVouchers] = useState([])

    
  const columns = [
    {
      title: "STT",
      dataIndex: "key",        
      width: "5%",
      
    },
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
      title: "Actions",
      key: 'action',      
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditVoucher(record);
              }}
            />
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
      VoucherService.deleteVoucher(id).then(
        response =>{
          console.log(response);
        }, error =>{
          console.log(error)
        }
      )
    }
    
  };
  const onEditVoucher = (record) => { 
    setVoucherID(record.voucherID)
    setTitle(record.title)
    setDescription(record.description)
    setValue(record.value);   
    setShow(true)
  };
const fetchVoucher = [];

for (let i = 1; i <= 100; i++) {
  fetchVoucher.push({
    key: i,
    voucherID: i,
    title: `John${i} Brown`,
    description: `New York No. ${i} Lake Park`,
    value: Number(`${i}2`),
    
  });
}
  
  

  const handleChangeTitle = (event) => (
    setTitle(event.target.value)
  )
  const handleChangeDescription = (event) => (
    setDescription(event.target.value)
  )
  const handleChangeValue = (event) => (
    setValue(event.target.value)
  )
  
  
  const handleClose = () => {
    setShow(false)
    clearInputWhenSubmit();
  }
  const clearInputWhenSubmit = () => {
    setVoucherID(0);
    setDescription("");
    setTitle("");
    setValue("");
  }

  const handleSaveVoucher = () => {
    alert(` ${voucherID} ${title} ${description}  ${value}`)
    VoucherService.postVoucher({
      title, description, value
    })
    setShow(false)
    clearInputWhenSubmit();
    
  }
  const handleShow = () => {
    setShow(true);
  }

  const onChange = (e) => alert(`radio checked:${e.target.value}`);

  useEffect(()=>{   
    setVouchers(fetchVoucher);
  },[])

  return (
    <>
    <div> 
    <Button variant="primary" onClick={handleShow}>
              Add Voucher
            </Button>
      <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Voucher Table"
              extra={
                <>
                
                  <Radio.Group onChange={onChange} buttonStyle="solid" defaultValue="ishave">
                    <Radio.Button  value="ishave">IsHave</Radio.Button>
                    <Radio.Button value="isdelete">IsDelete</Radio.Button>
                    <Radio.Button value="isall">All</Radio.Button>
                  </Radio.Group>
                </>
              }
              >
                <div className="table-responsive">
                
                <Table
                  columns={columns}
                  dataSource={vouchers}
                  pagination={true}
                  bordered
                  className="ant-border-space"
                />
              </div>
        </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
        
        <label>Title</label>
        <Input 
          placeholder="Title" 
          value={title}
          onChange = {(event) =>{handleChangeTitle(event)}}
        /> 
        <label>Description</label>
          <Input 
            placeholder="Description" 
            value={description}
            onChange = {(event) =>{handleChangeDescription(event)}}
          /> 
          <label>Value</label>
          <Input 
            placeholder="Value" 
            value={value}
            onChange = {(event) =>{handleChangeValue(event)}}
            />        
            
          

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

