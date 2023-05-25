import axios from "axios";
import authHeader from "./header.service";
const getAllPartner = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/admin/account?type=partner`,
    { 
        headers: authHeader() 
    })
);

const getPartnerById = (id) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/admin/account/${id}`,
    { 
        headers: authHeader() 
    })
);
const postPartner = (email, password, address, name) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/admin/account`,{
        email, password, address, name
    },
    { 
        headers: authHeader() 
    })
);
const putPartner = (id, password, address, name) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/partner`,{
        id, password, address, name
    },
    { 
        headers: authHeader() 
    })
);
const deletePartnerById = (id, type) =>(
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/account`,{
        data: {id, type}
    },
    { 
        headers: authHeader() 
    })
);

const partnerService = {
    getAllPartner,
    getPartnerById,
    postPartner,
    putPartner,
    deletePartnerById
}
export default partnerService