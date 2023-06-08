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
import {  EyeOutlined , SearchOutlined } from "@ant-design/icons";

import partnerService from "../../services/partner.service";
import PartnerReportDetail from "./partner.reportpromotion";

import header from "../../services/header.service";

export default function PartnerReport () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [promotionID, setPromotionID] = useState("");
    const handleClickNew = () => {
      setShow(true)
    }
    const [promotions, setPromotions] = useState([]);
    const [tempPromotions, setTempPromotions] = useState([]);
    const [search, setSearch] = useState("");
    const [readOnly, setReadOnly] = useState(false);
    
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
          return (<Button className="btn btn-success" onClick={()=> handleEditStatus(record)}> 
          {record.Status}
        </Button>)
        } else if (record.Status === "Accepted") {
          return (<Button className="btn btn-primary" onClick={()=> handleEditStatus(record)}> 
          {record.Status}
        </Button>)
        } else {
          (<Button className="btn btn-warning" onClick={()=> handleEditStatus(record)}> 
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
                  onViewData(record);
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
        const tempDataDescription = tempPromotions.filter(e => e.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setPromotions(tempDataDescription);
      } else {
        setPromotions(tempDataTitle)
      }
      
      
    }
  }
  
  const handleEditStatus = (record) => {
    
  } 

  const onDeleteData = (record) => {
    
    const id = record.id
    const title = record.title;
    
    if(window.confirm(`Are you sure you want to delete this ${id} ${title}}`)){
      partnerService.deletePromotion(id).then(
        response => {
          if(response.data && response.data.success) {
            alert("Delete success");
            setIsLoad(!isLoad);
          }
          
        }, error => {
          console.log(error)
        }
      )     
    }    
  };
  const handleChangeSearch = (event) => {    
    
    setSearch(event.target.value)
  }

  
  const onEditData = (record) => { 
    setPromotionID(record.id)
    setShow(true)    
  };
  const onViewData = (record) => { 
    setPromotionID(record.id)
    setShow(true)    
    setReadOnly(true)
  };
    useEffect(()=>{   
      partnerService.getAllPromotionByPartner(header.getUserId()).then(
        response => {
          
          if (response.data && response.data.success) {                 
            setTempPromotions(response.data.data)
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
          {!show && (
          <Card>
          <Row>
              <Col md={6}>
              <Input
                value={search}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                className="header-search"
                placeholder="Type here..."
                prefix={<SearchOutlined />}
              />
              </Col>
              <Col  md={{ span: 3, offset: 15 }}>
              <Button  className='btn btn-success ' onClick={handleClickNew}>
            New
          </Button>
              </Col>
            </Row>
          </Card>)}
          
          
          <PartnerReportDetail id={promotionID} show={show} view={readOnly}/>
          {show ? <></> : 
          <Card
          bordered={false}
          className="criclebox tablespace mb-24"
          
          
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