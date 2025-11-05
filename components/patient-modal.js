function PatientModal() {
  return `
<div class="modal fade" id="patientModal" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Patient Details</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="patientModalForm" class="row g-3">
          <input type="hidden" id="pm-id">
          <div class="col-md-12 text-center">
  <img id="pm-photo-preview" src="img/default-user.png" width="100" height="100" class="rounded-circle border border-secondary mb-2" alt="photo">
  <input type="file" class="form-control w-auto mx-auto" id="pm-photo" accept="image/*">
</div>

          <div class="col-md-6">
            <label class="form-label">Name</label>
            <input class="form-control" id="pm-name">
          </div>
          <div class="col-md-6">
            <label class="form-label">Phone</label>
            <input class="form-control" id="pm-phone">
          </div>
          <div class="col-md-3">
            <label class="form-label">Age</label>
            <input type="number" class="form-control" id="pm-age">
          </div>
          <div class="col-md-3">
            <label class="form-label">Gender</label>
            <select class="form-select" id="pm-gender">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">State</label>
            <select class="form-select" id="pm-state"></select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Relative</label>
            <input class="form-control" id="pm-relative">
          </div>
          <div class="col-md-6">
            <label class="form-label">Status</label>
            <select class="form-select" id="pm-status">
               <option>Not Affected</option>
              <option>Affected</option>
              <option>Cured</option>
              <option>Death</option>
          </select>
          </div>
          <div class="col-12">
            <label class="form-label">Medication</label>
            <textarea class="form-control" id="pm-medication" rows="3"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-accent" id="pm-save">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
}

// function openPatientModal(patientId) {
//   const p = getPatientById(patientId);
//   if (!p) return;
//   document.querySelector("#pm-id").value = p.id;
//   document.querySelector("#pm-name").value = p.name;
//   document.querySelector("#pm-phone").value = p.phone;
//   document.querySelector("#pm-age").value = p.age;
//   document.querySelector("#pm-gender").value = p.gender;
//   const st = document.querySelector("#pm-state");
//   st.innerHTML = STATES.map(
//     (s) => `<option ${s === p.state ? "selected" : ""}>${s}</option>`
//   ).join("");
//   document.querySelector("#pm-relative").value = p.relative || "";
//   document.querySelector("#pm-status").value = p.status;
//   document.querySelector("#pm-medication").value = p.medication || "";
//   document.querySelector("#pm-photo-preview").src =
//     p.photo || "img/default-user.png";

//   new bootstrap.Modal("#patientModal").show();
// }

// function attachPatientModalHandlers() {
//   document.getElementById("pm-save").addEventListener("click", async () => {
//     const fileInput = document.getElementById("pm-photo");
//     let photoData = p.photo;
//     if (fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       photoData = await toBase64(file);
//     }

//     const id = document.getElementById("pm-id").value;
//     updatePatient(id, {
//       name: document.getElementById("pm-name").value.trim(),
//       phone: document.getElementById("pm-phone").value.trim(),
//       age: Number(document.getElementById("pm-age").value),
//       gender: document.getElementById("pm-gender").value,
//       state: document.getElementById("pm-state").value,
//       relative: document.getElementById("pm-relative").value.trim(),
//       status: document.getElementById("pm-status").value,
//       medication: document.getElementById("pm-medication").value.trim(),
//       photo: photoData,
//     });
//     bootstrap.Modal.getInstance(document.getElementById("patientModal")).hide();
//     alert("Updated");
//     location.hash = "#patients";
//     renderPatients();
//     renderDashboard();
//   });
// }

function openPatientModal(patientId) {
  const p = getPatientById(patientId);
  if (!p) return;

  document.querySelector("#pm-id").value = p.id;
  document.querySelector("#pm-name").value = p.name;
  document.querySelector("#pm-phone").value = p.phone;
  document.querySelector("#pm-age").value = p.age;
  document.querySelector("#pm-gender").value = p.gender;

  const st = document.querySelector("#pm-state");
  st.innerHTML = STATES.map(s => `<option ${s === p.state ? "selected" : ""}>${s}</option>`).join("");

  document.querySelector("#pm-relative").value = p.relative || "";
  document.querySelector("#pm-status").value = p.status;
  document.querySelector("#pm-medication").value = p.medication || "";

  const previewImg = document.querySelector("#pm-photo-preview");
  previewImg.src = p.photo || "img/default-user.png";

  // Clear file input when opening (so change event always fires on new select)
  const fileInput = document.getElementById("pm-photo");
  if (fileInput) fileInput.value = "";

  new bootstrap.Modal("#patientModal").show();
}

// function attachPatientModalHandlers() {
//   const saveBtn = document.getElementById("pm-save");
//   const fileInput = document.getElementById("pm-photo");
//   const previewImg = document.getElementById("pm-photo-preview");

//   if (fileInput) {
//     fileInput.addEventListener("change", async () => {
//       if (fileInput.files && fileInput.files.length > 0) {
//         const file = fileInput.files[0];
//         const b64 = await toBase64(file);
//         previewImg.src = b64;
//       }
//     });
//   }

//   saveBtn.addEventListener("click", async () => {
//     const id = document.getElementById("pm-id").value;

//     const existing = getPatientById(id);

//     let photoData = (existing && existing.photo) ? existing.photo : "";
//     if (fileInput && fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       photoData = await toBase64(file);
//     }

//     updatePatient(id, {
//       name: document.getElementById("pm-name").value.trim(),
//       phone: document.getElementById("pm-phone").value.trim(),
//       age: Number(document.getElementById("pm-age").value),
//       gender: document.getElementById("pm-gender").value,
//       state: document.getElementById("pm-state").value,
//       relative: document.getElementById("pm-relative").value.trim(),
//       status: document.getElementById("pm-status").value,
//       medication: document.getElementById("pm-medication").value.trim(),
//       photo: photoData,
//     });

//     bootstrap.Modal.getInstance(document.getElementById("patientModal")).hide();
//     showToast("Updated",'success');
//     location.hash = "#patients";
//     renderPatients();
//     renderDashboard();
//   });
// }

function attachPatientModalHandlers() {
  const saveBtn = document.getElementById("pm-save");
  const fileInput = document.getElementById("pm-photo");
  const previewImg = document.getElementById("pm-photo-preview");
  const modalEl = document.getElementById("patientModal");

  // safety: nothing to do if modal or saveBtn missing
  if (!modalEl || !saveBtn) return;

  // Ensure there's a bootstrap Modal instance for this element
  let bsModal = bootstrap.Modal.getInstance(modalEl);
  if (!bsModal) {
    // create one without showing
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
  }

  // Remove previously attached click handler on saveBtn to avoid duplicates
  // (simple technique: clone the node and replace it)
  const newSaveBtn = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

  // Wire file input -> preview (if input exists)
  if (fileInput && previewImg) {
    // remove any previous listeners similarly
    const newFileInput = fileInput.cloneNode(true);
    fileInput.parentNode.replaceChild(newFileInput, fileInput);

    newFileInput.addEventListener("change", async () => {
      if (newFileInput.files && newFileInput.files.length > 0) {
        const file = newFileInput.files[0];
        try {
          const b64 = await toBase64(file);
          previewImg.src = b64;
        } catch (e) {
          console.error('Photo conversion failed', e);
          showToast('Failed to read photo', 'error');
        }
      }
    });
  }

  // Attach save handler
  newSaveBtn.addEventListener("click", async () => {
    // defensive element lookups each time
    const idEl = document.getElementById("pm-id");
    if (!idEl) { showToast('Missing patient id', 'error'); return; }
    const id = idEl.value;

    const existing = getPatientById(id);

    // default to existing photo if present
    let photoData = (existing && existing.photo) ? existing.photo : "";

    // read file input fresh (element may have been replaced above)
    const curFileInput = document.getElementById("pm-photo");
    if (curFileInput && curFileInput.files && curFileInput.files.length > 0) {
      const file = curFileInput.files[0];
      try {
        photoData = await toBase64(file);
      } catch (e) {
        console.error('Photo conversion failed', e);
        showToast('Failed to read photo', 'error');
      }
    }

    // gather values (again, defensive)
    const name = (document.getElementById("pm-name")?.value || "").trim();
    const phone = (document.getElementById("pm-phone")?.value || "").trim();
    const age = Number(document.getElementById("pm-age")?.value || 0);
    const gender = document.getElementById("pm-gender")?.value || "";
    const state = document.getElementById("pm-state")?.value || "";
    const relative = (document.getElementById("pm-relative")?.value || "").trim();
    const status = document.getElementById("pm-status")?.value || "";
    const medication = (document.getElementById("pm-medication")?.value || "").trim();

    updatePatient(id, {
      name, phone, age, gender, state, relative, status, medication, photo: photoData
    });

    // hide modal safely (use the existing bsModal instance we created above)
    try {
      debugger
      bsModal.hide();
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    } catch (e) {
      // fallback: if hiding fails, remove `show` classes and backdrop manually
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }

    showToast("Updated", 'success');
    location.hash = "#patients";
    renderPatients();
    renderDashboard();
  });
}

