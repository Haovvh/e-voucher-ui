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



export default function LoadPromotion(props) {
  const [show, setShow] = useState(false);
  const [voucherID, setVoucherID] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [vouchers, setVouchers] = useState([])

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
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



  const onChange = (e) => alert(`radio checked:${e.target.value}`);

  useEffect(()=>{   
    setVouchers(fetchVoucher);
  },[])
  if(props && props.show) {
    return (
        <>
        </>
    )
  }

  return (
    <>
    <div> 
      <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="All Promotion"
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

      </div>
         
    </>
  );
}

