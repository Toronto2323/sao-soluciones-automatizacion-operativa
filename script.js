const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobileMenu");
const spotlight = document.querySelector(".spotlight");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const counters = document.querySelectorAll(".counter");
const tiltCards = document.querySelectorAll(".tilt-card");
const canvas = document.querySelector("#particles");
const ctx = canvas.getContext("2d");

let particles = [];

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("visible");
    }
  });
};

const animateCounters = () => {
  counters.forEach((counter) => {
    if (counter.dataset.done === "true") return;

    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 48));

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = target;
        counter.dataset.done = "true";
        return;
      }

      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
};

const handleMouseMove = (event) => {
  const x = event.clientX;
  const y = event.clientY;

  spotlight.style.setProperty("--x", `${x}px`);
  spotlight.style.setProperty("--y", `${y}px`);

  cursorDot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  cursorRing.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
};

const setupCursorInteractions = () => {
  const interactiveElements = document.querySelectorAll("a, button, .tilt-card");

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorRing.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("active");
    });
  });
};

const setupTiltCards = () => {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });
};

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const createParticles = () => {
  particles = Array.from({ length: 46 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8 + 0.4,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.45 + 0.12
  }));
};

const drawParticles = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 177, 139, ${particle.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
};

menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("mousemove", handleMouseMove);

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

window.addEventListener("load", () => {
  revealOnScroll();
  animateCounters();
  setupCursorInteractions();
  setupTiltCards();
  resizeCanvas();
  createParticles();
  drawParticles();

  if (window.lucide) {
    lucide.createIcons({
      attrs: {
        "stroke-width": 1.8
      }
    });
  }
});

const hoursInput = document.querySelector("#hoursInput");
const methodInput = document.querySelector("#methodInput");
const frequencyInput = document.querySelector("#frequencyInput");
const savingPercent = document.querySelector("#savingPercent");
const hoursSaved = document.querySelector("#hoursSaved");
const recommendedMethod = document.querySelector("#recommendedMethod");

const calculateSimulator = () => {
  if (!hoursInput || !methodInput || !frequencyInput) return;

  const hours = Number(hoursInput.value);
  const method = methodInput.value;
  const frequency = frequencyInput.value;

  let baseSaving = 35;

  if (method === "manual") baseSaving += 25;
  if (method === "semi") baseSaving += 15;
  if (method === "system") baseSaving += 8;

  if (frequency === "daily") baseSaving += 15;
  if (frequency === "weekly") baseSaving += 8;
  if (frequency === "monthly") baseSaving += 3;

  const finalSaving = Math.min(baseSaving, 82);
  const monthlyHours = hours * 4;
  const savedHours = Math.round(monthlyHours * (finalSaving / 100));

  savingPercent.textContent = finalSaving;
  hoursSaved.textContent = savedHours;

  if (hours <= 10 && method !== "system") {
    recommendedMethod.textContent = "Macro inteligente";
  } else if (method === "system") {
    recommendedMethod.textContent = "Dashboard / integración";
  } else {
    recommendedMethod.textContent = "App + flujo automático";
  }
};

[hoursInput, methodInput, frequencyInput].forEach((input) => {
  input?.addEventListener("change", calculateSimulator);
});

calculateSimulator();

// Global navigation and profile preview v2
const setupProfessionalNavigation = () => {
  const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
  const header = document.querySelector('.header-pro');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobileMenu');
  let closeTimer = null;

  if (!dropdowns.length) return;

  const isTouchLike = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

  const closeAllDropdowns = (except = null) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('open', 'is-open', 'is-closing');
      dropdown.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
    });
  };

  const openDropdown = (dropdown) => {
    window.clearTimeout(closeTimer);
    closeAllDropdowns(dropdown);
    dropdown.classList.add('open', 'is-open');
    dropdown.classList.remove('is-closing');
    dropdown.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'true');
  };

  const closeDropdown = (dropdown, delay = 110) => {
    window.clearTimeout(closeTimer);
    dropdown.classList.add('is-closing');
    closeTimer = window.setTimeout(() => {
      dropdown.classList.remove('open', 'is-open', 'is-closing');
      dropdown.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
    }, delay);
  };

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-drop-trigger');
    const menuPanel = dropdown.querySelector('.nav-dropdown-menu');
    if (!trigger || !menuPanel) return;

    dropdown.addEventListener('mouseenter', () => {
      if (!isTouchLike()) openDropdown(dropdown);
    });

    dropdown.addEventListener('mouseleave', () => {
      if (!isTouchLike()) closeDropdown(dropdown);
    });

    dropdown.addEventListener('focusin', () => openDropdown(dropdown));
    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) closeDropdown(dropdown, 70);
    });

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();

      if (!isTouchLike()) {
        openDropdown(dropdown);
        return;
      }

      const shouldOpen = !dropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (shouldOpen) openDropdown(dropdown);
    });

    menuPanel.addEventListener('mouseenter', () => window.clearTimeout(closeTimer));
    menuPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeAllDropdowns());
    });
  });

  document.addEventListener('click', (event) => {
    if (!header?.contains(event.target)) closeAllDropdowns();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllDropdowns();
  });

  toggle?.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', String(menu?.classList.contains('open')));
    closeAllDropdowns();
  });
};

const setupProfilePreview = () => {
  const modal = document.querySelector('#profileModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-profile-open]');
  const closeButtons = document.querySelectorAll('[data-profile-close]');
  const form = document.querySelector('#profilePreviewForm');
  const note = document.querySelector('#profileFormNote');
  const nameInput = document.querySelector('#profileName');
  const emailInput = document.querySelector('#profileEmail');
  const typeInput = document.querySelector('#profileType');
  const profileButtons = document.querySelectorAll('.profile-entry-btn span, .mobile-profile-btn');

  const updateButtonState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('saoProfilePreview') || 'null');
      if (!saved?.name) return;
      profileButtons.forEach((button) => {
        button.textContent = button.classList?.contains('mobile-profile-btn') ? `Perfil: ${saved.name}` : saved.name.split(' ')[0];
      });
    } catch (error) {
      return;
    }
  };

  const openModal = () => {
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.querySelector('[data-google-login]')?.focus(), 80);
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach((button) => button.addEventListener('click', openModal));
  closeButtons.forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  try {
    const saved = JSON.parse(localStorage.getItem('saoProfilePreview') || 'null');
    if (saved) {
      if (nameInput) nameInput.value = saved.name || '';
      if (emailInput) emailInput.value = saved.email || '';
      if (typeInput) typeInput.value = saved.type || 'pyme';
      if (note) {
        note.textContent = 'Vista previa de perfil guardada en este navegador.';
        note.classList.add('is-saved');
      }
    }
  } catch (error) {
    // Ignore malformed localStorage data.
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const payload = {
      name: nameInput?.value?.trim() || 'Perfil SAO',
      email: emailInput?.value?.trim() || '',
      type: typeInput?.value || 'pyme',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('saoProfilePreview', JSON.stringify(payload));
    if (note) {
      note.textContent = 'Perfil de prueba guardado. En la siguiente etapa lo conectaremos con Google.';
      note.classList.add('is-saved');
    }
    updateButtonState();
    window.dispatchEvent(new CustomEvent('sao-profile-updated', { detail: payload }));
  });

  updateButtonState();
};

window.addEventListener('load', () => {
  setupProfessionalNavigation();
  setupProfilePreview();
});
