// Buat elemen debug ala F3
const debugBox = document.createElement('div');
debugBox.id = 'debug-menu'; // Pake ID biar bisa di-style di CSS
document.body.appendChild(debugBox);

function updateDebug() {
    if (typeof viewer !== 'undefined' && viewer) { // Pastiin viewer panorama lu udah siap
        const pitch = viewer.getPitch().toFixed(2);
        const yaw = viewer.getYaw().toFixed(2);
        
        // Lu bisa nambahin FPS di sini nanti
        debugBox.innerHTML = `
            <div><b>MINECRAFT DEBUG WEB</b></div>
            <div>Pitch: ${pitch}</div>
            <div>Yaw: ${yaw}</div>
            <div>Facing: ${getYawDirection(yaw)}</div>
        `;
    }
    requestAnimationFrame(updateDebug);
}

// Fungsi tambahan biar beneran kayak F3 (Nentuin arah mata angin)
function getYawDirection(yaw) {
    const y = parseFloat(yaw);
    if (y > -45 && y <= 45) return "North (Z-)";
    if (y > 45 && y <= 135) return "East (X+)";
    if (y > 135 || y <= -135) return "South (Z+)";
    if (y > -135 && y <= -45) return "West (X-)";
    return "Unknown";
}

updateDebug();
