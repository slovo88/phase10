import React, { useState, useEffect } from 'react'
import { firebase } from '../../../services'
import { Card } from '.'


function DiscardPile({ setIsDiscardDrawDisabled }) {
  const database = firebase.database()

  const [ topOfDiscard, setTopOfDiscard ] = useState({ color: null, value: null })

  useEffect(() => {
    database.ref('game/discardPile').on('value', (snapshot) => {
      const discardPileValue = snapshot.val()
      const topCard = discardPileValue ? discardPileValue[discardPileValue.length - 1] : { color: 'black', value: '🚫' }
  
      setTopOfDiscard(topCard)
      
      if (topCard.value === 'S' || !discardPileValue) {
        setIsDiscardDrawDisabled(true)
      } else {
        setIsDiscardDrawDisabled(false)
      }
    })

    return function cleanup() {
      database.ref('game/discardPile').off()
    }
  }, [])

  return (
    <Card 
      card={topOfDiscard}
    />
  )
}

export default DiscardPile