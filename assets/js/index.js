gsap.config({ trialWarn: false });
// gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(ScrollTrigger);

// const split = new SplitText("p", { type: "lines" });

// split.lines.forEach((target) => {
//   gsap.to(target, {
//     backgroundPositionX: 0,
//     ease: "pwoer2",
//     scrollTrigger: {
//       trigger: target,
//       markers: true,
//       scrub: true,
//       start: "top center",
//       end: "bottom center",
//     },
//   });
// });
let boxes = gsap.utils.toArray(".projects__box");

gsap.to(boxes, {
  x: -300 * (boxes.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projects__box-wrapper",
    // pin: true,
    scrub: true,
    // snap: 1 / (boxes.length - 1),
    markers: true,
    start: "top center",
    end: "80% center",
    // end: () => "+=" + document.querySelector(".projects__box").offsetWidth,
    onEnter: () => console.log("onEnter"),
  },
});

gsap.to(".fa-brands", {
  y: -20,
  yoyo: true,
  duration: 0.7,
  stagger: {
    amount: 1,
    repeat: -1,
    yoyo: true,
    ease: "power2.in",
  },
});
