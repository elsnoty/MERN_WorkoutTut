import axios from 'axios';
import React, { useContext } from 'react';
import { WorkoutsContext } from '../context/ContextWorkout';
import DELETEICON from '../assets/icons8-delete.svg'
import { useSnackbar } from 'notistack';

interface WorkoutProps {
  work: {
    _id: string;
    title: string;
    reps: number;
    load: number;
    createdAt: number;
  };
}

const WorkoutDetails: React.FC<WorkoutProps> = ({ work }) => {
  const {dispatch}= useContext(WorkoutsContext)
  const { enqueueSnackbar } = useSnackbar();

  const handelDELworkout = async() =>{
    try {
      const response = await axios.delete(`http://localhost:4000/api/workouts/${work._id}`);
      
      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: work });
      enqueueSnackbar('Workout Deleleted Successfully',{variant: 'success'});
      }
    } catch (error) {
      enqueueSnackbar('Eroor',{variant: 'error'});
      console.error('Failed to delete workout:', error);
    }
  }
  
  return (
    <div className="p-5 bg-white rounded-md border">
      <div className='flex justify-between'>
      <h2 className="text-orange-900 text-xl font-bold font-PT">{work.title}</h2>
      <button className='p-1 rounded-xl bg-gray-200' onClick={handelDELworkout}><img src={DELETEICON} alt="DELETEICON" className='w-6 h-6'/></button>
      </div>
      <p className="font-bold font-poppins">
        Reps: <span className="font-normal">{work.reps}</span>
      </p>
      <p className="font-bold font-poppins">
        Load: <span className="font-normal">{work.load}kg</span>
      </p>
      <p>{new Date(work.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default WorkoutDetails;
