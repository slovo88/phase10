import React, { useState, useEffect } from 'react'
import { DiscardPile, Card, Hand, DrawPile } from './'
// import { firebase } from '../../../services'


function Round({
  currentHand,
  // userId,
}) {

  // TODO: figure out how to get sorting hand to work - reorder in FB? click and drag?
  // function sortByValue() {
  //   var topUserPostsRef = firebase.database().ref('game/' + userId + '/currentHand').orderByChild('color');

  //   topUserPostsRef.once('value', (snapshot) => console.log(snapshot.val))
  // }

  return (
    <div>
      {/* <OtherPlayers /> */}
      <DrawPile />
      <DiscardPile />

      <Hand>
        {/* move to Hand.js */}
        {currentHand && 
          Object.entries(currentHand).map((card, index) => {
            return (
              <Card 
                card={card[1]}
                key={`card-${index}-${card[1].value}`}
              />
            )
          }
        )}
      </Hand>
    </div>
  )
}

export default Round;
