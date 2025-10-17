import { AssetId } from "../../constants/experiences/AssetId";
import { Object3DId } from "../../constants/experiences/Object3DId";
import type Point from "../../tools/Point";
import ModelBase from "./bases/ModelBase";

export default class DecorationModel extends ModelBase {
    private _speed: number;
    private _direction: 1 | -1;

    constructor(position: Point, rotation: Point, scaleXYZ: number, direction: 1 | -1) {
        super(AssetId.GLTF_MODEL, {
            object3DId: Object3DId.BASE,
            receiveShadow: true,
            castShadow: true,
        });
        this.add(this._model);

        this._model.position.set(position.x, position.y, position.z);
        this._model.rotation.set(rotation.x, rotation.y, rotation.z);
        this._model.scale.set(scaleXYZ, scaleXYZ, scaleXYZ);
        this._direction = direction;

        this._speed = 1 + Math.random() * 9;
    }

    public update(dt: number): void {
        super.update(dt);
        this._model.rotation.y += 0.05 * this._speed * dt * this._direction;
    }

    public get model() {
        return this._model;
    }
}
