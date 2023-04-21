import { EventEmitter } from "events";
import App from "../app";
import Environment from "./environment";
import Floor from "./floor";
import Room from "./room";

export default class World extends EventEmitter {
    app: App;
    public _environment: Environment | undefined;
    public _room: Room | undefined;

    constructor() {
        super()
        this.app = App._instance;

        this.app._loader.on("ready", () => {
            this._environment = new Environment()
            this._room = new Room();
            new Floor();
            // new Controls();
            this.emit("worldready");
        })

        App._instance._theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }

    switchTheme(theme: string) {
        if (this._environment) {
            this._environment.switchTheme(theme);
        }
    }

    resize() {

    }

    update() {
        if (this._room) {
            this._room.update()
        }
    }
}