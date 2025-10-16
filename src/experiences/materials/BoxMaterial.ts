import { MeshStandardMaterial } from "three";

export default class BoxMaterial extends MeshStandardMaterial {
    constructor() {
        super({
            // map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_BOX),
            // normalMap: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_BOX_NORMAL),
            // metalnessMap: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_BOX_ARM),
            // roughnessMap: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_BOX_ARM),
            // aoMap: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_BOX_ARM),
            // color: 0xFAFAFA,
        });
    }
}