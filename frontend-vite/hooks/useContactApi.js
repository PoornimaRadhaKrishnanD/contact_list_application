import { useState } from 'react';
import axios from 'axios';

const useContactApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const callApi = async (endpoint, method = 'GET', body = null) => {
    try {
      const response = await axios({
        method,
        url: `http://localhost:8080/${endpoint}`,
        data: body,
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, error, callApi };
};

export default useContactApi;