import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { useDispatch } from 'react-redux'
import { setToken, setUserData } from './store/store'
import { request } from './services/request'

function App() {

  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  if(token){
    dispatch(setToken(token))
  }

  async function getUserData() {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
  
    const response = await request("POST", "http://localhost:3001/api/v1/user/profile", headers)
  
    if(response.status === 200){
      dispatch(setUserData({firstName: response.body.firstName, lastName: response.body.lastName}))
    }
  }
  
  getUserData()

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/sign-in' element={<SignIn />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
