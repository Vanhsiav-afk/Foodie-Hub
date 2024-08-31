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
      const { recipes: newRecipes } = response.data;
      console.log('Fetched Recipes:', newRecipes); 


      if (Array.isArray(newRecipes)) {
        setRecipes(prev => {

          const recipeMap = new Map(prev.map(recipe => [recipe.id, recipe]));


          newRecipes.forEach(recipe => {
            recipeMap.set(recipe.id, recipe);
          });

         
          return Array.from(recipeMap.values());
        });
        setHasMore(newRecipes.length > 0);
      } else {
        throw new Error('Invalid response format');
      }
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

      if (scrollTop + containerHeight >= scrollHeight  && !loading && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    };

    const container = document.querySelector('.recipe-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading, hasMore]);

  return { recipes, loading, error, hasMore };
};

export default useInfiniteScroll;
