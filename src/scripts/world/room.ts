import * as THREE from "three";
import Loader from "../../utils/loader";
import App from "../app";
import GSAP from "gsap";

export default class Room {
    loader: Loader;
    scene: THREE.Scene;
    roomScene: any;
    mixer: any;
    room: any;
    lerp: any;
    roomChildren: any = {};

    constructor() {

        this.loader = App._instance._loader
        this.scene = App._instance._scene;
        this.room = this.loader.items.room;
        this.roomScene = this.loader.items.room.scene

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        // this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.roomScene.children.forEach((child: any) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild: any) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            child.scale.set(0, 0, 0);
            // if (child.name === "SmallCube") {
            //     child.scale.set(1, 1, 1);
            //     child.position.set(0, 0, -0.3);
            //     child.rotation.y = Math.PI / 4;
            // }

            // if (child.name === "Tea") {
                // child.scale.set(1, 1, 1);
                // child.position.set(-0.35, 0.5, 0);
                // child.rotation.y = Math.PI / 4
            // }

            // if (child.name === "Screen") {
            //     child.children[1].material = new THREE.MeshBasicMaterial({
            //         map: App._instance._loader.items.video,
            //     });
            // }

            // if (child.name === "Room") {
            //     child.children[2].material = new THREE.MeshPhysicalMaterial();
            //     child.children[2].material.roughness = 0;
            //     child.children[2].material.color.set(0x549dd2);
            //     child.children[2].material.ior = 3;
            //     child.children[2].material.transmission = 1;
            //     child.children[2].material.opacity = 1;
            //     child.children[2].material.depthWrite = false;
            //     child.children[2].material.depthTest = false;
            // }

            if (child.name === "Screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: App._instance._loader.items.screen,
                });
            }

            // if (child.name === "MailAndPrinter" || child.name === "Paper" || child.name === "Pan") {
            //     child.scale.set(0, 0, 0);
            // }

            this.roomChildren[child.name] = child;
        })

        this.roomScene.scale.set(0.5, 0.5, 0.5)
        this.scene.add(this.roomScene)
        // this.roomScene.position.set(-0.1, 0.25, 0)

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.roomScene.add(rectLight);

        // this.roomChildren["rectLight"] = rectLight;
    }

    setPaperAnimation() {
        this.mixer = new THREE.AnimationMixer(this.roomScene);

        this.mixer.clipAction(this.room.animations[12]).repetitions = 1;
        this.mixer.clipAction(this.room.animations[12]).clampWhenFinished = true;
        this.mixer.clipAction(this.room.animations[12]).play();
        // для room4
        // this.mixer.clipAction(this.room.animations[1]).repetitions = 1
        // this.mixer.clipAction(this.room.animations[1]).clampWhenFinished = true;
        // this.mixer.clipAction(this.room.animations[1]).play();
        // this.mixer.clipAction(this.room.animations[2]).repetitions = 1
        // this.mixer.clipAction(this.room.animations[2]).clampWhenFinished = true;
        // this.mixer.clipAction(this.room.animations[2]).play()

        // для room5
        // this.mixer.clipAction(this.room.animations[0]).repetitions = 1
        // this.mixer.clipAction(this.room.animations[0]).clampWhenFinished = true;
        // this.mixer.clipAction(this.room.animations[0]).play();
    }

    setPanAnimation() {
        this.mixer = new THREE.AnimationMixer(this.roomScene);

        this.mixer.clipAction(this.room.animations[13]).repetitions = 1;
        this.mixer.clipAction(this.room.animations[13]).clampWhenFinished = true;
        this.mixer.clipAction(this.room.animations[13]).play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            const rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = rotation * 0.05;
        });
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.roomScene.rotation.y = this.lerp.current;

        this.mixer?.update(App._instance._time.delta * 0.0009);
    }
}