import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
import ModelBase from "./bases/ModelBase";

export default class TopModel extends ModelBase {
    constructor() {
        super(AssetId.GLTF_MODEL, {
            object3DId: Object3DId.TOP,
            isAnimated: false,
            castShadow: true,
            receiveShadow: true,
        });
    }

    public update(dt: number): void {
        super.update(dt);
    }
}