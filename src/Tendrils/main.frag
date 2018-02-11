uniform float u_time;
uniform sampler2D u_tex;
varying vec2 vUv;

void main() {
  vec4 tex = texture2D(u_tex, vUv + u_time * 250.);

  gl_FragColor = vec4(tex.rgb * 1.5, .07);
}
