import { MeshStandardMaterial } from "three";

export default class MetalMaterial extends MeshStandardMaterial {
    constructor() {
        super({
            metalness: 1,
            roughness: 0,
            color: 0x888888,
        });
    }
}