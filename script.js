// DATA TO PLAYBACK
// Modify these values to see the UI change automatically
let platformData = [
    { label: "Technical Proficiency", val: 10 },
    { label: "Communication Skills", val: 10 },
    { label: "Project Management", val: 10 },
    { label: "Problem Solving", val: 10 },
    { label: "Team Collaboration", val: 10 },
    { label: "Adaptability", val: 10 },
    { label: "Creativity", val: 10 },
    { label: "Leadership", val: 10 },
    { label: "Time Management", val: 10 },
    { label: "Client Relations", val: 10 }
];

// Check for query parameters and update values if present
const urlParams = new URLSearchParams(window.location.search);
const pointsParam = urlParams.get('points');

if (pointsParam) {
    try {
        // Try parsing as JSON array first
        let points = JSON.parse(pointsParam);

        // If not an array, maybe it's a comma-separated string
        if (!Array.isArray(points)) {
            points = pointsParam.split(',').map(Number);
        }

        if (Array.isArray(points) && points.length === 10) {
            platformData = platformData.map((item, index) => ({
                ...item,
                val: Number(points[index]) || 0
            }));
        }
    } catch (e) {
        // Fallback for simple comma-separated list
        const points = pointsParam.split(',').map(Number);
        if (points.length === 10) {
            platformData = platformData.map((item, index) => ({
                ...item,
                val: Number(points[index]) || 0
            }));
        }
    }
}

const itemsParam = urlParams.get('items');
if (itemsParam) {
    try {
        // Try parsing as JSON array first
        let items = JSON.parse(itemsParam);

        // If not an array, maybe it's a comma-separated string
        if (!Array.isArray(items)) {
            items = itemsParam.split(',');
        }

        if (Array.isArray(items) && items.length === 10) {
            platformData = platformData.map((item, index) => ({
                ...item,
                label: items[index] || item.label
            }));
        }
    } catch (e) {
        // Fallback for simple comma-separated list
        const items = itemsParam.split(',');
        if (items.length === 10) {
            platformData = platformData.map((item, index) => ({
                ...item,
                label: items[index] || item.label
            }));
        }
    }
}

function renderSummary() {
    const body = document.getElementById('data-body');
    const sumDisplay = document.getElementById('sum-display');
    const instrContainer = document.getElementById('instruction-container');

    let total = 0;
    body.innerHTML = '';

    platformData.forEach(item => {
        total += item.val;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="col-desc">${item.label}</td>
            <td class="col-points point-val">${item.val}</td>
        `;
        body.appendChild(row);
    });

    sumDisplay.textContent = total;

    if (total === 100) {
        instrContainer.innerHTML = `
            <div class="instruction-box status-valid">
                <span class="instruction-header">✓ Validation Successful</span>
                Your points total 100 exactly. This requirement has been met.
            </div>`;
    } else {
        instrContainer.innerHTML = `
            <div class="instruction-box status-required">
                <span class="instruction-header">⚠ Action Required</span>
                The current summation is <strong>${total}</strong>. You must go back to the questionnaire and adjust your values until the total is exactly 100.
            </div>`;
    }
}

window.onload = renderSummary;