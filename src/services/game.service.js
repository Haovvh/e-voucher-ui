import axios from "axios";
import authHeader from "./header.service";
const getAllGame = () => (
     axios.get(`${process.env.REACT_APP_API_URL}/game`,
    { 
        headers: authHeader() 
    })
);

const getGameById = (gameId) =>(
    axios.get(`${process.env.REACT_APP_API_URL}/game/${gameId}`,
    { 
        headers: authHeader() 
    })
);
const postGame = () => (     
    axios.post(`${process.env.REACT_APP_API_URL}/game`,{
        //game info
    },
    { 
        headers: authHeader() 
    })
);
const putGame = () =>(
    axios.put(`${process.env.REACT_APP_API_URL}/game`,{
        gameId
    },
    { 
        headers: authHeader() 
    })
);
const deleteGame = (gameId) => (
     axios.delete(`${process.env.REACT_APP_API_URL}/game`,{
        gameId
    },
    { 
        headers: authHeader() 
    })
    
);

export default {
    getAllGame,
    getGameById,
    postGame,
    putGame,
    deleteGame
}