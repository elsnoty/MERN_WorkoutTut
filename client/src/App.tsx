import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NavBar from './Components/NavBar'
function App() {

  return (
    <div className=''>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
