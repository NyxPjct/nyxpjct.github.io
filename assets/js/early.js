/* early.js — roda antes de pintar a página: marca JS, idioma salvo e garante que nada fique escondido */
(function () {
  var d = document.documentElement, l = null;
  d.classList.add('js');
  try { l = localStorage.getItem('lang'); } catch (e) {}
  if (l !== 'pt' && l !== 'en') l = (navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  d.classList.add('l-' + l);
  d.lang = l === 'pt' ? 'pt-BR' : 'en';
  // se algum script falhar, mostra a página mesmo assim
  setTimeout(function () { d.classList.add('ready', 'hero-in'); }, 2500);
})();
