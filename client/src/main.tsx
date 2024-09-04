import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WorkoutsContextProvider } from './context/ContextWorkout.tsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkoutsContextProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
  </WorkoutsContextProvider>
  </StrictMode>
)
