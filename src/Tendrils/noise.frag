varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

uniform float u_seedr;
uniform float u_seedg;
uniform float u_seedb;

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
// 

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  float test = 0.008;
  float r = 23.87 * snoise(vUv * test + 0.001);
  float g = 13.65 * snoise(vUv * test - 0.001);
  float b = 80.0 * snoise(vUv * test + 0.001);

  // Frequencies
  r += 0.5 * snoise(vUv * 4.0);
  r += 0.125 * snoise(vUv * 8.0);
  // r += 0.625 * snoise(vUv * 16.0);
  g += 0.5 * snoise(vUv * 6.0);
  g += 0.125 * snoise(vUv * 12.0);
  // g += 0.625 * snoise(vUv * 16.0);
  b += 0.5 * snoise(vUv * 2.0);
  b += 0.125 * snoise(vUv * 4.0);
  // b += 0.625 * snoise(vUv * 16.0);

  // noise += 0.5 * snoise(vUv * 20.0);
  // noise += 0.25 * snoise(vUv * 40.0);
  // noise += 0.125 * snoise(vUv * 80.0);

  // vec3 colorA = vec3(1.0, 0.0, 0.0);
  // vec3 colorB = vec3(0.0, 0.0, 1.0);
  // vec3 color = mix(colorA, colorB, smoothstep(0.0, 1.0, noise));

  // Don't truncate noise values below or beyond 0/1
  vec3 color = vec3(r, g, b);
  // color = mix(vec3(0.0, 0.0, 1.0), color, smoothstep(-0.01, 0.0, color.b));

  gl_FragColor = vec4(color, 1.0);
}
