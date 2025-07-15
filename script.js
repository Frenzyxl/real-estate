// Image Slider Functionality
let currentSlide = 0;
let slides = [];
let dots = [];
let modalCurrentSlide = 0;

// List of images in the images folder
const imageFiles = [
    '2e284316-b3a3-4b57-8d01-34c6b8ed2ccc.JPG',
    '4042d9ec-f338-473f-abb1-e25b357782c9.JPG',
    '6f2c75a5-60a5-40d0-82c3-cc9de0ed4f6f.JPG',
    '76d97896-8e3d-492a-9f3b-6830c17a2eaf.JPG',
    '83327b9d-9c52-4db5-9534-3022dd512b65.JPG',
    '85d8441d-aa56-4e89-915f-bbbe38107545.JPG',
    '96183d2e-8ea7-415e-b66b-887a5a314269.JPG',
    '9c0628f9-9886-4e66-ac1d-3cea96a03baa.JPG',
    'add1f3c7-aa49-4de7-be19-a7a8ef150547.JPG',
    'aecf8918-6479-464c-9cef-14c92fce9a27.JPG',
    'b557a4f3-e85d-4132-8dd3-f839cbb3f796.JPG',
    'b5fa0cfd-bc43-4d6e-be12-c4898470da0b.JPG',
    'bd861112-25ef-47dc-abe7-f3b935beaf91_1.JPG',
    'bec6454e-fc24-44ba-a118-7f68af4bcc6a.JPG',
    'ceabb741-845e-40aa-8016-9cd4b8772c91.JPG',
    'cfb277a6-9076-4d25-a834-b7146911c848_1.JPG',
    '112c2aed-8640-40f1-96cb-ade91366b292.JPG',
    'd08fd985-a900-42ee-af50-751df3683d88.JPG',
    'd48ec4b5-55ff-400d-bdf0-964824e686ca.JPG',
    'f5a07a3c-958d-4e4a-a837-af30553aaf2f.JPG',
    'ff2e6411-1f3e-4492-98f9-206ce8dbe3ad.JPG',
    'ff30e313-a5f2-4886-bef2-a281cbe010ee.JPG'
];

// Create slider elements dynamically
function createSlider() {
    const sliderContainer = document.getElementById('imageSlider');
    const dotsContainer = document.getElementById('sliderDots');
    const sliderParentContainer = document.querySelector('.slider-container');
    
    if (!sliderContainer || !dotsContainer || !sliderParentContainer) {
        console.error('Slider containers not found!');
        return;
    }
    
    // Clear existing content
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Remove any existing view gallery button
    const existingButton = sliderParentContainer.querySelector('.view-gallery-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Create only the first slide
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide active';
    
    // Create image element
    const img = document.createElement('img');
    img.src = `images/${imageFiles[0]}`;
    img.alt = 'Property Image';
    img.loading = 'lazy';
    
    // Add error handling for images
    img.onerror = function() {
        console.error('Failed to load image:', imageFiles[0]);
        this.style.display = 'none';
        this.parentElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666;">Image not found</div>';
    };
    
    slideDiv.appendChild(img);
    sliderContainer.appendChild(slideDiv);
    
    // Create View Gallery button
    const viewGalleryBtn = document.createElement('button');
    viewGalleryBtn.className = 'view-gallery-btn';
    viewGalleryBtn.innerHTML = '<i class="fas fa-images"></i> View Gallery';
    viewGalleryBtn.addEventListener('click', () => openModal(0));
    
    sliderParentContainer.appendChild(viewGalleryBtn);
    
    // Update references
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    
}

// Initialize slider
function initSlider() {
    createSlider();
}

// Show specific slide
function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Change slide
function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

// Go to specific slide
function goToSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling (commented out since no form exists)
// document.querySelector('form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     // Form handling code would go here
// });

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize slider
    initSlider();
    
    // Preload images
    preloadImages();
    
    // Add animation to elements
    const animatedElements = document.querySelectorAll('.overview-card, .contact-card, .contact-form, .contact-info-detailed');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add click handlers for dots (will be added after slider creation)
    setTimeout(() => {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index + 1));
        });
    }, 100);
    
    // Add keyboard navigation for slider
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Preload images for better performance
function preloadImages() {
    imageFiles.forEach(imageFile => {
        const img = new Image();
        img.src = `images/${imageFile}`;
    });
}

// Initialize preloading
preloadImages();

// Modal Functions
function openModal(slideIndex) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const currentNumber = document.getElementById('currentImageNumber');
    const totalImages = document.getElementById('totalImages');
    
    modalCurrentSlide = slideIndex;
    modalImg.src = `images/${imageFiles[slideIndex]}`;
    currentNumber.textContent = slideIndex + 1;
    totalImages.textContent = imageFiles.length;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeModalSlide(direction) {
    modalCurrentSlide += direction;
    
    if (modalCurrentSlide >= imageFiles.length) {
        modalCurrentSlide = 0;
    }
    if (modalCurrentSlide < 0) {
        modalCurrentSlide = imageFiles.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    const currentNumber = document.getElementById('currentImageNumber');
    
    modalImg.src = `images/${imageFiles[modalCurrentSlide]}`;
    currentNumber.textContent = modalCurrentSlide + 1;
} 