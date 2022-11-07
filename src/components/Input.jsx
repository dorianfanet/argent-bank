import styled from "styled-components"
import { useRef, useState } from 'react'
import { useEffect } from "react"

const Container = styled.div`
  position: relative;
  transition: all 200ms ease;

  &.right{

    & input{
      text-align: right;
    }
  }

  & input{
    border: 1.5px solid grey;
    border-radius: 5px;
    transition: all 200ms ease;
    background-color: white;
    z-index: 20;

    &:focus-visible{
      outline: none;
    }
  }

  & span{
    position: absolute;
    bottom: 0px;
    font-size: 12px;
    transition: all 200ms ease;
    opacity: 0;
    z-index: 10;
    color: red;
  }

  &.error{
    padding-bottom: ${props => props.spanHeight};

    & input{
      border: 1.5px solid red;
    }

    & span{
      opacity: 1;
    }
  }
`

export default function Input({ className, labelText, type, id, handleOnChange, errorMessage, value }) {

  const ref = useRef(null)

  const [spanHeight, setSpanHeight] = useState()

  useEffect(() => {
    console.log(ref.current.offsetHeight)
    setSpanHeight(`${ref.current.offsetHeight + 3.5}px`)
  }, [])

  return (
    <Container className={className} spanHeight={spanHeight}>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        id={id}
        onChange={handleOnChange}
        value={value}
      />
      <span ref={ref}>{errorMessage}</span>
    </Container>
  )
}