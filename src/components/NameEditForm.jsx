import Input from "./Input"
import styled from "styled-components"
import { useEffect, useState } from "react"

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 41px;
  background-color: #12002b;
  pointer-events: none;
  transition: all 200ms ease;

  &.show{
    opacity: 1;
    pointer-events: all;
  }

  & input{
    background-color: rgb(34, 12, 61) !important;
    color: white;
    width: 200px;
    padding: 0 10px;
    border: 2px solid #5b4676 !important;
    font-size: 2em;
    font-weight: bold;
  }

  & div.input-container{
    display: flex;
    gap: 10px;
  }

  & div.button-container{
    display: flex;
    gap: 10px;

    & button{
      margin: 0;
      width: 100px;

    }
  }
`

export default function NameEditForm({ show, firstName, lastName, handleSubmit, hide }) {
  useEffect(() => {
    setInputValues({
      firstName: firstName,
      lastName: lastName
    })
  }, [firstName, lastName])

  const [inputValues, setInputValues] = useState({})

  function handleOnChangeFirst(e) {
    setInputValues({...inputValues, firstName: e.target.value})
  }
  function handleOnChangeLast(e) {
    setInputValues({...inputValues, lastName: e.target.value})
  }

  function handleSave(e) {
    e.preventDefault()
    handleSubmit({
      firstName: inputValues.firstName,
      lastName: inputValues.lastName
    })
    hide()
  }

  function handleCancel(e) {
    e.preventDefault()
    hide()
  }

  return (
    <Form className={show ? 'show' : ''}>
      <div className="input-container">
        <Input
          className='right'
          type='text'
          id='firstName'
          handleOnChange={handleOnChangeFirst}
          value={inputValues.firstName ? inputValues.firstName : firstName}
        />
        <Input
          type='text'
          id='lastName'
          handleOnChange={handleOnChangeLast}
          value={inputValues.lastName ? inputValues.lastName : lastName}
        />
      </div>
      <div className="button-container">
        <button type="submit" onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Form>
  )
}