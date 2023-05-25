import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
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
  Typography,
  Form,
  Input
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import promotionService from '../../services/promotion.service';

import NewPromotion from "./New.Promotion";

export default function Promotion () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [promotionID, setPromotionID] = useState("");
    const handleClickNew = () => {
      setShow(true)
    }

    const [promotions, setPromotions] = useState([]);
    
  const columns = [
    {
      title: "IdPromotion",
      dataIndex: "id",        
      width: "5%",
      
    },
    {
      title: "TITLE",
      dataIndex: "title",      
      sorter: (a, b) => a.title - b.title,  
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
    },
  
    {
      title: "Game",
      dataIndex: "Game",
      
    },
    {
      title: "Start",
      dataIndex: "start",
      
    },
    {
      title: "End",
      dataIndex: "end",
      
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <Button onClick={()=> handleEditStatus(record)}>
          {record.Status}
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
    const title = record.title;
    
    if(window.confirm(`Are you sure you want to delete this ${id} ${title}}`)){
      promotionService.deletePromotion(id).then(
        response => {
          if(response.data && response.data.success) {
            alert("Delete success");
            setIsLoad(true);
          }
          
        }, error => {
          console.log(error)
        }
      )     
    }    
  };

  
  const onEditData = (record) => { 

    setPromotionID(record.id)
    setShow(true)
    
  };
    useEffect(()=>{   
      promotionService.getAllPromotion().then(
        response => {
          console.log(response.data)
          if (response.data && response.data.success) {
            setIsLoad(false)          
            
            setPromotions(response.data.data)
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
            <h1>Promotions </h1> 
          </header>
          {!show && (<Button  className='btn btn-success justify-content-end' onClick={handleClickNew}>
            New Promotion
          </Button>)}
          
          <NewPromotion id={promotionID} show={show}/>
          {show ? <></> : 
          <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          title="All Promotion"
          
          >
            <div className="table-responsive">
            
            <Table
              columns={columns}
              dataSource={promotions}
              pagination={true}
              rowKey={(record) => { return record.id}}
              
              bordered
              className="ant-border-space"
            />
          </div>
        </Card>
          }
          
        </div>
        </React.Fragment>
    )
}