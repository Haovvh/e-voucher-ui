export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('isuser'));
  
    if (user && user.token) {
     
      return { Authorization: `Bearer ${user.accessToken}`,
            id: user.id
    };       
    } else {
      return {};
    }
  }
  