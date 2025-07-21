document.addEventListener('DOMContentLoaded', () => {
    autoSave();
    loadSavedData();
    trackFormStart();
});

function autoSave() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const key = 'essence_guide_' + input.id;
        input.addEventListener('input', () => {
            localStorage.setItem(key, input.value);
        });
    });
}

function loadSavedData() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const key = 'essence_guide_' + input.id;
        const savedValue = localStorage.getItem(key);
        if (savedValue) {
            input.value = savedValue;
        }
    });
}
