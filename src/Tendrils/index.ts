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
    const min = 0.0007
    const max = 0.0012
    const seedR = THREE.Math.randFloat(min, max)
    const seedG = THREE.Math.randFloat(min, max)
    const seedB = THREE.Math.randFloat(min, max)

    this.uniforms.u_seedr.value = seedR
    this.uniforms.u_seedg.value = seedG
    this.uniforms.u_seedb.value = seedB

    const textureShader = new THREE.ShaderMaterial({
      vertexShader: require('./noise.vert'),
      fragmentShader: require('./noise.frag'),
      uniforms: this.uniforms
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

    const geo = new THREE.PlaneBufferGeometry(16, 16, 512, 512)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.z = Math.PI
    mesh.rotation.y = Math.PI / 4
    mesh.position.x = 1
    mesh.position.y = 1
    this.add(mesh)

    if (this._visualizeNoise) {
      const matForVis = new THREE.MeshBasicMaterial({
        map: this._fbo.texture
      })
      const geoForVis = new THREE.PlaneBufferGeometry(16, 16, 256, 256)
      const visMesh = new THREE.Mesh(geoForVis, matForVis)
      visMesh.scale.set(0.4, 0.4, 0.4)
      visMesh.rotation.y = Math.PI / 6
      visMesh.position.x = -5
      this.add(visMesh)
    }
  }

  updateTime(time: number): void {
    this.uniforms.u_time.value = time
  }

  update(): void {}
}

export default Tendrils
