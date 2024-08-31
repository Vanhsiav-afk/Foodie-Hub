import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useInfiniteScroll = (url = '/recipes') => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${url}?page=${page}`);
      const newRecipes = response.data || [];
      setRecipes(prev => [...prev, ...newRecipes]);
      setHasMore(newRecipes.length > 0);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [page, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.recipe-container');
      if (!container) return;

      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (scrollTop + containerHeight >= scrollHeight - 100 && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };

    const container = document.querySelector('.recipe-container');
    if (container) {
      const debouncedHandleScroll = debounce(handleScroll, 200);
      container.addEventListener('scroll', debouncedHandleScroll);

      return () => {
        container.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [loading, hasMore]);

  return { recipes, loading, error, hasMore };
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export default useInfiniteScroll;
