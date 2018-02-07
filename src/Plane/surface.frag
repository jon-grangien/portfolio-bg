uniform float u_time;
varying vec2 vUV;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(0.700,0.700,1.000);

void main() {

	// mix the two colors according to height in mesh
	vec3 color = mix(colorA, colorB, smoothstep(-1.0, 1.0, sin(u_time)));

	// vary colors by uv coords
	color.r = color.r + 0.3 * vUV.x;
	color.g = color.g + 0.1 * vUV.y;

	gl_FragColor = vec4(color,1.0);
}
