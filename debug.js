// 1. Buat elemen debug ala F3
const debugBox = document.createElement('div');
debugBox.id = 'debug-menu';
document.body.appendChild(debugBox);
debugBox.style.display = 'none'; // Default mati

function updateDebug() {
    if (typeof viewer !== 'undefined' && viewer) {
        const pitch = viewer.getPitch().toFixed(2);
        const yaw = viewer.getYaw().toFixed(2);
        debugBox.innerHTML = `
            <div><b>MINECRAFT DEBUG WEB</b></div>
            <div>Pitch: ${pitch}</div>
            <div>Yaw: ${yaw}</div>
            <div>Facing: ${getYawDirection(yaw)}</div>
        `;
    }
    requestAnimationFrame(updateDebug);
}

function getYawDirection(yaw) {
    const y = parseFloat(yaw);
    if (y > -45 && y <= 45) return "North (Z-)";
    if (y > 45 && y <= 135) return "East (X+)";
    if (y > 135 || y <= -135) return "South (Z+)";
    if (y > -135 && y <= -45) return "West (X-)";
    return "Unknown";
}

updateDebug();

// 2. Tunggu Pannellum siap, lalu pasang tombol F3
setTimeout(() => {
    const pnlmControls = document.querySelector('.pnlm-controls-container');
    
    if (pnlmControls) {
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'pnlm-control pnlm-f3-button';
        toggleBtn.innerHTML = 'F3';
        toggleBtn.title = "Toggle Debug Menu";
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
