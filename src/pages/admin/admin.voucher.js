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



export default function AdminVoucher () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [datas, setDatas] = useState([]);
    const [tempDatas, setTempDatas] = useState([]);
    

  const [search, setSearch] = useState("");
  
  const columns = [
     
    {
      title: "Title",
      dataIndex: "title",
    },
  
    {
      title: "Description",
      dataIndex: "description"      
    },
    {
        title: "Value",
        dataIndex: "value"      
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
  
  const handleChangeValue = (event) => {
    setValue(event.target.value)
  }
  

  const onDeleteData = (record) => {
    
    const id = record.id
    
    
    if(window.confirm(notification.CONFIRM_DELETE)){
      
      AdminService.deleteVoucherIdByAdmin(id).then(
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

  const handleChangeDescription = (event) => (
    setDescription(event.target.value)
  )

  const clearScreen = () => {
    setTitle("");
    setDescription("");
    setValue("");
    setUserId("");
    
  }
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempdatas = tempDatas.filter(e => e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempdatas.length === 0) {
        const temptempDatas = tempDatas.filter(e => e.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setDatas(temptempDatas);
      } else {
        setDatas(tempdatas)
      }     
      
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
    if(title && description && parseFloat(value) > 0 ) {
        if(userId && userId !== "") {
            AdminService.putVoucherByAdmin(userId,title, description, value).then(
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
            AdminService.postVoucherByAdmin(title, description, value).then(
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
    AdminService.getVoucherIdByAdmin(record.id).then(
      response => {
        if(response.data && response.data.success) {
          console.log(response.data.data)
          const temp = response.data.data
          setTitle(temp.title)
          setDescription(temp.description)
          setValue(temp.value)
          
          setUserId(record.id)
          setShow(true)
          
        }
      }
    )
    
    
  };
    useEffect(()=>{   
      AdminService.getAllVoucherByAdmin().then(
        response => {
          if (response.data && response.data.success) {
                  
            console.log(response.data.data)
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
            <h1>Vouchers </h1> 
          </header>
          <Card>
          <Row>
              <Col md={3}>
              <Input
                value={search}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                className="header-search"
                placeholder="Type here..."
                prefix={<SearchOutlined />}
              />
              </Col> 
              <Col  md={{ span: 2, offset: 7 }}>
              <Button  className='btn  btn-success  ' onClick={handleClickNew}>
                New Voucher
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
          <Modal.Title>Voucher</Modal.Title>
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
          <Form.Group className="mb-3" >
            <Form.Label>Description</Form.Label>
            <Form.Control 
            placeholder="Description" 
            
            value={description}   
            required
            onChange={handleChangeDescription}  
            />        
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Value</Form.Label>
            <Form.Control 
            placeholder="Value" 
            type="number"
            value={value}   
            required
            onChange={handleChangeValue}  
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