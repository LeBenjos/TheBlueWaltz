import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { CameraId } from "../constants/experiences/CameraId";
import DebugManager from "../managers/DebugManager";
import ExperienceManager from "../managers/ExperienceManager";
import CameraControllerBase, { type ICameraOption } from "./bases/CameraControllerBase";

export default class MainCameraController extends CameraControllerBase {
    private declare _controls: OrbitControls;
    private _timeline: gsap.core.Timeline = gsap.timeline();

    constructor(cameraOption: ICameraOption) {
        super(CameraId.MAIN, cameraOption);
        this._cameraContainer.rotation.x = Math.PI * 0.25;
        this._cameraContainer.position.set(0, 1.5, 3);

        if (DebugManager.IsActive) {
            const mainCameraFolder = DebugManager.Gui.addFolder("Main Camera");
            mainCameraFolder.add(this._cameraContainer.position, "x", -10, 10, 0.01).name("positionX");
            mainCameraFolder.add(this._cameraContainer.position, "y", -10, 10, 0.01).name("positionY");
            mainCameraFolder.add(this._cameraContainer.position, "z", -10, 10, 0.01).name("positionZ");
            mainCameraFolder.add(this._cameraContainer.rotation, "x", -Math.PI, Math.PI, 0.01).name("rotationX");
            mainCameraFolder.add(this._cameraContainer.rotation, "y", -Math.PI, Math.PI, 0.01).name("rotationY");
            mainCameraFolder.add(this._cameraContainer.rotation, "z", -Math.PI, Math.PI, 0.01).name("rotationZ");
        }

        ExperienceManager.OnIntroduction.add(this._onIntroduction);
        ExperienceManager.OnTutorialCrank.add(this._onTutorialCrank);
        ExperienceManager.OnTutorialButton.add(this._onTutorialButton);
        ExperienceManager.OnBegin.add(this._onBegin);
        ExperienceManager.OnEnding.add(this._onEnding);
        ExperienceManager.OnRestart.add(this._onRestart);
    }

    private _onIntroduction = (): void => {
        this._timeline.clear().to(this._cameraContainer.rotation, {
            x: 0,
            duration: 1.75,
            ease: "power1.out",
        });
    }

    private _onTutorialCrank = (): void => {
        this._timeline.clear().to(this._cameraContainer.position, {
            x: 1.5,
            y: 1,
            z: 1.5,
            duration: 1,
            ease: "power1.out",
            onComplete: this._onTutorialCrankComplete
        });
    }

    private _onTutorialCrankComplete = (): void => {
        ExperienceManager.GoToNextStep();
    }

    private _onTutorialButton = (): void => {
        this._timeline.clear().to(this._cameraContainer.rotation, {
            y: -0.3,
            duration: 1,
            ease: "power1.out",
        });
        this._timeline.to(this._cameraContainer.position, {
            x: -0.25,
            y: 1.5,
            z: 1.75,
            duration: 1,
            ease: "power1.out",
            onComplete: this._onTutorialButtonComplete
        }, "<");
    }

    private _onTutorialButtonComplete = (): void => {
        ExperienceManager.GoToNextStep();
    }

    private _onBegin = (): void => {
        this._timeline.clear().to(this._cameraContainer.position, {
            x: 0,
            y: 2.5,
            z: 3,
            duration: 2,
            ease: "power1.out",
        });
        this._timeline.to(this._cameraContainer.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power1.out",
        }, "<");
    }

    private _onEnding = (): void => {
        this._timeline.clear().to(this._cameraContainer.position, {
            x: 0,
            y: 1.5,
            z: 3,
            duration: 2,
            delay: 4,
            ease: "power1.out",
        });
        this._timeline.to(this._cameraContainer.rotation, {
            x: Math.PI * 0.25,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power1.out",
        }, "<");
    }

    private _onRestart = (): void => {
        this._cameraContainer.rotation.x = Math.PI * 0.25;
        this._cameraContainer.rotation.y = 0;
        this._cameraContainer.position.set(0, 1.5, 3);
    }

    public override update(dt: number): void {
        super.update(dt);
    }
}