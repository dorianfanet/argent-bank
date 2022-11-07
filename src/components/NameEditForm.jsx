import Input from "./Input"
import styled from "styled-components"
import { useState } from "react"

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 6px;
  position: absolute;
  top: 41.9px;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0;
  transition: all 200ms 300ms ease;

  &.show{
    opacity: 1;

    & .button-container{
      pointer-events: all;
    }
  }

  & input{
    background-color: rgb(34, 12, 61) !important;
    color: white;
    width: 200px;
    padding: 0 2px;
    border: 2px solid #5b4676 !important;
    font-size: 2em;
    font-weight: bold;
  }

  & .button-container{
    position: absolute;
    display: flex;
    top: 67px;
    gap: 6px;
    pointer-events: none;

    & button{
      margin: 0;
      width: 100px;

    }
  }
`

export default function NameEditForm({ show }) {

  const initialValues = {
    firstName: 'Tony',
    lastName: 'Jarvis'
  }

  const [inputValues, setInputValues] = useState(initialValues)

  function handleOnChange(e) {
    console.log(e.target.value)
    setInputValues({...inputValues, [e.target.id]: e.target.value})
  }

  function handleSave(e) {
    e.preventDefault()
  }

  function handleCancel(e) {
    e.preventDefault()
  }

  return (
    <Form className={show ? 'show' : ''}>
      <Input
        className='right'
        type='text'
        id='firstName'
        handleOnChange={handleOnChange}
        value={inputValues.firstName}
      />
      <Input
        type='text'
        id='lastName'
        handleOnChange={handleOnChange}
        value={inputValues.lastName}
      />
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Form>
  )
}