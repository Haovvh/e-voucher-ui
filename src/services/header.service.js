const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('isuser'));
  
    if (user && user.token) {
     
      return { Authorization: `Bearer ${user.token}`
    };       
    } else {
      return {};
    }
  } 
  
const  getUserId  = () => {
    const userid = JSON.parse(localStorage.getItem('isuser'));

    if (userid && userid.data && userid.data.id) {
      return userid.data.id
    }else {
      return "";
    }
    
  }
  const role = () => {
    const data = JSON.parse(localStorage.getItem('isuser'));
    
    if (data && data.data && data.data.role) {
      return data.data.role
    } else {
      return "";
    }
  }
  const userName = () => {
    const data = JSON.parse(localStorage.getItem('isuser'));
    if (data && data.data && data.data.name) {
      return data.data.name
    } else {
      return "";
    }
  }
  const email = () => {
    const data = JSON.parse(localStorage.getItem('isuser'));
    
    if (data && data.data && data.data.email) {
      return data.data.email
    } else {
      return "";
    }
  }

  const header = {
    authHeader,
    getUserId,
    role,
    userName,
    email
  }

  export default header;
  