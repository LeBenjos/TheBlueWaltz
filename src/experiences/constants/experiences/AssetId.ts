export const AssetId = {
    TEXTURE_BOX: "TEXTURE_BOX",
    TEXTURE_BOX_NORMAL: "TEXTURE_BOX_NORMAL",
    TEXTURE_BOX_ARM: "TEXTURE_BOX_ARM",
    HDR_SKY: "HDR_SKY",
    GLTF_MODEL: "GLTF_MODEL",
} as const;

export type AssetId = typeof AssetId[keyof typeof AssetId];
