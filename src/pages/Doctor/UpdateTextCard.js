import React from 'react'

export default function UpdateTextCard(props) {
  return (
    <p className='absolute right-2' style={{color: "red", fontWeight: 700, fontSize: 17, bottom: "-0.5rem"}}>({props.message})</p>
  )
}
