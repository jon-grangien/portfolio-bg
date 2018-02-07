import * as THREE from 'three'
// const TrackballControls = require('three-trackballcontrols')
import { IAppUniforms } from './interfaces'
import Plane from './Plane'
import * as Stats from 'stats.js'

const isDev = process.env.NODE_ENV !== 'production'

interface IAppOpts {
  height?: number
  colorA: number
  colorB: number
}

/**
 * Main function
 */
function App(opts: IAppOpts): HTMLCanvasElement {
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xffffff, 0.001, 400)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / opts.height || window.innerHeight, 0.1, 5000)

  window.addEventListener('resize', () => {
    let newWidth
    const newHeight =	window.innerHeight < opts.height ? window.innerHeight : opts.height

    newWidth = window.innerWidth && document.documentElement.clientWidth ?
    Math.min(window.innerWidth, document.documentElement.clientWidth) :
    window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth

    renderer.setSize(newWidth, newHeight)
    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()
  })

  let uniforms: IAppUniforms = {
    u_time: { type: 'f', value: 1.0 }
  }

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, opts.height)
  document.body.appendChild(renderer.domElement)

  // let controls = isDev ? new TrackballControls(camera, renderer.domElement) : undefined

  let stats
  if (isDev) {
    stats = new Stats()
    stats.showPanel(0)
    stats.dom.style.position = 'absolute'
    stats.dom.style.left = '10px'
    stats.dom.style.top = '10px'

    document.body.appendChild(stats.dom)
  }

  // Light
  const lightA = new THREE.DirectionalLight(opts.colorA, 1)
  lightA.position.set(-40, 80, 60)
  scene.add(lightA)
  const lightB = new THREE.DirectionalLight(opts.colorB, 1)
  lightB.position.set(40, -80, 60)
  scene.add(lightB)

  const plane = new Plane(uniforms)
  scene.add( plane )

  // plane.position.y = 20.0
  // plane.position.x = 125.0
  // plane.rotation.y = -Math.PI / 8
  // plane.rotation.x = -Math.PI / 6

  camera.position.z = 250
  camera.position.x = 80
  camera.lookAt(plane.position)

  // renderer.domElement.style.backgroundImage = opts.bgColor || 'linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)'

  animate()

  function animate(): void {
    requestAnimationFrame(() => animate())
    render()
  }

  function render(): void {
    if (isDev) {
      stats.begin()
    }

    uniforms.u_time.value += 0.005
    // plane.rotation.z += 0.005 

    renderer.render(scene, camera)

    if (isDev) {
      // controls.update()
      stats.end()
    }
  }

  return renderer.domElement
}

export default App
