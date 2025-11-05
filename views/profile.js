function ProfileView(patient) {
  return `
  <div class="header-bar">
    <div class="fw-semibold">My Profile</div>
  </div>

  <div class="container py-4">
    <div class="row g-3 align-items-start">
      
      <!-- Left: Patient Details -->
      <div class="col-md-6">
        <div class="card-glass p-4">
          <div class="h5 mb-3">${patient.name}</div>
          <ul>
          <div class="text-secondary small mb-3"> <li> Patient ID: ${patient.id}</li></div>
          <div><span class="text-secondary"> <li>Phone:</span> ${patient.phone}</li></div>
          <div><span class="text-secondary"><li>Age:</span> ${patient.age}</li></div>
          <div><span class="text-secondary"> <li>Gender:</span> ${patient.gender}</li></div>
          <div><span class="text-secondary"> <li>State:</span> ${patient.state}</li></div>
          <div><span class="text-secondary"><li>Relative:</span> ${patient.relative || '-'}</li></div>
          <div class="mt-3"><span class="text-light"> <li> Status:</span> ${patient.status}</li></div>
          </ul>
        </div>
      </div>

      <!-- Right: Patient Photo -->
      <div class="col-md-6 text-center">
        <div class="card-glass p-4">
          <div class="fw-semibold mb-2">Patient Photo</div>
          <img src="${patient.photo || 'img/default-user.png'}" 
               alt="Patient Photo"
               class="rounded-circle border border-secondary shadow-sm"
               width="180" height="180"
               style="object-fit: cover;">
          <div class="text-secondary small mt-3">
            Uploaded on: ${patient.updatedAt ? new Date(patient.updatedAt).toLocaleDateString() : '—'}
          </div>
        </div>
      </div>

    </div>
  </div>`;
}


function renderProfile(){
  const session = getSession();
  if(!session?.patientId){ document.getElementById('content').innerHTML = '<div class="p-4">No profile found.</div>'; return; }
  const patient = getPatientById(session.patientId);
  const root = document.getElementById('content');
  root.innerHTML = ProfileView(patient);
}
