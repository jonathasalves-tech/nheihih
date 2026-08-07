document.addEventListener('DOMContentLoaded', () => {
  
  // -------------------------------------------------------------
  // 1. CONTROLE DE FONTE (A+ / A- / A)
  // -------------------------------------------------------------
  let fontSize = 100;
  const root = document.documentElement;

  document.getElementById('btn-increase').addEventListener('click', () => {
    if (fontSize < 160) {
      fontSize += 10;
      root.style.fontSize = `${fontSize}%`;
      speak(`Fonte aumentada para ${fontSize} por cento`);
    }
  });

  document.getElementById('btn-decrease').addEventListener('click', () => {
    if (fontSize > 80) {
      fontSize -= 10;
      root.style.fontSize = `${fontSize}%`;
      speak(`Fonte diminuída para ${fontSize} por cento`);
    }
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    fontSize = 100;
    root.style.fontSize = '100%';
    speak('Tamanho do texto restaurado');
  });

  // -------------------------------------------------------------
  // 2. TOGGLE DE ALTO CONTRASTE
  // -------------------------------------------------------------
  const btnContrast = document.getElementById('btn-contrast');
  btnContrast.addEventListener('click', () => {
    const active = document.body.classList.toggle('high-contrast');
    btnContrast.setAttribute('aria-pressed', active);
    speak(active ? 'Alto contraste ativado' : 'Alto contraste desativado');
  });

  // -------------------------------------------------------------
  // 3. SINTETIZADOR DE VOZ (LEITURA EM ÁUDIO)
  // -------------------------------------------------------------
  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Ouvir página toda
  document.getElementById('btn-read').addEventListener('click', () => {
    const mainText = document.getElementById('conteudo-principal').innerText;
    speak('Iniciando leitura da página. ' + mainText);
  });

  // Ouvir seções específicas
  document.querySelectorAll('.btn-read-section').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute('data-target');
      const sectionText = document.getElementById(targetId).innerText;
      speak(sectionText);
    });
  });

  // -------------------------------------------------------------
  // 4. LUPA VIRTUAL DE LEITURA
  // -------------------------------------------------------------
  const btnLupa = document.getElementById('btn-lupa');
  const lupa = document.getElementById('lupa');
  let lupaAtiva = false;

  btnLupa.addEventListener('click', () => {
    lupaAtiva = !lupaAtiva;
    document.body.classList.toggle('magnifier-enabled', lupaAtiva);
    btnLupa.setAttribute('aria-pressed', lupaAtiva);

    if (!lupaAtiva) {
      lupa.style.display = 'none';
      speak('Lupa desativada');
    } else {
      speak('Lupa ativada. Mova o cursor sobre os textos para usar.');
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!lupaAtiva) return;

    lupa.style.display = 'block';
    lupa.style.left = `${e.clientX - 75}px`;
    lupa.style.top = `${e.clientY - 75}px`;

    lupa.style.backgroundImage = `radial-gradient(circle, transparent 60%, rgba(0,0,0,0.2))`;
    lupa.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
  });

});
