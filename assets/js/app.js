// Basic SPA shell + routing
function AppShell(content) {
  const session = getSession();
  const role = session?.role || null;
  return `
  <div class="d-flex">
    ${role ? Sidebar(role) : ""}
    <div class="flex-grow-1" id="content">
      ${content}
    </div>
  </div>`;
}

function LoginView() {
  return `
  <div class="container py-5" style="max-width: 520px;">
    <div class="card-glass p-4">
      <div class="h4 mb-3 text-center">Medora Health – COVID</div>
      <div class="text-secondary text-center mb-4">Login as Admin, Doctor or Patient</div>
      <form id="login-form" class="row g-3">
        <div class="col-12">
          <label class="form-label">Username</label>
          <input class="form-control" id="l-username" placeholder="doctor / aaravsharma9812" required>
        </div>
        <div class="col-12">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" id="l-password" placeholder="doctor123 / 0353" required>
        </div>
        <div class="col-12 d-grid">
          <button class="btn btn-accent">Login</button>
        </div>
        <div class="text-center">
          <a href="javascript:void(0)" class="small text-secondary" onclick="openForgotModal()">Forgot?</a>
        </div>
      </form>
      <div class="small text-secondary mt-3">Demo accounts: <code>admin/admin123</code></div>
    </div>
  </div>`;
}

function safe(fn) {
  try {
    fn();
  } catch (e) {
    console.error(e);
    showToast("Render error: " + (e.message || e), "error");
  }
}

function renderApp() {debugger
  const session = getSession();
  if (!session) {
    renderLogin();
    return;
  }

  document.getElementById("app").innerHTML = AppShell("");

  route(); // this will fill #content
}

function renderLogin() {
  // Directly render login page without sidebar wrapper
  document.getElementById("app").innerHTML = `
  <div class="login-wrapper d-flex align-items-center justify-content-center" style="min-height: 100vh;">
    ${LoginView()}
  </div>`;

  // Attach login logic
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const u = document.getElementById("l-username").value.trim();
      const p = document.getElementById("l-password").value.trim();

    

      showLoader("Signing you in…");
      const res = login(u, p);
      if (res.ok) {debugger
        hideLoader();
        showToast("Login Success", "success");

        // ✅ exact hashes the router expects
        if (res.user.role === "admin") {
          location.hash = "#admin-dashboard";
        } else if (res.user.role === "doctor") {
          location.hash = "#dashboard";
        } else {
          location.hash = "#dashboard";
        }

        renderApp(); // builds shell + calls route()
      } else {
        hideLoader();
        showToast("Invalid credentials", "error");
      }
    });
}

// function route(){
//   const session = getSession();
//   if(!session){ renderLogin(); return; }

//   showLoader('Loading page…');                  // 🔹 show at start
//   try {
//     const hash = location.hash || (session.role==='doctor' ? '#dashboard' : '#profile');
//     if(hash==='#logout'){ logout(); return; }

//     document.getElementById('app').innerHTML = AppShell('<div class="p-4">Loading…</div>');
//     highlightActive();

//     if(session.role==='doctor'){
//       if(hash==='#dashboard') renderDashboard();
//       else if(hash==='#patients') renderPatients();
//       else if(hash==='#add-patient') renderAddPatient();
//       else renderDashboard();
//     } else {
//       if(hash==='#profile') renderProfile();
//       else if(hash==='#medication') renderMedication();
//       else renderProfile();
//     }
//     highlightActive();
//   } finally {
//     // Slight timeout makes the transition feel smoother; remove if you want instant
//     setTimeout(hideLoader, 200);               // 🔹 hide at end
//   }
// }

function route() {debugger
  const session = getSession();
  if (!session) {
    renderLogin();
    return;
  }

  showLoader("Loading page…");
  try {
    const defaultHash =
      session.role === "admin"
        ? "#admin-dashboard"
        : session.role === "doctor"
        ? "#dashboard"
        : "#profile";

    const hash = location.hash || defaultHash;
    if (hash === "#logout") {
      logout();
      hideLoader();
      return;
    }

    if (session.role === "admin") {
      if (hash === "#admin-dashboard") safe(renderAdminDashboard);
      else if (hash === "#doctor-list") safe(renderDoctorList);
      else if (hash === "#patients") safe(renderAdminPatients);
      else if (hash === "#system-settings") safe(renderSystemSettings);
      else safe(renderAdminDashboard);
    }
    document.getElementById("app").innerHTML = AppShell(
      '<div class="p-4">Loading…</div>'
    );
    highlightActive();
debugger
    if (session.role === "admin") {
      if (hash === "#admin-dashboard") renderAdminDashboard();
      else if (hash === "#doctor-list") renderDoctorList();
      else if (hash === "#patients") renderAdminPatients();
      else if (hash === "#system-settings") renderSystemSettings();
      else renderAdminDashboard(); // ✅ fallback
    } else if (session.role === "doctor") {
      if (hash === "#dashboard") renderDashboard();
      else if (hash === "#patients") renderPatients();
      else if (hash === "#add-patient") renderAddPatient();
      else renderDashboard();
    }else if (hash === "#medication") renderMedication();
      else renderProfile();
    

    highlightActive();
  } finally {
    setTimeout(hideLoader, 200);
  }
}

function ensureToastContainer() {
  let el = document.getElementById("mh-toast-container");
  if (!el) {
    el = document.createElement("div");
    el.id = "mh-toast-container";
    // inline fallback so it works even without CSS
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.right = "24px";
    el.style.zIndex = "10050"; // above your #loader-overlay (9999)
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.gap = "10px";
    document.body.appendChild(el);
  }
  return el;
}

function showToast(message, type = "info") {
  const container = ensureToastContainer();

  const toast = document.createElement("div");
  toast.className = `mh-toast mh-${type}`;
  toast.textContent = message;

  // fallback inline styles so it works even without CSS file
  toast.style.minWidth = "240px";
  toast.style.maxWidth = "340px";
  toast.style.padding = "12px 16px";
  toast.style.borderRadius = "8px";
  toast.style.background = "#ffffff";
  toast.style.color = "#0a111f";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "500";
  toast.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
  toast.style.opacity = "0";
  toast.style.transform = "translateX(20px)";
  toast.style.transition = "all .3s ease";

  const borderColors = {
    success: "#22c55e",
    error: "#e55353",
    info: "#20c997",
  };
  toast.style.borderLeft = `4px solid ${
    borderColors[type] || borderColors.info
  }`;

  container.appendChild(toast);

  // animate in
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  });

  // auto remove after 3.5s
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// function showToast(message, type = 'info') {
//   const container = document.getElementById('toast-container');
//   const toast = document.createElement('div');
//   toast.className = `toast ${type}`;
//   toast.textContent = message;

//   container.appendChild(toast);

//   // remove automatically after animation ends
//   setTimeout(() => toast.remove(), 3500);
// }

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", () => {
   seedIfEmpty();
  const session = getSession();
  if (session) renderApp();
  else renderLogin();
});

// Render compact sparkline of Daily Deaths (last 14 days)
function renderDailyDeathsSparkline(containerId, patients) {
  // 1) Build a YYYY-MM-DD -> count map for the last 14 days
  const byDay = {};
  const today = new Date();
  const days = [...Array(14)].map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    byDay[key] = 0;
    return key;
  });

  // Helper to clamp a timestamp into our 14-day window
  function keyIfInWindow(ts) {
    if (!ts) return null;
    const d = new Date(ts);
    const key = d.toISOString().slice(0, 10);
    return key in byDay ? key : null;
  }

  // 2) Count deaths by day (prefer history entries where status turned to Death)
  patients.forEach((p) => {
    let deathKey = null;

    // Prefer history event
    if (Array.isArray(p.history)) {
      for (const h of p.history) {
        if (h && h.status === "Death") {
          deathKey = keyIfInWindow(h.at || h.date || h.updatedAt);
          if (deathKey) break;
        }
      }
    }

    // Fallback: if current status is Death, use updatedAt
    if (!deathKey && p.status === "Death") {
      deathKey = keyIfInWindow(p.updatedAt);
    }

    if (deathKey) byDay[deathKey] += 1;
  });

  // 3) Build series in day order
  const series = days.map((k) => byDay[k] || 0);

  // 4) Draw sparkline
  Highcharts.chart(containerId, {
    chart: {
      type: "areaspline",
      height: 110,
      spacing: [6, 6, 6, 6],
      backgroundColor: "transparent",
    },
    title: { text: null },
    xAxis: {
      categories: days.map((d) => d.slice(5)), // MM-DD
      tickLength: 0,
      labels: { enabled: false },
    },
    yAxis: {
      title: { text: null },
      labels: { enabled: false },
      gridLineWidth: 0,
      min: 0,
      allowDecimals: false,
    },
    legend: { enabled: false },
    tooltip: {
      formatter() {
        const full = days[this.point.x];
        return `<b>${this.y}</b> death(s)<br><span style="font-size:11px;color:#666">${full}</span>`;
      },
    },
    plotOptions: {
      areaspline: {
        color: "#343a40",
        fillOpacity: 0.15,
        marker: { enabled: false },
        lineWidth: 2,
      },
    },
    series: [{ data: series }],
    credits: { enabled: false },
  });
}


// forgot password starts
// ---------- Constants ----------
const PW_RESET_KEY = 'mh_pw_reset'; // stores { token: { username, expiresAt } ... }

// ---------- Helpers ----------
function makeToken(len = 32) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let t = '';
  for (let i = 0; i < len; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return t;
}
function nowMs(){ return Date.now(); }
function lsGetRaw(key, def = null) { try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; } }
function lsSetRaw(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

// ---------- Create / store reset token ----------
function createPasswordResetToken(username, ttlMinutes = 15) {
  const users = getUsersIndex();
  const user = users.find(u => String(u.username).trim().toLowerCase() === String(username).trim().toLowerCase());
  if (!user) return { ok: false, error: 'User not found' };

  const token = makeToken(28);
  const expiresAt = nowMs() + ttlMinutes * 60 * 1000;
  const store = lsGetRaw(PW_RESET_KEY, {});
  store[token] = { username: user.username, expiresAt };
  lsSetRaw(PW_RESET_KEY, store);

  return { ok: true, token, expiresAt, username: user.username };
}

// ---------- Validate token ----------
function validateResetToken(token) {
  const store = lsGetRaw(PW_RESET_KEY, {});
  const rec = store[token];
  if (!rec) return { ok: false, error: 'Invalid token' };
  if (nowMs() > rec.expiresAt) {
    delete store[token]; lsSetRaw(PW_RESET_KEY, store);
    return { ok: false, error: 'Token expired' };
  }
  return { ok: true, username: rec.username };
}

// ---------- Consume token and set new password ----------
function consumeResetTokenAndSetPassword(token, newPassword) {
  const store = lsGetRaw(PW_RESET_KEY, {});
  const rec = store[token];
  if (!rec) return { ok: false, error: 'Invalid token' };
  if (nowMs() > rec.expiresAt) {
    delete store[token]; lsSetRaw(PW_RESET_KEY, store);
    return { ok: false, error: 'Token expired' };
  }

  const username = rec.username;
  // update USERS index and PATIENTS/DOCTORS if needed
  const users = getUsersIndex();
  const uIndex = users.findIndex(u => u.username === username);
  if (uIndex < 0) return { ok: false, error: 'User not found' };

  users[uIndex].password = String(newPassword).trim();
  lsSet(DB_KEYS.USERS, users);

  // also propagate to PATIENTS / DOCTORS stores (if you store creds there)
  // update patients
  const patients = lsGet(DB_KEYS.PATIENTS, []);
  const pi = patients.findIndex(p => p.username === username);
  if (pi >= 0) { patients[pi].password = users[uIndex].password; lsSet(DB_KEYS.PATIENTS, patients); }

  // update doctors
  const doctors = lsGet(DB_KEYS.DOCTORS, []);
  const di = doctors.findIndex(d => d.username === username);
  if (di >= 0) { doctors[di].password = users[uIndex].password; lsSet(DB_KEYS.DOCTORS, doctors); }

  // consume token
  delete store[token]; lsSetRaw(PW_RESET_KEY, store);
  return { ok: true };
}

// ---------- UI: Forgot modal (open it from login) ----------
function openForgotModal() {
  if (!document.getElementById('forgotModal')) {
    const div = document.createElement('div');
    div.innerHTML = `
<div class="modal fade" id="forgotModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content card-glass p-3">
      <div class="modal-header">
        <h5 class="modal-title">Forgot Password</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="forgotForm" class="row g-3">
          <div class="col-12">
            <label class="form-label">Username</label>
            <input class="form-control" id="forgot-username" placeholder="Enter your username" required>
          </div>
          <div class="col-12">
            <div class="small text-muted">We will generate a one-time reset token valid for 15 minutes.</div>
          </div>
        </form>
        <div id="forgot-result" class="mt-3"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-accent" id="forgot-send">Generate Token</button>
      </div>
    </div>
  </div>
</div>`;
    document.body.appendChild(div.firstElementChild);
  }

  const modalEl = document.getElementById('forgotModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  // attach handlers
  document.getElementById('forgot-send').onclick = (e) => {
    e.preventDefault();
    const uname = document.getElementById('forgot-username').value || '';
    if (!uname.trim()) { showToast('Enter a username', 'error'); return; }
    const res = createPasswordResetToken(uname.trim());
    const resultDiv = document.getElementById('forgot-result');
    if (!res.ok) {
      resultDiv.innerHTML = `<div class="text-danger small">${res.error}</div>`;
      return;
    }
    // Show the token (in production you'd email/sms; here we display)
    const tokenExpiry = new Date(res.expiresAt).toLocaleString();
    resultDiv.innerHTML = `
      <div class="small">Reset token (one-time, expires ${tokenExpiry}):</div>
      <div class="p-2 my-2 card-glass"><code id="reset-token">${res.token}</code></div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-accent" id="open-reset-now">Reset Now</button>
        <button class="btn btn-sm btn-outline-light" id="copy-reset">Copy Token</button>
      </div>
    `;
    document.getElementById('copy-reset').onclick = ()=> {
      navigator.clipboard?.writeText(res.token).then(()=> showToast('Token copied', 'success'));
    };
    document.getElementById('open-reset-now').onclick = ()=> {
      modal.hide();
      openResetWithToken(res.token);
    };
  };
}

// ---------- UI: Reset with token (asks new password) ----------
function openResetWithToken(token = '') {
  if (!document.getElementById('resetModal')) {
    const div = document.createElement('div');
    div.innerHTML = `
<div class="modal fade" id="resetModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content card-glass p-3">
      <div class="modal-header">
        <h5 class="modal-title">Reset Password</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="resetForm" class="row g-3">
          <div class="col-12">
            <label class="form-label">Reset Token</label>
            <input class="form-control" id="reset-token-input" placeholder="Paste your token here" required>
          </div>
          <div class="col-12">
            <label class="form-label">New Password</label>
            <input class="form-control" id="reset-newpass" placeholder="New password" required>
          </div>
          <div class="col-12">
            <label class="form-label">Confirm Password</label>
            <input class="form-control" id="reset-confirm" placeholder="Confirm password" required>
          </div>
        </form>
        <div id="reset-result" class="mt-2"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-accent" id="reset-do">Reset Password</button>
      </div>
    </div>
  </div>
</div>`;
    document.body.appendChild(div.firstElementChild);
  }

  const modalEl = document.getElementById('resetModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  // prefill token if provided
  document.getElementById('reset-token-input').value = token || '';

  document.getElementById('reset-do').onclick = (e) => {
    e.preventDefault();
    const t = document.getElementById('reset-token-input').value.trim();
    const np = document.getElementById('reset-newpass').value.trim();
    const conf = document.getElementById('reset-confirm').value.trim();
    const out = document.getElementById('reset-result');

    if (!t) { out.innerHTML = `<div class="text-danger small">Token required</div>`; return; }
    if (np.length < 4) { out.innerHTML = `<div class="text-danger small">Password must be at least 4 characters</div>`; return; }
    if (np !== conf) { out.innerHTML = `<div class="text-danger small">Passwords do not match</div>`; return; }

    const valid = validateResetToken(t);
    if (!valid.ok) { out.innerHTML = `<div class="text-danger small">${valid.error}</div>`; return; }

    const done = consumeResetTokenAndSetPassword(t, np);
    if (!done.ok) { out.innerHTML = `<div class="text-danger small">${done.error}</div>`; return; }

    out.innerHTML = `<div class="text-success small">Password changed. You can now login with the new password.</div>`;
    setTimeout(()=> modal.hide(), 1200);
  };
}
