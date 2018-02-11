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


  const texture = THREE.ImageUtils.loadTexture('public/perlin-rgb.png')
  texture.wrapT = texture.wrapS = THREE.RepeatWrapping

  let uniforms: IAppUniforms = {
    u_time: { type: 'f', value: 1.0 },
    u_tex: { type: 't', value: texture }
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

  // const dummy = new Dummy(uniforms)
  // scene.add( dummy )

  const tendrils = new Tendrils(uniforms)
  tendrils.position.y = 0
  tendrils.scale.set(5, 5, 5)
  tendrils.rotation.y =  Math.PI
  scene.add( tendrils )

  // dummy.position.y = 20.0
  // dummy.position.x = 125.0
  // dummy.rotation.y = -Math.PI / 8
  // dummy.rotation.x = -Math.PI / 6

  // camera.position.z = 250
  // camera.position.x = 80
  // camera.lookAt(dummy.position)

  camera.setLens(13, 7.49)
  camera.position.z = 20
  camera.position.x = 2
  camera.position.y = 0
  camera.lookAt(new THREE.Vector3(-2, -1, 0))

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

    uniforms.u_time.value += 0.000005
    // dummy.rotation.z += 0.005 

    renderer.render(scene, camera)

    if (isDev) {
      // controls.update()
      stats.end()
    }
  }

  return renderer.domElement
}

export default App
