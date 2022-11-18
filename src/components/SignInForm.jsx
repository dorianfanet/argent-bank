import Input from './Input'
import { useState } from 'react'
import { request } from '../services/request'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../store/store'
import styled from 'styled-components'

const ErrorMessage = styled.p`
  text-align: left;
  color: red;
`

export default function Form({ buttonText }) {
  const navigateTo = useNavigate();
  const dispatch = useDispatch()

  const initialState = {
    username: {
      name: 'username',
      value: '',
      error: false
    },
    password: {
      name: 'password',
      value: '',
      error: false
    },
    remember: false
  }

  const [data, setData] = useState(initialState)
  const [logInError, setLogInError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setData(
      {
        ...data,
        [data.username.name]: {
          name: data.username.name,
          value: data.username.value, 
          error: isRegexValid(data.username.name, data.username.value)
        },
        [data.password.name]: {
          name: data.password.name,
          value: data.password.value, 
          error: isRegexValid(data.password.name, data.password.value)
        }
      }
    )
    if(!data.username.error && !data.password.error && data.username.value.length > 0 && data.password.value.length > 0) {
      const body = JSON.stringify({
        email: data.username.value,
        password: data.password.value
      })
  
      const headers = {
        'Content-Type': 'application/json'
      }
  
      const response = await request("POST", "http://localhost:3001/api/v1/user/login", headers, body)
  
      if(response.status === 200) {
        dispatch(setToken(response.body.token))
        navigateTo('/profile')
        if(data.remember){
          localStorage.setItem('token', response.body.token)
        }
      }
      if(response.status === 400) {
        setLogInError(true)
      }
    }
  }

  function isRegexValid(inputType, value) {
    const regexTypes = {
      username: /[a-zA-Z][a-zA-Z0-9-_]{2,}/,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/
    }
    const re = regexTypes[inputType];
      return !re.test(value)
  }

  function handleChangeText(e) {
    setData({...data, [e.target.id]: {name: e.target.id, value: e.target.value, error: isRegexValid(e.target.id, e.target.value)}})
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className={`input-wrapper ${data.username.error ? 'error' : ''}`}
        labelText={'Username'}
        type={'text'}
        id={'username'}
        handleOnChange={handleChangeText}
        errorMessage='Your username should be at least 2 characters long'
      />
      <Input
        className={`input-wrapper  ${data.password.error ? 'error' : ''}`}
        labelText={'Password'}
        type={'password'}
        id={'password'}
        handleOnChange={handleChangeText}
        errorMessage='Your password should at least contain 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
      />
      {logInError && (
        <ErrorMessage>Email/password are not correct</ErrorMessage>
      )}
      <Input
        className={'input-remember'}
        labelText={'Remember me'}
        type={'checkbox'}
        id={'remember-me'}
        handleOnChange={(e) => setData({...data, remember: e.target.checked})}
      />
      <button className="sign-in-button">{buttonText}</button>
    </form>
  )
}