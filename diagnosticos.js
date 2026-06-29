
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
    title: "Una agenda sencilla para no perder citas ni clientes.",
    human: "Si hoy confirmas citas por chat y luego buscas datos entre conversaciones, la primera version podria reunir agenda, cliente, estado y recordatorio en una sola pantalla.",
    base: 58,
    apps: [
      "Agenda con estados: solicitado, confirmado, atendido y pendiente por cobrar.",
      "Ficha basica de cliente con historial, notas y proxima accion.",
      "Recordatorios o mensajes listos para confirmar, reagendar o hacer seguimiento."
    ],
    benefits: [
      "Menos citas olvidadas o confundidas.",
      "Menos busqueda entre chats.",
      "Mas claridad para atender y cobrar."
    ],
    insight: "Conviene empezar ordenando agenda y clientes. Despues se pueden sumar recordatorios automaticos.",
    meter: "La oportunidad esta en pasar de conversaciones sueltas a un flujo visible de atencion.",
    method: "Agenda digital + base de clientes",
    nextStep: "Definir campos minimos: cliente, fecha, servicio, estado y proxima accion."
  },
  sales: {
    title: "Un control diario para vender y cerrar mejor.",
    human: "Si al final del dia tienes que reconstruir ventas, pagos o pendientes, una herramienta simple puede dejar cada venta registrada y resumida sin hacer cuentas desde cero.",
    base: 54,
    apps: [
      "Registro de venta con producto, valor, medio de pago y estado del cobro.",
      "Cierre diario con ingresos, pendientes y productos mas vendidos.",
      "Resumen para revisar que se movio y que falta por cobrar."
    ],
    benefits: [
      "Mas claridad sobre el dinero que entra.",
      "Menos cuentas manuales al cierre.",
      "Mejor seguimiento de pagos pendientes."
    ],
    insight: "La primera version debe hacer facil registrar una venta, no volver mas pesado el trabajo diario.",
    meter: "La oportunidad esta en convertir cada venta en informacion util para decidir.",
    method: "Registro de ventas + cierre diario",
    nextStep: "Identificar productos, medios de pago y datos que se necesitan al cierre."
  },
  inventory: {
    title: "Un inventario simple para saber que falta antes de que sea tarde.",
    human: "Si compras, vendes o consumes insumos y dependes de memoria para reponer, el primer paso es ver existencias, movimientos y alertas basicas.",
    base: 52,
    apps: [
      "Control de entradas y salidas de productos o insumos clave.",
      "Alertas de bajo stock para referencias importantes.",
      "Vista de productos que mas rotan y requieren seguimiento."
    ],
    benefits: [
      "Menos compras tarde o duplicadas.",
      "Mas control sobre productos criticos.",
      "Mejor preparacion para vender o atender."
    ],
    insight: "Conviene iniciar con pocos productos criticos y reglas simples de alerta.",
    meter: "La oportunidad esta en hacer visible lo que hoy depende de memoria o conteos sueltos.",
    method: "Inventario basico + alertas",
    nextStep: "Definir productos criticos, unidades, stock minimo y frecuencia de actualizacion."
  },
  messages: {
    title: "Un asistente basico para responder mejor y dar seguimiento.",
    human: "Si repites respuestas sobre precios, horarios, disponibilidad o requisitos, podemos crear un flujo que guie al cliente y deje cada caso mas ordenado.",
    base: 50,
    apps: [
      "Preguntas guiadas para capturar datos antes de atender.",
      "Respuestas listas para precios, horarios, requisitos o confirmaciones.",
      "Lista de interesados para saber a quien responder y que falta."
    ],
    benefits: [
      "Menos desgaste respondiendo lo mismo.",
      "Clientes con informacion mas clara.",
      "Menos oportunidades perdidas en el chat."
    ],
    insight: "Primero se estandariza la atencion. Luego se puede automatizar una parte del flujo.",
    meter: "La oportunidad esta en reducir repeticion y mejorar seguimiento comercial.",
    method: "Formulario corto + respuestas guiadas",
    nextStep: "Listar preguntas frecuentes y datos minimos para atender bien."
  },
  orders: {
    title: "Un flujo de pedidos para recibir, preparar y cerrar sin desorden.",
    human: "Si los pedidos llegan por chat con datos incompletos, una herramienta puede ordenar producto, cantidad, pago, entrega y estado desde el inicio.",
    base: 56,
    apps: [
      "Formulario de pedido con datos obligatorios y confirmacion.",
      "Estados: recibido, preparando, entregado y pagado.",
      "Vista de pedidos pendientes para preparar y hacer seguimiento."
    ],
    benefits: [
      "Pedidos mas completos desde el inicio.",
      "Menos errores de cantidad, pago o entrega.",
      "Mas facilidad para preparar y cerrar."
    ],
    insight: "La primera version debe ordenar la entrada del pedido y su estado. Eso ya reduce mucho ruido.",
    meter: "La oportunidad esta en transformar conversaciones en pedidos claros y accionables.",
    method: "Formulario de pedido + tablero de estados",
    nextStep: "Definir datos de pedido, estados y responsable de preparacion."
  },
  reports: {
    title: "Un tablero sencillo para entender el negocio sin rehacer cuentas.",
    human: "Si al final del mes no tienes claro que vendiste, que quedo pendiente o que se mueve mas, un tablero basico puede convertir registros simples en decisiones.",
    base: 62,
    apps: [
      "Panel mensual con ingresos, gastos, pendientes y productos fuertes.",
      "Registro simple para alimentar el tablero sin duplicar trabajo.",
      "Indicadores que muestren ventas, clientes, repeticion y alertas."
    ],
    benefits: [
      "Decisiones con datos, no solo con memoria.",
      "Menos tiempo reconstruyendo informacion.",
      "Mejor lectura de oportunidades y problemas."
    ],
    insight: "Primero hay que definir pocos indicadores utiles. El tablero debe ayudar a decidir, no solo verse bonito.",
    meter: "La oportunidad esta en convertir datos basicos en una lectura clara del negocio.",
    method: "Registro simple + dashboard operativo",
    nextStep: "Elegir indicadores minimos: ventas, pendientes, clientes y alertas."
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

const pymeGoalBoost = {
  save: 7,
  control: 6,
  sell: 5,
  experience: 4
};

const pymeGoalCopy = {
  save: "en recuperar tiempo operativo",
  control: "en tener una lectura clara del negocio",
  sell: "en vender con menos friccion",
  experience: "en atender mejor y dar seguimiento"
};

const pymeGoalLabel = {
  save: "Ahorrar tiempo",
  control: "Tener control",
  sell: "Vender mejor",
  experience: "Atender mejor"
};

const getCheckedValue = (name, fallback) => {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
};

const initPymes = () => {
  const business = byId("pymeBusiness");
  const hours = byId("pymeHours");
  const tools = byId("pymeTools");
  const urgency = byId("pymeUrgency");
  const urgencyLabel = byId("pymeUrgencyLabel");
  const form = byId("pymeForm");

  if (!business || !hours || !tools || !form) return;

  const update = () => {
    const challengeValue = getCheckedValue("pymeChallenge", "agenda");
    const goalValue = getCheckedValue("pymeGoal", "save");
    const profile = pymeSolutions[challengeValue] || pymeSolutions.agenda;
    const weeklyHours = Number(hours.value);
    const urgencyValue = Number(urgency?.value || 3);
    const score = Math.min(
      92,
      profile.base +
        (pymeToolScore[tools.value] || 8) +
        (pymeBusinessBoost[business.value] || 3) +
        (pymeGoalBoost[goalValue] || 4) +
        urgencyValue * 2
    );
    const monthlyHours = weeklyHours * 4;
    const low = Math.max(2, Math.round(monthlyHours * ((score - 18) / 100)));
    const high = Math.max(low + 2, Math.round(monthlyHours * ((score + 3) / 100)));
    const priority = urgencyValue >= 5 ? "Alta" : urgencyValue >= 3 ? "Media" : "Baja";

    if (urgencyLabel) {
      urgencyLabel.textContent = urgencyValue >= 5 ? "Prioridad alta" : urgencyValue >= 3 ? "Prioridad media" : "Prioridad baja";
    }

    const context = pymeBusinessContext[business.value] || pymeBusinessContext.other;
    const goalText = pymeGoalCopy[goalValue] || pymeGoalCopy.save;

    setText("pymeSolution", profile.title);
    setText("pymeSummary", `${profile.human} Para tu caso, el enfoque inicial estaria ${goalText}. ${context}`);
    setText("pymeHoursRange", `${low} a ${high} h`);
    setText("pymePriority", priority);
    setText("pymeMeterCopy", profile.meter);
    animateValue(byId("pymePotential"), score);

    const bar = byId("pymeBar");
    if (bar) bar.style.width = `${score}%`;

    setApplicationCards("pymeApps", [profile.method, profile.apps[0], profile.nextStep]);
    setBenefits("pymeBenefits", profile.benefits);

    const insight = byId("pymeInsight");
    const insightText = insight?.querySelector("p");
    if (insightText) insightText.textContent = profile.insight;

    const selectedBusiness = business.options[business.selectedIndex].text;
    const selectedChallenge = document.querySelector('input[name="pymeChallenge"]:checked')?.closest('label')?.querySelector('strong')?.textContent || challengeValue;
    const selectedGoal = pymeGoalLabel[goalValue] || "Ahorrar tiempo";
    const message = `Hola, quiero aterrizar una solucion para mi negocio. Tipo de negocio: ${selectedBusiness}. Proceso a ordenar: ${selectedChallenge}. Objetivo: ${selectedGoal}. Prioridad: ${priority}. Tiempo estimado recuperable: ${low} a ${high} horas al mes. Propuesta inicial: ${profile.title}`;
    const cta = byId("pymeCta");
    if (cta) cta.href = buildWhatsAppUrl(message);
  };

  form.addEventListener("change", update);
  form.addEventListener("input", update);
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
    apps: ["Inventario", "Pedidos recibidos", "Alertas", "Estados", "Dashboard"],
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
    title: "Formulario guiado de solicitudes",
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
    apps: ["Ventas registradas", "Alertas", "Historial", "Estados", "Medición"],
    benefits: ["Atención más ordenada.", "Mejor historial por cliente.", "Menos reprocesos en solicitudes repetidas."]
  },
  orders: {
    title: "Portal básico de pedidos",
    summary: "Permite registrar pedidos, validar información y dar seguimiento por estado.",
    base: 59,
    apps: ["Pedidos recibidos", "Portal", "Estados", "Base", "Notificaciones"],
    benefits: ["Pedidos recibidos más completos.", "Menos coordinación manual.", "Mejor experiencia para clientes recurrentes."]
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



const initPymeToolsLab = () => {
  const modal = byId("pymeLabModal");
  const openButton = byId("openPymeLab");
  const closeButton = byId("closePymeLab");
  const closeTargets = document.querySelectorAll("[data-close-pyme-lab]");
  const tabs = document.querySelectorAll("[data-lab-tab]");
  const panels = document.querySelectorAll("[data-lab-panel]");

  const setLabTab = (tabName) => {
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.labTab === tabName));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.labPanel === tabName));
  };

  const openModal = () => {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("pyme-modal-open");
    setLabTab("time");
    setTimeout(() => closeButton?.focus(), 20);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pyme-modal-open");
    openButton?.focus();
  };

  openButton?.addEventListener("click", openModal);
  closeButton?.addEventListener("click", closeModal);
  closeTargets.forEach((target) => target.addEventListener("click", closeModal));
  tabs.forEach((tab) => tab.addEventListener("click", () => setLabTab(tab.dataset.labTab)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  const task = byId("pymeTimeTask");
  const times = byId("pymeTimeTimes");
  const minutes = byId("pymeTimeMinutes");
  const automation = byId("pymeTimeAutomation");
  const lostHours = byId("pymeLostHours");
  const optimizedHours = byId("pymeOptimizedHours");
  const savedHours = byId("pymeSavedHours");
  const timeCopy = byId("pymeTimeCopy");
  const manualBar = byId("pymeManualBar");
  const autoBar = byId("pymeAutoBar");
  const pipeline = byId("pymeTimePipeline");

  const taskLabels = {
    messages: "Responder mensajes repetidos",
    appointments: "Confirmar esta citas",
    sales: "Registrar ventas",
    inventory: "Actualizar inventario",
    orders: "Organizar pedidos"
  };

  const automationProfiles = {
    guided: { reduction: 0.52, steps: ["Formulario", "Validacion", "Respuesta", "Registro", "Seguimiento"], copy: "Un formulario corto recibe la información importante, evita preguntas repetidas y deja una respuesta lista para enviar." },
    alerts: { reduction: 0.58, steps: ["Entrada", "Estado", "Alerta", "Responsable", "Cierre"], copy: "Los estados y alertas ayudan a que ningún caso quede perdido entre conversaciones o pendientes de memoria." },
    dashboard: { reduction: 0.46, steps: ["Registro", "Base", "Indicador", "Alerta", "Decision"], copy: "Cada registro alimenta un tablero para ver pendientes, ventas o alertas sin rehacer cuentas desde cero." },
    template: { reduction: 0.38, steps: ["Plantilla", "Checklist", "Respuesta", "Historial", "Control"], copy: "Las plantillas y listas de control ordenan la atención sin obligarte a empezar con un sistema complejo." }
  };

  const updateTime = () => {
    if (!task || !times || !minutes || !automation || !lostHours || !timeCopy) return;
    const weeklyMinutes = Number(times.value) * Number(minutes.value);
    const monthlyHours = Math.max(1, Math.round((weeklyMinutes * 4) / 60));
    const profile = automationProfiles[automation.value] || automationProfiles.guided;
    const after = Math.max(1, Math.round(monthlyHours * (1 - profile.reduction)));
    const saved = Math.max(0, monthlyHours - after);
    const manualPercent = Math.min(100, Math.max(22, monthlyHours * 7));
    const autoPercent = Math.max(10, Math.round(manualPercent * (after / Math.max(monthlyHours, 1))));

    lostHours.textContent = `${monthlyHours} h`;
    if (optimizedHours) optimizedHours.textContent = `${after} h`;
    if (savedHours) savedHours.textContent = `${saved} h`;
    if (manualBar) manualBar.style.setProperty("--value", `${manualPercent}%`);
    if (autoBar) autoBar.style.setProperty("--value", `${autoPercent}%`);
    if (pipeline) pipeline.innerHTML = profile.steps.map((step) => `<span>${step}</span>`).join("");
    timeCopy.textContent = `${taskLabels[task.value] || "Esta tarea"} podría pasar de ${monthlyHours} h/mes a cerca de ${after} h/mes. ${profile.copy} Tiempo que podrías liberar: ${saved} h/mes.`;
  };

  [task, times, minutes, automation].forEach((element) => element?.addEventListener("change", updateTime));
  updateTime();

  const dashboardScenario = byId("pymeDashboardScenario");
  const dashboardTitle = byId("pymeDashboardTitle");
  const dashboardUpdated = byId("pymeDashboardUpdated");
  const dashboardKpis = byId("pymeDashboardKpis");
  const dashboardBars = byId("pymeDashboardBars");
  const dashboardDonut = byId("pymeDashboardDonut");
  const dashboardRatio = byId("pymeDashboardRatio");
  const dashboardLegend = byId("pymeDashboardLegend");
  const dashboardTable = byId("pymeDashboardTable");

  const dashboardData = {
    appointments: {
      title: "Agenda y servicios de hoy",
      kpis: [["Ingreso estimado", "$480k", "+12% vs ayer"], ["Citas para hoy", "12", "4 pendientes"], ["Clientes por confirmar", "8", "requieren seguimiento"], ["Riesgo de ausencia", "2", "riesgo medio"]],
      bars: [44, 58, 76, 62, 88, 70, 54, 81],
      ratio: 72,
      legend: [["Confirmadas", "7"], ["Pendientes", "4"], ["Reagendar", "1"]],
      table: [["10:30", "Confirmar esta cita", "Alta"], ["11:20", "Enviar recordatorio", "Media"], ["03:00", "Registrar pago", "Alta"]]
    },
    store: {
      title: "Tienda e inventario de hoy",
      kpis: [["Ventas de hoy", "$620k", "+8% vs prom."], ["Ventas registradas", "34", "prom. $18k"], ["Productos bajos", "6", "reponer hoy"], ["Margen estimado", "31%", "estimado"]],
      bars: [30, 46, 55, 73, 82, 68, 91, 64],
      ratio: 64,
      legend: [["Disponible", "42"], ["Bajo", "6"], ["Agotado", "2"]],
      table: [["Bebidas", "Reponer 12 unidades", "Alta"], ["Snacks", "Producto con alta rotación", "Media"], ["Caja", "Revisar cierre parcial", "Media"]]
    },
    orders: {
      title: "Pedidos recibidos recibidos por WhatsApp",
      kpis: [["Pedidos recibidos", "18", "5 nuevos"], ["Pagos pendientes", "4", "$210k"], ["En preparación", "7", "hoy"], ["Entregas de hoy", "6", "por ruta"]],
      bars: [24, 36, 60, 78, 66, 84, 72, 92],
      ratio: 68,
      legend: [["Preparando", "7"], ["Por cobrar", "4"], ["Entregar", "6"]],
      table: [["Pedido #104", "Falta dirección", "Alta"], ["Pedido #109", "Confirmar pago", "Alta"], ["Ruta tarde", "Agrupar entregas", "Media"]]
    }
  };

  const updateDashboard = () => {
    if (!dashboardScenario) return;
    const data = dashboardData[dashboardScenario.value] || dashboardData.appointments;
    if (dashboardTitle) dashboardTitle.textContent = data.title;
    if (dashboardUpdated) dashboardUpdated.textContent = "Actualizado hace 3 min";
    if (dashboardKpis) dashboardKpis.innerHTML = data.kpis.map(([label, value, note]) => `<article><small>${label}</small><strong>${value}</strong><span>${note}</span></article>`).join("");
    if (dashboardBars) dashboardBars.innerHTML = data.bars.map((value, index) => `<i style="--value:${value}%"><span>${index + 8}</span></i>`).join("");
    if (dashboardDonut) {
      dashboardDonut.style.setProperty("--done", `${data.ratio}%`);
      dashboardDonut.innerHTML = `<span>${data.ratio}%</span>`;
    }
    if (dashboardRatio) dashboardRatio.textContent = `${data.ratio}% bajo control`;
    if (dashboardLegend) dashboardLegend.innerHTML = data.legend.map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`).join("");
    if (dashboardTable) dashboardTable.innerHTML = data.table.map(([time, action, priority]) => `<div><span>${time}</span><strong>${action}</strong><em>${priority}</em></div>`).join("");
  };

  dashboardScenario?.addEventListener("change", updateDashboard);
  updateDashboard();

  const flowNeed = byId("pymeFlowNeed");
  const flowMethod = byId("pymeFlowMethod");
  const flowNeedTitle = byId("pymeFlowNeedTitle");
  const flowNeedCopy = byId("pymeFlowNeedCopy");
  const flowMethodTitle = byId("pymeFlowMethodTitle");
  const flowMethodCopy = byId("pymeFlowMethodCopy");
  const flowOutputs = byId("pymeFlowOutputs");
  const flowInput = byId("pymeFlowInput");
  const flowRule = byId("pymeFlowRule");
  const flowDelivery = byId("pymeFlowDelivery");

  const flowNeeds = {
    appointment: { title: "Confirmar esta citas sin perder clientes", copy: "Las citas se confirman por mensajes sueltos y es fácil olvidar recordatorios o cambios.", input: "Cliente pide una cita", rule: "Validar datos y disponibilidad" },
    order: { title: "Ordenar pedidos que llegan por WhatsApp", copy: "Los pedidos llegan en conversaciones distintas y a veces faltan datos como producto, pago o entrega.", input: "Cliente envía un pedido", rule: "Validar producto, pago y entrega" },
    inventory: { title: "Saber qué reponer antes de que se agote", copy: "La reposición depende de memoria, conteos aislados o revisiones cuando ya es tarde.", input: "Venta o consumo registrado", rule: "Comparar stock contra mínimo" },
    quote: { title: "Responder solicitudes con datos completos", copy: "La información llega incompleta y se pierde tiempo pidiendo los mismos datos a cada cliente.", input: "Cliente solicita cotización", rule: "Pedir datos obligatorios" }
  };

  const flowMethods = {
    form: { title: "Formulario guiado", copy: "Pide solo los datos necesarios, valida campos importantes y guarda todo en un solo lugar.", outputs: ["Registro claro en una base", "Mensaje de confirmación", "Tarea para la persona responsable"], delivery: "Base + mensaje + tarea" },
    whatsapp: { title: "WhatsApp con preguntas claras", copy: "Guía al cliente con preguntas cortas para que la solicitud llegue más completa.", outputs: ["Datos ordenados", "Respuesta sugerida", "Estado visible"], delivery: "Chat guiado + estado" },
    alerts: { title: "Alertas y estados visibles", copy: "Cada caso queda con estado y avisa cuando alguien debe responder, confirmar o cerrar.", outputs: ["Alerta automática", "Prioridad visible", "Historial del caso"], delivery: "Alerta + prioridad + historial" },
    dashboard: { title: "Tablero de seguimiento", copy: "Convierte registros diarios en una vista clara de pendientes, avances y alertas.", outputs: ["Indicador actualizado", "Lista de pendientes", "Resumen de cierre"], delivery: "Tablero + pendientes" }
  };

  const updateFlow = () => {
    const need = flowNeeds[flowNeed?.value || "appointment"] || flowNeeds.appointment;
    const method = flowMethods[flowMethod?.value || "form"] || flowMethods.form;
    if (flowNeedTitle) flowNeedTitle.textContent = need.title;
    if (flowNeedCopy) flowNeedCopy.textContent = need.copy;
    if (flowMethodTitle) flowMethodTitle.textContent = method.title;
    if (flowMethodCopy) flowMethodCopy.textContent = method.copy;
    if (flowOutputs) flowOutputs.innerHTML = method.outputs.map((item, index) => `<div><span>0${index + 1}</span><strong>${item}</strong></div>`).join("");
    if (flowInput) flowInput.textContent = need.input;
    if (flowRule) flowRule.textContent = need.rule;
    if (flowDelivery) flowDelivery.textContent = method.delivery;
  };

  [flowNeed, flowMethod].forEach((element) => element?.addEventListener("change", updateFlow));
  updateFlow();

  const context = byId("pymeWaContext");
  const tone = byId("pymeWaTone");
  const message = byId("pymeWaMessage");
  const copyButton = byId("pymeCopyMessage");
  const chatThread = byId("pymeChatThread");
  const chatAction = byId("pymeChatAction");

  const messages = {
    appointment: {
      user: "Hola, quiero saber si puedo agendar una cita esta semana.",
      action: "Guardar la cita tentativa y avisar a quien atiende",
      friendly: "Hola, claro. Para ayudarte mejor, dime qué día te sirve, en qué horario y qué servicio necesitas. Así revisamos disponibilidad.",
      formal: "Hola. Con gusto revisamos disponibilidad. Indícanos el día, el horario que prefieres y el servicio que necesitas."
    },
    order: {
      user: "Hola, quiero hacer un pedido y confirmar si está disponible.",
      action: "Crear el pedido como pendiente de confirmación",
      friendly: "Hola, recibimos tu solicitud. Envíame producto, cantidad y dirección para confirmar disponibilidad, valor final y tiempo de entrega.",
      formal: "Hola. Para validar tu pedido, envía producto, cantidad y dirección de entrega. Confirmaremos disponibilidad, valor final y tiempo estimado."
    },
    payment: {
      user: "Hola, quiero saber si mi pago ya quedó registrado.",
      action: "Solicitar soporte y marcar el pago para revisión",
      friendly: "Hola, con gusto lo revisamos. Envíame el soporte de pago y dejamos tu estado actualizado cuando sea validado.",
      formal: "Hola. Para validar el pago, por favor envía el soporte correspondiente. Luego actualizaremos el estado de tu registro."
    },
    followup: {
      user: "Hola, me interesa pero tengo algunas dudas antes de comprar.",
      action: "Registrar al interesado y dejar seguimiento pendiente",
      friendly: "Hola, claro. Cuéntame qué duda tienes y te ayudamos a revisar la mejor opción antes de avanzar.",
      formal: "Hola. Con gusto resolvemos tus dudas. Indícanos qué información necesitas para continuar."
    }
  };

  const updateMessage = () => {
    if (!context || !tone || !message) return;
    const profile = messages[context.value] || messages.appointment;
    const botMessage = profile[tone.value] || profile.friendly;
    message.textContent = botMessage;
    if (chatAction) chatAction.textContent = profile.action;
    if (chatThread) {
      chatThread.innerHTML = `
        <div class="bubble user"><span>Cliente</span><p>${profile.user}</p></div>
        <div class="bubble bot"><span>Asistente</span><p>${botMessage}</p></div>
        <div class="chat-quick-replies"><button>Agendar</button><button>Confirmar datos</button><button>Hablar con alguien</button></div>
      `;
    }
    if (copyButton) copyButton.classList.remove("is-copied");
  };

  [context, tone].forEach((element) => element?.addEventListener("change", updateMessage));
  updateMessage();

  copyButton?.addEventListener("click", async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message.textContent.trim());
      copyButton.classList.add("is-copied");
      const oldText = copyButton.childNodes[0]?.textContent || "Copiar respuesta del bot";
      copyButton.childNodes[0].textContent = "Respuesta lista copiada ";
      setTimeout(() => {
        copyButton.classList.remove("is-copied");
        if (copyButton.childNodes[0]) copyButton.childNodes[0].textContent = oldText;
      }, 1600);
    } catch (error) {
      copyButton.classList.add("is-copied");
    }
  });
};

window.addEventListener("load", () => {
  initPymeToolsLab();
});

