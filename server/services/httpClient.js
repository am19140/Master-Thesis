import fetch from 'node-fetch';

const getToken = async (url, username,password) => {
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
        return data.access_token;  
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