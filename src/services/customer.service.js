import axios from "axios";
import authHeader from "./header.service";
const getAllCustomer = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/customer`,
    { 
        headers: authHeader() 
    })
);

const getCustomerById = (CustomerId) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/customer/${CustomerId}`,
    { 
        headers: authHeader() 
    })
);
const postCustomer = () => (     
    axios.post(`${process.env.REACT_APP_API_URL}/customer`,{
        //Customer info
    },
    { 
        headers: authHeader() 
    })
);
const putCustomer = () =>(
    axios.put(`${process.env.REACT_APP_API_URL}/customer`,{
        CustomerId
    },{ 
        headers: authHeader() 
    })
);
const deleteCustomer = (CustomerId) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/customer`,{
        CustomerId
    },{ 
        headers: authHeader() 
    })
    
);

export default {
    getAllCustomer,
    getCustomerById,
    postCustomer,
    putCustomer,
    deleteCustomer
}