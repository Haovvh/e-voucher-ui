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
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import notification from "../../utils/notification";
import AdminService from "../../services/admin.service";
import ReportDetail from '../report.detail'

export default function AdminReport () {
    const [title, setTitle] = useState("");
    const [search, setSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [tempPromotions, setTempPromotions] = useState([]);
    
    const [totalCustomer, setTotalCustomer] = useState("");
    const [showDetail, setShowDetail] = useState(false)
    const [quantities, setQuantities] = useState([])
    const [balance, setBalance] = useState([])
    const [useVoucher, setUseVoucher] = useState([])
    const [noUseVou, setNoUseVou] = useState([])
    const [searchDateFrom, setSearchDateFrom]= useState("");
    const [searchDateTo, setSearchDateTo]= useState("");
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
      dataIndex: "Status"
      
    },
    {
      title: "Actions",
      key: 'action',      
      render: (record) => {
        return (
          <>
            <EyeOutlined
            style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                onEditData(record);
              }}
            />
          </>
        );
      },    
  
    }
    
  ];
  

  
  const handleKeyDown = (e) => {
    
    if (e.key === 'Enter') {
      const tempDataTitle = tempPromotions.filter(e => e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      if(tempDataTitle.length === 0) {
        const tempDataDescription = tempPromotions.filter(e => e.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        setPromotions(tempDataDescription);
      } else {
        setPromotions(tempDataTitle)
      }     
    }
  }
  const handleChangeSearch = (event) => {    
    
    setSearch(event.target.value)
  }
  
  
  const onEditData = (record) => { 
    console.log(record)
    setTitle(record.title)
    const tempQuan = []
    const tempBalan = [];
    const useVoucher = [];
    const noUseVoucher = [];
    record.Details.map(e=>{
      tempQuan.push({
        label: e.Voucher.title,
        y: e.quantity
      })
      useVoucher.push({
        label: e.Voucher.title,
        y: e.quantity
      })
      tempBalan.push({
        label: e.Voucher.title,
        y: e.balanceQty
      })
      noUseVoucher.push({
        label: e.Voucher.title,
        y: e.balanceQty
      })
    })
    
    let uniqueArr = record.Rewards.reduce((unique, item) => {
      return unique.includes(item.voucherID) ? unique : [...unique, item.voucherID];
    }, []);
    let tempUse = [];
    for(let i = 0; i< uniqueArr.length; i++) {
      let count = 0;
      let title = "";
      for(let j = 0; j < record.Rewards.length ; j++){
        if(record.Rewards[j].voucherID === uniqueArr[i]) {
          title = record.Rewards[j].Voucher;
          if(record.Rewards[j].isUsed === true){
            count++;            
          }
        }          
      }
      tempUse.push({
        label: title,
        y: count
      })
    }
    for(let i = 0; i < useVoucher.length ; i++) {
      useVoucher[i].y=0;
      for(let j = 0; j < tempUse.length; j++) {
        if(useVoucher[i].label === tempUse[j].label) {
          useVoucher[i].y = tempUse[j].y;
        }
      }
    }
    for(let i = 0 ; i< tempBalan.length; i++) {
      noUseVoucher[i].y = tempQuan[i].y- tempBalan[i].y - useVoucher[i].y
    }
    setNoUseVou(noUseVoucher)
    setUseVoucher(useVoucher)   
    setQuantities(tempQuan)
    setBalance(tempBalan);
    setTotalCustomer(record.Participations)
    
    setShowDetail(true);
  };
  const handleClickSearch = () => {
    if(searchDateFrom && searchDateTo) {
      AdminService.getAllPromotionFromToByAdmin(searchDateFrom, searchDateTo).then(
        response =>{
          if(response.data && response.data.success) {
            const temp = response.data.data;
            setPromotions(temp)
            setTempPromotions(temp)
          }
        }
      )
    } else {
      alert(notification.INPUT)
    }
    
  }

  const handleChangeSearchFrom =(event) => {
    
    setSearchDateFrom(event.target.value)
  }
  const handleChangeSearchTo =(event) => {
    setSearchDateTo(event.target.value)
  }


    useEffect(()=>{   
      
      AdminService.getAllPromotionByAdminToReport().then(
        response => {
          if (response.data && response.data.success) {
            const temp = response.data.data
            console.log(temp)
            setPromotions(temp)
            setTempPromotions(temp)
          }
          
        }, error => {
          console.log(error)
        }
      )
      
      
    },[])
    return(
        <React.Fragment>
        <div className="container"> 
        {!showDetail ?  
          <header className="jumbotron">
            <h1>Reports </h1> 
          </header> : 
          <header className="jumbotron">
          <h1>Chiến dịch {title}</h1> 
        </header>
          }
          { showDetail && <Card>
          <ReportDetail customer={totalCustomer} quanti={quantities} use={useVoucher} balan={balance}  noUseVoucher={noUseVou}/>
          </Card>}
          
          {!showDetail  && 
          <>
          
          <Card>
          <Row>
          <Col md={{ span: 4, offset: 0 }}> 
            </Col>
            <Col md={{ span: 4, offset: 1 }}> 
            <label>From</label>
            </Col>
            <Col md={{ span: 4, offset: 1 }}> 
            <label>To</label>
            </Col>
            <Col>
            </Col>

          </Row>
          <Row>
          <Col md={{ span: 4, offset: 0 }}>   
              <Form.Group  >
              
                <Form.Control 
                value={search}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                placeholder="Type here..."               
                
                />        
              </Form.Group>             
              
              </Col>
          <Col md={{ span: 4, offset: 1 }}>   
          
              <Form.Group  >
              
                <Form.Control 
                
                value={searchDateFrom}   
                type='date'
                onChange={(event) => handleChangeSearchFrom(event)}
                />        
              </Form.Group>             
              
              </Col>
              <Col md={{ span: 4, offset: 1 }}>   
          
              <Form.Group  >
              
                <Form.Control 
                
                value={searchDateTo}   
                type='date'
                onChange={(event) => handleChangeSearchTo(event)}
                />        
              </Form.Group>             
              
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
      </>}
        </div>
        </React.Fragment>
    )
}