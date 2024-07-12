import fetch from 'node-fetch';

let cachedToken = null;
let tokenExpiry = null;

const getToken = async (url, username,password) => {
    
  const now = new Date();

  if (cachedToken && tokenExpiry && tokenExpiry > now) {
    return cachedToken;
  }

  try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error during login! Status: ${response.status}`);
        }
        const data = await response.json();
        cachedToken = data.access_token;
        // 1 hour
        tokenExpiry = new Date(now.getTime() + 3600 * 1000);
        return cachedToken;
         
      } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
      }
};

const fetchDatawithToken = async (url, token) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
    
  
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorBody = await response.json(); 
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorBody}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data with JWT:', error);
      throw error;
    }
  };


export{getToken, fetchDatawithToken};