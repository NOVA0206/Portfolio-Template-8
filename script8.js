// Custom Cursor
const cursor = document.querySelector(".custom-cursor")
const cursorDot = document.querySelector(".cursor-dot")
const cursorOutline = document.querySelector(".cursor-outline")

let mouseX = 0
let mouseY = 0
let outlineX = 0
let outlineY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  cursorDot.style.left = mouseX + "px"
  cursorDot.style.top = mouseY + "px"
})

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.1
  outlineY += (mouseY - outlineY) * 0.1

  cursorOutline.style.left = outlineX + "px"
  cursorOutline.style.top = outlineY + "px"

  requestAnimationFrame(animateOutline)
}
animateOutline()

// Cursor hover effects
const hoverElements = document.querySelectorAll("a, button, .project-card, .skill-category")
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(2)"
    cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
  })

  el.addEventListener("mouseleave", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
    cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
  })
})

// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.9)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add animation classes and observe elements
document.addEventListener("DOMContentLoaded", () => {
  // Animate sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Animate skill categories
  const skillCategories = document.querySelectorAll(".skill-category")
  skillCategories.forEach((category, index) => {
    category.classList.add("slide-in-left")
    setTimeout(() => observer.observe(category), index * 200)
  })

  // Animate project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.classList.add("scale-in")
    setTimeout(() => observer.observe(card), index * 300)
  })

  // Animate contact items
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item, index) => {
    item.classList.add("slide-in-right")
    setTimeout(() => observer.observe(item), index * 200)
  })
})

// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number")
  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector(".about")
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        aboutObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (aboutSection) {
  aboutObserver.observe(aboutSection)
}

// Skills progress animation
const animateSkills = () => {
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      const level = item.getAttribute("data-level")
      const progressBar = item.querySelector(".skill-progress")
      progressBar.style.width = level + "%"
    }, index * 200)
  })
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector(".skills")
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills()
        skillsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.3 },
)

if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Hero button interactions
const exploreBtn = document.getElementById("exploreBtn")
const contactBtn = document.getElementById("contactBtn")

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({
      behavior: "smooth",
    })
  })
}

if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    })
  })
}

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all fields")
      return
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.querySelector("span").textContent

    submitBtn.querySelector("span").textContent = "Sending..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Message sent successfully! I'll get back to you soon.")
      contactForm.reset()
      submitBtn.querySelector("span").textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  const avatarRings = document.querySelectorAll(".ring")

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
  }

  avatarRings.forEach((ring, index) => {
    const speed = 0.1 + index * 0.05
    ring.style.transform = `translate(-50%, -50%) rotate(${scrolled * speed}deg)`
  })
})

// Add floating animation to particles
const createFloatingParticles = () => {
  const particlesContainer = document.querySelector(".floating-particles")

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? "#ff6b6b" : "#4ecdc4"};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `

    particlesContainer.appendChild(particle)
  }
}

// Add CSS for particle animation
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Initialize particles
createFloatingParticles()

// Add typing effect to hero title
const typeWriter = (element, text, speed = 100) => {
  let i = 0
  element.textContent = ""

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const titleLines = document.querySelectorAll(".title-line")
  if (titleLines.length > 0) {
    setTimeout(() => typeWriter(titleLines[0], "UI/UX", 150), 1000)
    setTimeout(() => typeWriter(titleLines[1], "Developer", 150), 2500)
  }
})

// Add glitch effect to logo on hover
const logo = document.querySelector(".logo-text")
if (logo) {
  logo.addEventListener("mouseenter", () => {
    logo.style.animation = "glitch 0.5s ease-in-out"
  })

  logo.addEventListener("animationend", () => {
    logo.style.animation = ""
  })
}

// Add glitch animation CSS
const glitchStyle = document.createElement("style")
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`
document.head.appendChild(glitchStyle)

// Add matrix rain effect
const createMatrixRain = () => {
  const matrixContainer = document.querySelector(".matrix-rain")
  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

  for (let i = 0; i < 20; i++) {
    const column = document.createElement("div")
    column.style.cssText = `
            position: absolute;
            left: ${i * 5}%;
            top: -100%;
            color: #4ecdc4;
            font-family: monospace;
            font-size: 14px;
            animation: matrixDrop ${Math.random() * 5 + 5}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `

    let text = ""
    for (let j = 0; j < 20; j++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length)) + "<br>"
    }
    column.innerHTML = text

    matrixContainer.appendChild(column)
  }
}

// Add matrix drop animation
const matrixStyle = document.createElement("style")
matrixStyle.textContent = `
    @keyframes matrixDrop {
        0% {
            top: -100%;
            opacity: 1;
        }
        100% {
            top: 100%;
            opacity: 0;
        }
    }
`
document.head.appendChild(matrixStyle)

// Initialize matrix rain
createMatrixRain()

// Add 3D tilt effect to project cards
const projectCards = document.querySelectorAll(".project-card")
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)"
  })
})

// Add sound effects (optional - requires audio files)
const playSound = (soundName) => {
  // This would play sound effects if audio files were available
  // const audio = new Audio(`sounds/${soundName}.mp3`);
  // audio.play().catch(e => console.log('Audio play failed:', e));
}

// Add click sound to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => playSound("click"))
})

console.log("🎌 Anime Portfolio Loaded Successfully! 忍者の力が覚醒した！")
