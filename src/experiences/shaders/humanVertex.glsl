attribute vec3 aOriginPosition;
attribute vec3 aStartPosition;
uniform float uTime;
uniform float uProgress;
uniform vec2 uMouse;
uniform float uMouseRadius;
uniform float uMouseStrength;
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
    vec4 projectedPosition = projectionMatrix * mvPosition;
    vec2 screenPos = projectedPosition.xy / projectedPosition.w;

    float mouseDistance = distance(screenPos, uMouse);

    if (mouseDistance < uMouseRadius) {
        vec2 repulsionDirection = normalize(screenPos - uMouse);
        float repulsionForce = (1.0 - mouseDistance / uMouseRadius) * uMouseStrength * mvPosition.z;

        vec3 worldRepulsion = vec3(repulsionDirection * repulsionForce, 0.0);
        pos += worldRepulsion;

        mvPosition = modelViewMatrix * vec4(pos, 1.0);
    }

    gl_PointSize = 0.03 * 300.0 / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
}
