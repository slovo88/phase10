import React from 'react'
import { Card } from './'

// possibly sort currentHand
// arr.sort((a,b) => a.localeCompare(b))
function Hand({ currentHand, onClick }) {
  return (
    <div className="hand-wrapper">
      {currentHand.map((card, index) => {
        return (
          <Card 
            card={card}
            key={`card-${index}-${card[1].value}`}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}

export default Hand