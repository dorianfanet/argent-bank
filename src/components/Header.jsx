import { Link } from 'react-router-dom'
import logo from '../assets/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUserData } from '../store/selectors'
import { logOut } from '../store/store'

export default function Header() {
  const token = useSelector(selectToken)
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch()

  function handleLogOut() {
    dispatch(logOut())
    localStorage.removeItem('token')
  }

  return (
    <header className="main-nav">
      <Link to='/' className='main-nav-logo'>
        <img src={logo} alt="Argent Bank Logo" className='main-nav-logo-image'/>
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <nav>
        {token ? (
          <>
           <Link to='/profile' className='main-nav-item'>
              <FontAwesomeIcon icon={faCircleUser} />
              {userData.firstName}
            </Link>
            <Link to='/' className='main-nav-item' onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOut} />
              Sign Out
            </Link>
          </>
        ) : (
          <Link to='/sign-in' className='main-nav-item'>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </Link>
        )}
      </nav>
    </header>
  )
}