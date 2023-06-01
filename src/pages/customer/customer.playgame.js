import React, {useEffect, useState} from 'react'

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
    Select,
    Button
  } from "antd";

import customerService from '../../services/customer.service'
import notification from '../../utils/notification';

export default function CustomerPlayGame (props) {
    const[promotionID, setPromotionID] = useState("");
    const [vouchers, setVouchers] = useState([]);
    const [voucherID, setVoucherID] = useState("")
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucherListId, setVoucherListId] = useState([])
    const voucherListID = [];
    const handleClickSuccess = () => {
        const temp = Math.floor(Math.random()*voucherListId.length)
        const id = voucherListId[temp];
        customerService.postRewardByCustomer(promotionID,id).then(
            response => {
                if(response.data && response.data.success === true) {
                    alert(notification.VOUCHER_SUCCESS)
                    customerService.getVoucherIdByCustomer(id).then(
                        response => {
                            if(response.data && response.data.success === true) {
                                console.log(response.data)
                                const tempvoucher = response.data.data
                                alert(`Voucher: ${tempvoucher.title} Value: ${tempvoucher.value}`)
                                window.location.assign('/customervoucher')
                            }
                        }
                    )
                }
            }
        )
    }
    useEffect(() => {
        if(props.id && props.id != "" && props.show === true) {
            customerService.getPromotionIdByCustomer(props.id).then(
                response => {
                    if(response.data && response.data.success === true) {
                        const temp = response.data.data
                        setPromotionID(temp.id)
                        setVouchers(temp.Details)
                        for(let i = 0; i< temp.Details.length; i++) {
                            if(temp.Details[i].balanceQty>0) {
                                voucherListID.push(temp.Details[i].Voucher.id)
                            }                            
                        }
                        setVoucherListId(voucherListID)
                        setTimeout(()=>{
                            setShowVoucher(true)
                        },10000)
                    }
                }
            )
        }
    },[])

    return (
        <React.Fragment>
            <div className="container">
          <header className="jumbotron">
            <h1>Play game </h1> 
          </header>
          <Card>
            {showVoucher && 
            <Button className='btn btn-success' onClick={handleClickSuccess}>
                Nhận quà
            </Button>}
          </Card>
          </div>
        </React.Fragment>
    )
}