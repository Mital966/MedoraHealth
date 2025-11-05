// function AddPatientView() {
//   return `
//   <div class="header-bar">
//     <div class="fw-semibold">Add Patient</div>
//     <div class="text-secondary small">Keep it concise and accurate</div>
//   </div>
//   <div class="container py-4">
//     <form id="add-form" class="row g-3 card-glass p-4">
//     <div class="col-md-6">
//   <label class="form-label">Upload Photo</label>
//   <input type="file" class="form-control" id="f-photo" accept="image/*">
// </div>
//       <div class="col-md-6">
//         <label class="form-label">Name</label>
//         <input class="form-control" id="f-name" required>
//       </div>
//       <div class="col-md-6">
//         <label class="form-label">Phone</label>
//         <input class="form-control" id="f-phone"  required>
//       </div>
//       <div class="col-md-3">
//         <label class="form-label">Age</label>
//         <input type="number" min="0" max="120" class="form-control" id="f-age" required>
//       </div>
//       <div class="col-md-3">
//         <label class="form-label">Gender</label>
//         <select class="form-select" id="f-gender">
//           <option>Male</option><option>Female</option><option>Other</option>
//         </select>
//       </div>
//       <div class="col-md-6">
//         <label class="form-label">State</label>
//         <select class="form-select" id="f-state">
//           ${STATES.map((s) => `<option>${s}</option>`).join("")}
//         </select>
//       </div>
//       <div class="col-md-6">
//         <label class="form-label">Relative</label>
//         <input class="form-control" id="f-relative">
//       </div>
//       <div class="col-md-6">
//         <label class="form-label">Health Status</label>
//         <select class="form-select" id="f-status">
//           <option>Not Affected</option>
//           <option>Affected</option>
//           <option>Death</option>
//         </select>
//       </div>
//       <div class="col-12">
//         <label class="form-label">Medication (optional)</label>
//         <textarea class="form-control" id="f-medication" rows="2"></textarea>
//       </div>
//       <div class="col-12 d-flex gap-2">
//         <button class="btn btn-accent">Add Patient</button>
//         <a class="btn btn-outline-light" href="#patients">Back to List</a>
//       </div>
      
//     </form>
//   </div>`;
// }

// function renderAddPatient() {
//   const root = document.getElementById("content");
//   root.innerHTML = AddPatientView();
// document.getElementById('add-form').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const fileInput = document.getElementById('f-photo');
//   let photoData = '';
//   if (fileInput.files.length > 0) {
//     const file = fileInput.files[0];
//     photoData = await toBase64(file);
//   }

//   const p = {
//     name: document.getElementById('f-name').value.trim(),
//     phone: document.getElementById('f-phone').value.trim(),
//     age: Number(document.getElementById('f-age').value),
//     gender: document.getElementById('f-gender').value,
//     state: document.getElementById('f-state').value,
//     relative: document.getElementById('f-relative').value.trim(),
//     status: document.getElementById('f-status').value,
//     medication: document.getElementById('f-medication').value.trim(),
//     photo: photoData || ''
//   };

//   addPatient(p);
//   alert('Patient added successfully!');
//   location.hash = '#patients';
//   renderPatients();
// });
// }

function AddPatientView() {
  return `
  <div class="header-bar">
    <div class="fw-semibold">Add Patient</div>
    <div class="text-secondary small">Keep it concise and accurate</div>
  </div>

  <div class="container py-4">
    <form id="add-form" class="row g-3">

      <!-- Left: Form fields -->
      <div class="col-md-6">
        <div class="card-glass p-4">
          <div class="mb-3">
            <label class="form-label">Upload Photo</label>
            <input type="file" class="form-control" id="f-photo" accept="image/*">
          </div>

          <div class="mb-3">
            <label class="form-label">Name</label>
            <input class="form-control" id="f-name" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Phone</label>
            <input class="form-control" id="f-phone" required>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Age</label>
              <input type="number" min="0" max="120" class="form-control" id="f-age" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Gender</label>
              <select class="form-select" id="f-gender">
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">State</label>
              <select class="form-select" id="f-state">
                ${STATES.map((s) => `<option>${s}</option>`).join("")}
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Relative</label>
              <input class="form-control" id="f-relative">
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Health Status</label>
            <select class="form-select" id="f-status">
              <option>Not Affected</option>
              <option>Affected</option>
              <option>Cured</option>
              <option>Death</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Medication (optional)</label>
            <textarea class="form-control" id="f-medication" rows="2"></textarea>
          </div>

          <div class="d-flex gap-2">
            <button class="btn btn-accent">Add Patient</button>
            <a class="btn btn-outline-light" href="#patients">Back to List</a>
          </div>
        </div>
      </div>

      <!-- Right: Live photo preview -->
      <div class="col-md-6">
        <div class="card-glass p-4 text-center">
          <div class="fw-semibold mb-2">Photo Preview</div>
          <img id="f-photo-preview"
               src="img/default-user.png"
               width="200" height="200"
               class="rounded-circle border border-secondary shadow-sm"
               style="object-fit:cover;"
               alt="Preview" onerror="handleImageError(this)">
          
        </div>
      </div>

    </form>
  </div>`;
}

function renderAddPatient() {debugger
  const root = document.getElementById("content");
  root.innerHTML = AddPatientView();

  const fileInput = document.getElementById('f-photo');
  const previewImg = document.getElementById('f-photo-preview');

  // Live preview on file select
  fileInput.addEventListener('change', async () => {
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const b64 = await toBase64(file);
      previewImg.src = b64;            // show instantly
      previewImg.dataset.b64 = b64;    // stash for submit
    } else {
      previewImg.src = 'img/default-user.png';
      delete previewImg.dataset.b64;
    }
  });

  document.getElementById('add-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Use the already-prepared preview b64 if present; otherwise read the file
    let photoData = previewImg.dataset.b64 || '';
    if (!photoData && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      photoData = await toBase64(file);
    }
    
    const p = {
      name: document.getElementById('f-name').value.trim(),
      phone: document.getElementById('f-phone').value.trim(),
      age: Number(document.getElementById('f-age').value),
      gender: document.getElementById('f-gender').value,
      state: document.getElementById('f-state').value,
      relative: document.getElementById('f-relative').value.trim(),
      status: document.getElementById('f-status').value,
      medication: document.getElementById('f-medication').value.trim(),
      photo: photoData || '',
    };
    const session = getSession();
    p.doctorId = session?.doctorId || null;


    addPatient(p);
    showToast('Patient added successfully!','success');
    location.hash = '#patients';
    renderPatients();
  });
}
