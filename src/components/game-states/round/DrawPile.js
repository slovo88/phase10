import React, { useEffect, useState} from 'react'
import { Card } from '.'
import { firebase } from '../../../services'

function DrawPile({ onClick }) {
  const database = firebase.database()

  const [ drawPileRemaining, setDrawPileRemaining ] = useState(0)

  useEffect(() => {
    database.ref('game/drawPile').on('value', (snapshot) => {
      const drawPile = snapshot.val() || []
  
      setDrawPileRemaining(drawPile.length)
    })

    return function cleanup() {
      database.ref('game/drawPile').off()
    }
  }, [])

  const drawPileCard = { color: 'black draw-pile', value: `Draw Pile (${drawPileRemaining})` }

  return (
    <Card
      card={drawPileCard}
      onClick={onClick}
      className='draw-pile'
    />
  )
}

export default DrawPile