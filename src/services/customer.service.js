import axios from "axios";
import header from "./header.service";


const getCustomerIdByCustomer = (id = header.getUserId()) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/get/${id}`,
    { 
        headers: header.authHeader() 
    })
);

const getVoucherIdByCustomer = (id ) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/voucher/${id}`,
    { 
        headers: header.authHeader() 
    })
);

const putCustomerByCustomer = ( password, address, name, phoneNumber, lat, long ) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/customer`,{
        id: header.getUserId(), password, address, name, phoneNumber, lat, long
    },{ 
        headers: header.authHeader() 
    })
);

const getAllPromotionByCustomer = (search = "", type = "", latest = true) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/promotion?search=${search}&type=${type}&latest=${latest}`,
    { 
        headers: header.authHeader() 
    })
);


const getPromotionIdByCustomer = (id) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/promotion/${id}`,
    { 
        headers: header.authHeader() 
    })
);

const getAllPromotionNearByCustomer = ( lat = "", long = "") =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/nearby?lat=${lat}&long=${long}`,
    { 
        headers: header.authHeader() 
    })
);
const getAllPromotionLocationByCustomer = ( search) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/location?search=${search}`,
    { 
        headers: header.authHeader() 
    })
);
const getAllCategoryByCustomer = ( ) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/category`,
    { 
        headers: header.authHeader() 
    })
);
const getAllRewardByCustomer = (id =header.getUserId() ) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/reward?id=${id}`,
    { 
        headers: header.authHeader() 
    })
);

const postRewardByCustomer = ( promotionID, voucherID, customerID = header.getUserId()  ) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/customer/reward`, {
        customerID, promotionID, voucherID
    }, { 
        headers: header.authHeader() 
    })
);
const putRewardByCustomer = (email, rewardID  ) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/customer/reward`, {
        email, rewardID
    }, { 
        headers: header.authHeader() 
    })
);
const postParticipationByCustomer = (customerId, promotionID  ) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/customer/join`, {
        customerId, promotionID
    }, { 
        headers: header.authHeader() 
    })
);


export default {
    getCustomerIdByCustomer,
    getAllPromotionByCustomer,
    putCustomerByCustomer,
    getAllPromotionNearByCustomer,
    getAllPromotionLocationByCustomer,
    getAllCategoryByCustomer,
    getAllRewardByCustomer,
    postRewardByCustomer,
    putRewardByCustomer,
    postParticipationByCustomer,
    getPromotionIdByCustomer,
    getVoucherIdByCustomer
}