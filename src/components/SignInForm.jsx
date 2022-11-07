import Input from './Input'
import { useState } from 'react'
import { request } from '../services/request'
import { useNavigate } from 'react-router-dom'

export default function Form({ children, buttonText, onFormSubmit }) {
  const navigateTo = useNavigate();

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
    const body = JSON.stringify({
      email: "steve@rogers.com",
      password: "password456"
    })

    const headers = {
      'Content-Type': 'application/json'
    }

    const response = await request("POST", "http://localhost:3001/api/v1/user/login", headers, body)

    console.log(response)
    if(response.status === 200) {
      navigateTo('/profile')
    }
    if(!data.username.error && !data.password.error && data.username.value.length > 0 && data.password.value.length > 0) {
      console.log(data)
      
    }
  }

  function isRegexValid(inputType, value) {
    const regexTypes = {
      username: /[a-zA-Z][a-zA-Z0-9-_]{2,}/,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    }
    const re = regexTypes[inputType];
    console.log(value)
    return !re.test(value)
  }

  function handleChangeText(e) {
    setData({...data, [e.target.id]: {name: e.target.id, value: e.target.value, error: isRegexValid(e.target.id, e.target.value)}})
    console.log(data)
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