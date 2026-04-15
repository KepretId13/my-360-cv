// 1. Buat elemen debug ala F3
const debugBox = document.createElement('div');
debugBox.id = 'debug-menu';
document.body.appendChild(debugBox);
debugBox.style.display = 'none'; 

// 2. Variabel itung Frame Time
let lastFrameTime = performance.now();
let delta = 0;

// 3. Fungsi update koordinat & frame time
function updateDebug() {
    const now = performance.now();
    delta = now - lastFrameTime; 
    lastFrameTime = now;

    if (typeof viewer !== 'undefined' && viewer) {
        const pitch = viewer.getPitch().toFixed(2);
        const yaw = viewer.getYaw().toFixed(2);

        debugBox.innerHTML = `
        <div><b>MINECRAFT DEBUG WEB</b></div>
        <div>Pitch: ${pitch}</div>
        <div>Yaw: ${yaw}</div>
        <div>Facing: ${getYawDirection(yaw)}</div>
        <div>Display: ${window.innerWidth}x${window.innerHeight}</div>
        <div style="color: ${delta > 20 ? '#ff4444' : '#00ff00'}">
        Frame Time: ${delta.toFixed(1)}ms
    </div>
    `;
        
        
    }
    requestAnimationFrame(updateDebug);
}

// 4. Fungsi penentu arah
function getYawDirection(yaw) {
    const y = parseFloat(yaw);
    if (y > -45 && y <= 45) return "North (Z-)";
    if (y > 45 && y <= 135) return "East (X+)";
    if (y > 135 || y <= -135) return "South (Z+)";
    if (y > -135 && y <= -45) return "West (X-)";
    return "Unknown";
}

updateDebug();

// 5. Pasang tombol ke container Pannellum
setTimeout(() => {
    const pnlmControls = document.querySelector('.pnlm-controls-container');
    if (pnlmControls) {
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'pnlm-control pnlm-f3-button';
        toggleBtn.innerHTML = 'F3';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.textAlign = 'center';
        toggleBtn.style.lineHeight = '26px';
        toggleBtn.style.fontWeight = 'bold';
        toggleBtn.style.fontSize = '12px';

        toggleBtn.addEventListener('click', () => {
            if (debugBox.style.display === 'none') {
                debugBox.style.display = 'block';
                toggleBtn.style.background = '#eee';
            } else {
                debugBox.style.display = 'none';
                toggleBtn.style.background = '#fff';
            }
        });
        pnlmControls.appendChild(toggleBtn);
    }
}, 500);
