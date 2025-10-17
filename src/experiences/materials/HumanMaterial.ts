import gsap from "gsap";
import { Color, ShaderMaterial } from "three";
import ExperienceManager from "../managers/ExperienceManager";
import humanFragment from "../shaders/humanFragment.glsl";
import humanVertex from "../shaders/humanVertex.glsl";

export default class HumanMaterial extends ShaderMaterial {
    private _timeline: gsap.core.Timeline = gsap.timeline();

    constructor() {
        super({
            vertexShader: humanVertex,
            fragmentShader: humanFragment,
            depthWrite: false,
            transparent: true,
            uniforms: {
                progress: { value: 0 },
                uTime: { value: 0 },
                uColor: { value: new Color(0x3F79F3) },
                uSpawnTime: { value: 2.0 },
                uProgress: { value: 0.0 }
            },
        });
    }

    public buildHumanAnimation(): void {
        this._timeline.clear().to(this.uniforms.uProgress, {
            value: 1.0,
            duration: 10.0,
            ease: "slow",
            onComplete: this._onHumanAnimationComplete,
        });
    }

    private _onHumanAnimationComplete = () => {
        ExperienceManager.GoToNextStep();
    }

    public destroyHumanAnimation(): void {
        this._timeline.clear().to(this.uniforms.uProgress, {
            value: 0.0,
            duration: 4.0,
            ease: "slow",
        });
    }

    public resetHumanAnimation(): void {
        this.uniforms.uProgress.value = 0.0;
    }

    public update(dt: number): void {
        this.uniforms.uTime.value += dt;
    }
}