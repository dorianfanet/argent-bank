import { Link } from 'react-router-dom'
import logo from '../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header className="main-nav">
      <Link to='/' className='main-nav-logo'>
        <img src={logo} alt="Argent Bank Logo" className='main-nav-logo-image'/>
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <nav>
        <Link to='/sign-in' className='main-nav-item'>
          <FontAwesomeIcon icon={faCircleUser} />
          Sign In
        </Link>
        <Link to='/profile' className='main-nav-item'>
          <FontAwesomeIcon icon={faCircleUser} />
          Tony
        </Link>
        <Link to='/' className='main-nav-item'>
          <FontAwesomeIcon icon={faSignOut} />
          Sign Out
        </Link>
      </nav>
    </header>
  )
}