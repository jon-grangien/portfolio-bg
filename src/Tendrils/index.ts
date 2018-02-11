import * as THREE from 'three'
import { IAppUniforms } from '../interfaces'

class Tendrils extends THREE.Object3D {
  private uniforms: IAppUniforms

  constructor(uniforms: IAppUniforms) {
    super()
    this.uniforms = uniforms
    this.init()
  }

  init() {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      // shading: THREE.FlatShading,
      uniforms: this.uniforms,
      depthTest: false,
      vertexShader: require('./main.vert'),
      fragmentShader: require('./main.frag')
    })

    const geo = new THREE.PlaneBufferGeometry(16, 16, 256, 256)
    this.add(new THREE.Mesh(geo, mat))
  }
}

export default Tendrils
