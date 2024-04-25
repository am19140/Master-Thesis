import {getToken, fetchDatawithToken} from '../services/httpClient.js';


const getRooms = async (req, res) => {
  console.log('getrooms');
  const username = 'mariana';
  const password = '532xr]~MpYg|';
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