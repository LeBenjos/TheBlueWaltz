import Experience from "../Experience";
import Point from "../tools/Point";
import Environment from "./Environment";
import DecorationModel from "./components/DecorationModel";
import MusicalBox from "./components/MusicalBox";
import type ActorBase from "./components/bases/ActorBase";

export default class World {
    private declare _environment: Environment;
    private readonly _actors: ActorBase[];

    constructor() {
        this._generateEnvironment();

        this._actors = [];
        this._generateActors();
    }

    private _generateEnvironment(): void {
        this._environment = new Environment();
        Experience.Scene.add(this._environment);
    }

    private _generateActors(): void {
        this._actors.push(new MusicalBox());
        this._actors.push(new DecorationModel(new Point(3.1, 0.7, -6.3), new Point(1, Math.PI * 2, 0), 6, 1));
        this._actors.push(new DecorationModel(new Point(-5.1, -3.8, -4), new Point(0.26, 0, 5.97), 5, -1));
        this._actors.push(new DecorationModel(new Point(-4, 8, 0), new Point(0, 1.57, 3.27), 2, -1));
        for (const actor of this._actors) Experience.Scene.add(actor);
    }

    public update(dt: number): void {
        if (!this._environment) return;
        this._environment.update(dt);
        for (const actor of this._actors) actor.update(dt);
    }
}
