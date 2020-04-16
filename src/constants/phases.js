// Phase 1 – 2 sets of 3
// Phase 2 – 1 set of 3 and 1 run of 4
// Phase 3 – 1 set of 4 and 1 run of 4
// Phase 4 – 1 run of 7
// Phase 5 – 1 run of 8
// Phase 6 – 1 run of 9
// Phase 7 – 2 sets of 4
// Phase 8 – 7 cards of a color
// Phase 9 – 1 set of 5 and 1 set of 2
// Phase 10 – 1 set of 5 and 1 set of 3

export default {
  1: {
    rules: [
      {
        type: 'set',
        number: 3,
        text: 'first set of 3',
      },
      {
        type: 'set',
        number: 3,
        text: 'second set of 3'
      }
    ],
    text: [ '2 sets of 3' ]
  },
  2: {
    rules: [
      {
        type: 'set',
        number: 3,
        text: 'set of 3',
      },
      {
        type: 'run',
        number: 4,
        text: 'run of 4'
      }
    ],
    text: [ '1 set of 3', '1 run of 4' ]
  },
  3: {
    rules: [
      {
        type: 'set',
        number: 4,
        text: 'set of 4',
      },
      {
        type: 'run',
        number: 4,
        text: 'run of 4'
      }
    ],
    text: [ '1 set of 4', '1 run of 4' ]
  },
  4: {
    rules: [
      {
        type: 'run',
        number: 7,
        text: 'run of 7',
      },
    ],
    text: [ '1 run of 7' ]
  },
  5: {
    rules: [
      {
        type: 'run',
        number: 8,
        text: 'run of 8',
      },
    ],
    text: [ '1 run of 8' ]
  },
  6: {
    rules: [
      {
        type: 'run',
        number: 9,
        text: 'run of 9',
      }
    ],
    text: [ '1 run of 9' ]
  },
  7: {
    rules: [
      {
        type: 'set',
        number: 4,
        text: 'first set of 4',
      },
      {
        type: 'set',
        number: 4,
        text: 'second set of 4'
      }
    ],
    text: [ '2 sets of 4' ]
  },
  8: {
    rules: [
      {
        type: 'color',
        number: 7,
        text: '7 cards of one color',
      },
    ],
    text: [ '7 cards of one color' ]
  },
  9: {
    rules: [
      {
        type: 'set',
        number: 5,
        text: 'set of 5',
      },
      {
        type: 'set',
        number: 2,
        text: 'set of 2'
      }
    ],
    text: [ '1 set of 5', '1 set of 2' ]
  },
  10: {
    rules: [
      {
        type: 'set',
        number: 5,
        text: 'set of 5',
      },
      {
        type: 'set',
        number: 3,
        text: 'set of 3'
      }
    ],
    text: [ '1 set of 5', '1 set of 3' ]
  },
}