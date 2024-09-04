import { useContext } from 'react';
import FormWorkout from '../Components/FormWorkout';
import WorkoutDetails from '../Components/WorkoutDetails';
import useFetchWorkouts from '../Components/CustomFetch';
import { WorkoutsContext } from '../context/ContextWorkout';

const Home = () => {
  const { state: {workouts} } = useContext(WorkoutsContext);
  const { error } = useFetchWorkouts(); 

  return (
    <div className="px-20 py-5 max-sm:px-10 bg-slate-400">
      <div className="w-full h-full flex gap-5 justify-between max-md:flex-col-reverse">
        <div className="flex flex-col gap-y-3 w-full">
          {error && <p className="text-red-500">{error}</p>}
          {workouts?.map((work) => (
            <WorkoutDetails work={work} key={work._id} />
          ))}
        </div>
        <FormWorkout />
      </div>
    </div>
  );
};

export default Home;
