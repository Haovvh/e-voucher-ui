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
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import notification from "../../utils/notification";
import AdminService from "../../services/admin.service";
import ReportDetail from './admin.reportdetail'

export default function AdminReport () {
    const [show, setShow] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [promotionID, setPromotionID] = useState("");
    const [statusCode, setStatusCode] = useState([]);
    
    const [search, setSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [tempPromotions, setTempPromotions] = useState([]);
    const [statusID, setStatusID] = useState("");    
    const [details, setDetails] = useState([]);
    const [totalCustomer, setTotalCustomer] = useState("");
    const [showDetail, setShowDetail] = useState(false)
    const [quantities, setQuantities] = useState([])
    const [balance, setBalance] = useState([])
    const [useVoucher, setUseVoucher] = useState([])
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
  
  
  const onEditData = (record) => { 
    console.log(record)
    const tempQuan = []
    const tempBalan = [];
    record.Details.map(e=>{
      tempQuan.push({
        label: e.Voucher.title,
        y: e.quantity
      })
      tempBalan.push({
        label: e.Voucher.title,
        y: e.balanceQty
      })
    })
    const test = record.Rewards.filter(e => e.isUsed === true);
    console.log(test)


    console.log(tempQuan)
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
    setUseVoucher(tempUse)
   
    setQuantities(tempQuan)
    setBalance(tempBalan);
    setPromotionID(record.id)
    setTotalCustomer(record.Participations)
    setDetails(record.Details)
    setShowDetail(true);
  };
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
      
      
    },[isLoad])
    return(
        <React.Fragment>
        <div className="container">
          <header className="jumbotron">
            <h1>Reports </h1> 
          </header> 
          { showDetail && <Card>
          <ReportDetail customer={totalCustomer} quanti={quantities} use={useVoucher} balan={balance} />
          </Card>}
          
          {!showDetail  && 
          <>
          
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
      </>}
        </div>
        </React.Fragment>
    )
}