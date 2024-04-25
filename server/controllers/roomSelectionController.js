import {getToken, fetchDatawithToken} from '../services/httpClient.js';


const getRoomsPerFloor = async (req, res) => {
    console.log('getroomsperfloor');
    const username = 'mariana';
    const password = '532xr]~MpYg|';
    const floor = req.query.floor;
    const roomsUrl = `http://leffe.science.uva.nl:8042/rooms?floor=${floor}`;
    const url = 'http://leffe.science.uva.nl:8042/auth/login';

  try {
    const token = await getToken(url, username, password);
    const roomsperfloor = await fetchDatawithToken(roomsUrl, token);
    res.json(roomsperfloor);

  } catch (error) {
    res.status(500).send('Failed to fetch rooms from external API');
  }


};

export default getRoomsPerFloor;