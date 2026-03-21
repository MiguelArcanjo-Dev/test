// --- REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));


// --- CAROUSEL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cards = document.querySelectorAll('.user');

  if (track && prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = 0;
    const gap = 24; // the gap between items in CSS (flex gap)

    const updateCarousel = () => {
      if (cards.length === 0) return;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const moveAmount = cardWidth + gap;
      
      track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
      updateButtons();
    };

    const getVisibleCards = () => {
      if (cards.length === 0) return 1;
      const trackParentWidth = track.parentElement.getBoundingClientRect().width;
      const cardWidthWithGap = cards[0].getBoundingClientRect().width + gap;
      return Math.floor((trackParentWidth + gap) / cardWidthWithGap);
    };

    const updateButtons = () => {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    };

    nextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);

      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);

      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex; // Loop to end
      }
      updateCarousel();
    });

    // Handle resize to adjust carousel layout
    window.addEventListener('resize', () => {
      // Keep index valid
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      // Temporarily disable transition during resize for smoothness
      track.style.transition = 'none';
      updateCarousel();
      // Restore transition
      setTimeout(() => {
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      }, 50);
    });

    // Initial setup
    updateButtons();
  }
});

// Smooth scroll for nav anchor links
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // nav height roughly
        behavior: 'smooth'
      });
    }
  });
});