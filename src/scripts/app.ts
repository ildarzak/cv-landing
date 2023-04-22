import { Scene } from "three";
import Loader from "../utils/loader";
import Sizes from "../utils/sizes";
import Time from "../utils/time";
import Camera from "./camera";
import Renderer from "./renderer";
import Theme from "./theme";
import World from "./world/world";
import Preload from "./preload";
import { Controls } from "./world/controls";

export default class App {

    public static _instance: App;
    public _sizes: Sizes;
    public _time: Time;
    public _scene: THREE.Scene;
    public _canvas: HTMLCanvasElement;
    public _camera: Camera;
    public _renderer: Renderer;
    public _world: World;
    public _loader: Loader;
    public _theme: Theme;
    public _preload: Preload;
    public _controls?: Controls;

    constructor(_canvas: HTMLCanvasElement) {
        // if (App._instance) {
             // return App._instance
        // }
        App._instance = this;

        this._canvas = _canvas;
        this._sizes = new Sizes();
        this._time = new Time();
        this._scene = new Scene();
        this._camera = new Camera();
        this._renderer = new Renderer();
        this._loader = new Loader()
        this._theme = new Theme();
        this._world = new World();
        this._preload = new Preload();

        this._sizes.on("resize", () => {
            this.resize();
        });
        this._time.on("update", () => {
            this.update();
        });

        this._preload.on("enablecontrols", () => {
            this._controls = new Controls();
        });
    }

    resize() {
        this._camera.resize();
        this._world.resize();
        this._renderer.resize();
    }

    update() {
        this._preload.update();
        this._camera.update();
        this._world.update();
        this._renderer.update();
        if (this._controls) {
            this._controls.update();
        }
    }
}