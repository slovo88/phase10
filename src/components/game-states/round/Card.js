import React from 'react'

function Card({
  card
}) {
  const { color, value } = card
  
  return <div className={`card ${color}`}>{value}</div>
}

export default Card