// Storage & seed
const DB_KEYS = {
  PATIENTS: 'medora:patients',
  USERS: 'medora:users',
  SESSION: 'medora:session'
};

const STATES = [
  "--select--", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
];

function lsGet(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (e) { return fallback; }
}
function lsSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function seedIfEmpty() {
  if (!lsGet(DB_KEYS.USERS)) {
    debugger
    lsSet(DB_KEYS.USERS, [
      { id: 'u_admin_1', role: 'admin', name: 'System Admin', username: 'admin', password: 'admin123' },
      // {

      //   doctorId:"",
      //   role:"doctor",
      //   "id": "dr_002",
      //   "name": "Dr. Priya Sharma",
      //   "username": "doctor",
      //   "password": "doctor123",
      //   "specialization": "Cardiologist",
      //   "phone": "9876501234",
      //   "createdAt": 1730700000000,
      //   "updatedAt": 1730845000000
      // },
      { id: 'u_pt_1', role: 'patient', name: 'Aarav Sharma', username: 'aarav', password: '1234', patientId: 'pt_001' }
    ]);
  }
  if (!lsGet(DB_KEYS.PATIENTS)) {
    const now = Date.now();
    lsSet(DB_KEYS.PATIENTS, [
      { id: 'pt_001', name: 'Aarav Sharma', phone: '98xxxxxx12', age: 34, gender: 'Male', state: 'Maharashtra', relative: 'Riya Sharma', status: 'Affected', medication: 'Paracetamol 500mg, Vitamin C, Hydration', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_002', name: 'Neha Verma', phone: '91xxxxxx77', age: 29, gender: 'Female', state: 'Delhi', relative: 'Amit Verma', status: 'Not Affected', medication: '-', createdAt: now - 86400000 * 3, updatedAt: now - 86400000 * 1 },
      { id: 'pt_003', name: 'Sanjay Patel', phone: '97xxxxxx45', age: 52, gender: 'Male', state: 'Gujarat', relative: 'Pooja Patel', status: 'Death', medication: '-', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 7 },
      { id: 'pt_004', name: 'Ananya Rao', phone: '99xxxxxx90', age: 41, gender: 'Female', state: 'Karnataka', relative: 'Rao Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 2 },
      { id: 'pt_005', name: 'Rajesh Kumar', phone: '98xxxxxx23', age: 45, gender: 'Male', state: 'Maharashtra', relative: 'Kumar Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 1 },
      { id: 'pt_006', name: 'Priya Sharma', phone: '97xxxxxx42', age: 34, gender: 'Female', state: 'Delhi', relative: 'Sharma Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 3 },
      { id: 'pt_007', name: 'Vikram Patel', phone: '99xxxxxx81', age: 29, gender: 'Male', state: 'Gujarat', relative: 'Patel Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 2, updatedAt: now - 86400000 * 1 },
      { id: 'pt_008', name: 'Sneha Nair', phone: '95xxxxxx37', age: 38, gender: 'Female', state: 'Kerala', relative: 'Nair Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 2 },
      { id: 'pt_009', name: 'Amit Singh', phone: '96xxxxxx51', age: 50, gender: 'Male', state: 'Uttar Pradesh', relative: 'Singh Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 10, updatedAt: now - 86400000 * 3 },
      { id: 'pt_010', name: 'Meera Iyer', phone: '99xxxxxx33', age: 27, gender: 'Female', state: 'Tamil Nadu', relative: 'Iyer Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 2 },
      { id: 'pt_011', name: 'Arjun Deshmukh', phone: '98xxxxxx76', age: 31, gender: 'Male', state: 'Maharashtra', relative: 'Deshmukh Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 3, updatedAt: now - 86400000 * 1 },
      { id: 'pt_012', name: 'Ritika Joshi', phone: '97xxxxxx09', age: 36, gender: 'Female', state: 'Rajasthan', relative: 'Joshi Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 4 },
      { id: 'pt_013', name: 'Naveen Gupta', phone: '99xxxxxx12', age: 42, gender: 'Male', state: 'Delhi', relative: 'Gupta Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 2 },
      { id: 'pt_014', name: 'Anjali Das', phone: '95xxxxxx44', age: 33, gender: 'Female', state: 'West Bengal', relative: 'Das Sr.', status: 'Affected', medication: 'Azithromycin 500mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 3 },
      { id: 'pt_015', name: 'Suresh Reddy', phone: '96xxxxxx27', age: 48, gender: 'Male', state: 'Telangana', relative: 'Reddy Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 9, updatedAt: now - 86400000 * 4 },
      { id: 'pt_016', name: 'Divya Kapoor', phone: '97xxxxxx66', age: 30, gender: 'Female', state: 'Punjab', relative: 'Kapoor Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 1 },
      { id: 'pt_017', name: 'Manoj Mehta', phone: '99xxxxxx22', age: 40, gender: 'Male', state: 'Gujarat', relative: 'Mehta Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 3 },
      { id: 'pt_018', name: 'Pooja Chatterjee', phone: '98xxxxxx88', age: 28, gender: 'Female', state: 'West Bengal', relative: 'Chatterjee Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 3, updatedAt: now - 86400000 * 2 },
      { id: 'pt_019', name: 'Rohit Bansal', phone: '97xxxxxx11', age: 37, gender: 'Male', state: 'Haryana', relative: 'Bansal Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 10, updatedAt: now - 86400000 * 1 },
      { id: 'pt_020', name: 'Kavita Pillai', phone: '95xxxxxx30', age: 41, gender: 'Female', state: 'Kerala', relative: 'Pillai Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 4 },
      { id: 'pt_021', name: 'Ramesh Yadav', phone: '96xxxxxx02', age: 35, gender: 'Male', state: 'Uttar Pradesh', relative: 'Yadav Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 2 },
      { id: 'pt_022', name: 'Aishwarya Ghosh', phone: '97xxxxxx13', age: 26, gender: 'Female', state: 'West Bengal', relative: 'Ghosh Sr.', status: 'Affected', medication: 'Azithromycin 500mg', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 2 },
      { id: 'pt_023', name: 'Deepak Verma', phone: '99xxxxxx87', age: 39, gender: 'Male', state: 'Madhya Pradesh', relative: 'Verma Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 1 },
      { id: 'pt_024', name: 'Nisha Menon', phone: '98xxxxxx26', age: 44, gender: 'Female', state: 'Kerala', relative: 'Menon Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 3 },
      { id: 'pt_025', name: 'Aditya Jain', phone: '97xxxxxx08', age: 32, gender: 'Male', state: 'Rajasthan', relative: 'Jain Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 2 },
      { id: 'pt_026', name: 'Tanya Bhattacharya', phone: '99xxxxxx77', age: 29, gender: 'Female', state: 'West Bengal', relative: 'Bhattacharya Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 3 },
      { id: 'pt_027', name: 'Kiran Rao', phone: '95xxxxxx92', age: 46, gender: 'Male', state: 'Karnataka', relative: 'Rao Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 9, updatedAt: now - 86400000 * 4 },
      { id: 'pt_028', name: 'Shreya Mukherjee', phone: '96xxxxxx59', age: 33, gender: 'Female', state: 'West Bengal', relative: 'Mukherjee Sr.', status: 'Affected', medication: 'Azithromycin 500mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_029', name: 'Harish Kumar', phone: '97xxxxxx04', age: 38, gender: 'Male', state: 'Tamil Nadu', relative: 'Kumar Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 2 },
      { id: 'pt_030', name: 'Lakshmi Reddy', phone: '99xxxxxx90', age: 27, gender: 'Female', state: 'Telangana', relative: 'Reddy Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 3 },
      { id: 'pt_031', name: 'Sunil Sharma', phone: '98xxxxxx43', age: 43, gender: 'Male', state: 'Delhi', relative: 'Sharma Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 10, updatedAt: now - 86400000 * 5 },
      { id: 'pt_032', name: 'Rekha Pillai', phone: '95xxxxxx12', age: 40, gender: 'Female', state: 'Kerala', relative: 'Pillai Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 1 },
      { id: 'pt_033', name: 'Vivek Tiwari', phone: '96xxxxxx68', age: 37, gender: 'Male', state: 'Uttar Pradesh', relative: 'Tiwari Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_034', name: 'Monica Dasgupta', phone: '97xxxxxx31', age: 35, gender: 'Female', state: 'West Bengal', relative: 'Dasgupta Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 3 },
      { id: 'pt_035', name: 'Sanjay Patil', phone: '99xxxxxx52', age: 42, gender: 'Male', state: 'Maharashtra', relative: 'Patil Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 2 },
      { id: 'pt_036', name: 'Neha Raina', phone: '98xxxxxx73', age: 31, gender: 'Female', state: 'Jammu & Kashmir', relative: 'Raina Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 4 },
      { id: 'pt_037', name: 'Arvind Mishra', phone: '97xxxxxx05', age: 39, gender: 'Male', state: 'Madhya Pradesh', relative: 'Mishra Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_038', name: 'Rupal Shah', phone: '99xxxxxx38', age: 29, gender: 'Female', state: 'Gujarat', relative: 'Shah Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 2 },
      { id: 'pt_039', name: 'Nitin Malhotra', phone: '95xxxxxx01', age: 34, gender: 'Male', state: 'Punjab', relative: 'Malhotra Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 1 },
      { id: 'pt_040', name: 'Shalini Menon', phone: '96xxxxxx84', age: 45, gender: 'Female', state: 'Kerala', relative: 'Menon Sr.', status: 'Affected', medication: 'Azithromycin 500mg', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 3 },
      { id: 'pt_041', name: 'Ashok Verma', phone: '97xxxxxx39', age: 50, gender: 'Male', state: 'Delhi', relative: 'Verma Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 9, updatedAt: now - 86400000 * 4 },
      { id: 'pt_042', name: 'Pallavi Raut', phone: '99xxxxxx99', age: 32, gender: 'Female', state: 'Maharashtra', relative: 'Raut Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_043', name: 'Tarun Aggarwal', phone: '98xxxxxx06', age: 37, gender: 'Male', state: 'Haryana', relative: 'Aggarwal Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 2 },
      { id: 'pt_044', name: 'Sakshi Nanda', phone: '97xxxxxx50', age: 28, gender: 'Female', state: 'Punjab', relative: 'Nanda Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 1 },
      { id: 'pt_045', name: 'Ganesh Iyer', phone: '99xxxxxx79', age: 46, gender: 'Male', state: 'Tamil Nadu', relative: 'Iyer Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 3 },
      { id: 'pt_046', name: 'Nikita Basu', phone: '95xxxxxx48', age: 30, gender: 'Female', state: 'West Bengal', relative: 'Basu Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 3 },
      { id: 'pt_047', name: 'Ravi Chauhan', phone: '96xxxxxx22', age: 40, gender: 'Male', state: 'Uttar Pradesh', relative: 'Chauhan Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 2 },
      { id: 'pt_048', name: 'Ishita Rao', phone: '97xxxxxx89', age: 27, gender: 'Female', state: 'Karnataka', relative: 'Rao Sr.', status: 'Affected', medication: 'Azithromycin 500mg', createdAt: now - 86400000 * 3, updatedAt: now - 86400000 * 1 },
      { id: 'pt_049', name: 'Kunal Sinha', phone: '99xxxxxx14', age: 35, gender: 'Male', state: 'West Bengal', relative: 'Sinha Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 3 },
      { id: 'pt_050', name: 'Ankita Reddy', phone: '98xxxxxx62', age: 38, gender: 'Female', state: 'Telangana', relative: 'Reddy Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Steam inhalation', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_051', name: 'Harsha Bhatt', phone: '97xxxxxx71', age: 31, gender: 'Male', state: 'Gujarat', relative: 'Bhatt Sr.', status: 'Cured', medication: 'Doxycycline 100mg', createdAt: now - 86400000 * 8, updatedAt: now - 86400000 * 3 },
      { id: 'pt_052', name: 'Preeti Nair', phone: '99xxxxxx60', age: 42, gender: 'Female', state: 'Kerala', relative: 'Nair Sr.', status: 'Affected', medication: 'Azithromycin 500mg, Vitamin C', createdAt: now - 86400000 * 4, updatedAt: now - 86400000 * 2 },
      { id: 'pt_053', name: 'Abhishek Sharma', phone: '95xxxxxx91', age: 36, gender: 'Male', state: 'Delhi', relative: 'Sharma Sr.', status: 'Cured', medication: 'Paracetamol 500mg', createdAt: now - 86400000 * 7, updatedAt: now - 86400000 * 3 },
      { id: 'pt_054', name: 'Ritu Khanna', phone: '96xxxxxx07', age: 34, gender: 'Female', state: 'Punjab', relative: 'Khanna Sr.', status: 'Affected', medication: 'Azithromycin 500mg', createdAt: now - 86400000 * 5, updatedAt: now - 86400000 * 2 },
      { id: 'pt_055', name: 'Gaurav Singh', phone: '97xxxxxx25', age: 39, gender: 'Male', state: 'Uttar Pradesh', relative: 'Singh Sr.', status: 'Cured', medication: 'Dolo 650mg', createdAt: now - 86400000 * 6, updatedAt: now - 86400000 * 3 }
    ]

    );
    patients.forEach(p => { if (p.status === 'Recovered') p.status = 'Cured'; });
    lsSet(DB_KEYS.PATIENTS, patients);

  }
}
seedIfEmpty();

// Auth
// function login(username, password) {
//   alert("hi");
//   debugger;
//   const users = lsGet(DB_KEYS.USERS, []);
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     lsSet(DB_KEYS.SESSION, { userId: user.id, role: user.role, patientId: user.patientId || null });
//     return { ok: true, user };
//   }
//   return { ok: false };
// }
function logout() {
  localStorage.removeItem(DB_KEYS.SESSION);
  location.hash = '#login';
  renderApp();
}
function getSession() {
  try { return JSON.parse(localStorage.getItem('mh_session')) || null; }
  catch { return null; }
}

function uid(prefix = 'id') {
  return prefix + '_' + Math.random().toString(36).slice(2, 8);
}

// Patients CRUD
function getPatients() { return lsGet(DB_KEYS.PATIENTS, []); }
function setPatients(list) { lsSet(DB_KEYS.PATIENTS, list); }
// function addPatient(p){
//   const list = getPatients();
//   list.push({ ...p, id: uid('pt'), createdAt: Date.now(), updatedAt: Date.now() });
//   setPatients(list); return p;
// }

function addPatient(p) {
  const list = getPatients();
  const newId = uid('pt');
  const patient = { ...p, id: newId, createdAt: Date.now(), updatedAt: Date.now() };
  list.push(patient);
  setPatients(list);

  // Create a linked patient login
  const users = lsGet(DB_KEYS.USERS, []);
  const username = p.name.toLowerCase().slice(-6);
  const password = String(p.phone).slice(-4);
  users.push({
    id: uid('u_pt'),
    role: 'patient',
    name: p.name,
    username,
    password,
    patientId: newId
  });
  lsSet(DB_KEYS.USERS, users);

  showToast(`New patient added!\\nUsername: ${username}\\nPassword: ${password}`, 'success');

  return patient;
}
function updatePatient(id, patch) {
  const list = getPatients().map(p => p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p);
  setPatients(list);
  refreshLiveSummary();
  renderPatients();
  renderDashboard();
}
function getPatientById(id) { return getPatients().find(p => p.id === id); }

// Export/Import helpers
function exportJSON() {
  const data = {
    patients: getPatients(),
    users: lsGet(DB_KEYS.USERS, [])
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'medora-data.json';
  a.click(); URL.revokeObjectURL(url);
}
function importJSON(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const obj = JSON.parse(reader.result);
      if (obj.patients) lsSet(DB_KEYS.PATIENTS, obj.patients);
      if (obj.users) lsSet(DB_KEYS.USERS, obj.users);
      showToast('Import successful. Reloading...', 'success');
      location.reload();
    } catch (e) { showToast('Invalid file', 'error'); }
  };
  reader.readAsText(file);
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function exportCSV() {
  const rows = getPatients();

  // Define the columns/order you want in Excel:
  const headers = [
    "id", "name", "phone", "age", "gender", "state", "relative",
    "status", "medication", "createdAt", "updatedAt"
  ];

  // Escape cells for CSV
  const esc = (v) => {
    if (v === null || v === undefined) return "";
    v = String(v);
    if (v.includes('"') || v.includes(',') || v.includes('\n')) {
      return '"' + v.replace(/"/g, '""') + '"';
    }
    return v;
  };

  const lines = [];
  lines.push(headers.join(",")); // header row
  for (const r of rows) {
    const line = headers.map(h => esc(r[h]));
    lines.push(line.join(","));
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "medora-patients.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function importCSV(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const text = reader.result;
      const rows = parseCSV(text); // array of objects
      if (!rows.length) return alert("No rows found in CSV.");

      // Normalize keys and add rows
      const existing = getPatients();
      const beforeLen = existing.length;

      rows.forEach(obj => {
        // Map/clean fields
        const p = {
          id: obj.id && String(obj.id).trim() ? String(obj.id).trim() : uid('pt'),
          name: (obj.name || "").trim(),
          phone: (obj.phone || "").trim(),
          age: Number(obj.age || 0),
          gender: (obj.gender || "Other").trim(),
          state: (obj.state || "").trim(),
          relative: (obj.relative || "").trim(),
          status: (obj.status || "Not Affected").trim(),
          medication: (obj.medication || "").trim(),
          createdAt: obj.createdAt ? Number(obj.createdAt) : Date.now(),
          updatedAt: Date.now(),
          // optional photo column support if present
          photo: obj.photo ? String(obj.photo) : (obj.image || "")
        };

        // If same id already exists, update; else push
        const idx = existing.findIndex(x => x.id === p.id);
        if (idx >= 0) existing[idx] = { ...existing[idx], ...p };
        else existing.push(p);
      });

      setPatients(existing);
      showToast(`CSV imported. ${existing.length - beforeLen >= 0 ? (existing.length - beforeLen) : 0} new/updated records.`, 'success');
      // re-render if you're on these screens
      if (location.hash === '#patients') renderPatients();
      if (location.hash === '#dashboard') renderDashboard();
    } catch (e) {
      console.error(e);
      showToast('CSV import failed. Please check the file format.', 'error');
    }
  };
  reader.readAsText(file);
}

// Simple CSV -> objects (assumes first row is header)
function parseCSV(text) {
  const lines = text.replace(/\r/g, '').split('\n').filter(Boolean);
  if (!lines.length) return [];

  const headers = splitCSVLine(lines[0]).map(h => h.trim());
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => obj[h] = cols[idx] ?? "");
    out.push(obj);
  }
  return out;
}

// Handle commas and quotes correctly in a CSV line
function splitCSVLine(line) {
  const res = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } // escaped quote
        else { inQuotes = false; }
      } else {
        cur += ch;
      }
    } else {
      if (ch === ',') { res.push(cur); cur = ''; }
      else if (ch === '"') { inQuotes = true; }
      else { cur += ch; }
    }
  }
  res.push(cur);
  return res;
}

function handleImageError(imgElement) {
  imgElement.onerror = null; // prevent infinite loop
  imgElement.src = '';
  imgElement.style.background = '#2d3748';
  imgElement.style.display = 'inline-flex';
  imgElement.style.alignItems = 'center';
  imgElement.style.justifyContent = 'center';
  imgElement.style.color = '#aaa';
  imgElement.style.fontSize = '13px';
  imgElement.style.textAlign = 'center';
  imgElement.style.width = imgElement.width + 'px';
  imgElement.style.height = imgElement.height + 'px';
  imgElement.style.borderRadius = '50%';
  imgElement.innerText = '';

  // Add small “No image” overlay
  // const span = document.createElement('div');
  // span.textContent = 'Image Preview';
  // span.style.color = '#ccc';
  // span.style.fontSize = '12px';
  // span.style.marginTop = '4px';
  // imgElement.parentNode.appendChild(span);
}

// ---- Doctor storage ----
function getDoctors() {
  debugger
  const d = JSON.parse(localStorage.getItem('mh_doctors') || '[]');
  if (!d.length) {
    // const seed = [
    //   { id: uid('dr'), name: 'Dr. Meera', username: 'doctor', password: 'doctor123', specialization: 'General Medicine', phone: '9999999999' }
    // ];
    // localStorage.setItem('mh_doctors', JSON.stringify(seed));
    return [];
  }
  return d;
}
function setDoctors(list) {
  localStorage.setItem('mh_doctors', JSON.stringify(list));
}
// function addDoctor(doc) {
//   const docs = getDoctors();
//   const item = {
//     id: uid('dr'),
//     name: doc.name?.trim() || 'Doctor',
//     username: doc.username?.trim(),
//     password: doc.password?.trim(),
//     specialization: doc.specialization?.trim() || 'General',
//     phone: doc.phone?.trim() || '',
//     createdAt: Date.now(),
//     updatedAt: Date.now()
//   };
//   docs.push(item);
//   setDoctors(docs);
//   return item;
// }
function addDoctor(payload) {
  // read existing lists
  debugger
  const docs = getDoctors() || [];
  const users = lsGet(DB_KEYS.USERS, []) || [];

  // create unique doctor id
  const id = 'dr_' + Date.now().toString(36);

  // username/password: prefer provided, else generate
  let username = (payload.username || (normalizeForUsername(payload.name || 'doc') + randDigits(2))).toLowerCase();
  let password = (payload.password || ('doc' + randDigits(4)));

  // ensure username uniqueness across users
  let base = username;
  let counter = 1;
  while (users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
    username = `${base}${counter}`;
    counter++;
  }

  // doctor object to store in doctors list
  const doc = {
    id,
    name: payload.name || 'Doctor',
    username,
    password,
    specialization: payload.specialization || '',
    phone: payload.phone || '',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  // persist doctor
  docs.push(doc);
  setDoctors(docs);

  // also add user entry to USERS index (so login works immediately)
  // user entry structure: id, role, name, username, password, doctorId
  const userEntry = {
    id: 'usr_' + id,
    role: 'doctor',
    name: doc.name,
    username: doc.username,
    password: doc.password,
    doctorId: doc.id
  };

  users.push(userEntry);
  lsSet(DB_KEYS.USERS, users);

  // keep any helper index in sync if you have one
  if (typeof rebuildUsersIndex === 'function') rebuildUsersIndex();

  return doc;
}
function updateDoctor(id, patch) {
  const docs = getDoctors();
  const i = docs.findIndex(d => d.id === id);
  if (i < 0) return;
  docs[i] = { ...docs[i], ...patch, updatedAt: Date.now() };
  setDoctors(docs);
}
function deleteDoctor(id) {
  setDoctors(getDoctors().filter(d => d.id !== id));
}

// ---- Users (for login) ----
// We’ll keep admin as a virtual user and merge doctor & patient users.
function getAllUsersForLogin() {
  const admin = [{ username: 'admin', password: 'admin123', role: 'admin', name: 'System Admin' }];
  const doctors = getDoctors().map(d => ({ username: d.username, password: d.password, role: 'doctor', name: d.name, doctorId: d.id }));
  const patients = getPatients().map(p => ({ username: p.username, password: p.password, role: 'patient', name: p.name, patientId: p.id }));
  return [...admin, ...doctors, ...patients];
}

// ---- Login/session (modify your existing login to use this) ----
// function login(username, password) {
//   const users = getAllUsersForLogin();
//   const u = users.find(x => x.username === username && x.password === password);
//   if (!u) return { ok: false };
//   const session = { username: u.username, role: u.role, name: u.name, doctorId: u.doctorId, patientId: u.patientId };
//   localStorage.setItem('mh_session', JSON.stringify(session));
//   return { ok: true, user: session };
// }

// function login(username, password) {
//   debugger
//   // build your users list here (admin/doctor/patient)
//   const users = getAllUsersForLogin(); // must return {username,password,role,...}

//   const u = users.find(x => x.username === username && x.password === password);
//   if (!u) return { ok: false };

//   const session = {
//     username: u.username,
//     role: u.role,
//     name: u.name || '',
//     doctorId: u.doctorId || null,
//     patientId: u.patientId || null
//   };
//   localStorage.setItem('mh_session', JSON.stringify(session));
//   return { ok: true, user: session };
// }

function logout() {
  localStorage.removeItem('mh_session');
  location.hash = '';
  showToast('Logged out', 'info');
  renderLogin();
}

// function rebuildUsersIndex() {
//   const users = [];

//   // admin
//   users.push({ id:'u_admin_1', role:'admin', name:'System Admin', username:'admin', password:'admin123' });

//   // doctors
//   (lsGet(DB_KEYS.DOCTORS, []) || []).forEach(d => {
//     if (d.username && d.password) {
//       users.push({ id:`usr_${d.id}`, role:'doctor', name:d.name||'Doctor', username:d.username, password:d.password, doctorId:d.id });
//     }
//   });

//   // // patients
//   // (lsGet(DB_KEYS.PATIENTS, []) || []).forEach(p => {
//   //   if (p.username && p.password) {
//   //     users.push({ id:`usr_${p.id}`, role:'patient', name:p.name||'Patient', username:p.username, password:p.password, patientId:p.id });
//   //   }
//   // });

//   lsSet(DB_KEYS.USERS, users);
//   return users;
// }

function normalizeNameForUsername(name = '') {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 12) || 'user';
}
function randDigits(n = 4) { return String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, '0'); }
function makePatientCredentials(p) {
  // username: name + last4phone or id suffix
  const base = normalizeNameForUsername(p.name || '');
  const phoneTail = (p.phone || '').replace(/\D/g, '').slice(-4);
  const suffix = phoneTail || (p.id ? p.id.slice(-4) : randDigits(4));
  const username = `${base}${suffix}`;
  const password = randDigits(4); // simple 4-digit pw for demo; change if you want stronger
  return { username, password };
}

function rebuildUsersIndex() {
  const users = [];


  // 1) Admins: keep any hardcoded or existing in USERS that are admin
  const existingUsers = lsGet(DB_KEYS.USERS, []);
  // Pull admin entries already present (helps if you pre-seeded admin)
  (existingUsers || []).forEach(u => {
    if (u && u.role === 'admin' && u.username && u.password) users.push(u);
  });
  // If no admin present add default one
  if (!users.find(u => u.role === 'admin')) {
    users.push({ id: 'u_admin_1', role: 'admin', name: 'System Admin', username: 'admin', password: 'admin123' });
  }

  // 2) Doctors: prefer reading from DOCTORS store if present, else from existing users
  const doctors = lsGet(DB_KEYS.DOCTORS, []) || [];
  if (doctors.length) {
    doctors.forEach(d => {
      if (d.username && d.password) {
        users.push({
          id: d.userId || `usr_${d.id}`,
          role: 'doctor',
          name: d.name || 'Doctor',
          username: d.username,
          password: d.password,
          doctorId: d.id
        });
      } else {
        // if doctors store lacks creds, generate sensible ones
        const uname = (d.username) ? d.username : normalizeNameForUsername(d.name || 'doc') + randDigits(2);
        const pwd = (d.password) ? d.password : 'doc' + randDigits(3);
        users.push({
          id: d.userId || `usr_${d.id}`,
          role: 'doctor',
          name: d.name || 'Doctor',
          username: uname,
          password: pwd,
          doctorId: d.id
        });
        // persist back minimal creds so doctor can login later
        d.username = uname; d.password = pwd;
      }
    });
    // write back enriched doctors list (only if we added creds)
    lsSet(DB_KEYS.DOCTORS, doctors);
  } else {
    // fallback: include doctor entries from existing USERS seed (if any)
    (existingUsers || []).forEach(u => {
      if (u && u.role === 'doctor' && u.username && u.password) users.push(u);
    });
  }

  // 3) Patients: ensure every patient gets a username/password (generate if missing)
  const patients = lsGet(DB_KEYS.PATIENTS, []) || [];
  const updatedPatients = patients.map(p => {
    const copy = { ...p };
    if (!copy.username || !copy.password) {
      const creds = makePatientCredentials(copy);
      // ensure uniqueness: if username exists in users, append digits
      let uname = creds.username;
      let counter = 1;
      while (users.find(u => u.username === uname)) {
        uname = creds.username + counter;
        counter++;
      }
      copy.username = uname;
      copy.password = creds.password;
    }
    // push user entry
    users.push({
      id: copy.userId || `usr_${copy.id}`,
      role: 'patient',
      name: copy.name || 'Patient',
      username: copy.username,
      password: copy.password,
      patientId: copy.id
    });
    return copy;
  });
  // persist enriched patients back so credentials remain stable
  lsSet(DB_KEYS.PATIENTS, updatedPatients);

  // 4) Finalize USERS index and persist
  lsSet(DB_KEYS.USERS, users);
  return users;
}

// Safe getter that ensures users index exists
function getUsersIndex() {
  let users = lsGet(DB_KEYS.USERS, []);
  if (!Array.isArray(users) || users.length === 0) {
    users = rebuildUsersIndex();
  }
  return users;
}

// ---------- Login using the users index ----------
function login(name, pass) {
  debugger
  const users = getUsersIndex();
  // const user = users.find(u => u.username === name && u.password === pass);
  const user = users.find((u) => {
    let username = u.username;
    let password = u.password;
    if (username == name && password == pass) {
      return u;
    }

  });
  if (!user) return { ok: false };
  // Save session
  const session = {
    userId: user.id,
    role: user.role,
    name: user.name || '',
    patientId: user.patientId || null,
    doctorId: user.doctorId || null,
    username: user.username
  };
  lsSet(DB_KEYS.SESSION, session);
  localStorage.setItem('mh_session', JSON.stringify(session));
  return { ok: true, user: session };
}

// ---------- Ensure rebuild runs after seeding ----------
// (function ensureSeedAndIndex() {
//   // call your seed first (if you have separate seedIfEmpty function, call it here)
//   if (typeof seedIfEmpty === 'function') seedIfEmpty();
//   // then rebuild users index so newly seeded patients get creds
//   rebuildUsersIndex();
// })();

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = lsGet(DB_KEYS.USERS, []);
  return users.find(u => u.id === session.userId) || null;
}

// global reactive cache
let liveSummaryState = {
  summary: { affected: 0, cured: 0, notAffected: 0, death: 0, total: 0 },
  stateCounts: { affected: {}, cured: {}, death: {} },
  ageBuckets: { "0-17": 0, "18-35": 0, "36-55": 0, "56+": 0 },
  topDeaths: []
};

function refreshLiveSummary() {
  const updated = computeSummary();
  renderPie(updated.summary);
  renderIndiaMap(updated.stateCounts.affected);
  renderIndiaMapCured(updated.stateCounts.cured);
  renderIndiaMapDeaths(updated.stateCounts.death);
  renderAgeChart(updated.ageBuckets);
  renderDeathsByState(updated.topDeaths);
  renderDailyDeathsSparkline('spark-deaths-14', getPatients());
}
