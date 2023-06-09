import React, { useEffect, useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
import AdminService from '../../services/admin.service';

export default function AdminViewPromotion(props) {

    
    const [readOnly, setReadOnly] = useState(false);
    
    
    const [gameID, setGameID] = useState(0)
    const [vouchers, setVouchers] = useState([])
   
    
    const [promotion, setPromotion] = useState({
      title:"",
      description:"",
      start: "",
      end: ""
    })
    

    
    
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
        title: "VALUE",
        dataIndex: "value",
        
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        
      }
      
    ];

  useEffect(()=>{   
    if(props.show) {
      
      
      if(props.id) {
        AdminService.getPromotionIdByAdmin(props.id).then(
          response=>{
            if(response.data && response.data.success && response.data.data) {
                console.log(response.data.data)
                const tempVouchers = [];
                const tempArray = response.data.data.Details
                tempArray.map((option) =>{
                    tempVouchers.push({
                      key: option.Voucher.id,
                      id: option.Voucher.id,
                      title: option.Voucher.title,
                      description: option.Voucher.description,
                      value: option.Voucher.value,
                      quantity: option.quantity
                    })
                })
                setReadOnly(props.view)
                setVouchers(tempVouchers);
                const temp = response.data.data
                
                setGameID(temp.Game.title)
                setPromotion({
                  title: temp.title,
                  description: temp.description,
                  start: temp.start,
                  end: temp.end
                })
              }
            
          }
        )
      }
    }
    
    
    
  },[props.show])

  if(props && !props.show) {
    return (
        <>
        </>
    )
  }

  return (
    <>
    <div> 
    <header className="jumbotron">
            <h1>Details </h1> 
          </header>
    
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
        <Col>
        <label>Game</label>
        </Col>
      </Row>
      <Row>
        <Col>
        <Input 
          readOnly
          placeholder="Title" 
          value={promotion.title}
         
        /> 
        </Col>
        <Col>
        <Input 
            readOnly
            placeholder="Description" 
            value={promotion.description}
            
          /> 
        </Col>
        <Col>
        <Input 
            readOnly
            type='date'
            value={promotion.start}    
           
            />    
            
        </Col>
        <Col>
        <Input 
            readOnly
            type='date'
            value={promotion.end}  
                
            />
        </Col>
        <Col>
        
        <Form.Control
        readOnly
        value={gameID}
        
        >
        
      
      </Form.Control>
        </Col>
      </Row>
    </Container>
    
    
    
    <Card
    bordered={false}
    className="criclebox tablespace mb-24"
    title="Vouchers"
    >
        
        <Table
        columns={columns}
            dataSource={vouchers}
            pagination={true}
            rowKey="id"
            bordered
            className="ant-border-space"
        />
        
    </Card>
    
      
    </div>
         
    </>
  );
}

