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
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const serviceType = document.getElementById('serviceType').value;
    const name = e.target[1].value;
    const email = e.target[2].value;
    const phone = e.target[3].value;
    const message = e.target[4].value;
    const whatsappMessage = `Hi Beccaphunmy Events! I'm ${name} interested in ${serviceType} service. ${message} (Contact: ${phone} | ${email})`;
    window.open(`https://wa.me/2349057572369?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
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
            element.textContent = target + (element.getAttribute('data-target').includes('+') ? '+' : '');
        }
    };
    
    updateCounter();
  };

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize datepicker
    flatpickr("#eventDate", {
        minDate: "today",
        dateFormat: "Y-m-d",
    });

    // Update guest count display
    const guestSlider = document.getElementById('guestCount');
    const guestDisplay = document.getElementById('guestDisplay');
    
    guestSlider.addEventListener('input', function() {
        guestDisplay.textContent = this.value;
    });

    // Calculate quote
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const eventType = document.getElementById('eventType').value;
        const guestCount = parseInt(guestSlider.value);
        const fullPlanning = document.getElementById('fullPlanning').checked;
        const dayCoordination = document.getElementById('dayCoordination').checked;
        
        if (!eventType) {
            alert('Please select an event type');
            return;
        }

        // Base prices (in Naira)
        const basePrices = {
            wedding: 250000,
            corporate: 300000,
            birthday: 150000,
            social: 180000
        };

        // Calculate base price
        let basePrice = basePrices[eventType];
        
        // Adjust for guest count (50k per 50 guests)
        const guestAdjustment = Math.floor(guestCount / 50) * 50000;
        basePrice += guestAdjustment;

        // Add services
        let services = [];
        let total = basePrice;
        
        if (fullPlanning) {
            const planningFee = 150000;
            services.push({ name: "Full Planning", price: planningFee });
            total += planningFee;
        }
        
        if (dayCoordination) {
            const coordinationFee = 75000;
            services.push({ name: "Day Coordination", price: coordinationFee });
            total += coordinationFee;
        }

        // Display results
        const resultDiv = document.getElementById('quoteResult');
        resultDiv.innerHTML = `
            <h3>Your Estimated Quote</h3>
            <div class="quote-details">
                <div>
                    <span>${eventType.charAt(0).toUpperCase() + eventType.slice(1)} (${guestCount} guests)</span>
                    <span>₦${basePrice.toLocaleString()}</span>
                </div>
                ${services.map(service => `
                    <div>
                        <span>${service.name}</span>
                        <span>+₦${service.price.toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            <div class="quote-total">
                <span>Total Estimate</span>
                <span>₦${total.toLocaleString()}</span>
            </div>
            <p class="note">Contact us for exact pricing and availability</p>
        `;
        
        resultDiv.style.display = 'block';
    });
  });

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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
      });
  });
