import React from 'react'

function Card({
  card,
  onClick,
}) {
  const { color, value } = (card[1] || card)
  
  return (
    <div 
      onClick={onClick} 
      data-card-id={card[0]} 
      className={`card ${color}`}
    >
      {value}
    </div>
  )
}

export default Card