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
        if (link.getAttribute('href') === `#${current}`) {
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

// Vanilla JS: Handle active nav link on click
document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.navbar .nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// (Intentionally allow copy/print and dev tools to keep UX friendly)

/* youtube link show */

const dropdownToggle = document.querySelector('.dmb');
const dropdownSection = document.querySelector('.dmsec');

if (dropdownToggle && dropdownSection) {
    dropdownSection.style.display = 'none';

    dropdownToggle.addEventListener('mouseenter', () => {
        dropdownSection.style.display = 'block';
        dropdownSection.style.opacity = '1';
    });

    dropdownToggle.addEventListener('mouseleave', () => {
        dropdownSection.style.opacity = '0';
        setTimeout(() => {
            dropdownSection.style.display = 'none';
        }, 300);
    });
}

// Dark/Light Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        htmlElement.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('light-theme')) {
            htmlElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            htmlElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});
