import axios from "axios";
import authHeader from "./header.service";
const getAllPromotion = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/promotion`,
    { 
        headers: authHeader() 
    })
);

const getPromotionById = (PromotionId) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/promotion/${PromotionId}`,
    { 
        headers: authHeader() 
    })
);
const postPromotion = () => (     
    axios.post(`${process.env.REACT_APP_API_URL}/promotion`,{
        //Promotion info
    },
    { 
        headers: authHeader() 
    })
);
const putPromotion = () =>(
    axios.put(`${process.env.REACT_APP_API_URL}/promotion`,{
        PromotionId
    },
    { 
        headers: authHeader() 
    })
);
const deletePromotion = (PromotionId) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/promotion`,{
        PromotionId
    },
    { 
        headers: authHeader() 
    })
    
);

export default {
    getAllPromotion,
    getPromotionById,
    postPromotion,
    putPromotion,
    deletePromotion
}