// assets/js/admin.js
// Admin views: dashboard, doctor CRUD, admin patients, system settings

// ---------- Small storage helpers (use yours if available) ----------
if (typeof lsGet === 'undefined') {
  var lsGet = (k, d = null) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  var lsSet = (k, v) => { localStorage.setItem(k, JSON.stringify(v)); };
}
if (typeof DB_KEYS === 'undefined') {
  let DB_KEYS = { USERS: 'mh_users', PATIENTS: 'mh_patients', DOCTORS: 'mh_doctors', SESSION: 'mh_session' };
}

// fallback safe() if not defined
if (typeof safe === 'undefined') {
  function safe(fn) { try { fn(); } catch (e) { console.error(e); showToast?.('Render error: ' + (e.message||e), 'error'); } }
}

// ---------- Helpers: doctors & patients stores ----------
function getDoctors() { return lsGet(DB_KEYS.DOCTORS, []); }
function setDoctors(list) { lsSet(DB_KEYS.DOCTORS, list); }
// helper: normalize & random helpers (re-use across file)
function normalizeForUsername(name = '') {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 12) || 'doc';
}
function randDigits(n = 3) { return String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, '0'); }



function updateDoctor(id, patch) {
  const docs = getDoctors();
  const idx = docs.findIndex(d => d.id === id);
  if (idx < 0) return;
  docs[idx] = { ...docs[idx], ...patch, updatedAt: Date.now() };
  setDoctors(docs);
  if (typeof rebuildUsersIndex === 'function') rebuildUsersIndex();
}
function deleteDoctor(id) {
  const docs = getDoctors().filter(d => d.id !== id);
  setDoctors(docs);
  // unassign patients who had this doctor
  const patients = lsGet(DB_KEYS.PATIENTS, []) || [];
  const changed = patients.map(p => p.doctorId === id ? ({ ...p, doctorId: null, updatedAt: Date.now() }) : p);
  lsSet(DB_KEYS.PATIENTS, changed);
  if (typeof rebuildUsersIndex === 'function') rebuildUsersIndex();
}

// ---------- Admin: Dashboard ----------
function renderAdminDashboard() {
  const root = document.getElementById('content');
  const doctors = getDoctors();
  const patients = lsGet(DB_KEYS.PATIENTS, []) || [];

  const stats = {
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    affected: patients.filter(p => p.status === 'Affected').length,
    cured: patients.filter(p => p.status === 'Cured').length,
    death: patients.filter(p => p.status === 'Death').length
  };
  const { summary, stateCounts, ageBuckets, topDeaths } = computeSummary();
  root.innerHTML = `
  <div class="header-bar">
    <div class="fw-semibold">Administrator Dashboard</div>
    
    <div class="text-end">
    <div class="text-secondary small">Real-time 🔴</div>
    <div class="badge bg-success px-3 py-2 me-2">Total: ${liveSummaryState.summary.total}</div>
    <div class="badge bg-warning text-dark px-3 py-2">Deaths: ${liveSummaryState.summary.death}</div>
    </div>
  </div>
  <div class="container-fluid py-3">
    <div class="row g-3">
      <div class="col-md-3"><div class="card-glass p-3 text-center"><div class="h4 mb-1">${stats.totalDoctors}</div><div class="text-secondary small">Doctors</div></div></div>
      <div class="col-md-3"><div class="card-glass p-3 text-center"><div class="h4 mb-1">${stats.totalPatients}</div><div class="text-secondary small">Patients</div></div></div>
      <div class="col-md-3"><div class="card-glass p-3 text-center"><div class="h4 mb-1">${stats.affected}</div><div class="text-secondary small">Affected</div></div></div>
      <div class="col-md-3"><div class="card-glass p-3 text-center"><div class="h4 mb-1">${stats.death}</div><div class="text-secondary small">Deaths</div></div></div>

      <div class="col-md-12 mt-3">
        <div class="card-glass p-3">
          <div class="h6 mb-2">Patients by Status</div>
          <div id="admin-overview-chart" style="height:320px;"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid py-3">
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card-glass p-3">
            <div id="pie-total" style="height:320px;"></div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="row g-3">
            <div class="col-md-12">
              <div class="card-glass p-3">
                <div id="age-chart" style="height:320px;"></div>
              </div>
            </div>
          </div>
        </div>
          <div class="col-md-6">
                <div class="card-glass flex-fill p-2">
                  <div id="india-map-affected" style="height:240px;"></div>
                </div>
          </div>
          <div class="col-md-3">
                <div class="card-glass flex-fill p-2">
                  <div id="india-map-cured" style="height:240px;"></div>
                </div>
           </div>
           <div class="col-md-3">
                <div class="card-glass flex-fill p-2">
                  <div id="india-map-death" style="height:240px;"></div>
                </div>
            </div>

        <div class="col-md-12">
          <div class="card-glass p-3 mt-3">
            <div class="h6 mb-2">Deaths by State (Top 10)</div>
            <div id="chart-deaths-state" style="height:320px;"></div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card-glass p-3 mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="h6 mb-0">Daily Deaths (Last 14 days)</div>
            </div>
            <div id="spark-deaths-14" style="height:110px;"></div>
          </div>
        </div>

      </div>
    </div>
  
  `;

  requestAnimationFrame(() => {
    if (document.getElementById('pie-total')) renderPie(summary);
    if (document.getElementById('age-chart')) renderAgeChart(ageBuckets);
    if (document.getElementById('chart-deaths-state')) renderDeathsByState(topDeaths);
    if (document.getElementById('spark-deaths-14')) renderDailyDeathsSparkline('spark-deaths-14', getPatients());

    // Render the three India maps (affected/cured/death)
    renderIndiaMaps({
      affected: stateCounts.affected || {},
      cured: stateCounts.cured || {},
      death: stateCounts.death || {}
    });
  });
  // draw chart (if Highcharts present)
  if (window.Highcharts) {
    Highcharts.chart('admin-overview-chart', {
      chart: { type: 'column', backgroundColor: 'transparent' },
      title: { text: null },
      xAxis: { categories: ['Affected','Cured','Death'] },
      yAxis: { min: 0, title: { text: 'Count' } },
      series: [{ name: 'Count', data: [stats.affected, stats.cured, stats.death] }],
      credits: { enabled: false }
    });
  }
}

// ---------- Admin: Doctors list + modal CRUD ----------
function DoctorModal() {
  return `
<div class="modal fade" id="doctorModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Doctor</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="doctorForm" class="row g-3">
          <input type="hidden" id="dm-id">
          <div class="col-12"><label class="form-label">Name</label><input class="form-control" id="dm-name" required></div>
          <div class="col-6"><label class="form-label">Username</label><input class="form-control" id="dm-username" required></div>
          <div class="col-6"><label class="form-label">Password</label><input class="form-control" id="dm-password" required></div>
          <div class="col-6"><label class="form-label">Specialization</label><input class="form-control" id="dm-spec"></div>
          <div class="col-6"><label class="form-label">Phone</label><input class="form-control" id="dm-phone"></div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-accent" id="dm-save">Save</button>
      </div>
    </div>
  </div>
</div>`;
}

function openDoctorModal(id) {
  // inject modal if needed
  if (!document.getElementById('doctorModal')) {
    const div = document.createElement('div'); div.innerHTML = DoctorModal();
    document.body.appendChild(div.firstElementChild);
  }
  const modalEl = document.getElementById('doctorModal');
  const bs = new bootstrap.Modal(modalEl);

  const doc = id ? getDoctors().find(d => d.id === id) : null;
  document.getElementById('dm-id').value = doc?.id || '';
  document.getElementById('dm-name').value = doc?.name || '';
  document.getElementById('dm-username').value = doc?.username || '';
  document.getElementById('dm-password').value = doc?.password || '';
  document.getElementById('dm-spec').value = doc?.specialization || '';
  document.getElementById('dm-phone').value = doc?.phone || '';

  modalEl.querySelector('#dm-save').onclick = () => {
    const payload = {
      name: document.getElementById('dm-name').value.trim(),
      username: document.getElementById('dm-username').value.trim(),
      password: document.getElementById('dm-password').value.trim(),
      specialization: document.getElementById('dm-spec').value.trim(),
      phone: document.getElementById('dm-phone').value.trim()
    };
    const existing = document.getElementById('dm-id').value;
    if (existing) {
      updateDoctor(existing, payload);
      showToast('Doctor updated', 'success');
    } else {
      addDoctor(payload);
      showToast('Doctor added', 'success');
    }
    document.activeElement.blur();
    bs.hide();
    renderDoctorList();
  };

  bs.show();
}

function deleteDoctorConfirm(id) {
  if (!confirm('Delete this doctor?')) return;
  deleteDoctor(id);
  showToast('Doctor deleted', 'success');
  renderDoctorList();
}

function DoctorListView(docs) {
  return `
  <div class="header-bar">
    <div class="fw-semibold">Doctors</div>
    <div>
      <button class="btn btn-sm btn-accent" onclick="openDoctorModal()">Add Doctor</button>
    </div>
  </div>
  <div class="container-fluid py-3">
    <div class="card-glass p-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead><tr><th>Name</th><th>Username</th><th>Specialization</th><th>Phone</th><th>Actions</th></tr></thead>
          <tbody>
            ${docs.map(d => `
              <tr>
                <td>${d.name}</td>
                <td>${d.username}</td>
                <td>${d.specialization || '-'}</td>
                <td>${d.phone || '-'}</td>
                <td>
                  <button class="btn btn-sm btn-outline-light" onclick="openDoctorModal('${d.id}')">Edit</button>
                  <button class="btn btn-sm btn-outline-light text-danger" onclick="deleteDoctorConfirm('${d.id}')">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function renderDoctorList() {
  const root = document.getElementById('content');
  const docs = getDoctors();
  root.innerHTML = DoctorListView(docs);
}

// ---------- Admin: Patients view (reassign doctor) ----------
function renderAdminPatients() {
  const root = document.getElementById('content');
  const patients = lsGet(DB_KEYS.PATIENTS, []) || [];
  const doctors = getDoctors();

  root.innerHTML = `
  <div class="header-bar">
    <div class="fw-semibold">All Patients</div>
    <div class="text-secondary small">Manage and reassign</div>
  </div>
  <div class="container-fluid py-3">
    <div class="card-glass p-0">
      <div class="table-responsive" style="max-height:70vh; overflow:auto;">
        <table class="table table-hover align-middle mb-0 table-sm">
          <thead><tr><th>Name</th><th>Phone</th><th>Age</th><th>State</th><th>Status</th><th>Doctor</th></tr></thead>
          <tbody>
            ${patients.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>${p.phone}</td>
                <td>${p.age || '-'}</td>
                <td>${p.state || '-'}</td>
                <td>${p.status}</td>
                <td>
                  <select class="form-select form-select-sm" onchange="reassignPatient('${p.id}', this.value)">
                    <option value="">Unassigned</option>
                    ${doctors.map(d => `<option value="${d.id}" ${p.doctorId === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
                  </select>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

function reassignPatient(patientId, doctorId) {
  const patients = lsGet(DB_KEYS.PATIENTS, []) || [];
  const idx = patients.findIndex(p => p.id === patientId);
  if (idx < 0) return;
  patients[idx] = { ...patients[idx], doctorId: doctorId || null, updatedAt: Date.now() };
  lsSet(DB_KEYS.PATIENTS, patients);
  showToast('Patient reassigned', 'success');
}

// ---------- Admin: System Settings ----------
function renderSystemSettings() {
  const root = document.getElementById('content');
  root.innerHTML = `
  <div class="header-bar">
    <div class="fw-semibold">System Settings</div>
    <div class="text-secondary small">Maintenance and import/export</div>
  </div>
  <div class="container py-3">
    <div class="card-glass p-3">
      <div class="mb-3">
        <button class="btn btn-danger" id="btn-reset-data">Reset All Data (Danger)</button>
      </div>
      <div class="mb-3">
        <button class="btn btn-outline-light" id="btn-export-json">Export JSON</button>
        <label class="btn btn-outline-light mb-0">
          Import JSON <input type="file" accept="application/json" hidden id="import-json-file">
        </label>
      </div>
    </div>
  </div>
  `;

  document.getElementById('btn-reset-data').onclick = () => {
    if (!confirm('This will erase doctors, patients and session. Continue?')) return;
    localStorage.removeItem(DB_KEYS.DOCTORS);
    localStorage.removeItem(DB_KEYS.PATIENTS);
    localStorage.removeItem(DB_KEYS.USERS);
    localStorage.removeItem(DB_KEYS.SESSION);
    showToast('Data reset. Reloading…', 'info');
    setTimeout(() => location.reload(), 700);
  };

  document.getElementById('btn-export-json').onclick = () => {
    const payload = {
      doctors: getDoctors(),
      patients: lsGet(DB_KEYS.PATIENTS, []) || [],
      users: lsGet(DB_KEYS.USERS, []) || []
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'medora-backup.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const fileInput = document.getElementById('import-json-file');
  fileInput.onchange = (ev) => {
    const f = ev.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const obj = JSON.parse(e.target.result);
        if (obj.doctors) lsSet(DB_KEYS.DOCTORS, obj.doctors);
        if (obj.patients) lsSet(DB_KEYS.PATIENTS, obj.patients);
        if (obj.users) lsSet(DB_KEYS.USERS, obj.users);
        if (typeof rebuildUsersIndex === 'function') rebuildUsersIndex();
        showToast('Imported successfully', 'success');
        renderSystemSettings();
      } catch (err) {
        showToast('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(f);
  };
}

// exported so router can call them (if using module bundler, export accordingly)
window.renderAdminDashboard = renderAdminDashboard;
window.renderDoctorList = renderDoctorList;
window.openDoctorModal = openDoctorModal;
window.renderAdminPatients = renderAdminPatients;
window.renderSystemSettings = renderSystemSettings;
window.reassignPatient = reassignPatient;
window.deleteDoctorConfirm = deleteDoctorConfirm;
