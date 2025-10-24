import { Group, Mesh, Object3D, Raycaster, Vector2 } from "three";
import { DomEvent } from "../constants/doms/DomEvent";
import { ExperienceState } from "../constants/experiences/ExperienceState";
import { Object3DId } from "../constants/experiences/Object3DId";
import Experience from "../Experience";
import CursorManager from "../managers/CursorManager";
import ExperienceManager from "../managers/ExperienceManager";
import Ticker from "./Ticker";

export default class ThreeRaycasterBase {
    private static _Instance: Raycaster = new Raycaster();
    private static _CurrentIntersects: (Mesh | Group | Object3D)[] = [];
    private static _TargetedObjects: Object3DId[] = [Object3DId.BUTTON_TOP_PART, Object3DId.BUTTON_BOTTOM_PART];
    private static _MouseVector2 = new Vector2();

    public static Init(): void {
        Ticker.Add(ThreeRaycasterBase);
        window.addEventListener(DomEvent.CLICK, ThreeRaycasterBase._OnClick);
        window.addEventListener(DomEvent.TOUCH_START, ThreeRaycasterBase._OnClick);
    }

    public static Reset(): void {
        Ticker.Remove(ThreeRaycasterBase);
        window.removeEventListener(DomEvent.CLICK, ThreeRaycasterBase._OnClick);
        window.removeEventListener(DomEvent.TOUCH_START, ThreeRaycasterBase._OnClick);
    }

    private static _OnClick = (): void => {
        if (ExperienceManager.State !== ExperienceState.GAME_BUTTON) return;
        if (ThreeRaycasterBase._CurrentIntersects.length > 0) {
            ExperienceManager.GoToNextStep();
        }
    }

    public static update(dt: number): void {
        ThreeRaycasterBase._MouseVector2.set(
            CursorManager.NormalizedX,
            CursorManager.NormalizedY
        );

        if (Experience.CameraController?.camera) {
            ThreeRaycasterBase._Instance.setFromCamera(ThreeRaycasterBase._MouseVector2, Experience.CameraController.camera);
            ThreeRaycasterBase._CurrentIntersects = ThreeRaycasterBase._Instance.intersectObjects(Experience.Scene.children, true).reduce<Object3D[]>((acc, intersect) => {
                if (ThreeRaycasterBase._TargetedObjects.includes(intersect.object.name as Object3DId)) acc.push(intersect.object);
                return acc;
            }, []);
        }
    }
}