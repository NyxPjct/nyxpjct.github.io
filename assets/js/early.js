(function () {
  var d = document.documentElement;
  d.classList.add('js');
  var l = null;
  try { l = localStorage.getItem('lang'); } catch (e) {}
  if (l !== 'pt' && l !== 'en') l = (navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  d.classList.add('l-' + l);
  d.lang = l === 'pt' ? 'pt-BR' : 'en';
})();
