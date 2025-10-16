import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
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

    public update(_dt: number): void {
        super.update(_dt);
    }
}
