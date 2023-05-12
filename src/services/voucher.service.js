import axios from "axios";
import authHeader from "./header.service";
const getAllVoucher = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/voucher`,
    { 
        headers: authHeader() 
    })
);

const getVoucherById = (VoucherId) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/voucher/${VoucherId}`,
    { 
        headers: authHeader() 
    })
);
const postVoucher = () => (     
    axios.post(`${process.env.REACT_APP_API_URL}/voucher`,{
        //Voucher info
    },
    { 
        headers: authHeader() 
    })
);
const putVoucher = (VoucherId) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/voucher`,{
        VoucherId
    },
    { 
        headers: authHeader() 
    })
);
const deleteVoucher = (VoucherId) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/voucher`,{
        VoucherId
    },
    { 
        headers: authHeader() 
    })
    
);

export default {
    getAllVoucher,
    getVoucherById,
    postVoucher,
    putVoucher,
    deleteVoucher
}