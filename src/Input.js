import React from 'react'

const Input = ({range,setRange}) => {
  return (
    <frame>
      <input 
      type='text'
      placeholder='set initial time'
      required
      value={range}
      onChange={(e) => setRange(e.target.value)} />

    </frame>
  )
}

export default Input