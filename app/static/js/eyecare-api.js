const API_BASE = "";

function getAuthToken() {
    return localStorage.getItem("access_token");
}

function isLoggedIn() {
    return Boolean(getAuthToken());
}

async function apiGetPreferences() {
    const token = getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE}/api/preferences`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.warn("Could not load cloud preferences:", response.status, errorText);
        return null;
    }

    return await response.json();
}

async function apiPatchPreferences(preferences) {
    const token = getAuthToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE}/api/preferences`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.warn("Could not sync preferences:", response.status, errorText);
        return null;
    }

    return await response.json();
}

async function syncLocalPreferencesToCloud() {
    if (!isLoggedIn()) return;

    const payload = {
        language: localStorage.getItem("language") || "en",
        visual_filter: localStorage.getItem("currentFilter") || "none",
        colorblind: localStorage.getItem("colorblind") === "yes",
        colorblind_type: localStorage.getItem("colorblindType") || null,
        dynamic_contrast_enabled: localStorage.getItem("dynamic-contrast-enabled") === "true",
        contrast: Number(localStorage.getItem("eye-contrast") || 100),
        comfort_mode: localStorage.getItem("comfort-mode") === "true",
        onboarding_complete: localStorage.getItem("onboardingComplete") === "true"
    };

    return await apiPatchPreferences(payload);
}

function applyCloudPreferencesLocally(prefs) {
    if (!prefs) return;

    localStorage.setItem("language", prefs.language || "en");
    localStorage.setItem("currentFilter", prefs.visual_filter || "none");

    localStorage.setItem("colorblind", prefs.colorblind ? "yes" : "no");

    if (prefs.colorblind_type) {
        localStorage.setItem("colorblindType", prefs.colorblind_type);
    } else {
        localStorage.removeItem("colorblindType");
    }

    localStorage.setItem(
        "dynamic-contrast-enabled",
        String(Boolean(prefs.dynamic_contrast_enabled))
    );

    localStorage.setItem("eye-contrast", String(prefs.contrast ?? 100));
    localStorage.setItem("comfort-mode", String(Boolean(prefs.comfort_mode)));
    localStorage.setItem("onboardingComplete", String(Boolean(prefs.onboarding_complete)));
}