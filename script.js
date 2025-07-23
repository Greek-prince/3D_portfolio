// --- Preloader and Home Page Entrance Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const preloaderDynamicText = document.getElementById('preloader-dynamic-text');
    const preloaderAiImage = document.getElementById('preloader-ai-image');
    const mainContent = document.getElementById('main-content');
    const navbar = document.querySelector('.navbar');

    // Initially hide main content and navbar
    mainContent.classList.add('hidden');
    navbar.classList.add('hidden');

    // Show preloader
    preloader.classList.remove('hidden');
    // Ensure AI image is initially hidden and reset its animation state
    preloaderAiImage.style.opacity = '0';
    preloaderAiImage.style.transform = 'scale(0.8)';
    preloaderAiImage.style.animation = 'none'; // Clear any previous animation

    // Phase 1: Initial "Ayan Ghosh" text and spinner are visible (from HTML)
    // The pulse animation on preloaderDynamicText is active from CSS

    // Phase 2: After 1 second, start AI image reveal and text transition
    setTimeout(() => {
        // Stop pulse animation on text
        preloaderDynamicText.classList.remove('animate-pulse-fade');
        // Fade out current text
        preloaderDynamicText.style.opacity = '0';

        // Animate AI image in
        preloaderAiImage.style.animation = 'ai-image-grow-fade 0.7s ease-out forwards';

        // After text fades out, change it and fade in the new text
        setTimeout(() => {
            preloaderDynamicText.textContent = 'Ayan_portfolio ✨'; // Change text and add emoji
            preloaderDynamicText.style.opacity = '1'; // Fade in new text
        }, 500); // This delay is relative to the current setTimeout (1000ms + 500ms = 1.5s total)

    }, 1000); // After 1 second, start the text transition and AI image reveal

    // Phase 3: Hide preloader and show main content after total duration
    setTimeout(() => {
        preloader.classList.add('hidden'); // Fade out preloader
        mainContent.classList.remove('hidden'); // Show main content
        navbar.classList.remove('hidden'); // Show navbar
    }, 2500); // Total preloader duration (2.5 seconds)
});


// --- Modal Functions (removed as sections are now inline) ---
// These functions are no longer needed for showing/hiding sections as modals.
// They are kept here commented out for reference in case you decide to revert.
/*
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}
*/

// Function to display project details (now directly on the page, not in a modal)
// This function is adjusted to filter projects on the main page.
function filterProjects(filter) {
    const projectItems = document.querySelectorAll('#projects .project-item'); // Target projects in the #projects section
    const filterButtons = document.querySelectorAll('#projects .btn-primary, #projects .btn-secondary'); // Target buttons within #projects

    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.replace('btn-secondary', 'btn-primary');
        } else {
            btn.classList.replace('btn-primary', 'btn-secondary');
        }
    });

    projectItems.forEach(item => {
        const categories = item.dataset.categories.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block'; // Show the item
        } else {
            item.style.display = 'none'; // Hide the item
        }
    });
}


// --- Event Listeners for UI elements ---
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove '#'
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Hide mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Initial project filtering on page load (show all by default)
    filterProjects('all');

    // Intersection Observer for scroll animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up-active'); // Add class to trigger animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});
