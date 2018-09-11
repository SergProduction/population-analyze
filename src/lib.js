// @flow
export type CanvasConfig = {
  width: number,
  height: number,
  node: HTMLElement,
}

export type SceneConfig = {
  width: number,
  height: number,
  ceilWidth: number,
  ceilHeight: number,
  zoom: number,
}

export type UnitConfig = {
  x: number,
  y: number,
  color: string,
  params: mixed,
}

export type Coords = {
  x: number,
  y: number,
}

export class Scene {
  map: Array<Array<mixed>>;
  ceilWidth: number;
  ceilHeight: number;

  constructor({
    width = 3,
    height = 3,
    ceilWidth = 10,
    ceilHeight = 10,
    zoom = 1 }: SceneConfig) {

    this.map = Array.from({ length: height }, () => Array.from({ length: width }, () => 0))
    this.ceilWidth = ceilWidth
    this.ceilHeight = ceilHeight
  }

  add(why: mixed, { x, y }: Coords) {
    this.map[y][x] = why
    return why
  }

  move(from: Coords = null, to: Coords = null) {
    const { x: fx, y: fy } = from
    const { x: tx, y: ty } = to
    this.map[ty][tx] = this.map[fy][fx]
    this.map[fy][fx] = 0
  }
}

export class Unit {
  color: number;
  position: Coords;
  params: mixed;

  constructor({ x, y, color, params = {}}: UnitConfig) {
    this.color = color
    this.position = { x, y }
    this.params = params
  }
}


export function createCanvas(canvasConfig: CanvasConfig): CanvasRenderingContext2D {
  const domCanvas = document.createElement('canvas')

  domCanvas.style.border = '1px solid'

  Object.entries({
    width: canvasConfig.width,
    height: canvasConfig.height
  }).forEach(([key, value]) => {
    domCanvas.setAttribute(key, value)
  })

  canvasConfig.node.appendChild(domCanvas)

  const ctx = domCanvas.getContext('2d')

  return ctx
}


export function game(fps: number, ctx: CanvasRenderingContext2D, canvasConfig: CanvasConfig, scene: Scene) {
  let gameStop: bool = false;

  const draw = () => {
    if (gameStop === true) return

    ctx.clearRect(0, 0, canvasConfig.width, canvasConfig.height)

    scene.map.forEach((row, iy) => {
      row.forEach((unit, ix) => {

        ctx.strokeRect(ix * scene.ceilWidth, iy * scene.ceilWidth, scene.ceilWidth, scene.ceilHeight)

        if (unit === 0) return

        ctx.fillStyle = unit.color || '#000'
        ctx.fillRect(
          (ix * scene.ceilWidth),
          (iy * scene.ceilHeight),
          scene.ceilWidth,
          scene.ceilHeight
        )
      })
    })

    setTimeout(draw, 1000 / fps)
  }

  return {
    play: () => { gameStop = false; draw() },
    pause: () => { gameStop = true }
  }
}