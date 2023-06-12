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
import notification from "../../utils/notification";
import { Button } from 'react-bootstrap';

export default function AdminViewPromotion(props) {

  const [statusCode, setStatusCode] = useState([]);
  const [statusName, setStatusName] = useState("");
    const [readOnly, setReadOnly] = useState(false);
    const [promotionID, setPromotionID] = useState("");
    const [statusID, setStatusID] = useState("");   
    const [gameID, setGameID] = useState(0)
    const [vouchers, setVouchers] = useState([])
    const option =  statusCode.map((option) => {
      return(
        <option key={option.id} value={option.id}>
            {option.state}
        </option>
      )
    })

    const handleClickSave = () => { 
      if(statusID !== "" && statusID !== 1) {
        AdminService.putStatusPromotionByAdmin(promotionID, statusID).then(
          response => {
            if(response.data && response.data.success === true) {
              alert(notification.EDIT)
              window.location.assign('/adminpromotion')
              setPromotionID("")
              setStatusID("");
            }
          }
        )
      } else {
        alert(notification.CHOOSE_STATUS)
      }
    
      
    }
    
    const handleChangeStatus = (event) => { 
      setStatusID(event.target.value)
    }
    
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
        setPromotionID(props.id)
        AdminService.getAllStatusByAdmin().then(
          response => {
            if(response.data && response.data.success === true) {
              const tempStatus = response.data.data
              
              setStatusCode(tempStatus)
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
                      
                      if(temp.Status ) {
                        const tempState =  tempStatus.map((e)=> {
                          if(e.state === temp.Status){
                            setStatusID(e.id)
                          }
                        })         
                      }
                      setStatusName(temp.Status);
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
        )        
      }
    }
  },[props.show])

 
  return (
    <> {props.show && 
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
        <Col className='col-2'>
        <label>Start</label>
        </Col>
        <Col className='col-2'>
        <label>End</label>
        </Col>
        <Col>
        <label className='col-2'>Game</label>
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
        <Col className='col-2'>
        <Input 
            readOnly
            type='date'
            value={promotion.start}    
           
            />    
            
        </Col>
        <Col className='col-2'>
        <Input 
            readOnly
            type='date'
            value={promotion.end}  
                
            />
        </Col>
        <Col className='col-2'>
        
        <Form.Control
        readOnly
        value={gameID}
        
        >
        
      
      </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col className='col-2'>
        <label>Status</label>
        
        </Col>
        <Col>
        
        
        </Col>
      </Row>
      <Row>
        {statusID === 2 ? 
        (<Col className='col-2'>
        <Form.Control
        readOnly
        value={statusName}
        
        >
      </Form.Control>
        </Col>)
        :
        (<Col className='col-2'>
        <Form.Control
        as="select"
        value={statusID}
        onChange={handleChangeStatus}
        >
          {option}
      
      </Form.Control>
        </Col>) }
        {statusID !== 2 && 
        <Col>
        <Button onClick={handleClickSave}>
          Save Status
        </Button>
        </Col>
        }
        
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
       }  
    </>
  );
}

