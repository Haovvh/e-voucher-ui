import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import {
  Row,
  Col,
  Card,
  Radio,
  Table, 
} from "antd";
import Form from 'react-bootstrap/Form';

import customerService from "../../services/customer.service";
import CustomerPlayGame from "./customer.playgame";

export default function CustomerPromotion () {
    const [promotionID, setPromotionID] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [gameName, setGameName] = useState("");
    const [tempPromotions, setTempPromotions] = useState([]);
    const [isPlayGame, setIsPlayGame] = useState(false)
    const [categories, setCategories] = useState([])
    const [showNew, setShowNew] = useState(false)
    const [partnerID, setPartnerID] = useState("");
    const [categoryId, setCategoryId] = useState("");

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
      title: "Action",
      dataIndex: "Status",
      render: (text, record) => {
         if (record.Status === "Accepted") {
          return <Button className="btn btn-primary" onClick={()=> handleClickJoin(record)}> 
          Tham gia
        </Button>       
        }   
      }
    }
  ];

  const handleClickNew = () => {
    setPromotions(tempPromotions);
  }
  
  const handleChangeSearchTitle = (event) => { 
    setSearchTitle(event.target.value)
  }

  const handleChangeCategory = (event) => {    
    if(event.target.value === "0") {
      setCategoryId("")
    } else {
      setCategoryId(event.target.value)
    }
    
  }
  const handleChangeSearchLocation = (event) => {
    setSearchLocation(event.target.value)
  }

  const handleClickSearch = () => {
    
    customerService.getAllPromotionByCustomer(searchTitle, categoryId, searchLocation).then(
      response => {
        if(response.data && response.data.success === true) {
          const temp = response.data.data
          console.log(temp)
          setShowNew(true)
          setPromotions(temp)
          customerService.getAllNewPromotionByCustomer(searchTitle, categoryId, searchLocation).then(
            response => {
              if(response.data && response.data.success === true) {
                const tempNew = response.data.data
                console.log(tempNew);
                setTempPromotions(tempNew);
              }
            }
          )
          
        }
      }
    )
  }
  
  const handleClickJoin = (record) => {
    setGameName(record.Game.path)
    setPromotionID(record.id)
    setIsPlayGame(true)
    setPartnerID(record.Partner.id)
  } 

    useEffect(()=>{   
      customerService.getCustomerIdByCustomer().then(
        response => {
          if(response.data && response.data.success === true) {
            const temp = response.data.data
            customerService.getAllPromotionNearByCustomer(temp.lat, temp.long).then(
              response => {
                if(response.data && response.data.success === true) {
                  const temp = response.data.data
                  console.log(temp)
                  setPromotions(temp)            
                }
              }
            )
          }
        }
      )
      
      customerService.getAllCategoryByCustomer().then(
        response => {
          if(response.data && response.data.success === true) {
            const temp = response.data.data
            temp.unshift({
              id: 0,
              type: "Vui lòng chọn"
            })
            setCategories(temp)
          }
        }
      )    
      
    },[])
    return(
        <React.Fragment>
          {(isPlayGame && promotionID !== "") ? 
          <CustomerPlayGame game={gameName} show={isPlayGame} id={promotionID} partner={partnerID}/> :
        <div className="container">
          <header className="jumbotron">
            <h1>Promotions </h1> 
          </header>
          <Card>
          <Row>
              <Col md={{ span: 4, offset: 0 }}>   
              <Form.Group  >
                <Form.Control 
                placeholder="Search Title..."
                value={searchTitle}   
                
                onChange={(event) => handleChangeSearchTitle(event)}
                />        
              </Form.Group>             
              
              </Col>              
              <Col md={{ span: 4, offset: 1 }}>
              <Form.Group  >
                <Form.Control 
                placeholder="Search Location..."
                value={searchLocation}   
                
                onChange={handleChangeSearchLocation}
                />        
              </Form.Group>
              
              
              </Col>
              <Col md={{ span: 4, offset: 1 }}>
              <Form.Select 
              value={categoryId}
              onChange={handleChangeCategory}
              aria-label="Default select example">
                {categories && Array.isArray(categories) && categories.map((option) => {
                  return (<option key={option.id} value={option.type}>
                    {option.type}                    
                  </option>)
                })}
                
              </Form.Select>
              
              </Col>
              <Col md={{ span: 2, offset: 1 }}>
              <Button className="btn btn-success" onClick={handleClickSearch}>
                Search
              </Button>
              </Col> 
              {showNew && 
              <Col md={{ span: 2, offset: 1 }}>
              <Button className="btn btn-success" onClick={handleClickNew}>
                Mới nhất
              </Button>
              </Col>
              }
              
              
              
            </Row>
          </Card>
          
          
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
        
        </div>
        }
        </React.Fragment>
    )
}