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

const putCustomerByCustomer = ( check, address, name, phoneNumber, lat, long ) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/customer/info`,{
        id: header.getUserId(), check, address, name, phoneNumber, lat, long
    },{ 
        headers: header.authHeader() 
    })
);

const putChangePassByCustomer = ( check, password ) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/customer/password`,{
        id: header.getUserId(), check,  password 
    },{ 
        headers: header.authHeader() 
    })
);

const getAllPromotionByCustomer = (search = "", type = "",  location ="", latest = false) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/promotion?search=${search}&type=${type}&latest=${latest}&location=${location}`,
    { 
        headers: header.authHeader() 
    })
);
const getAllNewPromotionByCustomer = (search = "", type = "",  location ="", latest = true) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/promotion?search=${search}&type=${type}&latest=${latest}&location=${location}`,
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

const postRewardByCustomer = ( promotionID, voucherID,partnerID, customerID = header.getUserId()  ) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/customer/reward`, {
        customerID, promotionID, voucherID, partnerID
    }, { 
        headers: header.authHeader() 
    })
);

const putRewardByCustomer = (email, rewardID,  code, expDate, stores, sender=header.email() ) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/customer/reward`, {
        email, rewardID, sender, code, expDate, stores
    }, { 
        headers: header.authHeader() 
    })
);

const postParticipationByCustomer = ( promotionID  ) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/customer/join`, {
        customerID: header.getUserId(), promotionID
    }, { 
        headers: header.authHeader() 
    })
);

const customerService = {
    getCustomerIdByCustomer,
    getAllPromotionByCustomer,
    getAllNewPromotionByCustomer,
    putCustomerByCustomer,
    getAllPromotionNearByCustomer,
    getAllCategoryByCustomer,
    getAllRewardByCustomer,
    postRewardByCustomer,
    putRewardByCustomer,
    postParticipationByCustomer,
    getPromotionIdByCustomer,
    getVoucherIdByCustomer,
    putChangePassByCustomer
}

export default customerService