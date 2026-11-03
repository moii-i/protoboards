(() => {
  const appearance = window.protoboardsAppearance;
  const header = document.querySelector('.site-header .header-row');
  const navigation = header.querySelector('.nav');
  const actions = navigation.closest('.catalog-header-actions') || document.createElement('div');
  actions.classList.add('appearance-header-actions');
  if (!actions.isConnected) {
    navigation.before(actions);
    actions.append(navigation);
  }

  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'appearance-launch';
  launcher.setAttribute('aria-label', 'Apariencia');
  launcher.setAttribute('aria-haspopup', 'dialog');
  launcher.setAttribute('aria-controls', 'siteAppearance');
  launcher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2.5" fill="var(--appearance-header)"/><circle cx="15" cy="17" r="2.5" fill="var(--appearance-header)"/></svg><span>Apariencia</span>';
  actions.append(launcher);

  const dialog = document.createElement('dialog');
  dialog.id = 'siteAppearance';
  dialog.className = 'site-appearance';
  dialog.setAttribute('aria-labelledby', 'siteAppearanceTitle');
  dialog.innerHTML = `
    <div class="site-appearance-head">
      <div><p class="site-appearance-kicker">Protoboards</p><h2 id="siteAppearanceTitle">Apariencia</h2></div>
      <button type="button" class="site-appearance-close" aria-label="Cerrar apariencia" autofocus>×</button>
    </div>
    <p>Elige cómo quieres ver el catálogo y las prácticas. Los ajustes se recuerdan en este navegador.</p>
    <fieldset>
      <legend>Tema</legend>
      <div class="site-appearance-options">
        <button type="button" data-appearance-theme="paper"><i aria-hidden="true"></i>Claro</button>
        <button type="button" data-appearance-theme="night"><i aria-hidden="true"></i>Oscuro</button>
        <button type="button" data-appearance-theme="contrast"><i aria-hidden="true"></i>Alto contraste</button>
      </div>
    </fieldset>
    <fieldset>
      <legend>Perfiles rápidos</legend>
      <div class="site-appearance-options">
        <button type="button" data-appearance-profile="study">Estudiar</button>
        <button type="button" data-appearance-profile="build">Montar</button>
        <button type="button" data-appearance-profile="present">Presentar</button>
      </div>
    </fieldset>
    <fieldset class="site-appearance-fields">
      <legend>Lectura y movimiento</legend>
      <label>Tamaño de texto<select data-appearance-setting="text"><option value="normal">Normal</option><option value="large">Grande</option><option value="larger">Más grande</option></select></label>
      <label>Densidad<select data-appearance-setting="density"><option value="comfortable">Cómoda</option><option value="compact">Compacta</option></select></label>
      <label>Movimiento<select data-appearance-setting="effects"><option value="system">Seguir mi dispositivo</option><option value="full">Suave</option><option value="reduced">Reducido</option><option value="off">Desactivado</option></select></label>
    </fieldset>
    <div class="site-appearance-foot"><p role="status"></p><button type="button" class="site-appearance-reset">Restablecer</button></div>`;
  document.body.append(dialog);

  const themes = dialog.querySelectorAll('[data-appearance-theme]');
  const profiles = dialog.querySelectorAll('[data-appearance-profile]');
  const settings = dialog.querySelectorAll('[data-appearance-setting]');
  const status = dialog.querySelector('[role=status]');
  const close = dialog.querySelector('.site-appearance-close');

  function render({preferences, saved}) {
    for (const button of themes) button.setAttribute('aria-pressed', String(button.dataset.appearanceTheme === preferences.theme));
    for (const button of profiles) button.setAttribute('aria-pressed', String(button.dataset.appearanceProfile === preferences.profile));
    for (const select of settings) select.value = preferences[select.dataset.appearanceSetting];
    if (typeof saved === 'boolean') status.textContent = saved ? 'Ajustes guardados.' : 'Ajustes aplicados en esta sesión.';
  }

  launcher.addEventListener('click', () => { status.textContent = ''; dialog.showModal(); });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => launcher.focus({preventScroll: true}));
  dialog.querySelector('.site-appearance-reset').addEventListener('click', appearance.reset);
  for (const button of themes) button.addEventListener('click', () => appearance.setPreference('theme', button.dataset.appearanceTheme));
  for (const button of profiles) button.addEventListener('click', () => appearance.setProfile(button.dataset.appearanceProfile));
  for (const select of settings) select.addEventListener('change', () => appearance.setPreference(select.dataset.appearanceSetting, select.value));
  document.addEventListener('workspace-appearance-change', event => render(event.detail));
  render(appearance.getState());
})();
