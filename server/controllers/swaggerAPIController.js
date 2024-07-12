import {getToken, fetchDatawithToken} from '../services/httpClient.js';


const getRooms = async (req, res) => {
  
  const username = process.env.USERNAME;
  console.log('hello',username);
  const password = process.env.PASSWORD;
  const roomsUrl = 'http://leffe.science.uva.nl:8042/rooms/';
  const url = 'http://leffe.science.uva.nl:8042/auth/login';
  
  
  try {
    const token = await getToken(url, username, password);
    const rooms = await fetchDatawithToken(roomsUrl, token);
    
    res.json(rooms);
  } catch (error) {
    res.status(500).send('Failed to fetch rooms from external API');
  }


};

export default getRooms;