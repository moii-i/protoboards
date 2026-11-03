(() => {
  const stage = document.querySelector('.map-stage');
  const header = stage.querySelector('.assembly-stage-head');
  const actions = header.querySelector('.assembly-stage-actions');
  const stepInfo = document.querySelector('.stage-header');
  const mobile = matchMedia('(max-width: 900px)');

  const overview = document.createElement('div');
  overview.className = 'cc-bench-overview';
  const current = document.createElement('div');
  current.className = 'cc-bench-current';
  current.append(document.getElementById('miniStage'), document.getElementById('stageTitle'));
  overview.append(current, document.querySelector('.scene-switch'));
  header.prepend(overview);
  actions.querySelector('span').remove();
  actions.prepend(stepInfo.querySelector('.stage-nav'));

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
