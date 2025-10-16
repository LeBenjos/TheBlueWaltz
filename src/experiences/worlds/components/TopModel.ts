import { Mesh } from "three";
import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
import BoxMaterial from "../../materials/BoxMaterial";
import MetalMaterial from "../../materials/MetalMaterial";
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

    protected override _generateModel(): void {
        super._generateModel();

        const boxMaterial = new BoxMaterial();
        const metalMaterial = new MetalMaterial();

        this._model.traverse((child) => {
            if (child instanceof Mesh) {
                if (child.name === Object3DId.TOP) {
                    child.material = boxMaterial;
                } else if (child.name === Object3DId.BUTTON_TOP_PART) {
                    child.material = metalMaterial;
                } else if (child.name === Object3DId.HINGE) {
                    child.material = metalMaterial;
                }
            }
        });
    }


    public update(dt: number): void {
        super.update(dt);
        this._model.rotation.x -= 0.5 * dt;
    }
}