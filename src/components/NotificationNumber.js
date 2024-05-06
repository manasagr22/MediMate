import React from 'react'

export default function NotificationNumber(props) {
  return (
    <div className='bg-blue-800 min-w-6 min-h-2 justify-center items-center py-0.5 px-2.5 flex relative -right-12' style={{borderRadius: "1.5rem", bottom: "0.1rem"}}>
        <p className='text-white' style={{fontSize: 14, fontWeight: 700}}>{props.countNotification}</p>
    </div>
  )
}
