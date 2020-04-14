import React from 'react'
import { Card } from './'

function Hand({ currentHand, onClick }) {
  return (
    <div style={{display: 'flex', flexWrap: "wrap", justifyContent: "center"}}>
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