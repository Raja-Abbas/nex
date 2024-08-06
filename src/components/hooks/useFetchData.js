// src/hooks/useFetchData.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, authToken) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, authToken]);

  return { data, loading, error };
};

export default useFetchData;
