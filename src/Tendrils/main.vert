uniform float u_time;
uniform sampler2D u_tex;
uniform vec3 u_cameraPos;

varying float vDist;
varying vec2 vUv;

void main() {
  vUv = uv;
  // vec4 tex = texture2D(u_tex, uv);
  vec4 tex = texture2D(u_tex, uv);

  // float scrollSpeed = 55.0;
  float speed = 0.06;
  vec4 tex2 = texture2D(u_tex, vec2(tex.r + u_time * speed, tex.b + u_time * speed));

  // vec3 pos = tex2.rgb - vec3(.5, .5, .5);
  vec3 pos = tex2.rgb;

  vDist = length(u_cameraPos - pos) / u_cameraPos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
