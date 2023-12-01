import { current } from '@reduxjs/toolkit'
import React from 'react'

export default function Profile() {

  return (
    <div>
      <input 
        defaultValue={currentUser.username}
        type='text'
        id='username'
        placeholder='Username'
        className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
      />
      <input 
        defaultValue={currentUser.email}
        type='email'
        id='email'
        placeholder='Email'
        className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
      />
      <input
        type='password'
        id='password'
        placeholder='Password'
        className='bg-slate-100 rounded-lg p-3'
        onChange={handleChange}
      />

      <button 
        className='bg-slate-700
       text-white
       rounded-lg p-3
       uppercase
       hover:opacity-95
       disabled: opacity-80'
      >
        Update
      </button>
    </div>
  )
}
