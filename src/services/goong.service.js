import axios from "axios";
import goongkey from "../utils/goongapikey";

const getAddress = (address) => (
    axios.get(`https://rsapi.goong.io/geocode?address=${address}&api_key=${goongkey.API_KEY_GOONG}`)
)
const goongService = {
    getAddress
}

export default goongService;