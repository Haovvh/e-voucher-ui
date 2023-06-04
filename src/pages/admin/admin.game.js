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
import AdminService from "../../services/admin.service";



export default function AdminGame () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");   
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    

  const [search, setSearch] = useState("");
  
  const columns = [
   
    {
      title: "Title",
      dataIndex: "title",
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
  
  

  const onDeleteData = (record) => {
    
    const id = record.id
    
    
    if(window.confirm(notification.CONFIRM_DELETE)){
      
      AdminService.deleteGameIdByAdmin(id).then(
        response => {
          console.log(response.data)
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

  
  const handleChangeTitle = (event) => (
    setTitle(event.target.value)
  )

 

  const clearScreen = () => {
    setTitle("");    
    setUserId("");
    
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
  const handleClickNew = () => {
    setShow(true)
    clearScreen();
  }

  const handleClickSave = () => { 
    if(title ) {
        if(userId && userId !== "") {
            AdminService.putGameByAdmin(userId,title).then(
                response => {
                    if(response.data && response.data.success === true) {
                        alert(notification.EDIT)
                        setShow(false);
                        setIsLoad(!isLoad)
                        clearScreen();
                    }
                }, error => {
                    alert(notification.ERROR)
                }
            )
        } else {
            AdminService.postGameByAdmin(title).then(
                response => {
                    if(response.data && response.data.success === true) {
                        alert(notification.CREATE)
                        setShow(false);
                        setIsLoad(!isLoad)
                        clearScreen();
                    }
                }, error => {
                    alert(notification.ERROR)
                }
            )
        } 
        
      
    } else {
      alert(notification.INPUT);
    }    
  }
  
  const handleClickClose = () => {
    setShow(false)
    clearScreen();
  }
  const onEditData = (record) => { 
    AdminService.getGameIdByAdmin(record.id).then(
      response => {
        if(response.data && response.data.success) {

          const temp = response.data.data
          setTitle(temp.title)         
          
          setUserId(record.id)
          setShow(true)
          
        }
      }
    )
    
    
  };
    useEffect(()=>{   
      AdminService.getAllGameByAdmin().then(
        response => {
          if (response.data && response.data.success) {
                  
            
            setDatas(response.data.data)
            setTempDatas(response.data.data)
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
            <h1>Game </h1> 
          </header>
          <Card>
          <Row>
              <Col md={2}>
              <Input
                value={search}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                className="header-search"
                placeholder="Type here..."
                prefix={<SearchOutlined />}
              />
              </Col> 
              <Col  md={{ span: 2, offset: 8 }}>
              <Button  className='btn  btn-success  ' onClick={handleClickNew}>
                New Game
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
              dataSource={datas}
              pagination={true}
              onChange={onChange}
              rowKey="id"
              bordered
              className="ant-border-space"
            />
          </div>
        </Card>
          
        <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          
          <Form.Group className="mb-3" >
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Title" 
            value={title}
            required
            onChange={handleChangeTitle} 
            />        
          </Form.Group>          
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