module.exports = {
    content: [
        './index.html',
        './cv.html',
        './asset/js/**/*.js',
    ],
    css: [
        './asset/css/myCss.css'
    ],
    output: './asset/css/dist',
    safelist: {
        standard: [
            'aos-animate',
            'aos-init',
            'visible',
            'hidden',
            'active',
            'show',
            'collapse',
            'light-theme',
        ],
        greedy: [
            /data-aos/, // attribute-based AOS rules
            /aos-/,     // any AOS-related classes
            /animate__/, // Animate.css classes
            /fa-/,      // font awesome icons in case referenced indirectly
        ],
        deep: []
    }
};