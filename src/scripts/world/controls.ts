import Lenis from "@studio-freight/lenis"
import GSAP from 'gsap';
import App from "../app";
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export class Controls {
    // smoother: ScrollSmoother;

    constructor() {
        GSAP.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // if (
        //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        //         navigator.userAgent
        //     )
        // ) {
            // (document.querySelector(".page") as HTMLDivElement).style.height = "auto";
        // this.setSmoothScroll()
        // }

        this.setScrollControlls();
        this.setScrollTriggerForMedia();

        (document.querySelector(".page") as HTMLDivElement).style.overflow = "scroll"
    }

    setSmoothScroll() {
        const lenis = new Lenis({
            // wrapper: document.getElementsByClassName("page")[0],
            // content: document.getElementsByClassName("page-wrapper")[0]
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // lenis.on('scroll', ScrollTrigger.update)

        // GSAP.ticker.add((time) => {
        //     lenis.raf(time * 1000)
        // })
    }

    setScrollControlls() {
        ScrollTrigger.defaults({
            scroller: document.getElementsByClassName("page")[0],
        });

        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                App._instance._world._room?.roomScene.scale.set(0.5, 0.5, 0.5)
                App._instance._world._room?.roomScene.position.set(0, 0, 0)
                App._instance._camera.orthographicCamera.position.set(0, 5.65, 9)

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(
                        //         ".arrow-svg-wrapper", 
                        //         {
                        //             opacity: 0,
                        //         },
                        //     )
                        // }
                        // onEnter: () => {
                        // GSAP.to(window, {
                        //     scrollTo: '.first-section',
                        //     duration: 2,
                        // })
                        // }
                    },
                })
                    .from(App._instance._world._room?.roomScene.scale, {
                        x: 0.5, y: 0.5, z: 0.5
                    })
                    .from(App._instance._world._room?.roomScene.position, {
                        x: 0, y: 0, z: 0
                    })
                    .fromTo(
                        ".arrow-svg-wrapper",
                        {
                            opacity: 1,
                        },
                        {
                            opacity: 0,
                        },
                        "fadeout"
                    )
                    .to(App._instance._camera.orthographicCamera.position,
                        {
                            // y: 2.5,
                            x: -App._instance._sizes.width * 0.00065,
                            // z: 3,
                        },
                        "same"
                    );


                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.second-section',
                        //         duration: 2
                        //     })
                        // },
                        onToggle() {
                            GSAP.to(App._instance._world._room?.roomChildren.Toys.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                ease: "back.out(2.2)",
                            })
                        }
                    },
                })
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            x: -2.5,
                            y: 0,
                            z: App._instance._sizes.height * 0.0006
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 4.5,
                            y: 4.5,
                            z: 4.5,
                        },
                        "same"
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.third-section',
                        //         duration: 2
                        //     })
                        // }
                    }
                })
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 2,
                            y: 2,
                            z: 2,
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            x: 1.8,
                            y: 0,
                            z: App._instance._sizes.height * 0.0025
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomChildren.Pan.scale,
                        {
                            x: 1, y: 1, z: 1,
                            onComplete() {
                                App._instance._world._room?.setPanAnimation();
                            }
                        }
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.fourth-section',
                        //         duration: 2
                        //     })
                        // }
                    }
                })
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 2.5,
                            y: 2.5,
                            z: 2.5,
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            x: -2.3,
                            z: 6.3
                        },
                        "same"
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.fifth-section',
                        //         duration: 2
                        //     })
                        // }
                    },
                })
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 1,
                            y: 1,
                            z: 1,
                        },
                        "same"
                    )
                    .to(App._instance._world._room?.roomScene.position,
                        {
                            x: 0.8,
                            y: 0,
                            z: -2,
                            onComplete() {
                                GSAP
                                    .to(App._instance._world._room?.roomChildren.MailAndPrinter.scale, {
                                        x: 1,
                                        y: 1,
                                        z: 1,
                                        ease: "back.out(2.2)",
                                    })

                                GSAP.to(App._instance._world._room?.roomChildren.Paper.scale, {
                                    x: 1,
                                    y: 1,
                                    z: 1,
                                    ease: "back.out(2.2)",
                                    onComplete() {
                                        App._instance._world._room?.setPaperAnimation();
                                    }
                                })
                            }
                        },
                        "same"
                    )
            },
            // //Mobile
            "(max-width: 968px)": () => {
                App._instance._world._room?.roomScene.scale.set(0.25, 0.25, 0.25);
                App._instance._world._room?.roomScene.position.set(0, 0, -1);
                App._instance._camera.orthographicCamera.position.set(0, 5.65, 9);

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        // invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.first-section',
                        //         duration: 2,
                        //     })
                        // }
                    },
                })
                    .from(App._instance._world._room?.roomScene.scale, {
                        x: 0.25, y: 0.25, z: 0.25
                    })
                    .from(App._instance._world._room?.roomScene.position, {
                        x: 0, y: 0, z: -1
                    })
                    // .to(
                    //     ".arrow-svg-wrapper",
                    //     {
                    //         opacity: 0,
                    //     },
                    //     "fadeout"
                    // )
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 0.5,
                            y: 0.5,
                            z: 0.5,
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            // x: 0.5,
                            // y: 0.5,
                            z: 0.2,
                        },
                        "same"
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.second-section',
                        //         duration: 2
                        //     })
                        // },
                        onToggle() {
                            GSAP.to(App._instance._world._room?.roomChildren.Toys.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                ease: "back.out(2.2)",
                            })
                        }
                    },
                })
                    .from(App._instance._world._room?.roomScene.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5,
                    })
                    .from(App._instance._world._room?.roomScene.position, {
                        // x: 0,
                        // y: 0,
                        z: 0.2,
                    })
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 2.5,
                            y: 2.5,
                            z: 2.5,
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            x: -0.5,
                            // y: 0.5,
                            z: -0.5,
                        },
                        "same"
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {

                        //     GSAP.to(window, {
                        //         scrollTo: '.third-section',
                        //         duration: 2
                        //     })
                        // }
                    }
                })
                    .from(App._instance._world._room?.roomScene.scale, {
                        x: 2.5,
                        y: 2.5,
                        z: 2.5,
                    })
                    .from(App._instance._world._room?.roomScene.position, {
                        x: -0.5,
                        // y: 0.5,
                        z: -0.5,
                    })
                    .to(App._instance._world._room?.roomScene.scale,
                        {
                            x: 1,
                            y: 1,
                            z: 1,
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            x: 0.9,
                            // y: 0.5,
                            z: 0.5,
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomChildren.Pan.scale,
                        {
                            x: 1, y: 1, z: 1,
                            onComplete() {
                                App._instance._world._room?.setPanAnimation();
                            }
                        },
                        "same"
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        // App._instance._world._room?.setPanAnimation();
                        //     GSAP.to(window, {
                        //         scrollTo: '.fourth-section',
                        //         duration: 2
                        //     })
                        // }
                    }
                })
                    .from(App._instance._world._room?.roomScene.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                    })
                    .from(App._instance._world._room?.roomScene.position, {
                        x: 0.9,
                        // y: 0.5,
                        z: 0.5,
                    })
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 2,
                            y: 2,
                            z: 2
                        },
                        "same"
                    )
                    .to(
                        App._instance._world._room?.roomScene.position,
                        {
                            x: -0.6,
                            // y: 2,
                            z: 5
                        },
                        "same"
                    )

                GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fifth-move",
                        start: "top bottom",
                        end: "center top",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        // onEnter: () => {
                        //     GSAP.to(window, {
                        //         scrollTo: '.fifth-section',
                        //         duration: 2
                        //     })
                        // }
                    },
                })
                    .from(App._instance._world._room?.roomScene.scale, {
                        x: 2,
                        y: 2,
                        z: 2
                    })
                    .from(App._instance._world._room?.roomScene.position, {
                        x: -0.6,
                        // y: 2,
                        z: 5
                    })
                    .to(
                        App._instance._world._room?.roomScene.scale,
                        {
                            x: 0.75,
                            y: 0.75,
                            z: 0.75,
                        },
                        "same"
                    )
                    .to(App._instance._world._room?.roomScene.position,
                        {
                            x: 0.6,
                            y: 0,
                            z: -1.5,
                            onComplete() {
                                GSAP
                                    .to(App._instance._world._room?.roomChildren.MailAndPrinter.scale, {
                                        x: 1,
                                        y: 1,
                                        z: 1,
                                        ease: "back.out(2.2)",
                                    })

                                GSAP.to(App._instance._world._room?.roomChildren.Paper.scale, {
                                    x: 1,
                                    y: 1,
                                    z: 1,
                                    ease: "back.out(2.2)",
                                    onComplete() {
                                        App._instance._world._room?.setPaperAnimation();
                                    }
                                })
                            }
                        },
                        "same"
                    )
            }
        })
    }

    setScrollTriggerForMedia() {
        ScrollTrigger.matchMedia({
            all: () => {
                const sections = document.querySelectorAll(".section");
                sections.forEach((section) => {
                    const progressWrapper =
                        section.querySelector(".progress-wrapper");
                    const progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });
            }
        })
    }

    update() { }
}