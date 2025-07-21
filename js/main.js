document.addEventListener('DOMContentLoaded', () => {
    autoSave();
    loadSavedData();
    trackFormStart();
    initializeNavigation();
});

function initializeNavigation() {
    const sections = document.querySelectorAll('.workbook-section');
    let currentSection = 0;

    const showSection = (index) => {
        sections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
    };

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentSection < sections.length - 1) {
                currentSection++;
                showSection(currentSection);
            }
        });
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentSection > 0) {
                currentSection--;
                showSection(currentSection);
            }
        });
    });

    document.querySelectorAll('.download-pdf-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.closest('.workbook-section');
            generatePdf(section);
        });
    });
}

function generatePdf(section) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const title = section.querySelector('h4').textContent;
    const questions = section.querySelectorAll('label');
    const answers = section.querySelectorAll('textarea');

    doc.text(title, 10, 10);
    let y = 20;

    questions.forEach((question, i) => {
        if (answers[i]) {
            doc.text(question.textContent, 10, y);
            y += 10;
            doc.text(answers[i].value, 15, y, { maxWidth: 180 });
            y += 20;
        }
    });

    doc.save(`${title}.pdf`);
}

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
