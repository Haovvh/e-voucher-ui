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
import VoucherService from '../../services/voucher.service'
import promotionService from '../../services/promotion.service';
import gameService from '../../services/game.service';


export default function NewPromotion(props) {

    const [show, setShow] = useState(false);
    const [voucherData, setVoucherData] = useState([])
    const [voucher, setVoucher] = useState({
      key: 0,
      id: 0,
      title: "Vui lòng chọn voucher",
      description: "",
      value: ""
    });
    
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
          return (
            <>
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
      
      const id = record.id

      const title = record.title;
      
      if(window.confirm(`Are you sure you want to delete this ${id} ${title}}`)){
        setVouchers((option) =>
        option.filter((e)=> e.id !== id)
        )
      }
      
    };
    
    const handleClickClose = () => {
      setShow(false)
    }
  

    const handleClickSave = () => {   
      if(voucher.id !== 0 && quantity >0 && voucher.description && voucher.value)  {
        const check = vouchers.filter(option => option.id === voucher.id).length
        if (check > 0) {
          alert("Voucher đã tồn tại trong promotion")
        } else {
          setShow(false)    
          setVouchers([...vouchers, {
            
            id: voucher.id,
            title: voucher.title,
            description: voucher.description,
            value: voucher.value,
            quantity: quantity
          }])
          setQuantity(0)
          setVoucher({
            id:0,
            description: "",
            title: ""
          })
        }        
        
      } else {
        alert("Vui lòng chọn voucher và số lượng")
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
      setQuantity(event.target.value)
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
            promotionService.postPromotion(promotion.title, promotion.description, promotion.start, promotion.end,vouchers, gameID).then(
              response=> {
                if(response.data && response.data.success) {
                  alert("Create Success")
                  window.location.assign('/promotion')
                  
                }
                
              }, error => {
                console.log(error)
              }
            )
          } else {
            promotionService.putPromotion(promotion.title, promotion.description, promotion.start, promotion.end,vouchers, promotionID, gameID).then(
              response=> {
                if(response.data && response.data.success) {
                  alert("Update Success")
                  window.location.assign('/promotion')
                  
                }
                
              }, error => {
                console.log(error)
              }
            )
          }
        } else {
          alert("Start < End")
        }
        
      } else {
        alert("Vui lòng nhập đủ thông tin")
      }
      
      
      
    }
  useEffect(()=>{   
    if(props.show) {

      VoucherService.getAllVoucher().then(
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
      gameService.getAllGame().then(
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
        promotionService.getPromotionById(props.id).then(
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
    
    <Container>
      <Row>
        <Col>
        <Button className='btn btn-primary' onClick={handleshow}>
          Add Voucher
        </Button>
        </Col>
        <Col>
        <Button className='btn btn-success justify-content-end' onClick={handleClickSavePromotion}>
          Save
        </Button>
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
          placeholder="Title" 
          value={promotion.title}
          onChange = {(event) =>{handleChangeTitle(event)}}
        /> 
        </Col>
        <Col>
        <Input 
            placeholder="Description" 
            value={promotion.description}
            onChange = {(event) =>{handleChangeDescription(event)}}
          /> 
        </Col>
        <Col>
        <Input 
            placeholder="Value" 
            type='date'
            value={promotion.start}    
            onChange = {(event) =>{handleChangeStart(event)}}        
            />    
            
        </Col>
        <Col>
        <Input 
            placeholder="Value" 
            type='date'
            value={promotion.end}  
            onChange = {(event) =>{handleChangeEnd(event)}}          
            />
        </Col>
        <Col>
        
        <Form.Control
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
    title="Voucher Table"
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
          <Modal.Title>Add Voucher</Modal.Title>
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

