// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links li a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

    // Destination Slider
    const sliderWrapper = document.querySelector(".slider-wrapper")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
  
    if (sliderWrapper && prevBtn && nextBtn) {
      const cards = document.querySelectorAll(".destination-card")
      let cardIndex = 0
      let cardWidth = 0
      let cardsPerView = 4
  
      // Function to update cards per view based on screen width
      function updateCardsPerView() {
        if (window.innerWidth > 992) {
          cardsPerView = 4
        } else if (window.innerWidth > 768) {
          cardsPerView = 3
        } else if (window.innerWidth > 576) {
          cardsPerView = 2
        } else {
          cardsPerView = 1
        }
  
        // Update card width
        if (cards.length > 0) {
          const card = cards[0]
          cardWidth = card.offsetWidth + Number.parseInt(getComputedStyle(card).marginLeft) * 2
          moveSlider()
        }
      }
  
      // Initialize cards per view
      updateCardsPerView()
  
      // Update on window resize
      window.addEventListener("resize", updateCardsPerView)
  
      // Function to move the slider
      function moveSlider() {
        sliderWrapper.style.transform = `translateX(-${cardIndex * cardWidth}px)`
      }
  
      // Previous button click
      prevBtn.addEventListener("click", () => {
        cardIndex = Math.max(0, cardIndex - 1)
        moveSlider()
      })
  
      // Next button click
      nextBtn.addEventListener("click", () => {
        cardIndex = Math.min(cards.length - cardsPerView, cardIndex + 1)
        moveSlider()
      })
    }
  
    // Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
    let currentTestimonial = 0
  
    if (testimonials.length > 0 && dots.length > 0) {
      // Function to show testimonial
      function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach((testimonial) => {
          testimonial.classList.remove("active")
        })
  
        // Hide all dots
        dots.forEach((dot) => {
          dot.classList.remove("active")
        })
  
        // Show current testimonial and dot
        testimonials[index].classList.add("active")
        dots[index].classList.add("active")
  
        currentTestimonial = index
      }
  
      // Initialize first testimonial
      showTestimonial(0)
  
      // Add click event to dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index)
        })
      })
  
      // Auto slide testimonials
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length
        showTestimonial(currentTestimonial)
      }, 5000)
    }
  
    // Form Validation
    const contactForm = document.getElementById("contact-form")
    const newsletterForm = document.getElementById("newsletter-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simple validation
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        if (name && email && subject && message) {
          // In a real application, you would send this data to a server
          alert("Thank you for your message! We will get back to you soon.")
          contactForm.reset()
        } else {
          alert("Please fill in all fields.")
        }
      })
    }
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const email = newsletterForm.querySelector('input[type="email"]').value
  
        if (email) {
          // In a real application, you would send this data to a server
          alert("Thank you for subscribing to our newsletter!")
          newsletterForm.reset()
        } else {
          alert("Please enter your email address.")
        }
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
  
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for header height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add active class to nav links based on scroll position
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
  
      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add("active")
        } else {
          document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove("active")
        }
      })
    })
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".destination-card, .package-card, .section-title, .contact-form, .contact-info",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Set initial styles for animation
    document
      .querySelectorAll(".destination-card, .package-card, .section-title, .contact-form, .contact-info")
      .forEach((element) => {
        element.style.opacity = "0"
        element.style.transform = "translateY(20px)"
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      })
  
    // Run animation on load and scroll
    window.addEventListener("load", animateOnScroll)
    window.addEventListener("scroll", animateOnScroll)
  })
  
  