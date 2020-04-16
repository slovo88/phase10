import React, { useState, useEffect } from 'react'
import { firebase } from '../../../services'
import { Card } from '.'

const database = firebase.database()


function DiscardPile({ setIsDiscardDrawDisabled, onClick }) {

  const [ topOfDiscard, setTopOfDiscard ] = useState({ color: null, value: null })

  useEffect(() => {
    database.ref('game/discardPile').on('value', (snapshot) => {
      const discardPileValue = snapshot.val()
      const topCard = discardPileValue ? discardPileValue[0] : { color: 'black', value: 'X', corners: '' }
  
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
      onClick={onClick}
      card={topOfDiscard}
    />
  )
}

export default DiscardPile