// ============================================
// CORE: Show content & Initialize Libraries
// ============================================

// Show page content immediately
$(document).ready(function () {
    $('.loader-container').addClass('hidden');
    $('#page-content').addClass('visible');
    console.log('✓ Content loaded');
});

// Initialize AOS if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 100
    });
    console.log('✓ AOS initialized');
}

// ============================================
// SIMPLE SCROLL ANIMATIONS (No dependencies)
// ============================================

// Scroll animation for elements with data-aos attribute (native fallback)
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        const element = entry.target;
        const animation = element.getAttribute('data-aos');

        if (entry.isIntersecting) {
            if (animation) {
                element.classList.add('aos-animate');
                console.log(`✓ Animating: ${animation}`);
            }
            // Once animated, keep it animated (unobserve to prevent reset on scroll-up)
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all elements with data-aos, apply optional delay
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-aos]').forEach(el => {
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            const d = /ms|s$/i.test(delay) ? delay : `${delay}ms`;
            el.style.transitionDelay = d;
        }
        const duration = el.getAttribute('data-aos-duration');
        if (duration) {
            const dur = /ms|s$/i.test(duration) ? duration : `${duration}ms`;
            el.style.setProperty('--aos-duration', dur);
        }
        const easing = el.getAttribute('data-aos-easing');
        if (easing) {
            el.style.setProperty('--aos-ease', easing);
        }
        el.classList.add('aos-init');
        observer.observe(el);
    });
    console.log('✓ Scroll observer initialized');
});

// ============================================
// TYPEWRITER & ANIMATIONS
// ============================================

// Professions display with GSAP
let words = [ 'Software Engineer', 'Radiographer', 'Lecturer' ];
let mainTimeLine = gsap.timeline({ repeat: -1 });

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
    repeatDelay: 0.8
});
cursorTimeline
    .to('#cursor', { opacity: 1, duration: 0 })
    .to('#cursor', { opacity: 0, duration: 0, delay: 0.81 });

// ============================================
// SCROLL INTERACTIONS
// ============================================

// Scroll animations for experience cards
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

// Active section highlight on scroll
$(function () {
    const $sections = $('section');
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        let current = '';
        $sections.each(function () {
            const $sec = $(this);
            const top = $sec.offset().top;
            if (scrollTop >= top - 300) {
                current = $sec.attr('id');
            }
        });
        $('.nav-link').removeClass('active')
            .filter(`[href="#${current}"]`).addClass('active');
    });
});

// Handle nav link click
$(function () {
    $('.navbar .nav-link').on('click', function () {
        $('.navbar .nav-link').removeClass('active');
        $(this).addClass('active');
    });
});

// ============================================
// UTILITIES
// ============================================

// Set current year in footer
$(function () {
    $('#footerYear').text(new Date().getFullYear());
});

// YouTube link hover show
$(function () {
    const $toggle = $('.dmb');
    const $section = $('.dmsec');
    if ($toggle.length && $section.length) {
        $section.hide();
        $toggle.hover(
            () => $section.stop(true, true).fadeIn(150),
            () => $section.stop(true, true).fadeOut(300)
        );
    }
});

// Dark/Light Theme Toggle
$(function () {
    const $themeToggle = $('#themeToggle');
    const $html = $(document.documentElement);
    const $mainImage = $('#main_image');
    const $typewriter = $('#typewriter');
    const $cursor = $('#cursor');
    const $firstSpan = $('#h1').find('span:first');

    function updateMainImage (theme) {
        if (!$mainImage.length) return;
        $mainImage.attr('src', theme === 'light' ? '/asset/img/main_image_l.png' : '/asset/img/main_image.png');
    }

    function updateTypewriterColor (theme) {
        const color = '#F2B279';
        $typewriter.css('color', color);
        $cursor.css('color', color);
        $firstSpan.css('color', color);
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        $html.addClass('light-theme');
        $themeToggle.html('<i class="fas fa-sun"></i>');
        updateMainImage('light');
        updateTypewriterColor('light');
    } else {
        $themeToggle.html('<i class="fas fa-moon"></i>');
        updateMainImage('dark');
        updateTypewriterColor('dark');
    }

    $themeToggle.on('click', function () {
        if ($html.hasClass('light-theme')) {
            $html.removeClass('light-theme');
            localStorage.setItem('theme', 'dark');
            $themeToggle.html('<i class="fas fa-moon"></i>');
            updateMainImage('dark');
            updateTypewriterColor('dark');
        } else {
            $html.addClass('light-theme');
            localStorage.setItem('theme', 'light');
            $themeToggle.html('<i class="fas fa-sun"></i>');
            updateMainImage('light');
            updateTypewriterColor('light');
        }
    });
});

console.log('✓ myJs.js fully loaded');
