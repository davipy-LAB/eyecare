// Dashboard script
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = document.getElementById('current-lang');
    const currentType = document.getElementById('current-type');
    const currentFilter = document.getElementById('current-filter');
    const resetButton = document.getElementById('reset-onboarding');

    // Load settings from localStorage
    const lang = localStorage.getItem('language') || 'pt-BR';
    const colorblind = localStorage.getItem('colorblind');
    const type = localStorage.getItem('colorblindType');

    currentLang.textContent = lang === 'pt-BR' ? 'Português' : 'English';
    currentType.textContent = colorblind === 'yes' ? (type ? type : 'Sim') : 'Não';
    currentFilter.textContent = type ? type : 'Nenhum';

    // Apply filter if set
    if (type) {
        document.body.style.filter = `url('#${type}-filter')`;
    }

    // Reset onboarding
    resetButton.addEventListener('click', function() {
        localStorage.removeItem('onboardingComplete');
        localStorage.removeItem('colorblind');
        localStorage.removeItem('colorblindType');
        localStorage.removeItem('language');
        document.body.style.filter = '';
        window.location.href = '/';
    });
});