import axios from "axios";
import header from "./header.service";

const getAllVoucherByPartner = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/voucher`, { 
       headers: header.authHeader() 
   })
);

const getAllGameByPartner = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/game`, { 
       headers: header.authHeader() 
   })
);

const getAllPromotionByPartner = (id = header.getUserId()) => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/promotion?id=${id}`, { 
       headers: header.authHeader() 
   })
);

const getPromotionIdByPartner = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/promotion/${id}`, { 
       headers: header.authHeader() 
   })
);

const postPromotionByPartner = (title, description, start, end, vouchers, gameID  ) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/partner/promotion`,{
        title, description, start, end, vouchers, gameID, partnerID: header.getUserId()
    }, { 
        headers: header.authHeader() 
    })
);
const putPromotionByPartner = (title, description, start, end, vouchers, id, gameID ) => (     
    axios.put(`${process.env.REACT_APP_API_URL}/partner/promotion`,{
        title, description, start, end, vouchers, id , gameID, partnerID : header.getUserId()
    }, { 
        headers: header.authHeader() 
    })
);

const deletePromotion = (id) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/partner/promotion/${id}`,{
        
    },{ 
        headers: header.authHeader() 
    })
    
);

const getAllStoreByPartner = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/store?id=${id}`, { 
       headers: header.authHeader() 
   })
);

const getStoreIdByPartner = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/store/${id}`, { 
       headers: header.authHeader() 
   })
);

const putPartnerByPartner = ( password, address, name) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/partner`,{
         password, address, name,
        id : header.getUserId()
    },
    { 
        headers: header.authHeader() 
    })
);

const postStoreByPartner = (name, address, lat, long) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/partner/store`,{
        name, address, lat, long, partnerID: header.getUserId()
    }, { 
        headers: header.authHeader() 
    })
);
const putStoreByPartner = (name, address, lat, long, id) => (     
    axios.put(`${process.env.REACT_APP_API_URL}/partner/store`,{
        name, address, lat, long, id
    }, { 
        headers: header.authHeader() 
    })
);

const deleteStore = (id) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/partner/store/${id}`,{
        
    },{ 
        headers: header.authHeader() 
    })
    
);

const putRewardByPartner = (id) => (     
    axios.put(`${process.env.REACT_APP_API_URL}/partner/use?id=${id}`,{
        
    }, { 
        headers: header.authHeader() 
    })
);
const getPartnerIdByPartner = (id= header.getUserId()) => (
    axios.get(`${process.env.REACT_APP_API_URL}/partner/get/${id}`,{
       
   },{ 
       headers: header.authHeader() 
   })
   
);


const partnerService = {
    getAllVoucherByPartner,
    getAllGameByPartner,
    getAllPromotionByPartner,
    getPromotionIdByPartner,
    postPromotionByPartner,
    putPromotionByPartner,
    deletePromotion,
    getAllStoreByPartner,
    getStoreIdByPartner,
    postStoreByPartner,
    putStoreByPartner,
    deleteStore,
    putRewardByPartner,
    getPartnerIdByPartner,
    putPartnerByPartner
}
export default partnerService