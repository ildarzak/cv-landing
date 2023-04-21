import { BackSide, CircleGeometry, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import App from "../app";

export default class Floor {
    private scene: any;
    public circleFirst: Mesh<CircleGeometry, MeshStandardMaterial> | undefined;
    public circleSecond: Mesh<CircleGeometry, MeshStandardMaterial> | undefined;
    public circleThird: Mesh<CircleGeometry, MeshStandardMaterial> | undefined;
    constructor() {
        this.scene = App._instance._scene;

        this.setFloor();
    }

    setFloor() {
        const geometry = new PlaneGeometry(100, 100);
        const material = new MeshStandardMaterial({
            color: '#28875e',
            side: BackSide,
        });
        const plane = new Mesh(geometry, material);
        this.scene.add(plane);
        plane.rotation.x = Math.PI / 2;
        plane.position.y = -0.3;
        plane.receiveShadow = true;
    }

    setCircles() {
        const geometry = new CircleGeometry(5, 64);
        const material = new MeshStandardMaterial({ color: 0xe5a1aa });
        const material2 = new MeshStandardMaterial({ color: 0x8395cd });
        const material3 = new MeshStandardMaterial({ color: 0x7ad0ac });

        this.circleFirst = new Mesh(geometry, material);
        this.circleSecond = new Mesh(geometry, material2);
        this.circleThird = new Mesh(geometry, material3);

        this.circleFirst.position.y = -0.29;

        this.circleSecond.position.y = -0.28;
        this.circleSecond.position.x = 2;

        this.circleThird.position.y = -0.27;

        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);

        this.circleFirst.rotation.x =
            this.circleSecond.rotation.x =
            this.circleThird.rotation.x =
                -Math.PI / 2;

        this.circleFirst.receiveShadow =
            this.circleSecond.receiveShadow =
            this.circleThird.receiveShadow =
                true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
    }
}