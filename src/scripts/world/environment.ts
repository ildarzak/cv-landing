import { AmbientLight, DirectionalLight } from "three";
import App from "../app";
import GSAP from "gsap";

export default class Environment {
    sunLight: any;
    ambientLight: any;

    constructor() {
        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;

        this.sunLight.position.set(-1.5, 7, 3);
        App._instance._scene.add(this.sunLight)

        this.ambientLight = new AmbientLight("#ffffff", 0.7);
        App._instance._scene.add(this.ambientLight);

        // this.sunLight = new DirectionalLight(new Color(
        //     0.17254901960784313,
        //     0.23137254901960785,
        //     0.6862745098039216,
        // ), 0.78);
        // this.sunLight.castShadow = true;
        // this.sunLight.shadow.camera.far = 20;
        // this.sunLight.shadow.mapSize.set(2048, 2048);
        // this.sunLight.shadow.normalBias = 0.05;

        // this.sunLight.position.set(-1.5, 7, 3);
        // App._instance._scene.add(this.sunLight)

        // this.ambientLight = new AmbientLight(new Color(
        //     0.17254901960784313,
        //     0.23137254901960785,
        //     0.6862745098039216), 0.78);
        // App._instance._scene.add(this.ambientLight);
    }

    switchTheme(theme: string) {
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        }
    }
}