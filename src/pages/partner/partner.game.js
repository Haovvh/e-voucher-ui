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



export default function PartnerGame () {   
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    

  const [search, setSearch] = useState("");
  
  const columns = [ 
    
    {
      title: "Title",
      dataIndex: "title",
    }, 
    {
      title: "Play Game",
      dataIndex: "path",
      render: (text, record) => {
        if (record.path !== "") {
         return <Button className="btn btn-primary" onClick={()=> handleClickJoin(record)}> 
         Play
       </Button>       
       }   
     }
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
  
  const handleClickJoin = (record) => {
    window.location.assign(`${record.path}`)
  }

  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempdatas = tempDatas.filter(e => e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setDatas(tempdatas)        
      
    }
  }  

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const handleChangeSearch = (event) => {        
    setSearch(event.target.value)
  }
  
  
    useEffect(()=>{   
      partnerService.getAllGameByPartner().then(
        response => {
          if (response.data && response.data.success) {                
            
            setDatas(response.data.data)
            setTempDatas(response.data.data)
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
            <h1>Games </h1> 
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
        
        </div>
        </React.Fragment>
    )
}