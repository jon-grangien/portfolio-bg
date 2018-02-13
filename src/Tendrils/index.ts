import * as THREE from 'three'
import { IAppUniforms } from '../interfaces'
import FBOHelper from '../FBOHelper'

class Tendrils extends THREE.Object3D {
  private uniforms: IAppUniforms
  private _fbo: FBOHelper
  private _renderer: any
  private _visualizeNoise: boolean

  constructor(uniforms: IAppUniforms, renderer: any, visualizeNoise: boolean = false) {
    super()
    this.uniforms = uniforms
    this._renderer = renderer
    this._visualizeNoise = visualizeNoise
    this.init()
  }

  init() {
    const textureShader = new THREE.ShaderMaterial({
      vertexShader: require('./noise.vert'),
      fragmentShader: require('./noise.frag')
    })

    this._fbo = new FBOHelper(512, 512, this._renderer, textureShader)
    this._fbo.render()

    // const uniforms2 = {
    //   u_time: this.uniforms.u_time,
    //   // u_tex: { value: this.uniforms.u_tex.value }
    //   u_tex: { value: this._fbo.texture }
    // }

    this.uniforms.u_tex.value = this._fbo.texture

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

    if (this._visualizeNoise) {
      const matForVis = new THREE.MeshBasicMaterial({
        map: this._fbo.texture
      })
      const geoForVis = new THREE.PlaneBufferGeometry(16, 16, 256, 256)
      const mesh = new THREE.Mesh(geoForVis, matForVis)
      mesh.scale.set(0.4, 0.4, 0.4)
      mesh.rotation.y = Math.PI / 6
      this.add(mesh)
    }
  }

  updateTime(time: number): void {
    this.uniforms.u_time.value = time
  }

  update(): void {}
}

export default Tendrils
