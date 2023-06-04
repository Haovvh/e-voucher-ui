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
import AdminService from "../../services/admin.service";

export default function AdminReport () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [promotionID, setPromotionID] = useState("");
    const [statusCode, setStatusCode] = useState([{      
    }]);
    
    const [search, setSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [tempPromotions, setTempPromotions] = useState([]);
    const [statusID, setStatusID] = useState("");    
    
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
            <EditOutlined
              onClick={() => {
                onEditData(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteData(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },    
  
    }
    
  ];
  const option =  statusCode.map((option) => {
    return(
      <option key={option.id} value={option.id}>
          {option.state}
      </option>
    )
  })

  const handleClickSave = () => { 
    
    AdminService.putStatusPromotionByAdmin(promotionID, statusID).then(
      response => {
        if(response.data && response.data.success === true) {
          alert(notification.EDIT)
          setShow(false);
          setPromotionID("")
          setStatusID("");
          setIsLoad(!isLoad)
        }
      }
    )
  }
  const handleClickClose = () => { 
    setShow(false)
    setStatusID("")
  }
  const handleChangeStatus = (event) => { 
    setStatusID(event.target.value)
  }
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
  
  const handleEditStatus = (record) => {
    setPromotionID(record.id)
    setShow(true)
    
  } 

  const onDeleteData = (record) => {
    
    const id = record.id
    const title = record.title;
    
    if(window.confirm(notification.CONFIRM_DELETE)){
      AdminService.deletePromotionByAdmin(id).then(
        response => {
          if(response.data && response.data.success) {
            alert(notification.DELETE);
            setIsLoad(!isLoad);
          }
          
        }, error => {
          console.log(error)
        }
      )     
    }    
  };

  
  const onEditData = (record) => { 

    setPromotionID(record.id)
    setShow(true)
    
  };
    useEffect(()=>{   
      AdminService.getAllStatusByAdmin().then(
        response => {
          if(response.data && response.data.success === true) {
            const temp = response.data.data
            temp.unshift({
              id:0,
              state: "Vui lòng chọn trạng thái"
            })
            console.log(temp)
            setStatusCode(temp)
            
          }
        }
      )
      AdminService.getAllPromotionByAdminToReport().then(
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
      
      
    },[isLoad])
    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Promotions </h1> 
          </header>
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
        <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <label>Voucher</label>
        <Form.Control
        as="select" 
        value={statusID}
        onChange={handleChangeStatus}
        >
          {option}
      
      </Form.Control>
                  
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
        </React.Fragment>
    )
}