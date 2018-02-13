uniform float u_time;
uniform sampler2D u_tex;
varying vec2 vUv;
varying float vDist;

void main() {
  float bump = 0.001;
  float intensity = 1.7;
  vec4 tex = intensity * texture2D(u_tex, vUv + u_time * bump);

  float alpha = mix(0.0, 0.1, smoothstep(0.0, 1.0, vDist));
  gl_FragColor = vec4(tex.rgb, alpha);
}
