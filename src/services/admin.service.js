import axios from "axios";
import authHeader from "./header.service";
const getAllAdmin = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/admin/account?type=admin`,
    { 
        headers: authHeader() 
    })
);

const getAdminById = (id) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/admin/find?id=${id}`,
    { 
        headers: authHeader() 
    })
);
const postAdmin = (email, password, address, name) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/admin/create`,{
        email, password, address, name
    },
    { 
        headers: authHeader() 
    })
);
const putAdmin = (id, password, address, name) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/Admin`,{
        id, password, address, name
    },
    { 
        headers: authHeader() 
    })
);
const deleteAdminById = (id, type) =>(
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/delete`,{
        data: {id, type}
    },
    { 
        headers: authHeader() 
    })
);

const AdminService = {
    getAllAdmin,
    getAdminById,
    postAdmin,
    putAdmin,
    deleteAdminById
}
export default AdminService