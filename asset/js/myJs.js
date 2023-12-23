



// professions display 
let words = [ 'Director', 'Software Engineer', 'Radiographer', 'Lecturer' ];
//main timeline
let mainTimeLine = gsap.timeline({
    repeat: -1
});
// For each word, create a new timeline, use the Text plugin, then append that timeline to the main one;

words.forEach(word => {
    let textTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 6
    });
    textTimeline.to('#typewriter', {
        text: word,
        duration: 1,
        onUpdate: () => {
            cursorTimeline.restart();
            cursorTimeline.pause();
        },
        onComplete: () => {
            cursorTimeline.play();
        }
    });
    mainTimeLine.add(textTimeline);
});
// Blinking cursor
let cursorTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: .8
});
cursorTimeline.to('#cursor', {
    opacity: 1,
    duration: 0
}).to('#cursor', {
    opacity: 0,
    duration: 0,
    delay: .81
});

// to load section
// const entries = document.querySelectorAll('.entry');
// entries.forEach(entry => {
//     let entryMeta = entry.querySelector('.entry__meta');
//     let entryMedia = entry.querySelector('.entry__media');

//     let tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: entry,
//             start: 'top bottom',
//             end: 'bottom 90%',
//             scrub: true,
//             markers: true,
//         }
//     });
//     tl.fromTo(entryMeta, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 });
//     tl.fromTo(entryMedia, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1 }, '<');
// });

// lenis smooth scroll
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
})

