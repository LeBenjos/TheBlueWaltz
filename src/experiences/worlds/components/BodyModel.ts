import { Mesh } from "three";
import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
import BoxMaterial from "../../materials/BoxMaterial";
import MetalMaterial from "../../materials/MetalMaterial";
import ModelBase from "./bases/ModelBase";

export default class BodyModel extends ModelBase {
    private declare _crank: Mesh | null;
    private declare _scene: Mesh | null;

    constructor() {
        super(AssetId.GLTF_MODEL, {
            object3DId: Object3DId.BODY,
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
                if (child.name === Object3DId.BODY) {
                    child.material = boxMaterial;
                } else if (child.name === Object3DId.CRANK) {
                    this._crank = child;
                    child.material = metalMaterial;
                } else if (child.name === Object3DId.SCENE) {
                    this._scene = child;
                    child.material = metalMaterial;
                } else if (child.name === Object3DId.BUTTON_BOTTOM_PART) {
                    child.material = metalMaterial;
                }
            }
        });
    }

    public update(dt: number): void {
        super.update(dt);
        if (this._crank) this._crank.rotation.x -= 2 * dt;
        if (this._scene) this._scene.rotation.y += 0.25 * dt;
    }
}