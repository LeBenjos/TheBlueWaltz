export const ExperienceState = {
    INITIAL: "INITIAL",
    INTRODUCTION: "INTRODUCTION",
    TUTORIAL_CRANK: "TUTORIAL_CRANK",
    GAME_CRANK: "GAME_CRANK",
    TUTORIAL_BUTTON: "TUTORIAL_BUTTON",
    GAME_BUTTON: "GAME_BUTTON",
    PUSH_BUTTON: "PUSH_BUTTON",
    BEGIN: "BEGIN",
    DANCE: "DANCE",
    ENDING: "ENDING",
    RESTART: "RESTART",
} as const;

export type ExperienceState = typeof ExperienceState[keyof typeof ExperienceState];
