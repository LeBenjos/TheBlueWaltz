import { OrbitControls } from "three/examples/jsm/Addons.js";
import { CameraId } from "../constants/experiences/CameraId";
import DebugManager from "../managers/DebugManager";
import CameraControllerBase, { type ICameraOption } from "./bases/CameraControllerBase";

export default class MainCameraController extends CameraControllerBase {
    private declare _controls: OrbitControls;

    constructor(cameraOption: ICameraOption) {
        super(CameraId.MAIN, cameraOption);
        this._cameraContainer.position.set(0, 3, 3);
        this._camera.lookAt(0, 1.5, 0);

        if (DebugManager.IsActive) {
            const mainCameraFolder = DebugManager.Gui.addFolder("Main Camera");
            mainCameraFolder.add(this._cameraContainer.position, "x", -10, 10, 0.01).name("positionX");
            mainCameraFolder.add(this._cameraContainer.position, "y", -10, 10, 0.01).name("positionY");
            mainCameraFolder.add(this._cameraContainer.position, "z", -10, 10, 0.01).name("positionZ");
        }
    }

    public override update(dt: number): void {
        super.update(dt);
    }
}