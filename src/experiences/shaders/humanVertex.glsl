attribute vec3 aOriginPosition;
attribute vec3 aStartPosition;
uniform float uTime;
uniform float uProgress;
varying vec2 vUv;

void main() {
    vec3 pos = mix(aStartPosition, aOriginPosition, uProgress);

    float speed = 2.0;
    float amplitude = 0.005;
    float frequency = 100.0;
    pos.x += amplitude * sin(uTime * speed + aOriginPosition.x * frequency);
    pos.y += amplitude * cos(uTime * speed + aOriginPosition.y * frequency);
    pos.z += amplitude * sin(uTime * speed + aOriginPosition.z * frequency);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 0.03 * 300.0 / -mvPosition.z;

    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
}
