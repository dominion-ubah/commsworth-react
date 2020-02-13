import React from "react";
import { USER_ID, AUTH_TOKEN } from "./constants"
import { Redirect } from 'react-router-dom'

// const history = 

export const isLogin = () => {
    return !!localStorage.getItem(USER_ID)
}

export const saveuserData = (id, token) => {
    localStorage.setItem(USER_ID, id)
    localStorage.setItem(AUTH_TOKEN, token)
}
export const removeuserData = (id, token) => {
    localStorage.removeItem(USER_ID, id)
    localStorage.removeItem(AUTH_TOKEN, token)
}

export const redirectMapView = () => {
    return (<Redirect to='/'/>)
}
export const redirectLogin = () => {
    return (<Redirect to='/login'/>)
}