// @flow
import { Scene, Unit, createCanvas, render } from './lib'

function random(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

const randomColor = (): string => "#"+((1<<24)*Math.random()|0).toString(16)


const domRoot = window.document.getElementById('root')

const square = <T>(sourseMatrix: Array<Array<T>> ): Array<Array<T>> => {
  
}

// -------------- confins --------------

const canvasConfig = {
  width: 250,
  height: 250,
  node: domRoot
}

const sceneConfig = {
	width: 10,
  height: 10,
  ceilWidth: canvasConfig.width / 10,
  ceilHeight: canvasConfig.width / 10,
}

// -------------- scene --------------



const scene = new Scene(sceneConfig)


class UnitMotion extends Unit {
  move(key: 'w' | 'a' | 's' | 'd') {
    const newPosition = {x: this.position.x, y: this.position.y}

    switch (key) {
      case 'w': { newPosition.y -= 1; break }
      case 'a': { newPosition.x -= 1; break}
      case 's': { newPosition.y += 1; break }
      case 'd': { newPosition.x += 1; break }
      default: {}
    }

    scene.move(this.position, newPosition)

    this.position = newPosition

    this.params.vision = scene.map[newPosition.y]
  }
}


const venom = [
  {x:1, y:2},
  {x:1, y:3},
  {x:1, y:4},
].map((coords) => {
  const bot =  new Unit({ ...coords, type: 'venom', color: '#191818' })
  scene.add(bot, bot.position)
  return bot
})

const food = [
  {x: random(0, sceneConfig.width), y: random(0, sceneConfig.height)},
  {x: random(0, sceneConfig.width), y: random(0, sceneConfig.height)},
].map((coords) => {
  const bot =  new Unit({ ...coords, type: 'food', color: '#191818' })
  scene.add(bot, bot.position)
  return bot
})


const pers = new UnitMotion({ x: 6, y: 6, color: '#f55' })

scene.add(pers, pers.position)


window.document.addEventListener('keypress', (event) => {
  pers.move(event.key)
})

// -------------- game --------------

const ctx = createCanvas(canvasConfig)

const game = render(1, ctx, canvasConfig, scene)

game.preRender(() => {
  console.log('preRender')
})

game.play()

window.game = game

window.scene = scene

