import gsap from "gsap";
import { Object3D } from "three";
import DebugManager from "../../managers/DebugManager";
import ExperienceManager from "../../managers/ExperienceManager";
import HowlerManager from "../../managers/HowlerManager";
import ActorBase from "./bases/ActorBase";
import BodyModel from "./BodyModel";
import HumanModel from "./HumanModel";
import TopModel from "./TopModel";

export default class MusicalBox extends ActorBase {
    private _actors: ActorBase[] = [];
    private _boxContainer: Object3D;
    private _timeline: gsap.core.Timeline = gsap.timeline();

    constructor() {
        super();
        this._actors = [];

        this._boxContainer = new Object3D();
        this._boxContainer.rotation.y = -Math.PI;
        this._boxContainer.position.y = -1.5;
        this._boxContainer.scale.set(0.5, 0.5, 0.5);
        this.add(this._boxContainer);

        this._generateModel();

        if (DebugManager.IsActive) {
            const musicalBoxFolder = DebugManager.Gui.addFolder("Musical Box");
            musicalBoxFolder.add(this.position, "x", -1, 1, 0.01).name("positionX");
            musicalBoxFolder.add(this.position, "y", -1, 1, 0.01).name("positionY");
            musicalBoxFolder.add(this.position, "z", -1, 1, 0.01).name("positionZ");
        }

        ExperienceManager.OnIntroduction.add(this._onIntroduction);
        ExperienceManager.OnEnding.add(this._onEnding);
        ExperienceManager.OnRestart.add(this._onRestart);
    }

    private _generateModel(): void {
        const box = new BodyModel();
        const human = new HumanModel();
        const top = new TopModel();
        this._actors.push(box);
        this._actors.push(human);
        this._actors.push(top);
        this.add(human);
        this._boxContainer.add(box, top);
    }

    private _onIntroduction = (): void => {
        this._timeline.clear().to(this._boxContainer.rotation, {
            y: Math.PI * 2,
            duration: 2,
            ease: "circ.out",
        });
        this._timeline.to(this._boxContainer.position, {
            y: 0,
            duration: 2,
            ease: "circ.out",
        }, "<");
        this._timeline.to(this._boxContainer.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 2,
            ease: "ease.inOut",
            onComplete: this._onIntroductionComplete,
        }, "<");
    }

    private _onIntroductionComplete = (): void => {
        ExperienceManager.GoToNextStep();
    }

    private _onEnding = (): void => {
        this._timeline.clear().to(this._boxContainer.rotation, {
            y: -Math.PI,
            duration: 1.75,
            delay: 2,
            ease: "back.out(0.75)",
            onStart: this._onEndingStart,
        });
        this._timeline.to(this._boxContainer.position, {
            y: -1.5,
            duration: 2,
            ease: "circ.out",
        }, "<");
        this._timeline.to(this._boxContainer.scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 2,
            ease: "ease.inOut",
            onComplete: this._onEndingComplete,
        }, "<");
    }

    private _onEndingStart = (): void => {
        HowlerManager.PlayChestSpawnSound();
    }

    private _onEndingComplete = (): void => {
        ExperienceManager.GoToNextStep();
    }

    private _onRestart = (): void => {
        this._boxContainer.rotation.y = -Math.PI;
        this._boxContainer.position.y = -1.5;
        this._boxContainer.scale.set(0.5, 0.5, 0.5);
    }

    public update(dt: number): void {
        super.update(dt);
        for (const actor of this._actors) { actor.update(dt); }
    }
}