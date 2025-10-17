import { BufferAttribute, BufferGeometry, Mesh, Points, Vector3 } from "three";
import { AssetId } from "../../constants/experiences/AssetId";
import { ExperienceState } from "../../constants/experiences/ExperienceState";
import { Object3DId } from "../../constants/experiences/Object3DId";
import ExperienceManager from "../../managers/ExperienceManager";
import ThreeAssetsManager from "../../managers/ThreeAssetsManager";
import HumanMaterial from "../../materials/HumanMaterial";
import Ticker from "../../tools/Ticker";
import ActorBase from "./bases/ActorBase";

export default class HumanModel extends ActorBase {
    protected _assetId: AssetId;
    protected declare _geometry: BufferGeometry;
    protected declare _material: HumanMaterial;
    protected declare _model: Points;
    private _spread = 5;

    constructor() {
        super();
        this._assetId = AssetId.GLTF_MODEL;

        this._generateModel();

        ExperienceManager.OnDance.add(this._onDance);
        ExperienceManager.OnEnding.add(this._onEnding);
        ExperienceManager.OnRestart.add(this._onRestart);
    }

    protected _generateModel(): void {
        const gltfModel = ThreeAssetsManager.GetModel(this._assetId).scene.getObjectByName(Object3DId.HUMAN);

        this._generateGeometry();
        this._generateMaterial();

        this._model = new Points(this._geometry, this._material);
        this._model.position.copy(gltfModel?.position as Vector3);
        this._model.scale.setScalar(1.5);
        this.add(this._model);
    }

    private _generateGeometry(): void {
        const gltfModel = ThreeAssetsManager.GetModel(this._assetId).scene.getObjectByName(Object3DId.HUMAN);
        this._geometry = (gltfModel?.children[0] as Mesh).geometry.clone();
        const originalPosition = this._geometry.attributes.position.clone();
        this._geometry.setAttribute("aOriginPosition", originalPosition);

        const startPosition = this._geometry.attributes.position.clone().array;
        for (let i = 0; i < startPosition.length; i++) {
            startPosition[i] += (Math.random() - 0.5) * this._spread;
        }
        this._geometry.setAttribute("aStartPosition", new BufferAttribute(new Float32Array(startPosition), 3));
    }

    private _generateMaterial(): void {
        this._material = new HumanMaterial();
    }

    private _onDance = (): void => {
        this._material.buildHumanAnimation();
    }

    private _onEnding = (): void => {
        this._material.destroyHumanAnimation();
    }

    private _onRestart = (): void => {
        this._material.resetHumanAnimation();
    }

    public update(dt: number): void {
        super.update(dt);
        this._material.update(dt);
        if (ExperienceManager.State === ExperienceState.DANCE) {
            this._model.rotation.y -= dt;
            this.position.x = Math.sin(Ticker.ElapsedTime * 0.25) * 0.45;
            this.position.z = Math.cos(Ticker.ElapsedTime * 0.25) * 0.45;
        }
    }
}
