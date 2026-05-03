function applyAccessibilitySettings() {
    const contrast = parseInt(localStorage.getItem('eye-contrast') || '100', 10);
    const comfort = localStorage.getItem('comfort-mode') === 'true';
    const colorblindType = localStorage.getItem('colorblindType');

    const hasColorblindFilter =
        colorblindType &&
        colorblindType !== 'no' &&
        colorblindType !== 'none';

    const cbFilter = hasColorblindFilter
        ? `url('#${colorblindType}-filter') `
        : '';

    // Compensação: reduz a intensidade quando há filtro de daltonismo
    const effectiveContrast = hasColorblindFilter
        ? 100 + ((contrast - 100) * 0.05)
        : contrast;

    document.body.style.filter =
        `${cbFilter}contrast(${effectiveContrast}%)`;

    document.body.classList.toggle('comfort-mode', comfort);
}