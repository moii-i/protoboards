(() => {
  const stage = document.querySelector('.map-stage');
  const header = stage.querySelector('.assembly-stage-head');
  const actions = header.querySelector('.assembly-stage-actions');
  const steps = document.getElementById('stageList');
  const stepInfo = document.querySelector('.stage-header');
  const mobile = matchMedia('(max-width: 900px)');

  const overview = document.createElement('div');
  overview.className = 'cc-bench-overview';
  overview.innerHTML = '<div class="cc-bench-current"></div><div class="cc-bench-status"><span class="cc-bench-count"></span></div>';
  const current = overview.querySelector('.cc-bench-current');
  current.append(document.getElementById('miniStage'), document.getElementById('stageTitle'));
  const count = overview.querySelector('.cc-bench-count');
  count.append(document.getElementById('completedCount'), ' bloques');
  overview.querySelector('.cc-bench-status').append(document.querySelector('.scene-switch'));

  const rail = document.createElement('nav');
  rail.className = 'cc-bench-rail';
  rail.setAttribute('aria-label', 'Bloques del montaje');
  rail.append(steps);
  header.prepend(overview, rail);
  document.querySelector('.sidebar').hidden = true;
  actions.querySelector('span').remove();
  actions.prepend(stepInfo.querySelector('.stage-nav'));

  for (const button of steps.querySelectorAll('button')) {
    const label = button.lastElementChild.textContent;
    button.title = label;
    button.querySelector('.number').setAttribute('aria-hidden', 'true');
  }
  function labelSteps() {
    for (const button of steps.querySelectorAll('button')) {
      const done = button.classList.contains('done');
      const state = button.classList.contains('active') ? (done ? 'Actual, completado' : 'Actual') : (done ? 'Completado' : 'Pendiente');
      button.setAttribute('aria-label', `${Number(button.dataset.step) + 1}. ${button.title}. ${state}`);
    }
    const active = steps.querySelector('button.active');
    if (!active || steps.scrollWidth <= steps.clientWidth) return;
    const viewport = steps.getBoundingClientRect();
    const box = active.getBoundingClientRect();
    if (box.left < viewport.left) steps.scrollLeft += box.left - viewport.left;
    else if (box.right > viewport.right) steps.scrollLeft += box.right - viewport.right;
  }
  new MutationObserver(labelSteps).observe(steps, {subtree: true, attributes: true, attributeFilter: ['class']});
  labelSteps();

  const guide = document.createElement('section');
  guide.id = 'ccBenchGuide';
  guide.className = 'cc-bench-guide';
  guide.hidden = true;
  guide.setAttribute('aria-labelledby', 'ccBenchGuideTitle');
  guide.innerHTML = `
    <div class="cc-bench-guide-head"><h3 id="ccBenchGuideTitle">Guía de montaje</h3><button type="button" class="cc-bench-close" aria-label="Cerrar guía">×</button></div>
    <div class="cc-bench-tabs" role="group" aria-label="Contenido de la guía">
      <button type="button" data-guide-tab="step" aria-controls="ccGuideStep" aria-pressed="true">Paso</button>
      <button type="button" data-guide-tab="materials" aria-controls="ccGuideMaterials" aria-pressed="false">Materiales</button>
      <button type="button" data-guide-tab="help" aria-controls="ccGuideHelp" aria-pressed="false">Ayuda</button>
    </div>
    <div id="ccGuideStep" data-guide-panel="step"></div>
    <div id="ccGuideMaterials" data-guide-panel="materials" hidden><a href="#materiales">Ver ficha de materiales ↗</a></div>
    <div id="ccGuideHelp" data-guide-panel="help" hidden>
      <p>En 2D, usa la rueda para acercarte y arrastra para mover la placa. En 3D, arrastra para girar el montaje.</p>
      <a href="#ayuda">Abrir comprobaciones por síntoma ↗</a>
    </div>`;
  const materialList = document.getElementById('assemblyMaterials').cloneNode(true);
  materialList.removeAttribute('id');
  guide.querySelector('#ccGuideMaterials').prepend(materialList);
  guide.querySelector('#ccGuideStep').append(document.getElementById('stageText'), stepInfo.querySelector('.step-summary'));
  stepInfo.hidden = true;
  doorWorkspace.registerTool(guide);

  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.textContent = 'Guía del paso';
  launcher.setAttribute('aria-controls', guide.id);
  launcher.setAttribute('aria-expanded', 'false');
  actions.querySelector('#workspacePreferences').before(launcher);

  const close = guide.querySelector('.cc-bench-close');
  function showGuide(open) {
    guide.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    doorWorkspace.refreshTools();
    if (open) {
      close.focus({preventScroll: true});
      if (mobile.matches && !document.body.classList.contains('fullscreen')) {
        guide.scrollIntoView({block: 'nearest', behavior: scrollBehavior()});
      }
    } else launcher.focus({preventScroll: true});
  }
  launcher.onclick = () => showGuide(guide.hidden);
  close.onclick = () => showGuide(false);
  guide.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    showGuide(false);
  });
  const tabs = [...guide.querySelectorAll('[data-guide-tab]')];
  const panels = [...guide.querySelectorAll('[data-guide-panel]')];
  for (const tab of tabs) {
    tab.onclick = () => {
      for (const button of tabs) button.setAttribute('aria-pressed', String(button === tab));
      for (const panel of panels) panel.hidden = panel.dataset.guidePanel !== tab.dataset.guideTab;
    };
  }
  document.body.classList.add('cc-workbench');
})();
