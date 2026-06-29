const CATALOG_PROFILE_KEY = 'saoProfilePreview';

const catalogState = {
  items: [],
  filters: {
    client: 'all',
    group: 'all',
    level: 'all',
    search: ''
  }
};

const catalogCurrency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

const normalizeText = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const getCatalogProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(CATALOG_PROFILE_KEY) || 'null');
  } catch (error) {
    return null;
  }
};

const formatPriceRange = (item) => {
  if (!item.precioDesde && !item.precioHasta) return 'Gratis';
  if (item.precioDesde === item.precioHasta) return catalogCurrency.format(item.precioDesde);
  return `${catalogCurrency.format(item.precioDesde)} - ${catalogCurrency.format(item.precioHasta)}`;
};

const getClientLabel = (value) => ({
  pyme: 'Pymes',
  empresa: 'Empresas',
  emprendedor: 'Emprendedores'
}[value] || value);

const setCatalogAccess = () => {
  const profile = getCatalogProfile();
  const lockedPanel = document.querySelector('#catalogLockedPanel');
  const content = document.querySelector('#catalogContent');
  const title = document.querySelector('#catalogAccessTitle');
  const text = document.querySelector('#catalogAccessText');

  if (profile?.name) {
    if (lockedPanel) lockedPanel.hidden = true;
    if (content) content.hidden = false;
    if (title) title.textContent = `Acceso activo: ${profile.name}`;
    if (text) text.textContent = 'Catálogo desbloqueado en vista previa local. Explora paquetes por grupo de trabajo y consulta con contexto.';
    return true;
  }

  if (lockedPanel) lockedPanel.hidden = false;
  if (content) content.hidden = true;
  if (title) title.textContent = 'Pendiente de perfil';
  if (text) text.textContent = 'Crea o guarda tu perfil gratuito para explorar paquetes, precios base, alcance y exclusiones.';
  return false;
};

const buildOptions = () => {
  const groupSelect = document.querySelector('#catalogGroupFilter');
  const levelSelect = document.querySelector('#catalogLevelFilter');

  if (groupSelect) {
    const groups = [...new Set(catalogState.items.map((item) => item.grupo))].sort();
    groupSelect.innerHTML = '<option value="all">Todos los grupos</option>' + groups
      .map((group) => `<option value="${group}">${group}</option>`)
      .join('');
  }

  if (levelSelect) {
    const order = ['Gratis', 'Inicio', 'Operativo', 'Empresa', 'Soporte'];
    const levels = [...new Set(catalogState.items.map((item) => item.nivel))]
      .sort((a, b) => order.indexOf(a) - order.indexOf(b));
    levelSelect.innerHTML = '<option value="all">Todos los niveles</option>' + levels
      .map((level) => `<option value="${level}">${level}</option>`)
      .join('');
  }
};

const getFilteredItems = () => {
  const search = normalizeText(catalogState.filters.search);

  return catalogState.items.filter((item) => {
    const matchesClient = catalogState.filters.client === 'all' || (item.tipoCliente || []).includes(catalogState.filters.client);
    const matchesGroup = catalogState.filters.group === 'all' || item.grupo === catalogState.filters.group;
    const matchesLevel = catalogState.filters.level === 'all' || item.nivel === catalogState.filters.level;
    const searchable = normalizeText([
      item.nombre,
      item.grupo,
      item.subgrupo,
      item.descripcion,
      item.entregable,
      ...(item.incluye || []),
      ...(item.noIncluye || []),
      ...(item.condiciones || [])
    ].join(' '));
    const matchesSearch = !search || searchable.includes(search);
    return matchesClient && matchesGroup && matchesLevel && matchesSearch;
  });
};

const groupBy = (items, key) => items.reduce((acc, item) => {
  const value = item[key] || 'Sin clasificar';
  if (!acc[value]) acc[value] = [];
  acc[value].push(item);
  return acc;
}, {});

const getGroupStats = (items) => {
  const paid = items.filter((item) => Number(item.precioDesde) > 0).map((item) => item.precioDesde);
  return {
    count: items.length,
    min: paid.length ? Math.min(...paid) : 0,
    clients: [...new Set(items.flatMap((item) => item.tipoCliente || []))].map(getClientLabel).join(' / ')
  };
};

const renderItemCard = (item) => {
  const message = `Hola, quiero revisar esta solución del catálogo SAO: ${item.nombre}. Grupo: ${item.grupo}. Subgrupo: ${item.subgrupo}. Precio base: ${formatPriceRange(item)}. Tiempo estimado: ${item.tiempo}.`;
  const whatsapp = `https://wa.me/573116760185?text=${encodeURIComponent(message)}`;

  return `
    <article class="catalog-compact-card ${item.destacado ? 'is-featured' : ''}">
      <div class="catalog-compact-top">
        <span>${item.nivel}</span>
        ${item.destacado ? '<strong>Recomendado</strong>' : ''}
      </div>

      <h4>${item.nombre}</h4>
      <p>${item.descripcion}</p>

      <div class="catalog-compact-price">
        <small>Precio base orientativo</small>
        <strong>${formatPriceRange(item)}</strong>
        <span>${item.tiempo}</span>
      </div>

      <div class="catalog-scope-grid">
        <div>
          <span>Incluye</span>
          <ul>${(item.incluye || []).map((value) => `<li>${value}</li>`).join('')}</ul>
        </div>
        <div>
          <span>No incluye</span>
          <ul>${(item.noIncluye || []).map((value) => `<li>${value}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="catalog-conditions">
        <span>Condiciones de respaldo</span>
        <ul>${(item.condiciones || []).map((value) => `<li>${value}</li>`).join('')}</ul>
      </div>

      <div class="catalog-compact-footer">
        <p>${item.entregable || 'Entregable definido según alcance acordado.'}</p>
        <a class="btn btn-primary" href="${whatsapp}" target="_blank" rel="noopener">
          Consultar
          <i data-lucide="send"></i>
        </a>
      </div>
    </article>
  `;
};

const renderCatalog = () => {
  const list = document.querySelector('#catalogGroupList');
  const count = document.querySelector('#catalogCount');
  const minPrice = document.querySelector('#catalogMinPrice');
  if (!list) return;

  const items = getFilteredItems();

  if (count) count.textContent = items.length;
  if (minPrice) {
    const paid = items.filter((item) => Number(item.precioDesde) > 0).map((item) => item.precioDesde);
    minPrice.textContent = paid.length ? catalogCurrency.format(Math.min(...paid)) : '$0';
  }

  if (!items.length) {
    list.innerHTML = `
      <article class="catalog-empty-card catalog-empty-wide">
        <i data-lucide="search-x"></i>
        <h3>No encontramos soluciones con esos filtros.</h3>
        <p>Prueba otro grupo o busca por palabras como Power Automate, Power Apps, Excel, dashboard, flujo o cotizador.</p>
      </article>
    `;
    window.lucide?.createIcons({ attrs: { 'stroke-width': 1.8 } });
    return;
  }

  const grouped = groupBy(items, 'grupo');
  const groupNames = Object.keys(grouped).sort();

  list.innerHTML = groupNames.map((groupName, index) => {
    const groupItems = grouped[groupName];
    const stats = getGroupStats(groupItems);
    const subgroups = groupBy(groupItems, 'subgrupo');
    const subgroupNames = Object.keys(subgroups).sort();

    return `
      <details class="catalog-group" ${index === 0 ? 'open' : ''}>
        <summary class="catalog-group-summary">
          <span class="catalog-group-icon"><img src="assets/brand/isotipo_transparente_512.png" alt=""></span>
          <span class="catalog-group-copy">
            <small>Grupo de trabajo</small>
            <strong>${groupName}</strong>
            <em>${stats.clients}</em>
          </span>
          <span class="catalog-group-stats">
            <b>${stats.count}</b>
            <small>soluciones</small>
          </span>
          <span class="catalog-group-price">
            <b>${stats.min ? catalogCurrency.format(stats.min) : 'Gratis'}</b>
            <small>desde</small>
          </span>
          <i data-lucide="chevron-down"></i>
        </summary>

        <div class="catalog-subgroup-list">
          ${subgroupNames.map((subgroupName, subIndex) => `
            <details class="catalog-subgroup" ${index === 0 && subIndex === 0 ? 'open' : ''}>
              <summary>
                <span>${String(subIndex + 1).padStart(2, '0')}</span>
                <strong>${subgroupName}</strong>
                <small>${subgroups[subgroupName].length} opción(es)</small>
                <i data-lucide="chevron-down"></i>
              </summary>
              <div class="catalog-compact-grid">
                ${subgroups[subgroupName].map(renderItemCard).join('')}
              </div>
            </details>
          `).join('')}
        </div>
      </details>
    `;
  }).join('');

  window.lucide?.createIcons({ attrs: { 'stroke-width': 1.8 } });
};

const setupCatalogFilters = () => {
  const client = document.querySelector('#catalogClientFilter');
  const group = document.querySelector('#catalogGroupFilter');
  const level = document.querySelector('#catalogLevelFilter');
  const search = document.querySelector('#catalogSearch');

  client?.addEventListener('change', () => {
    catalogState.filters.client = client.value;
    renderCatalog();
  });

  group?.addEventListener('change', () => {
    catalogState.filters.group = group.value;
    renderCatalog();
  });

  level?.addEventListener('change', () => {
    catalogState.filters.level = level.value;
    renderCatalog();
  });

  search?.addEventListener('input', () => {
    catalogState.filters.search = search.value;
    renderCatalog();
  });
};

const initCatalog = async () => {
  const hasAccess = setCatalogAccess();

  try {
    const response = await fetch('assets/data/catalogo.json');
    if (!response.ok) throw new Error('Catalog file not found');
    catalogState.items = await response.json();
    buildOptions();
    setupCatalogFilters();
    if (hasAccess) renderCatalog();
  } catch (error) {
    const list = document.querySelector('#catalogGroupList');
    if (list) {
      list.innerHTML = '<article class="catalog-empty-card catalog-empty-wide"><h3>No fue posible cargar el catálogo.</h3><p>Verifica que exista assets/data/catalogo.json y que estés usando Live Server.</p></article>';
    }
  }
};

window.addEventListener('sao-profile-updated', () => {
  if (setCatalogAccess()) renderCatalog();
});

window.addEventListener('storage', (event) => {
  if (event.key === CATALOG_PROFILE_KEY && setCatalogAccess()) renderCatalog();
});

document.addEventListener('DOMContentLoaded', initCatalog);
