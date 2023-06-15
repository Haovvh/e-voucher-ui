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
  
  Input,
  Select
} from "antd";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";

import AdminService from "../../services/admin.service";
import AdminViewPromotion from "./admin.viewpromotion";

export default function AdminPromotion () {
    const [promotionID, setPromotionID] = useState("");
    
    
    const [search, setSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [tempPromotions, setTempPromotions] = useState([]); 
    const [viewPromotion, setViewPromotion] = useState(false)
  const columns = [    
    {
      title: "TITLE",
      dataIndex: "title",      
     
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
    },
  
    {
      title: "Game",
      dataIndex: "Game",
      render: (text, record) => (
        <p>{record.Game.title}</p>
       ),    
      
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
      render: (text, record) => {
        if(record.Status === "Pending") {
          return (<Button className="btn btn-success" > 
          {record.Status}
        </Button>)
        } else if (record.Status === "Accepted") {
          return (<Button className="btn btn-primary" > 
          {record.Status}
        </Button>)
        } else if (record.Status === "Rejected"){
          return(<Button className="btn btn-warning" > 
        {record.Status}
      </Button>)}
      }   
      
    },
    {
      title: "Actions",
      key: 'action',      
      render: (record) => {
        return (
          <>
            <EyeOutlined
            style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                onEditData(record);
              }}
            />           
          </>
        );
      },    
  
    }
    
  ];
  

  
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempDataTitle = tempPromotions.filter(e => e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempDataTitle.length === 0) {
        const tempDataStatus = tempPromotions.filter(e => e.Status.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setPromotions(tempDataStatus);
      } else {
        setPromotions(tempDataTitle)
      }     
    }
  }
  const handleChangeSearch = (event) => {    
    
    setSearch(event.target.value)
  }
  
  const onEditData = (record) => {
    setPromotionID(record.id)
    setViewPromotion(true)
    
  };
    useEffect(()=>{   
      
      AdminService.getAllPromotionByAdmin().then(
        response => {
          console.log(response.data)
          if (response.data && response.data.success) {
            setPromotions(response.data.data)
            setTempPromotions(response.data.data)
          }
          
        }, error => {
          console.log(error)
        }
      )
      
      
    },[])
    return(
        <React.Fragment>
        <div className="container">
        {!viewPromotion && (
          <>
          <header className="jumbotron">
            <h1>Promotions </h1> 
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
          </>)}
          <AdminViewPromotion id={promotionID} show={viewPromotion} view={true}/>
          {!viewPromotion &&
          <Card
          bordered={false}
          className="criclebox tablespace mb-24"
                    
          >
            <div className="table-responsive">
            
            <Table
              columns={columns}
              dataSource={promotions}
              pagination={true}
              rowKey="id"              
              bordered
              className="ant-border-space"
            />
          </div>
        </Card> }
       
        </div>
        </React.Fragment>
    )
}