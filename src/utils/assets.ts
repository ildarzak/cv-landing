export default [
    {
        name: "room",
        type: "glbModel",
        path: "/models/final_version.glb",
    },
    {
        name: "screen",
        type: "videoTexture",
        path: "/texture/video.mp4",
    },
] as Asset[]

export type Asset = {
    name: string;
    type: string;
    path: string;
}