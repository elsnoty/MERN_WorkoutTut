import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='px-20 py-10 max-sm:px-10'>
      <Link to={'/'} className='font-bold font-mono text-3xl'>
        Workouts
      </Link>
    </div>
  )
}

export default NavBar
