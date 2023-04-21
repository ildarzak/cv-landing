import { EventEmitter } from "events";
import App from "./app";
import GSAP from 'gsap';

export function convert(element: any) {
    element.style.overflow = "hidden";
    element.innerHTML = element.innerText
        .split("")
        .map((char: string) => {
            if (char === " ") {
                return `<span>&nbsp;</span>`;
            }
            return `<span class="animatedis">${char}</span>`;
        })
        .join("");

    return element;
}

export default class Preload extends EventEmitter {

    scaleFlag = false;
    moveFlag = false;

    initalY = 0;

    constructor() {
        super();
        App._instance._world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));

        // console.log(App._instance._world._room?.roomScene);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        //удалить от сих
        // await this.secondIntro();
        // this.emit("enablecontrols");
        //до сих

        // this.onScroll(1)
        window.addEventListener("wheel", this.onScroll);
    }

    async firstIntro() {
        return new Promise((resolve) => {

            const timeline = GSAP.timeline();

            timeline.set(".animatedis", { y: 0, yPercent: 100 });

            timeline
                .to(".preloader", {
                    opacity: 0,
                    delay: 1,
                    onComplete: () => {
                        document.querySelector(".preloader")
                            ?.classList.add("hidden");

                    },
                });

            if (App._instance._sizes.device === "desktop") {
                App._instance._world._room?.roomChildren.Tea.position.set(-0.35, -1, -2.5)
                timeline
                    .to(App._instance._world._room?.roomChildren.Tea.scale, {
                        x: 2,
                        y: 2,
                        z: 2,
                        ease: "back.out(2)",
                        duration: 0.7,
                    })
                    .to(App._instance._world._room?.roomScene.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    })
            } else {
                App._instance._world._room?.roomChildren.Tea.position.set(-0.8, -2.3, -5)
                // App._instance._world._room?.roomScene.position.set(0, 0, -1)
                timeline
                    .to(App._instance._world._room?.roomChildren.Tea.scale, {
                        x: 5,
                        y: 5,
                        z: 5,
                        ease: "back.out(2)",
                        duration: 0.7,
                    })
                    .to(App._instance._world._room?.roomScene.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    })
            }


            timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.05,
                ease: "back.out(1)",
            })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        })
    }

    async secondIntro() {
        return new Promise((resolve) => {
            const timeline = GSAP.timeline();

            timeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout",
                )
                .to(
                    App._instance._camera.orthographicCamera.position,
                    {
                        x: App._instance._sizes.device === "desktop" ? -1 : 0,
                    },
                    "same"
                )
                // .to(App._instance._world._room?.roomScene.position, {
                //     x: 0, y: 0, z: 0,
                //     ease: "power1.out",
                // },
                //     "same")
                .to(App._instance._world._room?.roomChildren.Tea.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    // ease: "back.out(2.5)",
                    duration: 0.7,

                }, "same")
                .to(App._instance._world._room?.roomChildren.Tea.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2.5)",
                    duration: 0.7,

                }, "same")
                // .to(App._instance._world._room?.roomScene.scale, {
                //     x: 0.5,
                //     y: 0.5,
                //     z: 0.5,
                //     // ease: "back.out(1.7)",
                // })
                .to(
                    App._instance._world._room?.roomChildren.SmallTable.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                )
                .to(
                    App._instance._world._room?.roomChildren.Room.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                )
                .to(
                    App._instance._world._room?.roomChildren.ChairLegs.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    App._instance._world._room?.roomChildren.Chair.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    App._instance._world._room?.roomChildren.Chair.rotation,
                    {
                        y: 2 * Math.PI - Math.PI / 4,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair"
                )
                .to(
                    App._instance._world._room?.roomChildren.Couch.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.4",
                )
                .to(
                    App._instance._world._room?.roomChildren.Table.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.3",
                )
                .to(
                    App._instance._world._room?.roomChildren.TableStuf.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.2",
                )
                .to(
                    App._instance._world._room?.roomChildren.Screen.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.2",
                )
                .to(
                    App._instance._world._room?.roomChildren.WallStuf.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        // ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1",
                )
                .to(
                    ".hero-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-description .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                        onComplete: resolve
                    },
                    "introtext"
                )
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    // onComplete: resolve,
                });

        })

    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.onScroll);
        window.removeEventListener("touchstart", this.onTouch);
        window.removeEventListener("touchmove", this.onTouchMove);
    }

    scale() {
        // this.roomChildren.rectLight.width = 0;
        // this.roomChildren.rectLight.height = 0;

        if (App._instance._sizes.device === "desktop") {
            App._instance._world._room?.roomScene.scale.set(0.5, 0.5, 0.5);
        } else {
            App._instance._world._room?.roomScene.scale.set(0.25, 0.25, 0.25);
        }
    }

    move() {
        if (App._instance._sizes.device === "desktop") {
            App._instance._world._room?.roomScene.position.set(-1, 0, 0);
        } else {
            App._instance._world._room?.roomScene.position.set(0, 0, -1);
        }
    }

    // onTouch = (e: any) => {
    //     this.initalY = e.touches[0].clientY;
    // }

    onScroll = async (e: WheelEvent) => {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            await this.secondIntro();
            this.moveFlag = false;
            this.scaleFlag = false;
            this.emit("enablecontrols");
        }
    }

    onTouch = (e: TouchEvent) => {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove = async (e: TouchEvent) => {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            // console.log("swipped up");
            this.removeEventListeners();
            await this.secondIntro();
        }

        this.initalY = 0;
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}
