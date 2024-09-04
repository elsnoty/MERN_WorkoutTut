import { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the shape of the workout state
interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: number;
}

// Define the state and action types
interface WorkoutsState {
  workouts: Workout[] | null;
}

type Action =
  | { type: 'SET_WORKOUTS'; payload: Workout[] }
  | { type: 'CREATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: Workout }

// Create the context with a default value
export const WorkoutsContext = createContext<{
  state: WorkoutsState;
  dispatch: Dispatch<Action>;
}>({
  state: { workouts: null },
  dispatch: () => undefined, // default empty function
});

// Reducer function
export const workoutsReducer = (state: WorkoutsState, action: Action): WorkoutsState => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...(state.workouts || [])],
      };
      case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts?.filter(workout => workout._id !== action.payload._id) || [],
      };
    default:
      return state;
  }
};

// Provider component with typing for children
export const WorkoutsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
