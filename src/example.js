// @flow
import population from './lib'

const domRoot = document.getElementById('root')

const coll =  population({ width: 300, height: 300, node: domRoot }, [
  {
    type: 'A',
    position: { x: 15, y: 30 },
    speed: {
      value: 1,
      direction: 'right',
    },
  },
  {
    type: 'B',
    position: { x: 75, y: 140 },
    speed: {
      value: 0.25,
      direction: 'right',
    },
  },
  {
    type: 'B',
    position: { x: 75, y: 120 },
    speed: {
      value: 1,
      direction: 'up',
    },
  }
])

coll.play()

console.log( coll )