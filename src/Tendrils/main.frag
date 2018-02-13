uniform float u_time;
uniform sampler2D u_tex;
varying vec2 vUv;

void main() {
  float bump = 0.001;
  float intensity = 2.0;
  vec4 tex = intensity * texture2D(u_tex, vUv + u_time * bump);

  gl_FragColor = vec4(tex.rgb, .07);
}
