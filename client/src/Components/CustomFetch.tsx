import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { WorkoutsContext } from '../context/ContextWorkout';

const useFetchWorkouts = () => {
  const { dispatch } = useContext(WorkoutsContext);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/workouts');
        dispatch({ type: 'SET_WORKOUTS', payload: response.data });
      } catch (error) {
        setError('Failed to fetch workouts');
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return { error };
};

export default useFetchWorkouts;
