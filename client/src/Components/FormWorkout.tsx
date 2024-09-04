import axios from 'axios';
import { useContext, useState } from 'react';
import { WorkoutsContext } from '../context/ContextWorkout';
import { useSnackbar } from 'notistack';

const FormWorkout = () => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(WorkoutsContext);

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const workout = { title, reps, load };

    try {
      const response = await axios.post('http://localhost:4000/api/workouts', workout, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setTitle('');
        setLoad('');
        setReps('');
        setError(null);
        setEmptyFields([]);
        enqueueSnackbar('Workout Imported Successfully',{variant: 'success'});
        dispatch({ type: 'CREATE_WORKOUT', payload: response.data });
      } else {
        setError('Failed to add workout');
      }
    } catch (error: any) {
      enqueueSnackbar('Error',{variant: 'error'});
      setError(error.response?.data?.error || 'Something went wrong');
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <form onSubmit={SubmitForm} className="bg-transparent flex flex-col gap-y-1 w-[600px] max-md:w-full h-fit rounded-md">
      <label className="font-semibold">Add a New Workout:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={`p-3 outline-none rounded-md border-2 ${emptyFields.includes('title') ? 'border-red-600' : 'border-black'} focus:border-[3px] focus:border-black`}
        placeholder="Workout Title"
      />

      <label className="font-semibold">Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={`p-3 outline-none rounded-md border-2 ${emptyFields.includes('reps') ? 'border-red-600' : 'border-black'} focus:border-[3px] focus:border-black`}
        placeholder="Reps"
      />

      <label className="font-semibold">Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={`p-3 outline-none rounded-md border-2 ${emptyFields.includes('load') ? 'border-red-600' : 'border-black'} focus:border-[3px] focus:border-black`}
        placeholder="Load in kg"
      />
      
      <button className="p-3 bg-black text-white mt-2 rounded-md">Add Workout</button>
      
      {error && <div className="rounded-md border border-red-600 bg-red-300 p-3">{error}</div>}
    </form>
  );
};

export default FormWorkout;
