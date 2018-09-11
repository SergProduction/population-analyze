// @flow
import { Scene, Unit, createCanvas, game } from './lib'

function random(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

const randomColor = (): string => "#"+((1<<24)*Math.random()|0).toString(16)


const domRoot = document.getElementById('root')

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
/*
const bots = Array.from({length: 3}, () => new Unit({
	x: random(0, sceneConfig.width -1),
  y: random(0, sceneConfig.height -1),
  color: randomColor()
}))

const venoms = Array.from({length: 3}, () => new Unit({
	x: random(0, sceneConfig.width -1),
  y: random(0, sceneConfig.height -1),
  color: '#b71616',
}))

[...bots, ...venoms].forEach(bot => {
  scene.add(bot, bot.position)
})
*/

const bots = [
  {x:1, y:2},
  {x:1, y:3},
  {x:1, y:4},
].map((coords) => {
  const bot =  new Unit({ ...coords, color: '#ccc' })
  scene.add(bot, bot.position)
  return bot
})


// -------------- game --------------

const ctx = createCanvas(canvasConfig)

window.game = game(0.1, ctx, canvasConfig, scene)

window.game.play()

window.scene = scene

window.bots = bots