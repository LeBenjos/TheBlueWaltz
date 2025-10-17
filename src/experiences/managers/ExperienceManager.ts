import { DomEvent } from "../constants/doms/DomEvent";
import { ExperienceState } from "../constants/experiences/ExperienceState";
import { Action } from "../tools/Action";
import ThreeRaycasterBase from "../tools/ThreeRaycasterBase";

export default class ExperienceManager {
    private static _State: ExperienceState = ExperienceState.INITIAL;

    public static readonly OnIntroduction = new Action();
    public static readonly OnTutorialCrank = new Action();
    public static readonly OnGameCrank = new Action();
    public static readonly OnTutorialButton = new Action();
    public static readonly OnGameButton = new Action();
    public static readonly OnPushButton = new Action();
    public static readonly OnBegin = new Action();
    public static readonly OnDance = new Action();
    public static readonly OnEnding = new Action();
    public static readonly OnRestart = new Action();

    public static Init(): void {
        document.querySelector("#start")!.addEventListener(DomEvent.CLICK, ExperienceManager._OnStart);
    }

    public static GoToNextStep(): void {
        if (ExperienceManager._State === ExperienceState.INITIAL) {
            ExperienceManager._State = ExperienceState.INTRODUCTION;
            ExperienceManager._OnIntroduction();
        } else if (ExperienceManager._State === ExperienceState.INTRODUCTION) {
            ExperienceManager._State = ExperienceState.TUTORIAL_CRANK;
            ExperienceManager._OnTutorialCrank();
        } else if (ExperienceManager._State === ExperienceState.TUTORIAL_CRANK) {
            ExperienceManager._State = ExperienceState.GAME_CRANK;
            ExperienceManager._OnGameCrank();
        } else if (ExperienceManager._State === ExperienceState.GAME_CRANK) {
            ExperienceManager._State = ExperienceState.TUTORIAL_BUTTON;
            ExperienceManager._OnTutorialButton();
        } else if (ExperienceManager._State === ExperienceState.TUTORIAL_BUTTON) {
            ExperienceManager._State = ExperienceState.GAME_BUTTON;
            ExperienceManager._OnGameButton();
        } else if (ExperienceManager._State === ExperienceState.GAME_BUTTON) {
            ExperienceManager._State = ExperienceState.PUSH_BUTTON;
            ExperienceManager._OnPushButton();
        } else if (ExperienceManager._State === ExperienceState.PUSH_BUTTON) {
            ExperienceManager._State = ExperienceState.BEGIN;
            ExperienceManager._OnBegin();
        } else if (ExperienceManager._State === ExperienceState.BEGIN) {
            ExperienceManager._State = ExperienceState.DANCE;
            ExperienceManager._OnDance();
        } else if (ExperienceManager._State === ExperienceState.DANCE) {
            ExperienceManager._State = ExperienceState.ENDING;
            ExperienceManager._OnEnding();
        } else if (ExperienceManager._State === ExperienceState.ENDING) {
            ExperienceManager._State = ExperienceState.RESTART;
            ExperienceManager._OnRestart();
        }

        console.log("ExperienceManager - State:", ExperienceManager._State);
    }

    private static _OnStart = () => {
        ExperienceManager.GoToNextStep();
    }

    private static _OnIntroduction = (): void => {
        document.querySelector("#title")!.classList.add("hidden");
        document.querySelector("#start")!.classList.add("hidden");
        document.querySelector("#start")!.removeEventListener(DomEvent.CLICK, ExperienceManager._OnStart);
        ExperienceManager.OnIntroduction.execute();
    }

    private static _OnTutorialCrank = (): void => {
        ExperienceManager.OnTutorialCrank.execute();
    }

    private static _OnGameCrank = (): void => {
        document.querySelector("#tutorialCrank")?.classList.remove("hidden")!;
        document.querySelector("#tutorialCrank")?.classList.add("show")!;
        ExperienceManager.OnGameCrank.execute();
    }

    private static _OnTutorialButton = (): void => {
        document.querySelector("#tutorialCrank")?.classList.remove("show")!;
        document.querySelector("#tutorialCrank")?.classList.add("hidden")!;
        ExperienceManager.OnTutorialButton.execute();
    }

    private static _OnGameButton = (): void => {
        document.querySelector("#tutorialButton")?.classList.remove("hidden")!;
        document.querySelector("#tutorialButton")?.classList.add("show")!;
        ThreeRaycasterBase.Init();
        ExperienceManager.OnGameButton.execute();
    }

    private static _OnPushButton = (): void => {
        document.querySelector("#tutorialButton")?.classList.remove("show")!;
        document.querySelector("#tutorialButton")?.classList.add("hidden")!;
        ThreeRaycasterBase.Reset();
        ExperienceManager.OnPushButton.execute();
    }

    private static _OnBegin = (): void => {
        ExperienceManager.OnBegin.execute();
    }

    private static _OnDance = (): void => {
        ExperienceManager.OnDance.execute();
    }

    private static _OnEnding = (): void => {
        ExperienceManager.OnEnding.execute();
    }

    private static _OnRestart = (): void => {
        document.querySelector("#title")!.classList.remove("hidden");
        document.querySelector("#start")!.classList.remove("hidden");
        document.querySelector("#start")!.addEventListener(DomEvent.CLICK, ExperienceManager._OnStart);
        ExperienceManager._State = ExperienceState.INITIAL;
        ExperienceManager.OnRestart.execute();
    }

    //#region Getters
    //
    public static get State(): ExperienceState { return ExperienceManager._State; }
    //
    //#endregion
}