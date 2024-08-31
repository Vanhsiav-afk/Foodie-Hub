import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useFetchRecipes = (url = '/recipes') => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({}); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (cache.current[url]) {
        setRecipes(cache.current[url]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url);
        cache.current[url] = response.data; 
        setRecipes(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { recipes, loading, error };
};

export default useFetchRecipes;
