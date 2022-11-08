import NameEditForm from "../components/NameEditForm"
import styled from "styled-components"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../store/selectors"
import { useNavigate } from "react-router-dom"
import { request } from "../services/request"
import { setUserData } from "../store/store"

const Header = styled.div`
  position: relative;

  & button.edit-button{
    opacity: 1;
    pointer-events: all;

    &.hide{
      opacity: 1;
      pointer-events: none;
    }
  }
`

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  async function getUserData() {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
  
    const response = await request("POST", "http://localhost:3001/api/v1/user/profile", headers)

    console.log(response)
  
    if(response.status === 200){
      setFirstName(response.body.firstName)
      setLastName(response.body.lastName)
      dispatch(setUserData({firstName: response.body.firstName, lastName: response.body.lastName}))
    }
  }

  useEffect(() => {
    if(!token){
      navigate('/sign-in')
    }
    getUserData()
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [editNameToggle, setEditNameToggle] = useState(false)

  function handleEditNameClick() {
    if(editNameToggle === false) {
      setEditNameToggle(true)
    } else {
      setEditNameToggle(false)
    }
  }

  async function handleEditNameSubmit(data) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    const reqBody = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName
    })

    console.log(reqBody)
  
    const response = await request("PUT", "http://localhost:3001/api/v1/user/profile", headers, reqBody)

    console.log(response)

    if(response.status === 200){
      setFirstName(response.body.firstName)
      setLastName(response.body.lastName)
      dispatch(setUserData({firstName: response.body.firstName, lastName: response.body.lastName}))
    }
  }

  function hide() {
    console.log('yes')
    setEditNameToggle(false)
  }

  return token && (
    <main className="main bg-dark">
      <Header className="header">
        <NameEditForm
          show={editNameToggle}
          firstName={firstName}
          lastName={lastName}
          handleSubmit={handleEditNameSubmit}
          hide={hide}
        />
        <h1 className={editNameToggle ? 'hide' : ''}>
          Welcome back <br /> {firstName} {lastName}!
        </h1>
        <button className={`edit-button ${editNameToggle ? 'hide' : ''}`} onClick={handleEditNameClick}>Edit Name</button>
      </Header>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}