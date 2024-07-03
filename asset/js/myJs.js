



// professions display 
let words = [ 'Software Engineer', 'Radiographer', 'Lecturer' ];
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
//             // markers: true,
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

$(".navbar .nav-link").on("click", function () {
    $(".navbar").find(".active").removeClass("active");
    $(this).addClass("active");
});

// try to safe web site form copping

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});


document.addEventListener('keydown', (event) => {
    const forbiddenKeys = ['F12', 'Ctrl+Shift+I', 'Ctrl+Shift+J'];
    if (forbiddenKeys.includes(event.key)) {
        event.preventDefault();
    }
});

document.addEventListener('copy', (event) => {
    event.preventDefault();
});


/** TO DISABLE SCREEN CAPTURE **/
document.addEventListener('keyup', (e) => {
    if (e.key == 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
    }
});

/** TO DISABLE PRINTS WHIT CTRL+P **/
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'p') {
        alert('This section is not allowed to print or export to PDF');
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

/* TO DO: There are combinations that remain to be solved  --> Windows+Shift+S */
var before = new Date().getTime();
debugger;
var after = new Date().getTime();
if (after - before > 100) {
    // User had to resume the script manually via opened dev tools
    console.log("Developer tools are open");
    window.location.reload();
} else {
    console.log("Developer tools are closed");
}

/* youtube link show */

const dropdownToggle = document.querySelector('.dmb');
$('.dmsec').hide();
dropdownToggle.addEventListener('mouseenter', () => {
    $('.dmsec').show("slow");
});

dropdownToggle.addEventListener('mouseleave', () => {
    $('.dmsec').fadeOut(9999);
});


