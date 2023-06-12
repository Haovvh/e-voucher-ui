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
import notification from '../../utils/notification';
import partnerService from '../../services/partner.service';

export default function PartnerNewPromotion(props) {

    const [show, setShow] = useState(false);
    const [voucherData, setVoucherData] = useState([])
    const [voucher, setVoucher] = useState({
      id: "",
      title: "",
      description: "",
      value: ""
    });
    const [readOnly, setReadOnly] = useState(false);
    
    const [games, setGames] = useState([]);
    const [gameID, setGameID] = useState(0)
    
    const [quantity, setQuantity] = useState(0)
    
    const [promotion, setPromotion] = useState({
      title:"",
      description:"",
      start: "",
      end: ""
    })
    const [promotionID, setPromotionID] = useState(0);
    const [tempVoucherID, setTempVoucherID] = useState(0)

    const [vouchers, setVouchers] = useState([])
    
    const option = voucherData.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      )
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
        
      },
      {
        title: "Actions",
        key: 'action',      
        render: (record) => {
          if(readOnly === true ) {
            return <></>
          }
          return (
            <>
            <EditOutlined
              onClick={() => {
                onEditData(record);
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

    const onEditData = (record) => {
      const temp = vouchers.filter(e=> e.id === record.id)
      
      if(temp && temp[0]) {
        setTempVoucherID(temp[0].id)
        setVoucher({
          id: temp[0].id,
          title: temp[0].title,
          description:temp[0].description,
          value: temp[0].value
        })
        setQuantity(temp[0].quantity)
        setShow(true)
      }
    }

    const onDeleteVoucher = (record) => {
      
      const id = record.id
      
      if(window.confirm(notification.CONFIRM_DELETE)){
        setVouchers((option) =>
        option.filter((e)=> e.id !== id)
        )
      }
      
    };
    const clearScreen = () => {
      setQuantity("");
      setVoucher({
        id: 0,
        title : "",
        description: "",
        value: ""
      })
    }
    
    const handleClickClose = () => {
      setShow(false)
      clearScreen();
    }
    const clearVoucher = () => {
      setShow(false)  
      setQuantity(0)
            setVoucher({
              id:0,
              description: "",
              title: ""
            })
    }
  

    const handleClickSave = () => {   
      if(voucher.id !== 0 && quantity >0 && voucher.description && voucher.value)  {
        if(voucher.id === tempVoucherID) {
          const tempVouchers = vouchers.filter(option => option.id !== voucher.id)
          setVouchers([...tempVouchers, {
            
            id: voucher.id,
            title: voucher.title,
            description: voucher.description,
            value: voucher.value,
            quantity: quantity
          }])
          clearVoucher();
        } else {        
          const check = vouchers.filter(option => option.id === voucher.id).length
          if (check > 0) {
            alert(notification.VOUCHER_IS_EXIT)
          } else {
            const tempVouchers = vouchers.filter(option => option.id !== tempVoucherID)              
            setVouchers([...tempVouchers, {
              
              id: voucher.id,
              title: voucher.title,
              description: voucher.description,
              value: voucher.value,
              quantity: quantity
            }])
            clearVoucher();
            
          } 
        }       
        
      } else {
        alert(notification.WRONG_INPUT)
      }
    }
    const handleshow = () => {
      setShow(true);
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

      setQuantity(parseInt(event.target.value, 10))
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

    const handleChangeGame = (event) =>{
      console.log(event.target.value)
      setGameID(event.target.value)
    }

    const handleChangeVoucher = (event) => {
      const id = parseInt(event.target.value)
      const temp = voucherData.filter((option) => (
        option.id === id
      ))[0]  
      
      setVoucher(temp)
            
    }
    const handleClickSavePromotion = () =>{
      if(vouchers.length > 0 && promotion.title && promotion.description && promotion.start && promotion.end && gameID !== 0) {
        if(promotion.start < promotion.end) {
          if(promotionID === 0) {
            partnerService.postPromotionByPartner(promotion.title, promotion.description, promotion.start, promotion.end,vouchers, gameID).then(
              response=> {
                if(response.data && response.data.success) {
                  alert(notification.CREATE)
                  window.location.assign('/partnerpromotion')                  
                }
                
              }, error => {
                console.log(error)
              }
            )
          } else {
            partnerService.putPromotionByPartner(promotion.title, promotion.description, promotion.start, promotion.end,vouchers, promotionID, gameID).then(
              response=> {
                if(response.data && response.data.success) {
                  alert(notification.EDIT)
                  window.location.assign('/partnerpromotion')
                  
                }
                
              }, error => {
                console.log(error)
              }
            )
          }
        } else {
          alert(notification.CHECK_FROM_TO)
        }
        
      } else {
        alert(notification.WRONG_INPUT)
      }
      
      
      
    }
  useEffect(()=>{   
    if(props.show) {
      partnerService.getAllVoucherByPartner().then(
        response => {
          if(response.data && response.data.success) {
            
            const tempVouchers = response.data.data;
            tempVouchers.unshift({
              id:0,
              title: "Vui lòng chọn",
              description: '', 
              value: 0
            })
            
            console.log(tempVouchers)
          setVoucherData(tempVouchers)
          console.log(response.data.data)
          }
        }, error => {
          console.log(error)
        }
      )
      partnerService.getAllGameByPartner().then(
        response => {
          if(response.data && response.data.success) {
            console.log(response.data.data)
            const tempGame = response.data.data;
            tempGame.unshift({
              id: 0, 
              title: 'Vui lòng chọn Game'
            })
            setGames(response.data.data)
          }
          
        }, error => {
          console.log(error)
        }
      )
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
                    quantity: option.quantity
                  })
              })
              setReadOnly(props.view)
              setVouchers(tempVouchers);
              const temp = response.data.data
              setPromotionID(temp.id)
              setGameID(temp.Game.id)
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
        {(readOnly=== true) ? <></> : 
        <Button className='btn btn-primary' onClick={handleshow}>
          Add Voucher
        </Button>
        }
        </Col>
        <Col>
        {(readOnly=== true) ? <></> : 
        <Button className='btn btn-success justify-content-end' onClick={handleClickSavePromotion}>
          Save
        </Button>
        }
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
        <Col className='col-2'>
        <label>Start</label>
        </Col>
        <Col className='col-2'>
        <label>End</label>
        </Col>
        <Col className='col-2'>
        <label>Game</label>
        </Col>
      </Row>
      <Row>
        <Col>
        <Input 
          readOnly={readOnly}
          placeholder="Title" 
          value={promotion.title}
          onChange = {(event) =>{handleChangeTitle(event)}}
        /> 
        </Col>
        <Col>
        <Input 
            readOnly={readOnly}
            placeholder="Description" 
            value={promotion.description}
            onChange = {(event) =>{handleChangeDescription(event)}}
          /> 
        </Col>
        <Col className='col-2'>
        <Input 
            readOnly={readOnly}
            type='date'
            value={promotion.start}    
            onChange = {(event) =>{handleChangeStart(event)}}        
            />    
            
        </Col>
        <Col className='col-2'>
        <Input 
            readOnly={readOnly}
            type='date'
            value={promotion.end}  
            onChange = {(event) =>{handleChangeEnd(event)}}          
            />
        </Col>
        <Col className='col-2'>
        
        <Form.Control
        readOnly={readOnly}
        as="select" 
        value={gameID}
        onChange={handleChangeGame}
        >
          
        {games && games.length >0 && games.map(
          (item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            )
          }
        )}
      
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
      

      <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <label>Voucher</label>
        <Form.Control
        as="select" 
        value={voucher.id}
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
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    
    
    </div>
         
    </>
  );
}

