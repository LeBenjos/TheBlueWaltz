import { AssetId } from "../constants/experiences/AssetId";
import CameraControllerManager from "../managers/CameraControllerManager";
import CursorManager from "../managers/CursorManager";
import DebugManager from "../managers/DebugManager";
import ExperienceManager from "../managers/ExperienceManager";
import { KeyboardManager } from "../managers/KeyboardManager";
import { ResizeManager } from "../managers/ResizeManager";
import ThreeAssetsManager from "../managers/ThreeAssetsManager";
import Ticker from "../tools/Ticker";
import AssetUtils from "../Utils/AssetUtils";

export default class InitCommand {

    public static async Begin(): Promise<void> {
        this._InitProxies();
        this._InitCommon();
        this._InitThree();
        this._InitManagers();
        this._InitUtils();
    }

    private static async _InitProxies(): Promise<void> {
        // 
    }

    private static async _InitUtils(): Promise<void> {
        Ticker.Init();
    }

    private static async _InitManagers(): Promise<void> {
        DebugManager.Init();
        KeyboardManager.Init();
        CursorManager.Init();
        ResizeManager.Init();
        ThreeAssetsManager.Init();
        CameraControllerManager.Init();
        ExperienceManager.Init();
        ThreeAssetsManager.OnFinishLoad.add(InitCommand._InitAfterLoad)
    }

    private static async _InitCommon(): Promise<void> {
        // 
    }

    private static async _InitThree(): Promise<void> {
        ThreeAssetsManager.AddHDR(AssetId.HDR_SKY, AssetUtils.GetPath("hdrs/template.hdr"));
        ThreeAssetsManager.AddModel(AssetId.GLTF_MODEL, AssetUtils.GetPath("models/musicalBox.glb"));
    }

    private static _InitAfterLoad = (): void => {
        //
    }

    private static async _End(): Promise<void> {
        // 
    }
} 