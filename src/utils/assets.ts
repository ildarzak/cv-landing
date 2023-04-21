export default [
    {
        name: "room",
        type: "glbModel",
        path: "/models/cv_room.glb",
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