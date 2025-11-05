let fuseInstance = null;

function PatientListView(){
  return `
  <div class="header-bar">
    <div class="fw-semibold">Patient List</div>
    <div class="d-flex gap-2">
      <input id="search" class="form-control form-control-sm" placeholder="Search name or phone">
      <a class="btn btn-sm btn-accent" href="#add-patient">Add Patient</a>
    </div>
  </div>

  <div class="container-fluid py-3">
    <div class="card-glass p-0">
      <div class="table-wrap">
        <table class="table table-hover align-middle mb-0 table-modern">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Gender</th>
              <th>State</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody id="patient-rows"></tbody>
        </table>
      </div>
    </div>
  </div>
  ${PatientModal()}
  `;
}

function statusBadge(s){
  const m = {
  'Affected':'affected',
  'Not Affected':'not-affected',
  'Cured':'cured',
  'Death':'death'
}[s] || 'not-affected';
  return `<span class="badge badge-status ${m}">${s}</span>`;
}

function renderRows(list){debugger
  const tbody = document.getElementById('patient-rows');
  tbody.innerHTML = list.map(p => `
    <tr>
      <td class="d-flex align-items-center gap-2">
        <img src="${p.photo || 'img/default-user.png'}" width="32" height="32" class="rounded-circle border border-secondary" alt="photo">
        <button class="btn btn-link p-0 link" onclick="openPatientModal('${p.id}')">${p.name}</button>
      </td>
      <td>${p.phone}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.state}</td>
      <td>
        <select class="form-select form-select-sm w-auto"
                onchange="updatePatient('${p.id}',{status:this.value}); renderPatients(); renderDashboard();">
          <option ${p.status==='Not Affected'?'selected':''}>Not Affected</option>
          <option ${p.status==='Affected'?'selected':''}>Affected</option>
          <option ${p.status==='Cured'?'selected':''}>Cured</option>
          <option ${p.status==='Death'?'selected':''}>Death</option>
        </select>
      </td>
      <td><span class="cell-muted">${new Date(p.updatedAt).toLocaleString()}</span></td>
    </tr>
  `).join('');
}

// function renderPatients(){debugger
//   const root = document.getElementById('content');
//   root.innerHTML = PatientListView();
//   const list = getPatients();
//   renderRows(list);

//   attachPatientModalHandlers();

//   // Fuse search
//   fuseInstance = new Fuse(list, { keys:['name','phone'], threshold:0.4 });
//   const input = document.getElementById('search');
//   input.addEventListener('input', (e) => {
//     const q = e.target.value.trim();
//     if(!q){ renderRows(list); return; }
//     const res = fuseInstance.search(q).map(r=>r.item);
//     renderRows(res);
//   });
// }

function renderPatients(){
  debugger;
  const root = document.getElementById('content');
  root.innerHTML = PatientListView();

  const session = getSession() || {};
  const role = session.role || null;

  // get full list
  let list = getPatients() || [];

  // filter based on role
  if (role === 'doctor') {
    // doctor sees only patients assigned to them
    const docId = session.doctorId || session.userId || null;
    list = list.filter(p => (p.doctorId || null) === docId);
  } else if (role === 'patient') {
    // patient sees only their own record
    const patientId = session.patientId || null;
    list = list.filter(p => p.id === patientId);
  } else {
    // admin / other roles see all (no filter)
    // optionally you could add more admin-specific filters here
  }

  // render count header if you want (optional)
  const headerBar = document.querySelector('.header-bar .fw-semibold');
  if (headerBar) {
    headerBar.textContent = role === 'doctor' ? 'My Patients' : headerBar.textContent;
  }

  // render rows (handles empty)
  renderRows(list);

  // attach modal handlers (so edit dialog works)
  attachPatientModalHandlers();

  // Fuse search setup (search only within the currently visible list)
  // Create a fresh Fuse instance per render so it indexes current list
  fuseInstance = new Fuse(list, { keys:['name','phone'], threshold:0.4 });

  const input = document.getElementById('search');
  if (input) {
    // remove any existing handlers by replacing oninput (avoids stacking)
    input.value = '';
    input.oninput = (e) => {
      const q = (e.target.value || '').trim();
      if (!q) { renderRows(list); return; }
      const res = fuseInstance.search(q).map(r => r.item);
      renderRows(res);
    };
  }
}

