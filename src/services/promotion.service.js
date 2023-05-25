import axios from "axios";
import authHeader from "./header.service";


const getAllPromotion = (id=1) => (
     axios.get(`${process.env.REACT_APP_API_URL}/partner/promotion?id=${id}`, { 
        headers: authHeader() 
    })
);

const getPromotionById = (id) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/partner/promotion/${id}`, { 
        headers: authHeader() 
    })
);
const postPromotion = (title, description, start, end, vouchers, gameID = 1, partnerID = 1) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/partner/promotion`,{
        title, description, start, end, vouchers, gameID, partnerID
    }, { 
        headers: authHeader() 
    })
);
const putPromotion = (title, description, start, end, vouchers, id, gameID=1, partnerID =1) => (     
    axios.put(`${process.env.REACT_APP_API_URL}/partner/promotion`,{
        title, description, start, end, vouchers, id , gameID, partnerID
    }, { 
        headers: authHeader() 
    })
);

const deletePromotion = (id) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/partner/promotion/${id}`,{
        
    },{ 
        headers: authHeader() 
    })
    
);

const promotionService = {
    getAllPromotion,
    getPromotionById,
    postPromotion,
    putPromotion,
    deletePromotion
}
export default promotionService