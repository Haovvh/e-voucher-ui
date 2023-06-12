import axios from "axios";
import header from "./header.service";

const getAllAdmin = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/admin/account?type=admin`,
    { 
        headers: header.authHeader() 
    })
);

const getAllPromotionByAdminToReport = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/promotion/statistic`,
   { 
       headers: header.authHeader() 
   })
);

const getAdminById = (id) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/admin/find?id=${id}`,
    { 
        headers: header.authHeader() 
    })
);

const putChangePassByAdmin = (check, password) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/admin/password`,{
        id: header.getUserId(), check, password
    },
    { 
        headers: header.authHeader() 
    })
);

const getAllCategoryByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/category`, { 
       headers: header.authHeader() 
   })
);

const getAllStatusByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/status`, { 
       headers: header.authHeader() 
   })
);


const getAllPromotionByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/promotion`, { 
       headers: header.authHeader() 
   })
);
const getPromotionIdByAdmin = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/promotion/${id}`, { 
       headers: header.authHeader() 
   })
);

const putStatusPromotionByAdmin = (id, statusID) => (
    axios.put(`${process.env.REACT_APP_API_URL}/admin/promotion`, {
        id, statusID
    },{ 
        headers: header.authHeader() 
    })
)
const deletePromotionByAdmin = (id) => (
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/promotion/id=${id}`,{ 
       headers: header.authHeader() 
   })
   
);

const getAllAdminByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/account?type=admin`, { 
       headers: header.authHeader() 
   })
);

const getAllPartnerByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/account?type=partner`, { 
       headers: header.authHeader() 
   })
);
const getAllCustomerByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/account?type=customer`, { 
       headers: header.authHeader() 
   })
);

const getPartnerIdByAdmin = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/account/${id}?type=partner`, { 
       headers: header.authHeader() 
   })
);
const getCustomerIdByAdmin = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/account/${id}?type=customer`, { 
       headers: header.authHeader() 
   })
);

const postPartnerByAdmin = (email, password, address, name, categoryID) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/admin/account`,{
        email, password, address, name, categoryID
    },
    { 
        headers: header.authHeader() 
    })
);

const putPartnerByAdmin = (id, password, address, name, categoryID) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/admin/account`,{
        id, password, address, name, categoryID,
        type: 'partner'
    },
    { 
        headers: header.authHeader() 
    })
);
const putCustomerByAdmin = (id, password, address, name, phoneNumber, lat, long) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/admin/account`,{
        id, password, address, name, phoneNumber, lat, long,
        type: 'customer'
    },
    { 
        headers: header.authHeader() 
    })
);

const deletePartnerIdByAdmin = (id) =>(
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/account`,{
        data: {id, type: "partner"}
    },
    { 
        headers: header.authHeader() 
    })
);

const deleteCustomerIdByAdmin = (id) =>(
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/account`,{
        data: {id, type: "customer"}
    },
    { 
        headers: header.authHeader() 
    })
);

const getAllGameByAdmin = (type) => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/feature?type=game`, { 
       headers: header.authHeader() 
   })
);
const getAllVoucherByAdmin = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/feature?type=voucher`, { 
       headers: header.authHeader() 
   })
);

const getGameIdByAdmin = (id) => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/feature/${id}?type=game`, { 
       headers: header.authHeader() 
   })
);
const getVoucherIdByAdmin = (id, type) => (
    axios.get(`${process.env.REACT_APP_API_URL}/admin/feature/${id}?type=voucher`, { 
       headers: header.authHeader() 
   })
);

const postVoucherByAdmin = (title, description, value) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/admin/feature`,{
        title, description, value,
        type: 'voucher'
    },
    { 
        headers: header.authHeader() 
    })
);
const putVoucherByAdmin = (id, title, description, value) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/admin/feature`,{
        id, title, description, value,
        type: 'voucher'
    },
    { 
        headers: header.authHeader() 
    })
);
const postGameByAdmin = (title, path) => (     
    axios.post(`${process.env.REACT_APP_API_URL}/admin/feature`,{
        title, path,
        type: 'game'
    },
    { 
        headers: header.authHeader() 
    })
);
const putGameByAdmin = (id, title, path) =>(
    axios.put(`${process.env.REACT_APP_API_URL}/admin/feature`,{
        id, title, path,
        type: 'game'
    },
    { 
        headers: header.authHeader() 
    })
);
const deleteGameIdByAdmin = (id) =>(
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/feature`,{
        data: {id, type:"game"}
    },
    { 
        headers: header.authHeader() 
    })
);
const deleteVoucherIdByAdmin = (id) =>(
    axios.delete(`${process.env.REACT_APP_API_URL}/admin/feature`,{
        data: {id, type:"voucher"}
    },
    { 
        headers: header.authHeader() 
    })
);


const AdminService = {
    getAllPromotionByAdminToReport,
    getAllAdmin,
    getAdminById,    
    putChangePassByAdmin,
    getAllCategoryByAdmin,
    getAllStatusByAdmin,
    putStatusPromotionByAdmin,
    getCustomerIdByAdmin,    
    deletePromotionByAdmin,
    getAllPromotionByAdmin,
    getAllAdminByAdmin,
    getAllPartnerByAdmin,
    getAllCustomerByAdmin,
    deleteCustomerIdByAdmin,
    getPartnerIdByAdmin,
    postPartnerByAdmin,
    putPartnerByAdmin,
    deletePartnerIdByAdmin,
    getAllGameByAdmin,
    getAllVoucherByAdmin,
    getVoucherIdByAdmin,
    getGameIdByAdmin,
    deleteGameIdByAdmin,
    postVoucherByAdmin,
    putVoucherByAdmin,
    postGameByAdmin,
    putGameByAdmin,
    deleteVoucherIdByAdmin,
    putCustomerByAdmin,
    getPromotionIdByAdmin
}
export default AdminService