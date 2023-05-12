import axios from "axios";
import authHeader from "./header.service";
const getAllPartner = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/partner`,
    { 
        headers: authHeader() 
    })
);

const getPartnerById = (PartnerId) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/partner/${PartnerId}`,
    { 
        headers: authHeader() 
    })
);
const postPartner = () => (     
    axios.post(`${process.env.REACT_APP_API_URL}/partner`,{
        //Partner info
    },
    { 
        headers: authHeader() 
    })
);
const putPartner = () =>(
    axios.put(`${process.env.REACT_APP_API_URL}/partner`,{
        PartnerId
    },
    { 
        headers: authHeader() 
    })
);
const deletePartner = (PartnerId) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/partner`,{
        PartnerId
    },
    { 
        headers: authHeader() 
    })
    
);

export default {
    getAllPartner,
    getPartnerById,
    postPartner,
    putPartner,
    deletePartner
}