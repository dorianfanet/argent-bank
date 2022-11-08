import { createStore } from 'redux' 
import produce from 'immer'

const initialState = {
  token: "",
  userData: {}
}

export const setToken = (token) => ({
  type: 'setToken',
  payload: token
})

export const setUserData = (data) => ({
  type: 'setUserData',
  payload: data
})

export const logOut = () => ({type: 'logOut'})

function reducer(state = initialState, action){
  if(action.type === 'setToken'){
    return produce(state, (draft) => {
      draft.token = action.payload
    })
  }
  if(action.type === 'setUserData'){
    return produce(state, (draft) => {
      draft.userData = action.payload
    })
  }
  if(action.type === 'logOut'){
    return produce(state, (draft) => {
      draft.token = ''
      draft.userData = {}
    })
  }
}

export const store = createStore(reducer)