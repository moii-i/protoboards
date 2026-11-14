// Apply appearance before paint. Circuit progress has separate storage keys.
(() => {
  const root = document.documentElement;
  const storage = 'protoboards:appearance:v1';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const defaults = {theme: 'night', density: 'comfortable', text: 'normal', quality: 'auto', effects: 'system', profile: 'custom'};
  const allowed = {
    theme: ['paper', 'night', 'contrast'], density: ['compact', 'comfortable'], text: ['normal', 'large', 'larger'],
    quality: ['auto', 'economy', 'sharp'], effects: ['system', 'full', 'reduced', 'off'], profile: ['custom', 'study', 'build', 'present']
  };
  const profiles = {
    study: {density: 'comfortable', text: 'large', quality: 'auto', effects: 'system'},
    build: {density: 'compact', text: 'normal', quality: 'auto', effects: 'reduced'},
    present: {density: 'comfortable', text: 'large', quality: 'sharp', effects: 'full'}
  };

  function read() {
    const preferences = {...defaults};
    try {
      const saved = JSON.parse(localStorage.getItem(storage) || '{}');
      // Taller (2026-11): dark is the new default. 'paper' saved before revision 2 was the old default, not a choice.
      if (saved && saved.rev !== 2 && saved.theme === 'paper') delete saved.theme;
      for (const key of Object.keys(allowed)) {
        if (allowed[key].includes(saved?.[key])) preferences[key] = saved[key];
      }
    } catch {}
    return preferences;
  }

  let preferences = read();
  function getState() {
    const choice = preferences.effects;
    const effects = choice === 'off' ? 'off' : reduced.matches || choice === 'reduced' ? 'reduced' : 'full';
    return {preferences: {...preferences}, effects};
  }

  function apply(saved = null) {
    const state = getState();
    root.dataset.workspaceTheme = preferences.theme;
    root.dataset.workspaceDensity = preferences.density;
    root.dataset.workspaceText = preferences.text;
    root.dataset.workspaceMotion = state.effects;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = preferences.theme === 'night' ? '#090d0b' : '#0f1f19';
    document.dispatchEvent(new CustomEvent('workspace-appearance-change', {detail: {...state, saved}}));
  }

  function save() {
    let saved = false;
    try { localStorage.setItem(storage, JSON.stringify({...preferences, rev: 2})); saved = true; } catch {}
    apply(saved);
  }

  function reload() {
    preferences = read();
    apply();
  }

  window.protoboardsAppearance = {
    getState,
    setPreference(key, value) {
      if (!Object.hasOwn(allowed, key) || !allowed[key].includes(value)) return false;
      preferences[key] = value;
      if (key !== 'theme') preferences.profile = 'custom';
      save();
      return true;
    },
    setProfile(name) {
      if (!Object.hasOwn(profiles, name)) return false;
      Object.assign(preferences, profiles[name], {profile: name});
      save();
      return true;
    },
    reset() { preferences = {...defaults}; save(); }
  };
  reduced.addEventListener('change', () => apply());
  window.addEventListener('storage', event => {
    if (event.key === storage || event.key === null) reload();
  });
  window.addEventListener('pageshow', event => { if (event.persisted) reload(); });
  apply();
})();
