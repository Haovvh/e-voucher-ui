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
import partnerService from '../../services/partner.service';

export default function PartnerReportDetail(props) {

    const [readOnly, setReadOnly] = useState(false);
    
    const [gameID, setGameID] = useState(0)
    
    const [promotion, setPromotion] = useState({
      title:"",
      description:"",
      start: "",
      end: ""
    })


    const [vouchers, setVouchers] = useState([])    
    
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
        
      },
      {
        title: "Số lượng còn lại",
        dataIndex: "balanceQty",
        
      }
    ];    
   
    const handleChangeEnd = (event) => (
      setPromotion(prevState =>({
        ...prevState, end: event.target.value
      }))
    )

    
    
  useEffect(()=>{   
    if(props.show) {      
      if(props.id) {
        partnerService.getPromotionIdByPartner(props.id).then(
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
                    quantity: option.quantity,
                    balanceQty: option.balanceQty
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
          readOnly={readOnly}
          placeholder="Title" 
          value={promotion.title}
          
        /> 
        </Col>
        <Col>
        <Input 
            readOnly={readOnly}
            placeholder="Description" 
            value={promotion.description}
            
          /> 
        </Col>
        <Col>
        <Input 
            readOnly={readOnly}
            type='date'
            value={promotion.start}    
            
            />    
            
        </Col>
        <Col>
        <Input 
            readOnly={readOnly}
            type='date'
            value={promotion.end}  
            onChange = {(event) =>{handleChangeEnd(event)}}          
            />
        </Col>
        <Col>
        
        <Form.Control
        readOnly={readOnly}
       type="text"
        value={gameID}
        
        >         
      </Form.Control>
        </Col>
      </Row>
    </Container>
    
    
    { vouchers && vouchers.length > 0 &&
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
    }
    </div>
         
    </>
  );
}

