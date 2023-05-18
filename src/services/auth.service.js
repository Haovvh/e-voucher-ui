import axios from "axios";

const Login = (email, password, role) => (
   axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, {
        email,
        password,
        role
      })      
);
const Logout = () => (
  localStorage.removeItem("user")  
);

const Signup = (email, address, phoneNumber, password, name) => (
  axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
    email, address, phoneNumber, password, name
  })
);

const GetUser = () => (
   JSON.parse(localStorage.getItem('isuser'))
);

export default  {
  Login, 
  Logout, 
  Signup, 
  GetUser
}
