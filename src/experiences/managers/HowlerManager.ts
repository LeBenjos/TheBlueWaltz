import { Howler } from 'howler';
import { ExperienceState } from '../constants/experiences/ExperienceState';
import ExperienceManager from './ExperienceManager';

export default class HowlerManager {
    private static _AmbientSound: Howl;
    private static _MusicalBoxSound: Howl;
    private static _FxInitSound: Howl;
    private static _FxClickSound: Howl;
    private static _FxChestSpawnSound: Howl;
    private static _FxChestOpenSound: Howl;
    private static _FxCrankSound: Howl;
    private static _FxStatementSound: Howl;
    private static _FxMusicalBoxButtonSound: Howl;
    private static _FxCameraMovementSound: Howl;
    private static _FxBuildHumanSound: Howl;
    private static _FxDestroyedHumanSound: Howl;

    public static Init(): void {
        Howler.volume(0.5);
        HowlerManager._AmbientSound = new Howl({
            src: ['./assets/sounds/ambient.mp3'],
            loop: true,
            volume: 0.5,
        });
        HowlerManager._MusicalBoxSound = new Howl({
            src: ['./assets/sounds/musicalBoxGregorQuendel.mp3'],
            loop: false,
            volume: 0.5,
            onend: HowlerManager._onMusicalBoxEnd,
        });
        HowlerManager._FxInitSound = new Howl({
            src: ['./assets/sounds/init.mp3'],
            loop: false,
            volume: 0.5,
        });
        HowlerManager._FxClickSound = new Howl({
            src: ['./assets/sounds/click.mp3'],
            loop: false,
            volume: 0.25,
        });
        HowlerManager._FxChestSpawnSound = new Howl({
            src: ['./assets/sounds/chestSpawn.mp3'],
            loop: false,
            volume: 1,
        });
        HowlerManager._FxChestOpenSound = new Howl({
            src: ['./assets/sounds/chestOpen.mp3'],
            loop: false,
            volume: 0.5,
        });
        HowlerManager._FxCrankSound = new Howl({
            src: ['./assets/sounds/crank.mp3'],
            loop: false,
            volume: 1,
        });
        HowlerManager._FxStatementSound = new Howl({
            src: ['./assets/sounds/statement.mp3'],
            loop: false,
            volume: 0.5,
        });
        HowlerManager._FxMusicalBoxButtonSound = new Howl({
            src: ['./assets/sounds/musicalBoxButton.mp3'],
            loop: false,
            volume: 1,
        });
        HowlerManager._FxCameraMovementSound = new Howl({
            src: ['./assets/sounds/cameraMovement.mp3'],
            loop: false,
            volume: 1,
        });
        HowlerManager._FxBuildHumanSound = new Howl({
            src: ['./assets/sounds/buildHuman.mp3'],
            loop: false,
            volume: 3,
        });
        HowlerManager._FxDestroyedHumanSound = new Howl({
            src: ['./assets/sounds/destroyedHuman.mp3'],
            loop: false,
            volume: 1,
        });
    }

    public static PlayAmbientSound(): void {
        HowlerManager._MusicalBoxSound.stop();
        HowlerManager._AmbientSound.play();
    }

    public static PlayMusicalBoxSound(): void {
        HowlerManager._AmbientSound.stop();
        HowlerManager._MusicalBoxSound.play();
    }

    public static PlayInitSound(): void {
        HowlerManager._FxInitSound.play();
    }

    public static PlayClickSound(): void {
        HowlerManager._FxClickSound.play();
    }

    public static PlayChestSpawnSound(): void {
        HowlerManager._FxChestSpawnSound.play();
    }

    public static PlayChestOpenSound(): void {
        HowlerManager._FxChestOpenSound.play();
    }

    public static PlayCrankSound(): void {
        HowlerManager._FxCrankSound.play();
    }

    public static PlayStatementSound(): void {
        HowlerManager._FxStatementSound.play();
    }

    public static PlayMusicalBoxButtonSound(): void {
        HowlerManager._FxMusicalBoxButtonSound.play();
    }

    public static PlayCameraMovementSound(): void {
        HowlerManager._FxCameraMovementSound.play();
    }

    public static PlayBuildHumanSound(): void {
        HowlerManager._FxBuildHumanSound.play();
    }

    public static PlayDestroyedHumanSound(): void {
        HowlerManager._FxDestroyedHumanSound.play();
    }

    private static _onMusicalBoxEnd = (): void => {
        if (ExperienceManager.State === ExperienceState.DANCE) {
            HowlerManager._MusicalBoxSound.stop();
            HowlerManager.PlayAmbientSound();
            ExperienceManager.GoToNextStep();
        }
    }
}
