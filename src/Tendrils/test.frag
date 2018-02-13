varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

uniform sampler2D u_tex;

void main() {
  vec3 color = texture2D(u_tex, vUv).rgb;
  gl_FragColor = vec4(color, 1.0);
}
