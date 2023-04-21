import { CineonToneMapping, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from "three";
import Sizes from "../utils/sizes";
import App from "./app";

export default class Renderer {
    app: App;
    renderer: WebGLRenderer
    sizes: Sizes

    constructor() {
        this.app = App._instance
        this.sizes = this.app._sizes
        this.renderer = new WebGLRenderer({
            canvas: this.app._canvas,
            antialias: true,
        });

        this.setRenderer();
    }

    setRenderer() {
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.toneMapping = CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.renderer.render(this.app._scene, this.app._camera.orthographicCamera);
    }
}