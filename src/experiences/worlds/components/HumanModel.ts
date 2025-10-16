import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
import Ticker from "../../tools/Ticker";
import ModelBase from "./bases/ModelBase";

export default class HumanModel extends ModelBase {
    constructor() {
        super(AssetId.GLTF_MODEL, {
            object3DId: Object3DId.HUMAN,
            isAnimated: false,
            castShadow: true,
            receiveShadow: true,
        });
    }

    protected override _generateModel(): void {
        super._generateModel();
    }


    public update(dt: number): void {
        super.update(dt);
        this._model.rotation.y -= dt;
        this.position.x = Math.sin(Ticker.ElapsedTime * 0.25) * 0.45;
        this.position.z = Math.cos(Ticker.ElapsedTime * 0.25) * 0.45;
    }
}
