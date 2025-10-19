import gsap from "gsap";
import { Mesh } from "three";
import { DomEvent } from "../../constants/doms/DomEvent";
import { AssetId } from "../../constants/experiences/AssetId";
import { ExperienceState } from "../../constants/experiences/ExperienceState";
import { Object3DId } from "../../constants/experiences/Object3DId";
import ExperienceManager from "../../managers/ExperienceManager";
import HowlerManager from "../../managers/HowlerManager";
import BoxMaterial from "../../materials/BoxMaterial";
import MetalMaterial from "../../materials/MetalMaterial";
import Ticker from "../../tools/Ticker";
import ModelBase from "./bases/ModelBase";

export default class BodyModel extends ModelBase {
    private declare _crank: Mesh;
    private declare _scene: Mesh;
    private declare _buttonBottomPart: Mesh;
    private declare _round: number;
    private _timeline: gsap.core.Timeline = gsap.timeline();

    constructor() {
        super(AssetId.GLTF_MODEL, {
            object3DId: Object3DId.BODY,
            isAnimated: false,
            castShadow: true,
            receiveShadow: true,
        });
        window.removeEventListener(DomEvent.MOUSE_WHEEL, this._onMouseWheel);
        this._round = 0;

        ExperienceManager.OnGameCrank.add(this._onGameCrank);
        ExperienceManager.OnPushButton.add(this._onPushButton);
        ExperienceManager.OnRestart.add(this._onRestart);
    }

    protected override _generateModel(): void {
        super._generateModel();

        const boxMaterial = new BoxMaterial();
        const metalMaterial = new MetalMaterial();

        this._model.traverse((child) => {
            if (child instanceof Mesh) {
                if (child.name === Object3DId.BODY) {
                    child.material = boxMaterial;
                } else if (child.name === Object3DId.CRANK) {
                    this._crank = child;
                    child.material = metalMaterial;
                } else if (child.name === Object3DId.SCENE) {
                    this._scene = child;
                    child.material = metalMaterial;
                } else if (child.name === Object3DId.BUTTON_BOTTOM_PART) {
                    this._buttonBottomPart = child;
                    child.material = metalMaterial;
                }
            }
        });
    }

    private _onGameCrank = (): void => {
        window.addEventListener(DomEvent.MOUSE_WHEEL, this._onMouseWheel);
    }

    private _onMouseWheel = (event: WheelEvent): void => {
        if (!this._crank) return;
        if (this._crank.rotation.x < Math.PI * 2 * 5) {
            if (!(this._crank.rotation.x < 0 && event.deltaY < 0)) {
                this._crank.rotation.x += event.deltaY * 0.1 * Ticker.DeltaTime;
            }
            if (this._crank.rotation.x >= Math.PI * 2 * (this._round + 1)) {
                HowlerManager.PlayCrankSound();
                this._round++;
            }
        } else {
            window.removeEventListener(DomEvent.MOUSE_WHEEL, this._onMouseWheel);
            ExperienceManager.GoToNextStep();
        }
    }

    private _onPushButton = (): void => {
        if (!this._buttonBottomPart) return;
        this._timeline.clear().to(this._buttonBottomPart.position, {
            z: this._buttonBottomPart.position.z - 0.025,
            duration: 0.75,
            ease: "back.inOut",
        });
    }

    private _onRestart = (): void => {
        window.removeEventListener(DomEvent.MOUSE_WHEEL, this._onMouseWheel);
        this._crank.rotation.x = 0;
        this._buttonBottomPart.position.z += 0.025;
        this._scene.rotation.y = 0;
        this._round = 0;
    }

    public update(dt: number): void {
        super.update(dt);
        if (ExperienceManager.State === ExperienceState.DANCE) {
            this._crank.rotation.x -= 0.25 * dt;
            this._scene.rotation.y += 0.25 * dt;
        }
    }
}