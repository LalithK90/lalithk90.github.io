// page loader
const loaderContainer = document.querySelector('.loader-container');
const pageContent = document.querySelector('#page-content');
window.addEventListener('load', () => {
    loaderContainer.classList.add('hidden');
    pageContent.classList.add('visible');
});
let currentYear = new Date();
let fullYear = currentYear.getFullYear();
document.querySelector("#footerYear").textContent = fullYear;

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

// Modern Scroll Interactions
gsap.utils.toArray(".experience-card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top center+=100",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 50,
    duration: 0.8
  });
});

// Dynamic Active Section Highlight
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

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

// Security features remain unchanged
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


