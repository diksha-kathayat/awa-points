// DATA TO PLAYBACK
// Modify these values to see the UI change automatically
const platformData = [
    { label: "Technical Proficiency", val: 40 },
    { label: "Communication Skills", val: 35 },
    { label: "Project Management", val: 15 }
];

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