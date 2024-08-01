// import axios from 'axios';

// export const GetLocation = async () => {
//     try {
//         const response = await axios.get('https://ipinfo.io/json?token=4906a0b80ea2ff');
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching user location:", error);
//         return null;
//     }
    
// };


import axios from 'axios';
export const GetLocation =async ()=>
{
    const response =await axios.get("https://ipinfo.io/json?token=4906a0b80ea2ff");
    return response.data;
}