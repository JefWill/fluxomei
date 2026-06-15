/* app.js - Logic for FluxoMEI MVP Phase 3 */

// --- State ---
const state = {
  balanceVisible: true,
  currentView: 'view-home',
  transactions: [
    { id: 1, type: 'venda', value: 1250.00, date: new Date(), title: 'Venda de Produtos' },
    { id: 2, type: 'despesa', cat: 'embalagem', value: 150.50, date: new Date(Date.now() - 86400000), title: 'Caixas de Papelão' },
  ],
  modal: {
    isOpen: false,
    type: 'venda', // 'venda' | 'despesa'
    amount: 0,
    selectedCat: null
  },
  categories: [
    { id: 'comida', icon: 'ph-fork-knife', label: 'Comida', type: 'variavel' },
    { id: 'embalagem', icon: 'ph-package', label: 'Embalagem', type: 'variavel' },
    { id: 'transporte', icon: 'ph-car', label: 'Transporte', type: 'variavel' },
    { id: 'telefone', icon: 'ph-device-mobile', label: 'Telefone', type: 'fixo' },
    { id: 'impostos', icon: 'ph-receipt', label: 'Impostos', type: 'fixo' },
    { id: 'manutencao', icon: 'ph-wrench', label: 'Reparos', type: 'variavel' },
    { id: 'marketing', icon: 'ph-megaphone', label: 'Marketing', type: 'fixo' },
    { id: 'aluguel', icon: 'ph-house', label: 'Aluguel', type: 'fixo' },
    { id: 'agua', icon: 'ph-drop', label: 'Água', type: 'fixo' },
    { id: 'energia', icon: 'ph-lightning', label: 'Energia', type: 'fixo' },
    { id: 'contador', icon: 'ph-briefcase', label: 'Contador', type: 'fixo' },
    { id: 'mercadoria', icon: 'ph-shopping-cart', label: 'Mercadoria', type: 'variavel' },
    { id: 'prolabore', icon: 'ph-user-circle', label: 'Pró-labore', type: 'fixo' },
    { id: 'outros', icon: 'ph-dots-three', label: 'Outros', type: 'variavel' },
  ]
};

// --- Formatter ---
const BRL = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(date));
const formatFullDate = (date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(date));

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderAll();
  
  // Toggle Balance Visibility
  document.getElementById('toggle-visibility').addEventListener('click', () => {
    state.balanceVisible = !state.balanceVisible;
    const balanceEl = document.getElementById('main-balance');
    const iconEl = document.querySelector('#toggle-visibility i');
    
    if (state.balanceVisible) {
      balanceEl.classList.remove('hidden');
      iconEl.className = 'ph ph-eye';
    } else {
      balanceEl.classList.add('hidden');
      iconEl.className = 'ph ph-eye-slash';
    }
  });

  // Close modal when clicking outside
  document.getElementById('transaction-modal').addEventListener('click', (e) => {
    if(e.target.id === 'transaction-modal') closeTransactionModal();
  });
});

// --- View Navigation ---
function switchView(viewId) {
  state.currentView = viewId;
  
  // Hide all views, show selected
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  
  // Update nav icons
  document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
  const activeNav = document.getElementById('nav-' + viewId);
  if(activeNav) activeNav.classList.add('active');
  
  window.scrollTo(0,0);
  
  if(viewId === 'view-reports') renderReports();
  if(viewId === 'view-wallet') renderWallet();
  if(viewId === 'view-categories') renderCategoryManager();
}

// --- Render Core ---
function renderAll() {
  renderDashboard();
  if(state.currentView === 'view-reports') renderReports();
  if(state.currentView === 'view-wallet') renderWallet();
  if(state.currentView === 'view-categories') renderCategoryManager();
}

function calculateTotals() {
  let receita = 0;
  let despesaFixaOutros = 0;
  let despesaVariavel = 0;
  
  state.transactions.forEach(t => {
    if (t.type === 'venda') {
      receita += t.value;
    } else {
      const catInfo = state.categories.find(c => c.id === t.cat);
      if (catInfo) {
        if (catInfo.type === 'fixo') {
          despesaFixaOutros += t.value;
        } else {
          despesaVariavel += t.value;
        }
      } else {
        despesaFixaOutros += t.value;
      }
    }
  });

  const das = 76.60; // Guia DAS MEI fixa (INSS R$ 70,60 + ICMS R$ 5,00 + ISS R$ 1,00)
  const despesaFixa = despesaFixaOutros + das;
  const despesa = despesaFixa + despesaVariavel;
  const margem = receita - despesaVariavel;
  const saldo = margem - despesaFixa;

  return { receita, despesaFixaOutros, despesaFixa, despesaVariavel, das, despesa, margem, saldo };
}

function renderDashboard() {
  const { receita, despesa, saldo } = calculateTotals();
  
  // Render list (only top 5)
  const recent = state.transactions.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const historyHtml = recent.map(t => createHistoryItemHTML(t)).join('');
  
  document.getElementById('history-list').innerHTML = historyHtml || '<div class="text-muted text-center py-4">Nenhuma transação recente</div>';
  
  document.getElementById('main-balance').innerText = BRL(saldo);
  document.getElementById('stat-receita').innerText = BRL(receita);
  document.getElementById('stat-custo').innerText = BRL(despesa);
}

function renderReports() {
  const { receita, despesaFixaOutros, despesaFixa, despesaVariavel, das, despesa, margem, saldo } = calculateTotals();
  
  document.getElementById('dre-fat').innerText = BRL(receita);
  document.getElementById('dre-vari').innerText = "- " + BRL(despesaVariavel);
  document.getElementById('dre-das').innerText = "- " + BRL(das);
  document.getElementById('dre-margem').innerText = BRL(margem);
  document.getElementById('dre-fixo').innerText = "- " + BRL(despesaFixaOutros);
  document.getElementById('dre-lucro').innerText = BRL(saldo);
  
  let pct = 0;
  if(despesaFixa > 0) {
    pct = Math.min(100, Math.round((margem / despesaFixa) * 100));
    if(pct < 0) pct = 0;
  } else {
    pct = margem >= 0 ? 100 : 0;
  }
  
  document.getElementById('dre-pct').innerText = pct + '%';
  document.getElementById('dre-fill').style.width = pct + '%';
  document.getElementById('dre-fill').style.backgroundColor = pct >= 100 ? 'var(--green)' : 'var(--primary)';
}

function renderWallet() {
  const all = state.transactions.sort((a,b) => new Date(b.date) - new Date(a.date));
  const html = all.map(t => createHistoryItemHTML(t, true)).join('');
  document.getElementById('full-history-list').innerHTML = html || '<div class="text-muted text-center py-4">Caixa Vazio</div>';
}

function createHistoryItemHTML(t, showFullDate = false) {
  const isVenda = t.type === 'venda';
  const iconClass = isVenda ? 'ph-money text-green bg-green-light' : 'ph-receipt text-red bg-red-light';
  const amountClass = isVenda ? 'positive' : 'negative';
  const sign = isVenda ? '+' : '-';
  const dateStr = showFullDate ? formatFullDate(t.date) : formatDate(t.date);
  
  return `
    <div class="history-item">
      <div class="history-icon ${iconClass.split(' ').slice(1).join(' ')}">
        <i class="ph ${iconClass.split(' ')[0]}"></i>
      </div>
      <div class="history-info">
        <div class="history-title">${t.title}</div>
        <div class="history-meta">${dateStr} ${t.cat ? '· ' + (state.categories.find(c=>c.id===t.cat)?.label || 'Categoria') : ''}</div>
      </div>
      <div class="history-amount ${amountClass}">${sign} ${BRL(t.value)}</div>
    </div>
  `;
}

// --- Modal Logic ---
function openTransactionModal(type) {
  state.modal.isOpen = true;
  state.modal.type = type;
  state.modal.amount = 0;
  
  const matchingCat = state.categories.find(c => c.type === type);
  state.modal.selectedCat = matchingCat ? matchingCat.id : state.categories[0].id;
  
  document.getElementById('native-amount').value = '';
  document.getElementById('transaction-modal').classList.add('open');
  switchModalTab(type);
  updateModalDisplay();
  
  setTimeout(() => {
    document.getElementById('native-amount').focus();
  }, 100);
}

function closeTransactionModal() {
  state.modal.isOpen = false;
  document.getElementById('transaction-modal').classList.remove('open');
}

function switchModalTab(type) {
  state.modal.type = type;
  
  const isReceita = type === 'receita' || type === 'venda';
  document.getElementById('tab-receita').classList.toggle('active', isReceita);
  document.getElementById('tab-fixo').classList.toggle('active', type === 'fixo');
  document.getElementById('tab-variavel').classList.toggle('active', type === 'variavel');
  
  document.getElementById('category-section').style.display = isReceita ? 'none' : 'block';
  document.getElementById('modal-title').innerText = isReceita ? 'Nova Receita' : 'Nova Despesa';
  
  const inputEl = document.getElementById('native-amount');
  if(isReceita) {
    inputEl.classList.remove('is-despesa');
  } else {
    inputEl.classList.add('is-despesa');
  }

  if (!isReceita) {
    const matchingCat = state.categories.find(c => c.type === type);
    if(matchingCat) state.modal.selectedCat = matchingCat.id;
    renderCategoryGrid();
  }
}

// --- Input Logic ---
function onNativeInput() {
  const el = document.getElementById('native-amount');
  let val = parseFloat(el.value);
  if(isNaN(val) || val < 0) val = 0;
  state.modal.amount = val;
  updateModalDisplay();
}

function addPreset(value) {
  state.modal.amount += value;
  document.getElementById('native-amount').value = state.modal.amount > 0 ? state.modal.amount.toFixed(2) : '';
  updateModalDisplay();
}

function updateModalDisplay() {
  const btn = document.getElementById('btn-confirm');
  btn.innerText = `Confirmar ${BRL(state.modal.amount)}`;
  
  if (state.modal.amount > 0) {
    btn.style.opacity = '1';
    btn.disabled = false;
  } else {
    btn.style.opacity = '0.5';
    btn.disabled = true;
  }
}

// --- Categories ---
function renderCategoryGrid() {
  const filtered = state.categories.filter(c => c.type === state.modal.type);
  const html = filtered.map(c => `
    <button class="category-btn ${state.modal.selectedCat === c.id ? 'selected' : ''}" onclick="selectCategory('${c.id}')" id="cat-btn-${c.id}">
      <div class="icon-box"><i class="ph ${c.icon}"></i></div>
      <span>${c.label}</span>
    </button>
  `).join('');
  document.getElementById('category-grid').innerHTML = html || '<div class="col-span-4 text-center text-sm text-gray">Nenhuma categoria configurada.</div>';
}

function selectCategory(id) {
  state.modal.selectedCat = id;
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById(`cat-btn-${id}`).classList.add('selected');
}

// --- Category Manager ---
function renderCategoryManager() {
  const html = state.categories.map(c => `
    <div class="cat-config-item">
      <div class="cat-config-info">
        <i class="ph ${c.icon}"></i>
        <span>${c.label}</span>
      </div>
      <div class="segment-control">
        <button class="seg-btn ${c.type === 'fixo' ? 'active' : ''}" onclick="toggleCategoryType('${c.id}', 'fixo')">Fixa</button>
        <button class="seg-btn ${c.type === 'variavel' ? 'active' : ''}" onclick="toggleCategoryType('${c.id}', 'variavel')">Var</button>
      </div>
    </div>
  `).join('');
  document.getElementById('categories-config-list').innerHTML = html;
}

function toggleCategoryType(id, type) {
  const cat = state.categories.find(c => c.id === id);
  if(cat) {
    cat.type = type;
    saveData();
    renderCategoryManager();
  }
}

// --- Confirm Transaction ---
function confirmTransaction() {
  if (state.modal.amount <= 0) return;
  
  const isVenda = state.modal.type === 'venda' || state.modal.type === 'receita';
  const newTx = {
    id: Date.now(),
    type: isVenda ? 'venda' : 'despesa',
    value: state.modal.amount,
    date: new Date(),
    title: isVenda ? 'Venda Registrada' : state.categories.find(c=>c.id===state.modal.selectedCat)?.label || 'Despesa',
    cat: isVenda ? null : state.modal.selectedCat
  };
  
  state.transactions.push(newTx);
  saveData();
  closeTransactionModal();
  renderAll();
}

// --- Data Persistence ---
function saveData() {
  localStorage.setItem('fluxomei_data', JSON.stringify(state.transactions));
  localStorage.setItem('fluxomei_cats', JSON.stringify(state.categories));
}

function loadData() {
  const initialized = localStorage.getItem('fluxomei_initialized');
  
  if (!initialized) {
    saveData();
    localStorage.setItem('fluxomei_initialized', 'true');
  } else {
    const data = localStorage.getItem('fluxomei_data');
    if(data) {
      try {
        state.transactions = JSON.parse(data);
      } catch(e) {
        console.error(e);
        state.transactions = [];
      }
    } else {
      state.transactions = [];
    }
  }

  const cats = localStorage.getItem('fluxomei_cats');
  if(cats) {
    try {
      state.categories = JSON.parse(cats);
    } catch(e) {
      console.error(e);
    }
  }
}

function clearData() {
  if(confirm("Tem certeza que deseja apagar todos os dados? Isso não pode ser desfeito.")) {
    localStorage.setItem('fluxomei_initialized', 'true');
    localStorage.removeItem('fluxomei_data');
    localStorage.removeItem('fluxomei_cats');
    state.transactions = [];
    location.reload();
  }
}
