import React, { useState, useEffect } from 'react'
import { firebase } from '../../../services'
import { Card } from '.'


function DiscardPile({ isTopOfDiscardSkip, setIsTopOfDiscardSkip }) {
  const database = firebase.database()

  const [ topOfDiscard, setTopOfDiscard ] = useState({ color: null, value: null })

  useEffect(() => {
    database.ref('game/discardPile').on('value', (snapshot) => {
      const topCard = snapshot.val() ? snapshot.val()[snapshot.val().length - 1] : { color: 'black', value: 'empty' }
  
      setTopOfDiscard(topCard)

      console.log(topCard)

      if (topCard.value === 'S') {
        setIsTopOfDiscardSkip(true)
      } else if (isTopOfDiscardSkip) {
        setIsTopOfDiscardSkip(false)
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