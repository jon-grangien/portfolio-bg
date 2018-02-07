import * as THREE from 'three'
import { IAppUniforms } from '../interfaces'

class Plane extends THREE.Object3D {
  private uniforms: IAppUniforms

  constructor(uniforms: IAppUniforms) {
    super()
    this.uniforms = uniforms
    this.init()
  }

  init() {
    const planeGeo = new THREE.PlaneGeometry( 256, 256, 128, 128 )
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      // wireframe: true,
      vertexShader: require('./surface.vert'),
      fragmentShader: require('./surface.frag'),
      side: THREE.DoubleSide,
        defines: {
          USE_MAP: ''
        }
      })

    const mesh = new THREE.Mesh( planeGeo, material )

    // mesh.geometry.dynamic = true

    this.add(mesh)
  }

  rand(min: number, max: number): number {
    if (max === null) {
        max = min
        min = 0
    }

    return min + (Math.random() * (max - min + 1))
  }

}

export default Plane
