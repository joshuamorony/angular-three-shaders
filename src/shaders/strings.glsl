precision highp float;

#define PI 3.14159

uniform float time;
uniform float onG;
uniform float onD;
uniform float onA;
uniform float onE;

uniform vec2 rectPosition;
uniform vec2 rectSize;

void main()
{
    vec2 pos = (gl_FragCoord.xy - rectPosition) / rectSize;
    pos = pos * 2.0 - 1.0;

    vec3 backgroundColor = vec3(0.082, 0.078, 0.122);

    float segmentWidth = 2.0 / 4.0;
    int segment = int(clamp((pos.x + 1.0) / segmentWidth, 0.0, 4.0 - 1.0));
    pos.x = mod(pos.x + 1.0, segmentWidth) / segmentWidth * 2.0 - 1.0;

    vec3 colour = vec3(0.0);
    float x = 2.0 * PI * pos.y;
    float val = 0.0;
    float amplitude = 0.05;
    float frequency = 1.8 * PI;
    float phase = 40.0 * time;
    float on = 0.0;
    vec3 waveColour = vec3(0.0);

    if (segment == 0) {
        on = onG;
        waveColour = vec3(0.847, 0.341, 0.388);
    } else if (segment == 1) {
        on = onD;
        waveColour = vec3(0.6, 0.896, 0.314);
    } else if (segment == 2) {
        on = onA;
        waveColour = vec3(0.875, 0.443, 0.149);
    } else if (segment == 3) {
        on = onE;
        waveColour = vec3(0.388, 0.608, 1.0);
    }

    if (on > 0.5) {
        val = (amplitude * (1.0 / float(segment + 1))) * sin(frequency * x + phase);
    }

    float delta = abs(val - pos.x);

    float thickness = 0.08 / (float(segment) + 1.0);
    float edge0 = thickness * 0.5;
    float edge1 = thickness;
    float intensity = smoothstep(edge1, edge0, delta); // Smooth step for smoother edges
    vec3 finalColor = mix(backgroundColor, waveColour, intensity);

    gl_FragColor = vec4(finalColor, 1.0);
}
