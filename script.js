// script.js

document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.querySelector('.background-animation-container');
    const glyphs = ['💖', '👑', '🔪', '🕷️', '⭐']; // Your chosen glyphs
    const glyphClasses = ['glyph-heart', 'glyph-crown', 'glyph-kunai', 'glyph-spiderweb', 'glyph-star'];

    function createGlyph() {
        const glyphElement = document.createElement('div');
        glyphElement.classList.add('glyph');

        const randomIndex = Math.floor(Math.random() * glyphs.length);
        glyphElement.textContent = glyphs[randomIndex];
        glyphElement.classList.add(glyphClasses[randomIndex]);

        const startX = Math.random() * window.innerWidth;
        const startY = -50; 

        const endX = startX + (Math.random() - 0.5) * 200; 
        const endY = window.innerHeight + 50; 

        const duration = 5 + Math.random() * 5; // Between 5 and 10 seconds
        const opacity = 0.2 + Math.random() * 0.5; // Between .2 and .7

        glyphElement.style.left = `${startX}px`;
        glyphElement.style.top = `${startY}px`;
        glyphElement.style.opacity = opacity;
        glyphElement.style.animationDuration = `${duration}s`;
        glyphElement.style.animationDelay = `${Math.random() * 2}s`; 
        glyphElement.style.animationTimingFunction = 'linear';
        glyphElement.style.animationIterationCount = 'infinite';

        glyphElement.style.setProperty('--endX', `${endX - startX}px`); // Delta X
        glyphElement.style.setProperty('--endY', `${endY - startY}px`); // Delta Y


        glyphElement.style.animationName = 'fadeAndMove';


        animationContainer.appendChild(glyphElement);

        glyphElement.addEventListener('animationend', () => {
            glyphElement.remove();
        });
    }

    setInterval(createGlyph, 500); // Create a new glyph every 500 miliseconds

    for (let i = 0; i < 20; i++) {
        setTimeout(createGlyph, i * 200); 
    }

    // --- Portfolio Page  ---

    // Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) { // Check if carousel exists on the page
        const carouselItems = Array.from(carouselTrack.children);
        let currentIndex = 0;
        const totalItems = carouselItems.length;

        const updateCarousel = () => {
            const itemWidth = carouselItems[0].getBoundingClientRect().width;
            carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        };

        const goToNext = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        };

        document.querySelector('.prev-btn')?.addEventListener('click', goToPrev);
        document.querySelector('.next-btn')?.addEventListener('click', goToNext);

        // Optional: Auto-play carousel
        setInterval(goToNext, 5000); // Change image every 5 seconds
    }

    // Image Zoom Feature
    const zoomOverlay = document.querySelector('.zoom-overlay');
    const zoomedImage = document.querySelector('.zoomed-image');
    const zoomCaption = document.querySelector('.zoom-caption');
    const zoomCloseBtn = document.querySelector('.zoom-close-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const fullImgSrc = item.dataset.fullImg;
            const captionText = item.querySelector('.artwork-title')?.textContent || item.alt || 'Artwork';

            if (fullImgSrc) {
                zoomedImage.src = fullImgSrc;
                zoomCaption.textContent = captionText;
                zoomOverlay.classList.add('active');
            }
        });
    });

    zoomCloseBtn?.addEventListener('click', () => {
        zoomOverlay.classList.remove('active');
        zoomedImage.src = ''; // Clear image to prevent memory issues
        zoomCaption.textContent = '';
    });

    // Close zoom overlay when clicking outside
    zoomOverlay?.addEventListener('click', (event) => {
        if (event.target === zoomOverlay) {
            zoomOverlay.classList.remove('active');
            zoomedImage.src = '';
            zoomCaption.textContent = '';
        }
    });

    // Close zoom overlay with Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && zoomOverlay.classList.contains('active')) {
            zoomOverlay.classList.remove('active');
            zoomedImage.src = '';
            zoomCaption.textContent = '';
        }
    });

    // Function to update line numbers on the post page
    function updateLineNumbers() {
        const editorTextArea = document.querySelector('.editor-text-area');
        const lineNumbersContainer = document.querySelector('.line-numbers');

        if (editorTextArea && lineNumbersContainer) {
            lineNumbersContainer.innerHTML = '';

            const textBlocks = editorTextArea.querySelectorAll('p, h2, h3, h4, li, blockquote, div:not(.blinking-cursor)');

            let lineNumber = 1;
            textBlocks.forEach(block => {
                // For each detected block, create a new <span> for the line number
                const lineSpan = document.createElement('span');
                lineSpan.textContent = lineNumber;
                lineNumbersContainer.appendChild(lineSpan);
                lineNumber++;
            });
        }
    }

    console.log('DOM Content Loaded. Running scripts.'); // Confirmation from DOM

    function updateLineNumbers() {
        const editorTextArea = document.querySelector('.editor-text-area');
        const lineNumbersContainer = document.querySelector('.line-numbers');

        console.log('updateLineNumbers function called.');
        console.log('editorTextArea found:', editorTextArea); 
        console.log('lineNumbersContainer found:', lineNumbersContainer);

        if (editorTextArea && lineNumbersContainer) {
            console.log('Both editorTextArea and lineNumbersContainer found. Proceeding with line number generation.');
            lineNumbersContainer.innerHTML = ''; 

            const textBlocks = editorTextArea.querySelectorAll('p, h2, h3, h4, li, blockquote, div:not(.blinking-cursor)');
            console.log('Number of text blocks found:', textBlocks.length); 
            console.log('Text blocks:', textBlocks); 
            let lineNumber = 1;
            if (textBlocks.length > 0) {
                textBlocks.forEach(block => {
                    if (block.classList.contains('blinking-cursor')) {
                        return;
                    }
                    const lineSpan = document.createElement('span');
                    lineSpan.textContent = lineNumber;
                    lineNumbersContainer.appendChild(lineSpan);
                    lineNumber++;
                });
                console.log(`Line numbers successfully generated. Total lines: ${lineNumber - 1}`);
            } else {
                console.log('No content blocks found in editor-text-area. Line numbers will not be generated.');
            }
        } else {
            console.log('One or both elements for line numbers not found. This page might not be a post page.');
        }
    }

    // Call this function when the DOM is fully loaded!
    updateLineNumbers();

});