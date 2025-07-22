 // Preloader
 window.addEventListener('load', function() {
  setTimeout(function() {
      document.querySelector('.preloader').style.opacity = '0';
      setTimeout(function() {
          document.querySelector('.preloader').style.display = 'none';
      }, 500);
  }, 1500);
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
});

// Initialize Swiper with 3D effects
const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
      rotate: 5,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
  },
  breakpoints: {
      768: {
          coverflowEffect: {
              rotate: 10,
              stretch: -50,
              depth: 150,
          }
      }
  }
});

// WhatsApp Form
const whatsappForm = document.getElementById('whatsappForm');
whatsappForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const eventType = document.getElementById('eventType').value;
  const name = e.target[1].value;
  const email = e.target[2].value;
  const phone = e.target[3].value;
  const message = `Hi Beccahunmy! I'm ${name} planning a ${eventType}. ${e.target[4].value} (Contact: ${phone} | ${email})`;
  window.open(`https://wa.me/234957572369?text=${encodeURIComponent(message)}`, '_blank');
});

// Date Picker
flatpickr("#datepicker", {
  minDate: "today",
  dateFormat: "Y-m-d",
});

// Guest Counter
const guestSlider = document.getElementById('guestSlider');
const guestCount = document.getElementById('guestCount');
guestSlider.addEventListener('input', () => {
  guestCount.textContent = guestSlider.value;
});

// Quote Calculator
const calculateBtn = document.getElementById('calculateBtn');
const quoteResult = document.getElementById('quoteResult');

calculateBtn.addEventListener('click', () => {
  const guests = parseInt(guestSlider.value);
  let basePrice;
  
  if (guests < 100) basePrice = 50000;
  else if (guests < 200) basePrice = 80000;
  else basePrice = 120000;
  
  quoteResult.innerHTML = `
      <h4>Estimated Cost: #${basePrice.toLocaleString()}+</h4>
      <p>Includes planning, decor, and basic cake for ${guests} guests.</p>
      <p>For exact pricing, please contact us.</p>
  `;
  quoteResult.style.display = 'block';
});

// Animated Counters with visible counting
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const updateCounter = () => {
      current += increment;
      if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
      } else {
          element.textContent = target;
      }
  };
  
  updateCounter();
};

// Initialize counters when they come into view
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
      }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});

// Scroll Reveal Animation
const sections = document.querySelectorAll('section');

function checkScroll() {
  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
      }
  });
}

// Initialize all sections as hidden
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', checkScroll);
checkScroll(); // Run once on load