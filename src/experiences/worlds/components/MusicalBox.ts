import DebugManager from "../../managers/DebugManager";
import ActorBase from "./bases/ActorBase";
import BodyModel from "./BodyModel";
import HumanModel from "./HumanModel";
import TopModel from "./TopModel";

export default class MusicalBox extends ActorBase {
    // private declare _body: BodyModel;
    // private declare _human: HumanModel;
    // private declare _top: TopModel;
    private _actors: ActorBase[] = [];

    constructor() {
        super();
        this._actors = [];

        this._generateModel();

        if (DebugManager.IsActive) {
            const musicalBoxFolder = DebugManager.Gui.addFolder("Musical Box");
            musicalBoxFolder.add(this.position, "x", -1, 1, 0.01).name("positionX");
            musicalBoxFolder.add(this.position, "y", -1, 1, 0.01).name("positionY");
            musicalBoxFolder.add(this.position, "z", -1, 1, 0.01).name("positionZ");
        }
    }

    private _generateModel(): void {
        this._actors.push(new BodyModel());
        this._actors.push(new HumanModel());
        this._actors.push(new TopModel());
        for (const actor of this._actors) this.add(actor);
    }

    public update(dt: number): void {
        super.update(dt);
        for (const actor of this._actors) actor.update(dt);
    }
}