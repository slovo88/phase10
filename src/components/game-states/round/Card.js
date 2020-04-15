import React from 'react'

function Card({
  card,
  onClick,
}) {
  const { color, value, corners } = (card[1] || card)
  
  return (
    <div 
      onClick={onClick ? () => onClick(card) : () => {}} 
      data-card-id={card[0]} 
      className={`card ${color}`}
    >
      <div className="card-value">
        {value}
      </div>
      <div className="card-top-left-value">
        {corners}
      </div>
      <div className="card-bottom-right-value">
        {corners}
      </div>
    </div>
  )
}

export default Card