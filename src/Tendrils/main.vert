uniform float u_time;
uniform sampler2D u_tex;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 tex = texture2D(u_tex, uv);

  float scrollSpeed = 55.;
  vec4 tex2 = texture2D(u_tex, vec2(tex.r + u_time * scrollSpeed, tex.b + (u_time * scrollSpeed * 1.234)));

  vec3 pos = tex2.rgb - vec3(.5, .5, .5);
  pos.z /= 10.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
