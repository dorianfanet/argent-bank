import NameEditForm from "../components/NameEditForm"
import styled from "styled-components"
import { useState, useRef } from 'react'
import { useEffect } from "react"

const Header = styled.div`
  position: relative;

  & button.edit-button{
    opacity: 1;
    pointer-events: all;

    &.hide{
      opacity: 0;
      pointer-events: none;
    }
  }
`

const Title = styled.h1`

  & div{
    display: flex;
    justify-content: center;
    gap: 14px;

    & span{
      text-align: right;
      transition: all 300ms ease;

      &.align-left{
        text-align: left;
      }
    }
  }

  &.hide{
    
    & div{
      

      & span{
        width: 100%;
      }
    }
  }
`

const Span1 = styled.span`
  width: ${props => props.firstNameWidth};
`

const Span2 = styled.span`
  width: ${props => props.lastNameWidth};
`

export default function Profile() {

  const refSpan1 = useRef(null)
  const refSpan2 = useRef(null)

  const [editNameToggle, setEditNameToggle] = useState(false)

  const [firstNameWidth, setFirstNameWidth] = useState()
  const [lastNameWidth, setLastNameWidth] = useState()

  function handleEditNameClick() {
    if(editNameToggle === false) {
      setEditNameToggle(true)
    } else {
      setEditNameToggle(false)
    }
  }

  useEffect(() => {
    setFirstNameWidth(refSpan1.current.clientWidth + 'px')
    setLastNameWidth(refSpan2.current.clientWidth + 'px')
  }, [])

  return (
    <main className="main bg-dark">
      <Header className="header">
        <NameEditForm
          show={editNameToggle}
        />
        <Title className={editNameToggle ? 'hide' : ''}>
          Welcome back
          <div>
            <Span1 ref={refSpan1} firstNameWidth={firstNameWidth}>Christophe</Span1>
            <Span2 ref={refSpan2} lastNameWidth={lastNameWidth} className="align-left">Jarvis!</Span2>
          </div>
        </Title>
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