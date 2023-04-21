import { OrthographicCamera, PerspectiveCamera } from "three";
import Sizes from "../utils/sizes";
import App from "./app";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
    perspectiveCamera: any;
    orthographicCamera: any;
    sizes: Sizes
    controls: OrbitControls | undefined;

    constructor() {
        this.sizes = App._instance._sizes;

        // this.createPerspectiveCamera();
        this.createOrthographicCamera();
        // this.setOrbitControls();
    }
    
    createPerspectiveCamera() {
        this.perspectiveCamera = new PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        App._instance._scene.add(this.perspectiveCamera);
        // this.perspectiveCamera.position.x = 29;
        // this.perspectiveCamera.position.y = 14;
        // this.perspectiveCamera.position.z = 12;
    }

    createOrthographicCamera() {
        this.orthographicCamera = new OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );

        this.orthographicCamera.position.y = 5.65;
        this.orthographicCamera.position.z = 9;
        this.orthographicCamera.rotation.x = -Math.PI / 6;

        App._instance._scene.add(this.orthographicCamera);

        // const size = 20;
        // const divisions = 20;

        // const gridHelper = new GridHelper(size, divisions);
        // this.app._scene.add(gridHelper)
        // const axesHelper = new AxesHelper(10);
        // this.app._scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.orthographicCamera, App._instance._canvas);
        this.controls.enableDamping = false;
        this.controls.enableZoom = true;
    }

    resize() {
        // Updating Perspective Camera on Resize
        // this.perspectiveCamera.aspect = this.sizes.aspect;
        // this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left =
            (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right =
            (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls?.update();
    }
}