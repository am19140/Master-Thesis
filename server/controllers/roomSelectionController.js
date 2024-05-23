import {getToken, fetchDatawithToken} from '../services/httpClient.js';
import FallbackData from '../../client/src/data/MOCK_DATA.json' assert{type:'json'};

const getRoomsPerFloor = async (req, res) => {
    console.log('getroomsperfloor');
    const username = 'mariana';
    const password = '532xr]~MpYg|';
    const floor = req.query.floor;
    const roomsUrl = `http://leffe.science.uva.nl:8042/rooms?floor=${floor}`;
    const url = 'http://leffe.science.uva.nl:8042/auth/login';

  try {
    const token = await getToken(url, username, password);
    if(!token){
      throw new Error('Token retrieval failed');
    }

    const roomsperfloor = await fetchDatawithToken(roomsUrl, token);
    res.json(roomsperfloor);

  } catch (error) {
    console.error('Failed to fetch from external API, attempting to use fallback data.', error);
    if (FallbackData.floors && FallbackData.floors[floor]) {
      const rooms = Object.values(FallbackData.floors[floor].rooms).map(room => ({
          room_number: room.room_number,
          temperature: room.temperature
      }));
      res.json({rooms}); // This assumes your frontend expects an array of rooms
    } else {
        res.status(404).json({message: "No data available for this floor"});
    }
  }


};

export default getRoomsPerFloor;