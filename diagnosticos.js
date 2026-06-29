
const WHATSAPP_NUMBER = "573116760185";

const byId = (id) => document.getElementById(id);
const setText = (id, value) => {
  const element = byId(id);
  if (element) element.textContent = value;
};

const animateValue = (element, target) => {
  if (!element) return;
  const start = Number(element.textContent) || 0;
  const duration = 420;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const setPills = (containerId, items) => {
  const container = byId(containerId);
  if (!container) return;
  container.innerHTML = items.map((item) => `<span>${item}</span>`).join("");
};

const setApplicationCards = (containerId, items) => {
  const container = byId(containerId);
  if (!container) return;
  container.innerHTML = items
    .map((item, index) => `
      <article class="application-item">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <p>${item}</p>
      </article>
    `)
    .join("");
};

const setBenefits = (containerId, items) => {
  const container = byId(containerId);
  if (!container) return;
  container.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
};

const buildWhatsAppUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const pymeSolutions = {
  agenda: {
    title: "Construiremos una agenda digital y base de clientes.",
    human: "Te podría funcionar si hoy confirmas citas por WhatsApp, guardas datos en conversaciones y te cuesta hacer seguimiento a clientes, pagos o recordatorios.",
    base: 58,
    apps: [
      "Una agenda para registrar citas, horarios, estado de confirmación y observaciones del cliente.",
      "Una base de clientes con historial de visitas, servicios realizados, preferencias, pagos y notas importantes.",
      "Recordatorios y mensajes listos para confirmar, reagendar o hacer seguimiento por WhatsApp."
    ],
    benefits: [
      "Tendrías menos conversaciones sueltas y más claridad sobre quién está agendado, quién confirmó y quién falta por atender.",
      "Podrías recuperar tiempo porque no tendrías que buscar datos entre chats, notas o capturas de pantalla.",
      "El negocio empezaría a construir memoria de clientes: frecuencia, servicios tomados, preferencias y pagos."
    ],
    insight: "La prioridad sería ordenar citas y clientes antes de automatizar mensajes o reportes avanzados.",
    meter: "La oportunidad está en pasar de chats dispersos a un flujo claro de atención."
  },
  sales: {
    title: "Crearemos un control simple de ventas, pagos y cierre diario.",
    human: "Te podría funcionar si vendes todos los días, registras pagos en diferentes lugares y al final de la jornada necesitas hacer cuentas manualmente.",
    base: 54,
    apps: [
      "Un registro de ventas por fecha, producto, cliente, medio de pago y estado del cobro.",
      "Un cierre diario o semanal para saber cuánto entró, qué quedó pendiente y qué productos se movieron más.",
      "Un pequeño panel para revisar ingresos, pagos pendientes y comportamiento básico del negocio."
    ],
    benefits: [
      "Tendrías una lectura más clara del dinero que entra, lo que está pendiente y lo que realmente se está vendiendo.",
      "Reducirías cuentas repetidas al final del día, especialmente cuando hay efectivo, transferencias o pagos separados.",
      "Sería más fácil detectar clientes recurrentes, productos rentables y momentos de mayor movimiento."
    ],
    insight: "La prioridad sería convertir cada venta en un dato útil sin volver pesado el proceso de atención.",
    meter: "La oportunidad está en que cada venta alimente automáticamente tu control del negocio."
  },
  inventory: {
    title: "Construiremos un inventario sencillo con alertas y lectura de rotación.",
    human: "Te podría funcionar si compras, vendes o consumes productos y hoy no tienes claro qué se está acabando, qué rota más o cuándo debes reponer.",
    base: 52,
    apps: [
      "Un control de entradas y salidas para productos, insumos o referencias principales.",
      "Alertas de bajo stock para evitar quedarte sin productos importantes o comprar tarde.",
      "Un resumen de productos con mayor movimiento para tomar mejores decisiones de compra."
    ],
    benefits: [
      "Tendrías menos pérdidas por desorden, olvidos o compras hechas sin información suficiente.",
      "Podrías anticiparte a faltantes y saber qué productos merecen más atención.",
      "El inventario dejaría de depender de memoria, conteos aislados o registros que nadie actualiza."
    ],
    insight: "La prioridad sería hacer visible el inventario crítico, no crear un sistema complejo desde el primer día.",
    meter: "La oportunidad está en mejorar control y reposición sin frenar la operación diaria."
  },
  messages: {
    title: "Crearemos un flujo de atención y respuestas para clientes.",
    human: "Te podría funcionar si recibes muchas preguntas repetidas por WhatsApp o Instagram y pierdes tiempo explicando precios, disponibilidad, horarios o condiciones.",
    base: 48,
    apps: [
      "Plantillas de respuesta para preguntas frecuentes, precios, disponibilidad, requisitos o próximos pasos.",
      "Un formulario corto para capturar datos antes de atender, cotizar o agendar.",
      "Un registro de interesados para saber a quién responder, quién quedó pendiente y quién ya compró."
    ],
    benefits: [
      "Responderías con más consistencia y menos desgaste, especialmente cuando llegan varios mensajes al mismo tiempo.",
      "La información llegaría más completa desde el inicio, evitando ida y vuelta innecesario.",
      "Podrías hacer seguimiento a personas interesadas que hoy se pierden entre conversaciones."
    ],
    insight: "La prioridad sería estandarizar la atención antes de automatizarla por completo.",
    meter: "La oportunidad está en reducir repetición y mejorar seguimiento comercial."
  },
  orders: {
    title: "Construiremos un catálogo digital con pedidos más ordenados.",
    human: "Te podría funcionar si vendes por redes, tomas pedidos por chat y luego debes organizar productos, cantidades, pagos, entregas o estados manualmente.",
    base: 55,
    apps: [
      "Un catálogo web simple para mostrar productos, servicios, precios, fotos y condiciones básicas.",
      "Un formulario de pedido que envíe la solicitud organizada a WhatsApp o a una base de control.",
      "Un tablero para revisar pedidos recibidos, pendientes, entregados o por cobrar."
    ],
    benefits: [
      "Los pedidos llegarían más completos y con menos errores de producto, cantidad, dirección o forma de pago.",
      "El cliente tendría una experiencia más clara sin depender de muchas preguntas por chat.",
      "Sería más fácil preparar, entregar, cobrar y revisar qué se vendió durante el mes."
    ],
    insight: "La prioridad sería convertir conversaciones de venta en pedidos claros y accionables.",
    meter: "La oportunidad está en ordenar la venta antes de escalar volumen."
  },
  reports: {
    title: "Crearemos un panel básico para entender ingresos y operación.",
    human: "Te podría funcionar si al final del mes no tienes una lectura clara de ventas, gastos, utilidad, clientes frecuentes o servicios más solicitados.",
    base: 62,
    apps: [
      "Un panel mensual con ingresos, gastos, utilidad estimada y evolución del negocio.",
      "Un registro simple para alimentar datos sin tener que rehacer cuentas desde cero.",
      "Indicadores básicos para saber qué se vende más, cuándo hay más movimiento y dónde mejorar."
    ],
    benefits: [
      "Tomarías decisiones con datos reales, no solo con memoria o percepción.",
      "Reducirías el tiempo invertido en hacer cuentas manuales o reconstruir información al cierre del mes.",
      "Podrías detectar patrones: productos fuertes, servicios más rentables, gastos repetidos o clientes frecuentes."
    ],
    insight: "La prioridad sería crear una lectura simple del negocio, útil para decidir y no solo para registrar.",
    meter: "La oportunidad está en transformar registros básicos en decisiones claras."
  }
};

const pymeBusinessContext = {
  tattoo: "En negocios basados en citas, esto ayuda a que agenda, clientes y seguimiento no dependan solo del chat del día.",
  store: "Para una tienda o minimercado, lo importante es que ventas, inventario y pendientes se puedan revisar sin hacer cuentas desde cero.",
  social: "Para ventas por redes, esto ayuda a convertir conversaciones en pedidos claros, clientes organizados y seguimiento real.",
  food: "Para comidas o domicilios, el foco es reducir errores en pedidos, pagos, entregas y coordinación diaria.",
  services: "Para servicios profesionales, funciona muy bien para ordenar solicitudes, clientes, entregables, citas y cobros.",
  other: "Para un negocio pequeño, el objetivo es reemplazar pasos repetidos por un flujo simple, medible y fácil de mantener."
};

const pymeToolScore = {
  notes: 16,
  sheets: 10,
  whatsapp: 12,
  pos: 6,
  mixed: 14
};

const pymeBusinessBoost = {
  tattoo: 5,
  store: 6,
  social: 7,
  food: 8,
  services: 4,
  other: 3
};

const initPymes = () => {
  const business = byId("pymeBusiness");
  const challenge = byId("pymeChallenge");
  const hours = byId("pymeHours");
  const tools = byId("pymeTools");
  const form = byId("pymeForm");

  if (!business || !challenge || !hours || !tools || !form) return;

  const update = () => {
    const profile = pymeSolutions[challenge.value] || pymeSolutions.agenda;
    const weeklyHours = Number(hours.value);
    const score = Math.min(88, profile.base + (pymeToolScore[tools.value] || 8) + (pymeBusinessBoost[business.value] || 3));
    const monthlyHours = weeklyHours * 4;
    const low = Math.max(2, Math.round(monthlyHours * ((score - 14) / 100)));
    const high = Math.max(low + 2, Math.round(monthlyHours * ((score + 4) / 100)));

    const context = pymeBusinessContext[business.value] || pymeBusinessContext.other;

    setText("pymeSolution", profile.title);
    setText("pymeSummary", `${profile.human} ${context}`);
    setText("pymeHoursRange", `${low} a ${high} h / mes`);
    setText("pymeMeterCopy", profile.meter);
    animateValue(byId("pymePotential"), score);

    const bar = byId("pymeBar");
    if (bar) bar.style.width = `${score}%`;

    setApplicationCards("pymeApps", profile.apps);
    setBenefits("pymeBenefits", profile.benefits);

    const insight = byId("pymeInsight");
    const insightText = insight?.querySelector("p");
    if (insightText) insightText.textContent = profile.insight;

    const selectedBusiness = business.options[business.selectedIndex].text;
    const selectedChallenge = challenge.options[challenge.selectedIndex].text;
    const message = `Hola, quiero aterrizar una solución para mi negocio. Tipo de negocio: ${selectedBusiness}. Proceso principal: ${selectedChallenge}. Tiempo estimado recuperable: ${low} a ${high} horas al mes. Propuesta: ${profile.title}`;
    const cta = byId("pymeCta");
    if (cta) cta.href = buildWhatsAppUrl(message);
  };

  [business, challenge, hours, tools].forEach((select) => select.addEventListener("change", update));
  update();
};

const internalProfiles = {
  reports: {
    title: "Dashboard ejecutivo en Power BI",
    summary: "Consolida información recurrente en indicadores claros para seguimiento de área o gerencia.",
    base: 64,
    apps: ["Power BI", "Indicadores", "Filtros", "Actualización", "Resumen ejecutivo"],
    benefits: ["Menos tiempo preparando reportes.", "Datos más consistentes para reuniones.", "Mejor visibilidad de resultados y desviaciones."]
  },
  approvals: {
    title: "Flujo de aprobación digital",
    summary: "Centraliza solicitudes, responsables, estados, alertas y tiempos de respuesta.",
    base: 58,
    apps: ["Power Automate", "Aprobaciones", "Alertas", "Historial", "Responsables"],
    benefits: ["Menos correos sueltos.", "Trazabilidad de quién aprueba y cuándo.", "Reducción de reprocesos y olvidos."]
  },
  files: {
    title: "Consolidación automática de archivos",
    summary: "Une archivos, aplica validaciones y genera una base limpia para reportes o análisis.",
    base: 72,
    apps: ["Power Query", "Excel", "Validaciones", "Base maestra", "Reporte"],
    benefits: ["Menos copiar y pegar.", "Mayor calidad de datos.", "Actualizaciones más rápidas y repetibles."]
  },
  tracking: {
    title: "App interna de seguimiento operativo",
    summary: "Registra tareas, estados, responsables, fechas y alertas desde una vista centralizada.",
    base: 60,
    apps: ["Power Apps", "Estados", "Tareas", "Alertas", "Panel"],
    benefits: ["Más control sobre pendientes.", "Menos seguimiento manual por chat o correo.", "Mejor trazabilidad por responsable."]
  },
  inventory: {
    title: "Control operativo de inventario o pedidos",
    summary: "Organiza movimientos, solicitudes, estados y reportes para reducir errores operativos.",
    base: 57,
    apps: ["Inventario", "Pedidos", "Alertas", "Estados", "Dashboard"],
    benefits: ["Mejor visibilidad de existencias o solicitudes.", "Menos errores por registros dispersos.", "Seguimiento más claro por etapa."]
  },
  analytics: {
    title: "Modelo analítico conectado a la operación",
    summary: "Extrae, transforma y organiza datos para obtener indicadores accionables.",
    base: 66,
    apps: ["ETL", "SAP", "Power BI", "Modelo de datos", "Alertas"],
    benefits: ["Menos dependencia de consultas manuales.", "Indicadores más confiables.", "Mejor lectura de tendencias y excepciones."]
  }
};

const externalProfiles = {
  requests: {
    title: "Formulario inteligente de solicitudes",
    summary: "Captura información completa, ordena entradas y genera alertas internas.",
    base: 60,
    apps: ["Formulario web", "Base central", "Alertas", "Estados", "Seguimiento"],
    benefits: ["Menos solicitudes perdidas.", "Información más completa desde el inicio.", "Mejor trazabilidad de atención."]
  },
  quotes: {
    title: "Cotizador web simple",
    summary: "Estandariza variables, reduce errores y acelera la generación de cotizaciones.",
    base: 63,
    apps: ["Cotizador", "Reglas", "PDF", "WhatsApp", "CRM básico"],
    benefits: ["Cotizaciones más rápidas.", "Menos errores por cálculo manual.", "Mejor seguimiento comercial."]
  },
  sales_followup: {
    title: "Panel de seguimiento comercial",
    summary: "Organiza oportunidades, estados, próximos pasos y responsables de seguimiento.",
    base: 57,
    apps: ["Pipeline", "Clientes", "Alertas", "Estados", "Dashboard"],
    benefits: ["Menos oportunidades olvidadas.", "Mayor claridad del ciclo comercial.", "Mejor priorización de clientes."]
  },
  after_sales: {
    title: "Flujo de atención posventa",
    summary: "Registra casos, solicitudes, tiempos de respuesta y estados de atención.",
    base: 55,
    apps: ["Tickets", "Alertas", "Historial", "Estados", "Medición"],
    benefits: ["Atención más ordenada.", "Mejor historial por cliente.", "Menos reprocesos en solicitudes repetidas."]
  },
  orders: {
    title: "Portal básico de pedidos",
    summary: "Permite registrar pedidos, validar información y dar seguimiento por estado.",
    base: 59,
    apps: ["Pedidos", "Portal", "Estados", "Base", "Notificaciones"],
    benefits: ["Pedidos más completos.", "Menos coordinación manual.", "Mejor experiencia para clientes recurrentes."]
  },
  forms: {
    title: "Portal de formularios externos",
    summary: "Centraliza formularios, documentos, validaciones y trazabilidad de solicitudes.",
    base: 56,
    apps: ["Portal", "Formularios", "Documentos", "Alertas", "Panel"],
    benefits: ["Datos mejor estructurados.", "Menos ida y vuelta con clientes.", "Seguimiento más claro de cada solicitud."]
  }
};

const toolBoost = {
  excel: 8,
  powerbi: 5,
  powerapps: 4,
  sap: 10,
  email: 12,
  mixed: 14
};

const channelBoost = {
  whatsapp: 13,
  email: 10,
  calls: 8,
  excel: 12,
  manual_form: 11,
  system: 6
};

const problemBoost = {
  lost: 14,
  slow: 10,
  traceability: 12,
  incomplete: 11,
  duplicate: 13,
  no_reports: 9
};

const initEmpresas = () => {
  const tabs = document.querySelectorAll(".business-tab");
  const panels = document.querySelectorAll(".enterprise-mode-panel");
  if (!tabs.length || !panels.length) return;

  const area = byId("enterpriseArea");
  const process = byId("enterpriseProcess");
  const tools = byId("enterpriseTools");
  const hours = byId("enterpriseHours");

  const interaction = byId("externalInteraction");
  const channel = byId("externalChannel");
  const problem = byId("externalProblem");
  const goal = byId("externalGoal");

  let mode = new URLSearchParams(window.location.search).get("tipo") === "externo" ? "externo" : "interno";

  const setMode = (nextMode) => {
    mode = nextMode;
    tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === mode));
    update();
  };

  const updateInternal = () => {
    const profile = internalProfiles[process.value] || internalProfiles.reports;
    const weeklyHours = Number(hours.value);
    const score = Math.min(90, profile.base + (toolBoost[tools.value] || 6) + (weeklyHours >= 30 ? 8 : weeklyHours >= 15 ? 5 : 2));
    const monthly = weeklyHours * 4;
    const low = Math.max(8, Math.round(monthly * ((score - 18) / 100)));
    const high = Math.max(low + 8, Math.round(monthly * ((score + 6) / 100)));

    setText("enterpriseModeLabel", "Ruta interna");
    setText("enterpriseSolution", profile.title);
    setText("enterpriseSummary", profile.summary);
    setText("enterpriseEstimateLabel", "Tiempo recuperable estimado");
    setText("enterpriseImpact", `${low} a ${high} h / mes`);
    setText("enterpriseSubtext", "Estimación orientativa del tiempo operativo que podría recuperarse al mes.");
    animateValue(byId("enterprisePotential"), score);
    const bar = byId("enterpriseBar");
    if (bar) bar.style.width = `${score}%`;
    setPills("enterpriseApps", profile.apps);
    setBenefits("enterpriseBenefits", profile.benefits);

    const msg = `Hola, quiero revisar una automatización para empresa. Ruta: procesos internos. Área: ${area.options[area.selectedIndex].text}. Proceso: ${process.options[process.selectedIndex].text}. Solución sugerida: ${profile.title}. Impacto estimado: ${low} a ${high} horas al mes.`;
    const cta = byId("enterpriseCta");
    if (cta) cta.href = buildWhatsAppUrl(msg);
  };

  const updateExternal = () => {
    const profile = externalProfiles[interaction.value] || externalProfiles.requests;
    const score = Math.min(88, profile.base + (channelBoost[channel.value] || 6) + (problemBoost[problem.value] || 8));

    setText("enterpriseModeLabel", "Ruta cliente externo");
    setText("enterpriseSolution", profile.title);
    setText("enterpriseSummary", profile.summary);
    setText("enterpriseEstimateLabel", "Beneficio operativo esperado");
    setText("enterpriseImpact", score >= 78 ? "Alto" : score >= 62 ? "Medio alto" : "Medio");
    setText("enterpriseSubtext", "Para procesos externos el valor principal suele verse en velocidad, trazabilidad y menor pérdida de solicitudes.");
    animateValue(byId("enterprisePotential"), score);
    const bar = byId("enterpriseBar");
    if (bar) bar.style.width = `${score}%`;
    setPills("enterpriseApps", profile.apps);
    setBenefits("enterpriseBenefits", profile.benefits);

    const msg = `Hola, quiero revisar una solución para procesos de cara al cliente. Interacción: ${interaction.options[interaction.selectedIndex].text}. Canal actual: ${channel.options[channel.selectedIndex].text}. Problema principal: ${problem.options[problem.selectedIndex].text}. Solución sugerida: ${profile.title}.`;
    const cta = byId("enterpriseCta");
    if (cta) cta.href = buildWhatsAppUrl(msg);
  };

  function update() {
    if (mode === "externo") updateExternal();
    else updateInternal();
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.mode)));
  [area, process, tools, hours, interaction, channel, problem, goal].forEach((select) => {
    select?.addEventListener("change", update);
  });

  setMode(mode);
};

window.addEventListener("load", () => {
  initPymes();
  initEmpresas();
});
