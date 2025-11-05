// Insert overlay once
(function initLoaderOverlay(){
  const overlay = document.createElement('div');
  overlay.id = 'loader-overlay';
  overlay.innerHTML = `
    <div class="loader-card">
      <div class="mb-2 fw-semibold" id="loader-title">Loading…</div>
      <div>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    </div>`;
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(overlay));
})();

function showLoader(message = 'Loading…') {
  const overlay = document.getElementById('loader-overlay');
  if (!overlay) return;
  const t = overlay.querySelector('#loader-title');
  if (t) t.textContent = message;
  overlay.style.display = 'flex';
}

function hideLoader() {
  const overlay = document.getElementById('loader-overlay');
  if (overlay) overlay.style.display = 'none';
}

// Optional: full loading page inside #content
function renderLoadingPage(message = 'Please wait…') {
  const root = document.getElementById('content');
  if (!root) return;
  root.innerHTML = `
    <div class="loading-page">
      <div class="text-center">
        <div class="mb-2 fw-semibold">${message}</div>
        <div>
          <span class="loader-dot"></span>
          <span class="loader-dot"></span>
          <span class="loader-dot"></span>
        </div>
      </div>
    </div>`;
}
