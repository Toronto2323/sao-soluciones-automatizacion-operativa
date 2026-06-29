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

const hoursInput = document.querySelector("#hoursInput");
const methodInput = document.querySelector("#methodInput");
const frequencyInput = document.querySelector("#frequencyInput");
const savingPercent = document.querySelector("#savingPercent");
const savingBar = document.querySelector("#savingBar");
const hoursSaved = document.querySelector("#hoursSaved");
const recommendedMethod = document.querySelector("#recommendedMethod");
const simulatorInsight = document.querySelector("#simulatorInsight");

let particles = [];
let animationFrameId;

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

const animateNumber = (element, target) => {
  if (!element) return;

  const start = Number(element.textContent) || 0;
  const duration = 380;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);

    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const handleMouseMove = (event) => {
  const x = event.clientX;
  const y = event.clientY;

  spotlight?.style.setProperty("--x", `${x}px`);
  spotlight?.style.setProperty("--y", `${y}px`);

  if (cursorDot && cursorRing) {
    cursorDot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }
};

const setupCursorInteractions = () => {
  const interactiveElements = document.querySelectorAll("a, button, select, .tilt-card");

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorRing?.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursorRing?.classList.remove("active");
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

  animationFrameId = requestAnimationFrame(drawParticles);
};

const calculateSimulator = () => {
  if (!hoursInput || !methodInput || !frequencyInput) return;

  const hours = Number(hoursInput.value);
  const method = methodInput.value;
  const frequency = frequencyInput.value;

  const methodProfiles = {
    manual: {
      score: 28,
      route: "Macro inteligente",
      insight: "Hay alta oportunidad en eliminar copias, validaciones manuales y consolidaciones repetitivas."
    },
    excel: {
      score: 24,
      route: "Excel automatizado",
      insight: "La mejora puede venir de macros, formularios, reglas de validacion y reportes que se actualicen solos."
    },
    email: {
      score: 26,
      route: "Flujo + alertas",
      insight: "Cuando el proceso vive en correos y adjuntos, conviene centralizar la captura y automatizar avisos."
    },
    shared: {
      score: 18,
      route: "Repositorio + flujo",
      insight: "La prioridad es ordenar responsables, versiones, estados y trazabilidad del proceso."
    },
    forms: {
      score: 14,
      route: "Power Automate",
      insight: "Ya existe captura de datos; el siguiente salto es conectar aprobaciones, alertas y reportes."
    },
    system: {
      score: 9,
      route: "Dashboard / integracion",
      insight: "El mayor valor puede estar en conectar datos, crear indicadores y reducir reprocesos entre areas."
    },
    erp: {
      score: 12,
      route: "SAP + analitica",
      insight: "Conviene extraer datos clave, cruzarlos con archivos operativos y convertirlos en indicadores accionables."
    },
    dashboard: {
      score: 6,
      route: "Alertas + gobierno",
      insight: "Si ya existen reportes, el valor esta en automatizar actualizaciones, alertas y seguimiento."
    }
  };

  const frequencyProfiles = {
    multiple_daily: { score: 22, multiplier: 1.18 },
    daily: { score: 18, multiplier: 1 },
    weekly: { score: 12, multiplier: 0.82 },
    biweekly: { score: 8, multiplier: 0.68 },
    monthly: { score: 5, multiplier: 0.52 },
    on_demand: { score: 3, multiplier: 0.42 }
  };

  let hoursScore = 4;

  if (hours >= 10) hoursScore = 8;
  if (hours >= 20) hoursScore = 14;
  if (hours >= 35) hoursScore = 22;
  if (hours >= 60) hoursScore = 28;

  const selectedMethod = methodProfiles[method] || methodProfiles.manual;
  const selectedFrequency = frequencyProfiles[frequency] || frequencyProfiles.daily;

  const score = 24 + hoursScore + selectedMethod.score + selectedFrequency.score;
  const finalSaving = Math.min(score, 88);
  const monthlyHours = Math.round(hours * 4 * selectedFrequency.multiplier);
  const savedHours = Math.max(1, Math.round(monthlyHours * (finalSaving / 100)));

  animateNumber(savingPercent, finalSaving);
  animateNumber(hoursSaved, savedHours);

  if (savingBar) {
    savingBar.style.width = `${finalSaving}%`;
  }

  let recommendedRoute = selectedMethod.route;

  if ((frequency === "daily" || frequency === "multiple_daily") && hours >= 20 && method !== "system" && method !== "dashboard") {
    recommendedRoute = "App + flujo automatico";
  }

  if (hours <= 5 && (method === "manual" || method === "excel")) {
    recommendedRoute = "Macro rapida";
  }

  recommendedMethod.textContent = recommendedRoute;
  simulatorInsight.textContent = selectedMethod.insight;
};

menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

[hoursInput, methodInput, frequencyInput].forEach((input) => {
  input?.addEventListener("change", calculateSimulator);
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("mousemove", handleMouseMove);

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrameId);
  resizeCanvas();
  createParticles();
  drawParticles();
});

window.addEventListener("load", () => {
  revealOnScroll();
  animateCounters();
  setupCursorInteractions();
  setupTiltCards();
  resizeCanvas();
  createParticles();
  drawParticles();
  calculateSimulator();

  if (window.lucide) {
    lucide.createIcons({
      attrs: {
        "stroke-width": 1.8
      }
    });
  }
});
