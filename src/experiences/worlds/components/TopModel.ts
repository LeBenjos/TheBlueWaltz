import gsap from "gsap";
import { Mesh } from "three";
import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
import ExperienceManager from "../../managers/ExperienceManager";
import BoxMaterial from "../../materials/BoxMaterial";
import MetalMaterial from "../../materials/MetalMaterial";
import ModelBase from "./bases/ModelBase";

export default class TopModel extends ModelBase {
    private declare _buttonTopPart: Mesh;
    private _timeline: gsap.core.Timeline = gsap.timeline();

    constructor() {
        super(AssetId.GLTF_MODEL, {
            object3DId: Object3DId.TOP,
            isAnimated: false,
            castShadow: true,
            receiveShadow: true,
        });

        ExperienceManager.OnPushButton.add(this._onPushButton);
        ExperienceManager.OnBegin.add(this._onBegin);
        ExperienceManager.OnEnding.add(this._onEnding);
        ExperienceManager.OnRestart.add(this._onRestart);
    }

    protected override _generateModel(): void {
        super._generateModel();

        const boxMaterial = new BoxMaterial();
        const metalMaterial = new MetalMaterial();

        this._model.traverse((child) => {
            if (child instanceof Mesh) {
                if (child.name === Object3DId.TOP) {
                    child.material = boxMaterial;
                } else if (child.name === Object3DId.BUTTON_TOP_PART) {
                    this._buttonTopPart = child;
                    child.material = metalMaterial;
                } else if (child.name === Object3DId.HINGE) {
                    child.material = metalMaterial;
                }
            }
        });
    }

    private _onPushButton = (): void => {
        if (!this._buttonTopPart) return;
        this._timeline.clear().to(this._buttonTopPart.position, {
            z: this._buttonTopPart.position.z - 0.025,
            duration: 1,
            ease: "power2.inOut",
            onComplete: this._onPushButtonComplete,
        });
    }

    private _onPushButtonComplete = (): void => {
        ExperienceManager.GoToNextStep();
    }

    private _onBegin = (): void => {
        this._timeline.clear().to(this._model.rotation, {
            x: -Math.PI * 0.75,
            duration: 4,
            ease: "back.out",
            onComplete: this._onBeginComplete,
        });
    }

    private _onBeginComplete = (): void => {
        ExperienceManager.GoToNextStep();
    }

    private _onEnding = (): void => {
        this._timeline.clear().to(this._model.rotation, {
            x: 0,
            duration: 1.5,
            ease: "back.in",
            delay: 2,
        });
    }

    private _onRestart = (): void => {
        this._buttonTopPart.position.z += 0.025;
        this._model.rotation.x = 0;
    }

    public update(dt: number): void {
        super.update(dt);
        // this._model.rotation.x -= 0.5 * dt;
    }
}