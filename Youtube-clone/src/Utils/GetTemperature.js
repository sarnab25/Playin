import axios from "axios";
import { GetLocation } from "./GetLocation";
export const GetTemperature= async()=>
{
    const location =await GetLocation();
const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=5c2c9dbfb56766cbcce712658a1ace40`)
return response.data;

}