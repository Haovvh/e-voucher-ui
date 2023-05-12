import axios from "axios";

const Login = (email, password, role) => (
   axios.post(`${process.env.REACT_APP_API_URL}/EndUser/Login`, {
        email,
        password,
        role
      })      
);
const Logout = () => (
  localStorage.removeItem("user")  
);

const Signup = (email, address, phone, password) => (
  axios.post(`${process.env.REACT_APP_API_URL}/user/post-user`, {
    email, address, phone, password
  })
);

const GetUser = () => (
   JSON.parse(localStorage.getItem('user'))
);

export default  {
  Login, 
  Logout, 
  Signup, 
  GetUser
}
