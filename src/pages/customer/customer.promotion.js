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
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import notification from "../../utils/notification";
import customerService from "../../services/customer.service";
import goongService from "../../services/goong.service";
import CustomerPlayGame from "./customer.playgame";

export default function CustomerPromotion () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [promotionID, setPromotionID] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [search, setSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [tempPromotions, setTempPromotions] = useState([]);
    const [isPlayGame, setIsPlayGame] = useState(false)
    
    const [searchBySelect, setSearchBySelect] = useState("");
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

  const handleChangeSearchBySelect = (event) => {    
    setSearchBySelect(event.target.value)
  }
  const handleChangeSearchLocation = () => {
    
  }

  const handleClickSearch = () => {
    switch(searchBySelect) {
      case "title":
        alert("title")
        break;

      case "category":
        alert("category")
        break;
      case "location":
        alert("location")
        break;
      
      case "nearby":
        alert("nearby")
        break;
    }
  }
  
  const handleClickJoin = (record) => {
    setPromotionID(record.id)
    setIsPlayGame(true)
    
  } 

    useEffect(()=>{   
      customerService.getAllPromotionByCustomer().then(
        response => {
          if(response.data && response.data.success === true) {
            const temp = response.data.data
            setPromotions(temp)            
          }
        }
      )      
      
    },[isLoad])
    return(
        <React.Fragment>
          {(isPlayGame && promotionID !== "") ? <CustomerPlayGame show={isPlayGame} id={promotionID}/> :
        <div className="container">
          <header className="jumbotron">
            <h1>Promotions </h1> 
          </header>
          <Card>
          <Row>
              <Col md={{ span: 4, offset: 0 }}>                
              <Input
                value={searchTitle}
                onChange={handleChangeSearch}
                className="header-search"
                placeholder="Search Title..."
                prefix={<SearchOutlined />}
              />
              </Col>              
              <Col md={{ span: 4, offset: 1 }}>
              <Input
                value={searchLocation}
                onChange={handleChangeSearchLocation}
                onKeyDown={handleKeyDown}
                className="header-search"
                placeholder="Search Location..."
                prefix={<SearchOutlined />}
              />
              
              </Col>
              <Col md={{ span: 4, offset: 1 }}>
              <Form.Select 
              onChange={handleChangeSearchBySelect}
              aria-label="Default select example">
                <option>Category</option>
                <option value="title">Title</option>
                <option value="location">Location</option>
                <option value="category">Category</option>
                <option value="nearby">Near by</option>
              </Form.Select>
              
              </Col>
              <Col md={{ span: 2, offset: 1 }}>
              <Button className="btn btn-success" onClick={handleClickSearch}>
                Search
              </Button>
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