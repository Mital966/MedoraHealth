// function Sidebar(role){
//     const linksAdmin = `
//     <a class="nav-link" href="#admin-dashboard"><i class="bi bi-bar-chart me-2"></i> Dashboard</a>
//     <a class="nav-link" href="#doctor-list"><i class="bi bi-person-lines-fill me-2"></i> Doctors</a>
//     <a class="nav-link" href="#patients"><i class="bi bi-people me-2"></i> Patients</a>
//     <a class="nav-link" href="#system-settings"><i class="bi bi-gear me-2"></i> Settings</a>
//     <a class="nav-link text-danger" href="#logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
//   `;
//   const linksDoctor = `
//     <a class="nav-link" href="#dashboard"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
//     <a class="nav-link" href="#patients"><i class="bi bi-people me-2"></i> Patient List</a>
//     <a class="nav-link" href="#add-patient"><i class="bi bi-person-plus me-2"></i> Add Patient</a>
//     <a class="nav-link text-danger" href="#logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
//   `;
  
//   const linksPatient = `
//     <a class="nav-link" href="#profile"><i class="bi bi-person-badge me-2"></i> My Profile</a>
//     <a class="nav-link" href="#medication"><i class="bi bi-capsule me-2"></i> Medication</a>
//     <a class="nav-link text-danger" href="#logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
//   `;

//   return `
//   <div class="sidebar">
//     <div class="d-flex align-items-center mb-3">
//       <img src="img/logo.png" width="36" height="36" class="me-2" onerror="this.style.display='none'"/>
//       <div>
//         <div class="fw-bold">Medora Health</div>
//         <div class="small text-secondary">${role === 'admin' ? 'Admin Console' : 'COVID Console'}</div>
//       </div>
//     </div>

//     <nav class="nav flex-column" id="sidebar-links">
//       ${role==='admin' ? linksAdmin : role==='doctor' ? linksDoctor : linksPatient}
//     </nav>

//     ${(role==='doctor' || role==='admin') ? `
//     <div class="mt-4 p-2 small text-secondary">
//       <div class="mb-2">Excel (CSV)</div>
//       <button class="btn btn-sm btn-outline-light me-2" onclick="exportCSV()">Export CSV</button>
//       <label class="btn btn-sm btn-outline-light mb-0">
//         Import CSV <input type="file" accept=".csv,text/csv" hidden onchange="importCSV(this.files[0])">
//       </label>
//     </div>
//     ` : ''}
//   </div>`;
// }

function Sidebar(role) {
  const session = getSession(); // fetch the logged-in user session
  const user = getCurrentUser(); // assumes a helper that returns user obj from localStorage

  // graceful fallback
  const userName = user?.name || 'Guest User';
  const roleLabel = 
    role === 'admin' ? 'Administrator' :
    role === 'doctor' ? 'Doctor' :
    role === 'patient' ? 'Patient' : 'User';

  // color per role
  const roleColor = 
    role === 'admin' ? 'text-danger' :
    role === 'doctor' ? 'text-info' :
    role === 'patient' ? 'text-success' : 'text-secondary';

  // initials for avatar circle
  const initials = userName.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase();

  const linksAdmin = `
    <a class="nav-link" href="#admin-dashboard"><i class="bi bi-bar-chart me-2"></i> Dashboard</a>
    <a class="nav-link" href="#doctor-list"><i class="bi bi-person-lines-fill me-2"></i> Doctors</a>
    <a class="nav-link" href="#patients"><i class="bi bi-people me-2"></i> Patients</a>
    <a class="nav-link" href="#system-settings"><i class="bi bi-gear me-2"></i> Settings</a>
    <a class="nav-link text-danger" href="#logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
  `;

  const linksDoctor = `
    <a class="nav-link" href="#dashboard"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
    <a class="nav-link" href="#patients"><i class="bi bi-people me-2"></i> Patient List</a>
    <a class="nav-link" href="#add-patient"><i class="bi bi-person-plus me-2"></i> Add Patient</a>
    <a class="nav-link text-danger" href="#logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
  `;

  const linksPatient = `
    <a class="nav-link" href="#profile"><i class="bi bi-person-badge me-2"></i> My Profile</a>
    <a class="nav-link" href="#medication"><i class="bi bi-capsule me-2"></i> Medication</a>
    <a class="nav-link text-danger" href="#logout"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
  `;

  return `
  <div class="sidebar d-flex flex-column justify-content-between h-100">
    <div>
      <!-- Logo & Brand -->
      <div class="d-flex align-items-center mb-3">
        <img src="img/logo.png" width="36" height="36" class="me-2" onerror="this.style.display='none'"/>
        <div>
          <div class="fw-bold fs-5">Medora Health</div>
          <div class="small text-secondary">
            ${role === 'admin' ? 'Admin Console' : 'COVID Console'}
          </div>
        </div>
      </div>

      <!-- User Info Card -->
      <div class="card-glass p-2 mb-3 d-flex align-items-center">
        <div class="avatar rounded-circle bg-secondary d-flex align-items-center justify-content-center me-2" 
             style="width:40px; height:40px; font-weight:600; color:#0a111f;">
          ${initials}
        </div>
        <div>
          <div class="fw-semibold text-dark">${userName}</div>
          <div class="small ${roleColor}">${roleLabel}</div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="nav flex-column" id="sidebar-links">
        ${role === 'admin' ? linksAdmin : role === 'doctor' ? linksDoctor : linksPatient}
      </nav>
    </div>

    ${(role==='doctor' || role==='admin') ? `
    <div class="mt-4 p-2 small text-secondary border-top pt-3">
      <div class="mb-2 fw-semibold text-white">Excel (CSV)</div>
      <button class="btn btn-sm btn-outline-light me-2" onclick="exportCSV()">Export CSV</button>
      <label class="btn btn-sm btn-outline-light mb-0">
        Import CSV <input type="file" accept=".csv,text/csv" hidden onchange="importCSV(this.files[0])">
      </label>
    </div>` : ''}
  </div>`;
}



function highlightActive(){
  const hash = location.hash || '#dashboard';
  document.querySelectorAll('#sidebar-links .nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href')===hash);
  });
}