(() => {
  const root = document.documentElement;
  const button = document.getElementById('catalogTheme');
  const storage = 'protoboards:appearance:v1';
  const meta = document.querySelector('meta[name="theme-color"]');

  function readAppearance() {
    try {
      const value = JSON.parse(localStorage.getItem(storage) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function applyTheme(theme) {
    root.dataset.workspaceTheme = ['paper', 'night', 'contrast'].includes(theme) ? theme : 'paper';
    const dark = theme === 'night';
    button.setAttribute('aria-pressed', String(dark));
    meta.content = dark ? '#142f26' : '#143d32';
  }

  button.addEventListener('click', () => {
    const theme = root.dataset.workspaceTheme === 'night' ? 'paper' : 'night';
    applyTheme(theme);
    try { localStorage.setItem(storage, JSON.stringify({...readAppearance(), theme})); } catch {}
  });
  window.addEventListener('storage', event => {
    if (event.key === storage || event.key === null) applyTheme(readAppearance().theme);
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) applyTheme(readAppearance().theme);
  });
  applyTheme(root.dataset.workspaceTheme);
})();
