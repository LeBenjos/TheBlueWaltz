export const Object3DId = {
    BODY: "body",
    BUTTON_BOTTOM_PART: "buttonBottomPart",
    CRANK: "crank",
    SCENE: "scene",
    HUMAN: "human",
    TOP: "top",
    BUTTON_TOP_PART: "buttonTopPart",
} as const;

export type Object3DId = typeof Object3DId[keyof typeof Object3DId];
