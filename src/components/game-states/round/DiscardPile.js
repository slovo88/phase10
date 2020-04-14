import React, { useState, useEffect } from 'react'
import { firebase } from '../../../services'
import { Card } from '.'


function DiscardPile() {
  const database = firebase.database()

  const [ topOfDiscard, setTopOfDiscard ] = useState({ color: null, value: null })

  useEffect(() => {
    database.ref('game/discardPile').on('value', (snapshot) => {
      const topCard = snapshot.val()[snapshot.val().length - 1]
  
      setTopOfDiscard(topCard)
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