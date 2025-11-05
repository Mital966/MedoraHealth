// function computeSummary() {
//   const patients = getPatients();

//   // Top deaths by state
//   const deathsByState = {};
//   patients.forEach(p => {
//     if (p.status === "Death") {
//       deathsByState[p.state] = (deathsByState[p.state] || 0) + 1;
//     }
//   });
//   const topDeaths = Object.entries(deathsByState)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 10);

//   // Summary + map counts + age buckets
//   const summary = { affected: 0, notAffected: 0, cured: 0, death: 0 };
//   const stateCounts = {}; // for map (Affected + Cured + Death if you want prevalence)
//   const ageBuckets = { "0-17": 0, "18-35": 0, "36-55": 0, "56+": 0 };

//   patients.forEach(p => {
//     if (p.status === "Affected") summary.affected++;
//     else if (p.status === "Death") summary.death++;
//     else if (p.status === "Cured") summary.cured++;
//     else summary.notAffected++;

//     // Map prevalence (Affected + Cured + Death)
//     if (p.status === "Affected" || p.status === "Cured" || p.status === "Death") {
//       stateCounts[p.state] = (stateCounts[p.state] || 0) + 1;
//     }

//     const age = Number(p.age) || 0;
//     if (age <= 17) ageBuckets["0-17"]++;
//     else if (age <= 35) ageBuckets["18-35"]++;
//     else if (age <= 55) ageBuckets["36-55"]++;
//     else ageBuckets["56+"]++;
//   });

//   return { summary, stateCounts, ageBuckets, topDeaths };
// }

// function computeSummary() {
//   const patients = getPatients() || [];

//   // Totals
//   const total = patients.length;
//   const summary = { affected: 0, cured: 0, notAffected: 0, death: 0, total };

//   // State counts per status
//   const stateCounts = { affected: {}, cured: {}, death: {} };

//   // Age buckets
//   const ageBuckets = { "0-17": 0, "18-35": 0, "36-55": 0, "56+": 0 };

//   // Top deaths calculation map
//   const deathsByState = {};

//   patients.forEach(p => {
//     const s = (p.status || '').trim();

//     if (s === 'Affected') summary.affected++;
//     else if (s === 'Cured') summary.cured++;
//     else if (s === 'Death') summary.death++;
//     else summary.notAffected++;

//     // map prevalence counts (for each relevant status separately)
//     if (s === 'Affected') stateCounts.affected[p.state] = (stateCounts.affected[p.state] || 0) + 1;
//     if (s === 'Cured') stateCounts.cured[p.state] = (stateCounts.cured[p.state] || 0) + 1;
//     if (s === 'Death') stateCounts.death[p.state] = (stateCounts.death[p.state] || 0) + 1;

//     // deathsByState for top-deaths chart
//     if (s === 'Death') deathsByState[p.state] = (deathsByState[p.state] || 0) + 1;

//     // age buckets
//     const age = Number(p.age) || 0;
//     if (age <= 17) ageBuckets["0-17"]++;
//     else if (age <= 35) ageBuckets["18-35"]++;
//     else if (age <= 55) ageBuckets["36-55"]++;
//     else ageBuckets["56+"]++;
//   });

//   // top 10 deaths by state
//   const topDeaths = Object.entries(deathsByState)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 10);

//   return { summary, stateCounts, ageBuckets, topDeaths };
// }

function computeSummary() {
  const patients = getPatients() || [];

  // Live totals
  const total = patients.length;
  const summary = { affected: 0, cured: 0, notAffected: 0, death: 0, total };

  const stateCounts = { affected: {}, cured: {}, death: {} };
  const ageBuckets = { "0-17": 0, "18-35": 0, "36-55": 0, "56+": 0 };
  const deathsByState = {};

  patients.forEach(p => {
    const status = (p.status || '').trim();

    if (status === 'Affected') summary.affected++;
    else if (status === 'Cured') summary.cured++;
    else if (status === 'Death') summary.death++;
    else summary.notAffected++;

    // per-status map for live maps
    if (status === 'Affected') stateCounts.affected[p.state] = (stateCounts.affected[p.state] || 0) + 1;
    if (status === 'Cured') stateCounts.cured[p.state] = (stateCounts.cured[p.state] || 0) + 1;
    if (status === 'Death') stateCounts.death[p.state] = (stateCounts.death[p.state] || 0) + 1;

    // top-deaths
    if (status === 'Death') deathsByState[p.state] = (deathsByState[p.state] || 0) + 1;

    // age buckets
    const age = Number(p.age) || 0;
    if (age <= 17) ageBuckets["0-17"]++;
    else if (age <= 35) ageBuckets["18-35"]++;
    else if (age <= 55) ageBuckets["36-55"]++;
    else ageBuckets["56+"]++;
  });

  const topDeaths = Object.entries(deathsByState)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Update live global state
  liveSummaryState = { summary, stateCounts, ageBuckets, topDeaths };

  // Return latest snapshot (for charts)
  return liveSummaryState;
}




// function DashboardView() {
//   return `
//     <div class="header-bar">
//       <div class="fw-semibold">Dashboard</div>
//       <div class="text-secondary small">Real-time from local dataset</div>
//     </div>
//     <div class="container-fluid py-3">
//       <div class="row g-3">
//         <div class="col-md-4">
//           <div class="card-glass p-3">
//             <div id="pie-total" style="height:320px;"></div>
//           </div>
//         </div>
//         <div class="col-md-8">
//           <div class="card-glass p-3">
//             <div id="india-map" style="height:320px;"></div>
//           </div>
//         </div>
//         <div class="col-md-12">
//           <div class="card-glass p-3">
//             <div id="age-chart" style="height:280px;"></div>
//           </div>
//         </div>
//         <div class="col-md-12">
//           <div class="card-glass p-3 mt-3">
//             <div class="h6 mb-2">Deaths by State (Top 10)</div>
//             <div id="chart-deaths-state" style="height:320px;"></div>
//           </div>
//         </div>
//         <div class="col-md-12">
//           <div class="card-glass p-3 mt-3">
//             <div class="d-flex justify-content-between align-items-center">
//               <div class="h6 mb-0">Daily Deaths (Last 14 days)</div>
//             </div>
//             <div id="spark-deaths-14" style="height:110px;"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
// }
function DashboardView() {
  return `
    <div class="header-bar">
      <div class="fw-semibold">Dashboard</div>
      <div class="text-secondary small">Real-time 🔴</div>
    </div>
    <div class="text-end">
    <div class="badge bg-success px-3 py-2 me-2">Total: ${liveSummaryState.summary.total}</div>
    <div class="badge bg-warning text-dark px-3 py-2">Deaths: ${liveSummaryState.summary.death}</div>
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
}

// function renderDashboard() {
//   const root = document.getElementById("content");
//   root.innerHTML = DashboardView();

//   const { summary, stateCounts, ageBuckets, topDeaths } = computeSummary();

//   // Render once DOM is present
//   requestAnimationFrame(() => {
//     if (document.getElementById('pie-total'))           renderPie(summary);
//     if (document.getElementById('india-map'))           renderIndiaMap(stateCounts);
//     if (document.getElementById('age-chart'))           renderAgeChart(ageBuckets);
//     if (document.getElementById('chart-deaths-state'))  renderDeathsByState(topDeaths);
//     if (document.getElementById('spark-deaths-14'))     renderDailyDeathsSparkline('spark-deaths-14', getPatients());
//   });
// }

function renderDashboard() {
  const root = document.getElementById("content");
  root.innerHTML = DashboardView();

  const { summary, stateCounts, ageBuckets, topDeaths } = computeSummary();

  // Use requestAnimationFrame to ensure DOM nodes exist
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
}

