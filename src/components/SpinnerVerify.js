import React, { Component } from 'react'
import spinner from '../Images/verify-loading.gif'
import '../styles/SpinnerVerify.css'

export default class SpinnerVerify extends Component {
  render() {
    return (
      <>
        <img src={spinner} alt='Loading...' id='imageID'/>
      </>
    )
  }
}