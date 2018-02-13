import * as THREE from 'three'
// const TrackballControls = require('three-trackballcontrols')
import { IAppUniforms } from './interfaces'
import Dummy from './Dummy'
import Tendrils from './Tendrils'
import * as Stats from 'stats.js'

const isDev = process.env.NODE_ENV !== 'production'

interface IAppOpts {
  height?: number
  colorA: number
  colorB: number
  visualizeNoise?: boolean
}

/**
 * Main function
 */
function App(opts: IAppOpts): HTMLCanvasElement {
  const scene = new THREE.Scene()
  // scene.fog = new THREE.FogExp2(opts.colorB, 0.0005)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / opts.height || window.innerHeight, 0.1, 500)

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


  const texture = THREE.ImageUtils.loadTexture('public/perlin-rgb.png')
  texture.wrapT = texture.wrapS = THREE.RepeatWrapping

  let uniforms: IAppUniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_tex: { type: 't', value: texture },
    u_seedr: { type: 'f', value: 0.1 },
    u_seedg: { type: 'f', value: 0.1 },
    u_seedb: { type: 'f', value: 0.1 }
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
  const lightB = new THREE.DirectionalLight(opts.colorB, 1)
  lightA.position.set(-80, -80, 60)
  lightB.position.set(80, 80, 60)
  scene.add(lightA)
  scene.add(lightB)

  const tendrils = new Tendrils(uniforms, renderer, opts.visualizeNoise)
  scene.add( tendrils )

  // tendrils.position.set(1, 0, -1)
  // tendrils.scale.set(7, 5, 1)
  // tendrils.rotation.y =  Math.PI

  camera.position.z = 5.5 // 2
  camera.position.x = 3 // 2
  camera.position.y = 0.5 // 0
  // camera.lookAt(new THREE.Vector3(0, 0, 0))
  camera.lookAt(tendrils.position)

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

    // uniforms.u_time.value += 0.000005
    uniforms.u_time.value += 0.005
    tendrils.updateTime(uniforms.u_time.value)
    tendrils.update()

    renderer.render(scene, camera)

    if (isDev) {
      // controls.update()
      stats.end()
    }
  }

  return renderer.domElement
}

export default App
