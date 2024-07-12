import {getToken, fetchDatawithToken} from '../services/httpClient.js';

export const getRoomsPerFloor = async (req, res) => {
  const username = process.env.USRNAME;
  const password = process.env.PASSWORD;
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

export const getRoomTemp = async (req, res) => {
  const username = process.env.USRNAME;
  const password = process.env.PASSWORD;
  const roomId = req.params.roomId;
  const now = new Date();
  const endTime = now.toISOString();  
  const threeHoursAgo = new Date(now.getTime() - (4 * 60 * 60 * 1000)).toISOString(); // 3 hours ago in ISO 8601
  const getpeginationUrl = `http://leffe.science.uva.nl:8042/rooms/${roomId}/data?startTime=${encodeURIComponent(threeHoursAgo)}&endTime=${encodeURIComponent(endTime)}`;
  const url = 'http://leffe.science.uva.nl:8042/auth/login';

try {
    const token = await getToken(url, username, password);
    if (!token) {
      throw new Error('Authentication failed.');
    }

    // Getting the total number of pages of data
    const getPages = await fetchDatawithToken(getpeginationUrl, token)
    

    if (!getPages || getPages.results.length === 0) {
      res.status(404).json({message: "No data available"});
      return;
    }

    const totalPages = getPages.pagination.totalPages;
    
    for (let page = totalPages; page>0; page--){
      const roomDataUrl = `http://leffe.science.uva.nl:8042/rooms/${roomId}/data?startTime=${encodeURIComponent(threeHoursAgo)}&endTime=${encodeURIComponent(endTime)}&page=${totalPages}`;
      const roomData = await fetchDatawithToken(roomDataUrl, token);
      const temperatureData = roomData.results.reverse().find(entry => entry.temperature !== undefined);
      if (temperatureData) {
        return res.json(Math.round(temperatureData.temperature));
      }
      else {
        const roomDataUrl = `http://leffe.science.uva.nl:8042/rooms/${roomId}/data?startTime=${encodeURIComponent(threeHoursAgo)}&endTime=${encodeURIComponent(endTime)}&page=${totalPages-1}`;
        const roomData = await fetchDatawithToken(roomDataUrl, token);
        const temperatureData = roomData.results.reverse().find(entry => entry.temperature !== undefined);
        return res.json(Math.round(temperatureData.temperature));
      }
    }
      res.status(404).send('No room data available.');
    

} catch (error) {
  res.status(500).send('Failed to fetch rooms from external API');
}


};


