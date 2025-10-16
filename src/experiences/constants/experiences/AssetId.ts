export const AssetId = {
    HDR_SKY: "HDR_SKY",
    GLTF_MODEL: "GLTF_MODEL",
} as const;

export type AssetId = typeof AssetId[keyof typeof AssetId];
