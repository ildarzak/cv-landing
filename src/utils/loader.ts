import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Assets, { Asset } from './assets'
import * as THREE from "three";

export default class Loader extends EventEmitter {
    loaders: any;
    items: any;
    queue: number;
    loaded: number;

    constructor() {
        super();

        this.items = {};
        this.queue = Assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        for (const asset of Assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file: any) => {
                    this.singleAssetLoaded(asset, file);
                });
            } else if (asset.type === "videoTexture") {
                let video: any = {};
                let videoTexture: any = {};

                video[asset.name] = document.createElement("video");
                video[asset.name].src = asset.path;
                video[asset.name].muted = true;
                video[asset.name].playsInline = true;
                video[asset.name].autoplay = true;
                video[asset.name].loop = true;
                video[asset.name].play();

                videoTexture[asset.name] = new THREE.VideoTexture(
                    video[asset.name]
                );
                // this.videoTexture[asset.name].flipY = false;
                videoTexture[asset.name].minFilter = THREE.NearestFilter;
                videoTexture[asset.name].magFilter = THREE.NearestFilter;
                videoTexture[asset.name].generateMipmaps = false;
                videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, videoTexture[asset.name]);
            }
        }

        // let video: any = {};
        // let videoTexture: any = {};

        // video['video'] = document.createElement("video");
        // video['video'].src = '/texture/work.mp4';
        // video['video'].muted = true;
        // video['video'].playsInline = true;
        // video['video'].autoplay = true;
        // video['video'].loop = true;
        // video['video'].play();

        // videoTexture['video'] = new THREE.VideoTexture(
        //     video['video']
        // );
        // // this.videoTexture[asset.name].flipY = false;
        // videoTexture['video'].minFilter = THREE.NearestFilter;
        // videoTexture['video'].magFilter = THREE.NearestFilter;
        // videoTexture['video'].generateMipmaps = false;
        // videoTexture['video'].encoding = THREE.sRGBEncoding;

        // this.singleAssetLoaded({ name: 'video' } as Asset, videoTexture['video']);
    }

    singleAssetLoaded(asset: Asset, file: any) {
        this.items[asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}