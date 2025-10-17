uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float dist = length(gl_PointCoord - 0.5);
  float alpha = 1.0 - smoothstep(0., 0.5, dist);
  gl_FragColor = vec4(uColor, alpha);
}
