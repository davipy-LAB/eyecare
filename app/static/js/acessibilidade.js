function applyAccessibilitySettings() {
    const contrast = localStorage.getItem('eye-contrast') || '100';
    const comfort = localStorage.getItem('comfort-mode') === 'true';
    const colorblindType = localStorage.getItem('colorblindType');

    const cbFilter = (
        colorblindType &&
        colorblindType !== 'no' &&
        colorblindType !== 'none'
    ) ? `url('#${colorblindType}-filter') ` : '';

    document.body.style.filter = `${cbFilter}contrast(${contrast}%)`;

    document.body.classList.toggle('comfort-mode', comfort);
}

document.addEventListener('DOMContentLoaded', applyAccessibilitySettings);