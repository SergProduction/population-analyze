// @flow

const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  )

type PopulationCanvasParam = {
  width: number,
  height: number,
  node: HTMLElement,
};

type PopulationData = Array<{
  type: string | number,
  position: {
    x: number,
    y: number,
  },
  width: ?number,
  height: ?number,
  path: ?Array<{ x: number, y: number  }>,
  speed: ?{
    value: number,
    direction: 'up' | 'right' | 'down' | 'left'
  },
  see: ?number,
}>;

const defaultCanvasConfig = {
  width: 300,
  height: 300,
}

const getPositionWithSpeed = ({x, y}, speed: number, dir: 'up' | 'right' | 'down' | 'left') => {
  switch(dir) {
    case 'up': {
      return {
        x,
        y: y - speed,
      }
    }
    case 'right': {
      return {
        x: x + speed,
        y,
      }
    }
    case 'down': {
      return {
        x,
        y: y + speed,
      }
    }
    case 'left': {
      return {
        x: x - speed,
        y,
      }
    }
    default : {
      return { x, y }
    }
  }
}

function population(canvasConfig: PopulationCanvasParam = defaultCanvasConfig, data: PopulationData = []) {
  const domCanvas = document.createElement('canvas')
  
  domCanvas.style.border = '1px solid'

  Object.entries({
    width: canvasConfig.width,
    height: canvasConfig.height
  }).forEach(([key, value ]) => {
    domCanvas.setAttribute(key, value)
  })

  canvasConfig.node.appendChild(domCanvas)

  const ctx = domCanvas.getContext('2d')

  const fps = 30

  let state: PopulationData = data


  const draw = () => {
    ctx.clearRect(0, 0, canvasConfig.width, canvasConfig.height)

    state = state.map((it) => {
      if (it.speed) {
        it.position = getPositionWithSpeed(it.position, it.speed.value / fps, it.speed.direction)
      }

      ctx.fillRect(
        Math.floor( it.position.x - it.position.x % 10),
        Math.floor( it.position.y - it.position.y % 10),
        it.width || 10,
        it.height || 10,
      )

      return it
    })
  }

  let gameStop: bool = false;

  const game = () => {
    if (gameStop === true) return
    draw()
    setTimeout(game, 1000 / fps)
  }

  return {
    play: () => { gameStop = false; game() },
    stop: () => { gameStop = true }
  }
}


export default population
