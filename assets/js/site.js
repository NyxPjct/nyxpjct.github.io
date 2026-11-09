/* Manoela Fasanello · nyxpjct.github.io */
(function(){
  var RM = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var HOVER = !!(window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches);
  var GH = 'https://github.com/NyxPjct';
  var LINK = {li:'https://www.linkedin.com/in/manoela-fasanello-b0a9b6273/', gh:GH, ig:'https://www.instagram.com/nyxprojectr', thm:'https://tryhackme.com/p/ATHOS'};
  var PROJ = [['DailyAPP','Android · iOS'],['DrawSketch','Web · Desktop · Android · iOS'],['MarketAI','Web · Windows'],['HoneyMoney','Web · open source']];
  var T = {
    pt: {
      hint:'dica: digite help e aperte Enter',
      nf:'comando não encontrado: ', nf2:' (digite help)',
      help:[['help','lista os comandos'],['whoami','quem sou eu'],['projetos','meus apps'],['stack','tecnologias que uso'],['contato','onde me encontrar'],['tryhackme','meu perfil no TryHackMe'],['open <nome>','abre um app ou perfil'],['lang en','switch to English'],['clear','limpa o terminal']],
      who:'Manoela Fasanello\ndesenvolvedora de apps · cybersecurity · pentest de aplicações web',
      focusCmd:'cat foco.txt', focus:'apps · pentest de aplicações web',
      proj:'apps com o código no GitHub:', more:'+ app secreto (2027) e jogo de plataforma (em desenvolvimento)',
      stack:[['linguagens','TypeScript, JavaScript, Python'],['apps','React, Next.js, Vite, Capacitor, Electron'],['back-end','FastAPI, PostgreSQL, Supabase'],['qualidade','Playwright, GitHub Actions, Docker']],
      thm:'ATHOS · Top 15% · nível 8 · 44 salas · 7 badges · 4.129 pontos\ntrilha atual: Jr Penetration Tester',
      sudo:['[sudo] senha para recrutadora: ********','acesso concedido. o caminho mais rápido é este:'],
      sudoNo:'permissão negada. tente: sudo hire manoela',
      nmap:['Starting Nmap em nyxpjct.github.io ...','PORT     STATE  SERVICE','443/tcp  open   https','80/tcp   open   http → redireciona para 443','nada além do necessário por aqui. boa tentativa ;)'],
      exit:'não dá pra sair tão fácil assim. que tal: contato ;)',
      ls:'dailyapp/  drawsketch/  marketai/  honeymoney/  sobre.txt  foco.txt',
      about:'Curso Defesa Cibernética na Estácio, desenvolvo apps e estudo segurança ofensiva. No NYX Project R publico conteúdo de segurança e divulgo meus apps.',
      openUse:'uso: open dailyapp | drawsketch | marketai | honeymoney | github | linkedin | tryhackme | instagram', opening:'abrindo ',
      nofile:': arquivo não encontrado', files:{'foco.txt':'focus','focus.txt':'focus','sobre.txt':'about','about.txt':'about'}
    },
    en: {
      hint:'tip: type help and press Enter',
      nf:'command not found: ', nf2:' (type help)',
      help:[['help','list commands'],['whoami','who I am'],['projects','my apps'],['stack','tech I use'],['contact','where to find me'],['tryhackme','my TryHackMe profile'],['open <name>','opens an app or profile'],['lang pt','mudar para português'],['clear','clear the terminal']],
      who:'Manoela Fasanello\napp developer · cybersecurity · web app pentesting',
      focusCmd:'cat focus.txt', focus:'apps · web app pentesting',
      proj:'apps with source code on GitHub:', more:'+ a secret app (2027) and a platform game (in development)',
      stack:[['languages','TypeScript, JavaScript, Python'],['apps','React, Next.js, Vite, Capacitor, Electron'],['back-end','FastAPI, PostgreSQL, Supabase'],['quality','Playwright, GitHub Actions, Docker']],
      thm:'ATHOS · Top 15% · level 8 · 44 rooms · 7 badges · 4,129 points\ncurrent path: Jr Penetration Tester',
      sudo:['[sudo] password for recruiter: ********','access granted. fastest route:'],
      sudoNo:'permission denied. try: sudo hire manoela',
      nmap:['Starting Nmap on nyxpjct.github.io ...','PORT     STATE  SERVICE','443/tcp  open   https','80/tcp   open   http → redirects to 443','nothing more than needed here. nice try ;)'],
      exit:'it is not that easy to leave. how about: contact ;)',
      ls:'dailyapp/  drawsketch/  marketai/  honeymoney/  about.txt  focus.txt',
      about:'I study Cyber Defense at Estácio, build apps and study offensive security. On NYX Project R I share security content and showcase my apps.',
      openUse:'usage: open dailyapp | drawsketch | marketai | honeymoney | github | linkedin | tryhackme | instagram', opening:'opening ',
      nofile:': no such file', files:{'foco.txt':'focus','focus.txt':'focus','sobre.txt':'about','about.txt':'about'}
    }
  };
  var ALIAS = {projetos:'projects',projects:'projects',contato:'contact',contact:'contact',sobre:'about',about:'about',ajuda:'help',limpar:'clear'};


  /* ---------- página: dados, idioma ---------- */
  var META = {};
  try { META = JSON.parse(document.getElementById('page-meta').textContent); } catch (e) {}
  var BASE = META.base || '';
  function curLang(){ return document.documentElement.classList.contains('l-en') ? 'en' : 'pt'; }
  function setLang(l){
    if (l !== 'pt' && l !== 'en') return;
    var d = document.documentElement;
    d.classList.remove('l-pt', 'l-en'); d.classList.add('l-' + l);
    document.querySelectorAll('[data-lang]').forEach(function(el){ el.hidden = el.getAttribute('data-lang') !== l; });
    var m = META[l] || {}; d.lang = m.lang || (l === 'pt' ? 'pt-BR' : 'en'); if (m.title) document.title = m.title;
    var desc = document.querySelector('meta[name="description"]'); if (desc && m.desc) desc.setAttribute('content', m.desc);
    try { localStorage.setItem('lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('nyx:lang', {detail: l}));
  }
  window.nyxSetLang = function(l){ setLang(l); window.scrollTo(0, 0); };
  setLang(curLang());
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('[data-set-lang]'); if (!a) return;
    e.preventDefault(); window.nyxSetLang(a.getAttribute('data-set-lang'));
  });

  /* ---------- destinos (terminal e busca rápida) ---------- */
  var APPS = {dailyapp:'DailyAPP', drawsketch:'DrawSketch', marketai:'MarketAI', honeymoney:'HoneyMoney'};
  var EXT = {github:LINK.gh, linkedin:LINK.li, instagram:LINK.ig, tryhackme:LINK.thm};
  function go(target){
    if (APPS[target]) { location.href = BASE + 'cases/' + target + '.html'; return true; }
    if (EXT[target]) { window.open(EXT[target], '_blank', 'noopener'); return true; }
    return false;
  }
  window.nyxOpen = go;

  /* ---------- números do GitHub nos cards ---------- */
  function GitHubStats(){
    var els = document.querySelectorAll('[data-gh]'); if (!els.length || !window.fetch) return;
    var KEY = 'nyx-gh-v1', TTL = 3600e3, cache = {};
    try { cache = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
    var repos = {}; els.forEach(function(el){ repos[el.getAttribute('data-gh')] = 1; });
    function ago(iso, l){
      var s = (Date.now() - new Date(iso).getTime()) / 1000, rtf = window.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat(l === 'pt' ? 'pt-BR' : 'en', {numeric:'auto'}) : null;
      var u = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
      for (var i = 0; i < u.length; i++) if (s >= u[i][1] || i === u.length - 1) { var v = Math.max(1, Math.round(s / u[i][1])); return rtf ? rtf.format(-v, u[i][0]) : v + ' ' + u[i][0]; }
    }
    function paint(){
      els.forEach(function(el){
        var d = cache[el.getAttribute('data-gh')]; if (!d || !d.d) return;
        var l = (el.closest('[data-lang]') || {}).getAttribute ? el.closest('[data-lang]').getAttribute('data-lang') : curLang();
        var parts = ['★ ' + d.d.stars];
        if (d.d.lang) parts.push(d.d.lang);
        parts.push((l === 'pt' ? 'atualizado ' : 'updated ') + ago(d.d.pushed, l));
        el.textContent = parts.join(' · ');
      });
    }
    paint();
    Object.keys(repos).forEach(function(r){
      if (cache[r] && Date.now() - cache[r].t < TTL) return;
      fetch('https://api.github.com/repos/NyxPjct/' + r, {headers:{'Accept':'application/vnd.github+json'}, referrerPolicy:'no-referrer', credentials:'omit'})
        .then(function(res){ return res.ok ? res.json() : null; })
        .then(function(j){ if (!j) return; cache[r] = {t:Date.now(), d:{stars:j.stargazers_count, lang:j.language, pushed:j.pushed_at}}; try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {} paint(); })
        .catch(function(){});
    });
    document.addEventListener('nyx:lang', paint);
  }

  /* ---------- TryHackMe atualizado pela automação diária ---------- */
  function TryHackMe(){
    if (!document.querySelector('[data-thm]') || !window.fetch) return;
    fetch(BASE + 'assets/data/thm.json', {cache:'no-cache'}).then(function(r){ return r.ok ? r.json() : null; }).then(function(t){
      if (!t || typeof t.level !== 'number') return;
      document.querySelectorAll('[data-lang]').forEach(function(box){
        var l = box.getAttribute('data-lang'), nf = new Intl.NumberFormat(l === 'pt' ? 'pt-BR' : 'en');
        function set(k, v){ box.querySelectorAll('[data-thm="' + k + '"]').forEach(function(el){ el.textContent = v; }); }
        set('level', nf.format(t.level)); set('rooms', nf.format(t.rooms)); set('badges', nf.format(t.badges)); set('points', nf.format(t.points));
        if (t.rank) set('rank', t.rank);
        if (t.path) set('path', t.path);
        if (t.largestStreak) set('streak', l === 'pt' ? 'maior sequência: ' + t.largestStreak + ' dias' : 'longest streak: ' + t.largestStreak + ' days');
        if (t.updatedAt){ var dt = new Date(t.updatedAt); set('updated', (l === 'pt' ? 'dados de ' : 'data as of ') + dt.toLocaleDateString(l === 'pt' ? 'pt-BR' : 'en', {month:'short', year:'numeric'})); }
      });
    }).catch(function(){});
  }

  /* ---------- busca rápida (Ctrl + K) ---------- */
  function Palette(){
    var TXT = {
      pt:{ph:'Para onde você quer ir?', none:'Nada encontrado.', nav:'navegar', open:'abrir', close:'fechar', sec:'seção', cs:'case', ext:'link', act:'ação',
          items:[['Início','#inicio','sec'],['Atuação','#atuacao','sec'],['Projetos','#projetos','sec'],['Sobre','#sobre','sec'],['Contato','#contato','sec']], lang:'Switch to English', term:'Abrir o terminal'},
      en:{ph:'Where do you want to go?', none:'Nothing found.', nav:'navigate', open:'open', close:'close', sec:'section', cs:'case', ext:'link', act:'action',
          items:[['Home','#home','sec'],['Services','#work','sec'],['Projects','#projects','sec'],['About','#about','sec'],['Contact','#contact','sec']], lang:'Mudar para português', term:'Open the terminal'}
    };
    var bg = null, list, input, sel = 0, items = [], last = null;
    function build(){
      var l = curLang(), t = TXT[l], out = [];
      if (META.home) t.items.forEach(function(it){ out.push({label:it[0], hint:t.sec, run:function(){ var el = document.querySelector('[data-lang="' + l + '"] ' + it[1]) || document.querySelector(it[1]); if (el) el.scrollIntoView({behavior:RM ? 'auto' : 'smooth'}); }}); });
      else out.push({label:l === 'pt' ? 'Voltar ao portfólio' : 'Back to portfolio', hint:t.sec, run:function(){ location.href = BASE || '/'; }});
      Object.keys(APPS).forEach(function(k){ out.push({label:APPS[k], hint:t.cs, run:function(){ go(k); }}); });
      [['GitHub','github'],['LinkedIn','linkedin'],['TryHackMe','tryhackme'],['Instagram','instagram']].forEach(function(x){ out.push({label:x[0], hint:t.ext, run:function(){ go(x[1]); }}); });
      out.push({label:t.lang, hint:t.act, run:function(){ window.nyxSetLang(l === 'pt' ? 'en' : 'pt'); }});
      if (META.home) out.push({label:t.term, hint:t.act, run:function(){ var i = document.querySelector('[data-lang="' + l + '"] .term-in'); if (i){ i.scrollIntoView({block:'center', behavior:RM ? 'auto' : 'smooth'}); setTimeout(function(){ i.focus({preventScroll:true}); }, RM ? 0 : 450); } }});
      return out;
    }
    function norm(s){ return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function render(){
      var q = norm(input.value.trim()), all = build(), t = TXT[curLang()];
      items = q ? all.filter(function(it){ return norm(it.label + ' ' + it.hint).indexOf(q) !== -1; }) : all;
      sel = Math.min(sel, Math.max(0, items.length - 1)); list.innerHTML = '';
      if (!items.length){ var e = document.createElement('li'); e.className = 'pal-empty'; e.setAttribute('role', 'presentation'); e.textContent = t.none; list.appendChild(e); input.removeAttribute('aria-activedescendant'); return; }
      items.forEach(function(it, i){
        var li = document.createElement('li'); li.id = 'pal-opt-' + i; li.setAttribute('role', 'option'); li.setAttribute('aria-selected', i === sel ? 'true' : 'false');
        var a = document.createElement('span'); a.textContent = it.label; var b = document.createElement('small'); b.textContent = it.hint; li.appendChild(a); li.appendChild(b);
        li.addEventListener('mousemove', function(){ if (sel !== i){ sel = i; mark(); } });
        li.addEventListener('click', function(){ choose(i); });
        list.appendChild(li);
      });
      mark();
    }
    function mark(){ Array.prototype.forEach.call(list.children, function(li, i){ li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); }); input.setAttribute('aria-activedescendant', 'pal-opt-' + sel); var c = list.children[sel]; if (c && c.scrollIntoView) c.scrollIntoView({block:'nearest'}); }
    function choose(i){ var it = items[i]; if (!it) return; close(); it.run(); }
    function open(){
      if (bg) return; last = document.activeElement; var t = TXT[curLang()];
      bg = document.createElement('div'); bg.className = 'pal-bg';
      bg.innerHTML = '<div class="pal" role="dialog" aria-modal="true" aria-label="' + t.ph + '"><div class="pal-top"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg><input type="text" role="combobox" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></div><ul id="pal-list" role="listbox"></ul><div class="pal-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> ' + t.nav + '</span><span><kbd>Enter</kbd> ' + t.open + '</span><span><kbd>Esc</kbd> ' + t.close + '</span></div></div>';
      document.body.appendChild(bg); list = bg.querySelector('ul'); input = bg.querySelector('input'); input.placeholder = t.ph; sel = 0; render();
      input.addEventListener('input', function(){ sel = 0; render(); });
      input.addEventListener('keydown', function(e){
        if (e.key === 'ArrowDown'){ e.preventDefault(); if (items.length){ sel = (sel + 1) % items.length; mark(); } }
        else if (e.key === 'ArrowUp'){ e.preventDefault(); if (items.length){ sel = (sel - 1 + items.length) % items.length; mark(); } }
        else if (e.key === 'Enter'){ e.preventDefault(); choose(sel); }
        else if (e.key === 'Escape'){ e.preventDefault(); close(); }
        else if (e.key === 'Tab'){ e.preventDefault(); }
      });
      bg.addEventListener('mousedown', function(e){ if (e.target === bg) close(); });
      setTimeout(function(){ input.focus(); }, 0);
    }
    function close(){ if (!bg) return; bg.remove(); bg = null; if (last && last.focus) last.focus({preventScroll:true}); }
    document.addEventListener('keydown', function(e){
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')){ e.preventDefault(); bg ? close() : open(); }
    });
    document.querySelectorAll('[data-palette]').forEach(function(b){ b.addEventListener('click', open); });
    window.nyxPalette = open;
  }

  /* ---------- abertura com o logo NYX ---------- */
  function Intro(){
    if (!META.intro || RM) return;
    try { if (sessionStorage.getItem('nyx-intro')) return; sessionStorage.setItem('nyx-intro', '1'); } catch (e) { return; }
    var o = document.createElement('div'); o.className = 'intro'; o.setAttribute('aria-hidden', 'true');
    o.innerHTML = '<svg viewBox="200 430 680 220" fill="none" stroke-linecap="square" stroke-linejoin="miter" stroke-width="14"><path d="M230 625 V455 L390 625 V455" stroke="#EDE9FE"></path><path d="M460 455 L540 545 L620 455 M540 545 V625" stroke="#EDE9FE"></path><path d="M690 455 L850 625 M850 455 L690 625" stroke="#A78BFA"></path><path d="M400 645 L640 645" stroke="#A78BFA" stroke-width="4" opacity=".7"></path></svg>';
    document.body.appendChild(o);
    o.querySelectorAll('path').forEach(function(p){ try { p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 1); } catch (e) {} });
    var done = false;
    function end(){ if (done) return; done = true; o.classList.add('out'); setTimeout(function(){ o.remove(); }, 500); }
    setTimeout(end, 1250);
    o.addEventListener('click', end); document.addEventListener('keydown', end, {once:true});
  }

  /* ---------- cursor com brilho e botões magnéticos ---------- */
  function Pointer(){
    if (!HOVER || RM) return;
    var g = document.createElement('div'); g.className = 'glow'; g.setAttribute('aria-hidden', 'true'); document.body.appendChild(g);
    var x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0;
    function loop(){ x += (tx - x) * .16; y += (ty - y) * .16; g.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)'; raf = Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0; }
    document.addEventListener('pointermove', function(e){ if (e.pointerType !== 'mouse') return; tx = e.clientX; ty = e.clientY; g.classList.add('on'); if (!raf) raf = requestAnimationFrame(loop); });
    document.addEventListener('pointerleave', function(){ g.classList.remove('on'); });
    document.documentElement.addEventListener('mouseleave', function(){ g.classList.remove('on'); });
    document.querySelectorAll('.mag').forEach(function(b){
      b.addEventListener('pointermove', function(e){ var r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); b.style.transform = 'translate(' + Math.max(-8, Math.min(8, dx * .22)).toFixed(1) + 'px,' + Math.max(-6, Math.min(6, dy * .3)).toFixed(1) + 'px)'; });
      b.addEventListener('pointerleave', function(){ b.style.transform = ''; });
    });
  }

  function Term(el){
    var L = el.getAttribute('data-term') === 'en' ? 'en' : 'pt', t = T[L];
    var out = el.querySelector('.term-out'), form = el.querySelector('.term-form'), inp = el.querySelector('.term-in'), body = el.querySelector('.term-body');
    var hist = [], hi = 0, intro = null, started = false;
    out.innerHTML = '';
    function scroll(){ body.scrollTop = body.scrollHeight; }
    function line(text, cls){ var d = document.createElement('div'); if (cls) d.className = cls; d.textContent = text; out.appendChild(d); scroll(); return d; }
    function prompt(cmd){ var d = document.createElement('div'); var s = document.createElement('span'); s.className = 't-acc'; s.textContent = '$ '; d.appendChild(s); var c = document.createElement('span'); c.textContent = cmd; d.appendChild(c); out.appendChild(d); scroll(); return c; }
    function link(label, href, text){ var d = document.createElement('div'); if (label){ var s = document.createElement('span'); s.className = 't-dim'; s.textContent = label; d.appendChild(s); } var a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = text; d.appendChild(a); out.appendChild(d); scroll(); }
    function pad(x, n){ while (x.length < n) x += ' '; return x; }
    function run(raw){
      var cmd = raw.trim(); if (!cmd) return;
      var parts = cmd.toLowerCase().split(/\s+/), c = ALIAS[parts[0]] || parts[0], arg = parts.slice(1).join(' ');
      if (c === 'help'){ t.help.forEach(function(h){ line(pad(h[0], 14) + h[1], 't-mut'); }); }
      else if (c === 'whoami'){ line(t.who, 't-mut'); }
      else if (c === 'projects'){ line(t.proj, 't-dim'); PROJ.forEach(function(p){ link('', GH + '/' + p[0], p[0]); out.lastChild.appendChild(document.createTextNode(pad('', 13 - p[0].length) + p[1])); }); line(t.more, 't-dim'); }
      else if (c === 'ls'){ line(t.ls, 't-mut'); }
      else if (c === 'stack'){ t.stack.forEach(function(s){ line(pad(s[0], 12) + s[1], 't-mut'); }); }
      else if (c === 'contact'){ link(pad('linkedin', 11), LINK.li, 'manoela-fasanello'); link(pad('github', 11), LINK.gh, 'NyxPjct'); link(pad('instagram', 11), LINK.ig, '@nyxprojectr'); link(pad('tryhackme', 11), LINK.thm, 'ATHOS'); }
      else if (c === 'tryhackme'){ line(t.thm, 't-mut'); link('', LINK.thm, 'tryhackme.com/p/ATHOS'); }
      else if (c === 'cat'){ var f = t.files[arg]; if (f === 'focus') line(t.focus, 't-mut'); else if (f === 'about') line(t.about, 't-mut'); else line('cat: ' + (arg || '?') + t.nofile, 't-err'); }
      else if (c === 'about'){ line(t.about, 't-mut'); }
      else if (c === 'open'){ var tg = arg.replace(/\s+/g, ''); if (!tg || !(APPS[tg] || EXT[tg])) line(t.openUse, 't-mut'); else { line(t.opening + tg + ' ...', 't-ok'); setTimeout(function(){ go(tg); }, 250); } }
      else if (c === 'lang'){ if ((arg === 'en' || arg === 'pt') && window.nyxSetLang){ window.nyxSetLang(arg); } else line('lang: pt | en', 't-err'); }
      else if (c === 'clear' || c === 'cls'){ out.innerHTML = ''; }
      else if (c === 'sudo'){ if (/hire/.test(arg)){ line(t.sudo[0], 't-dim'); line(t.sudo[1], 't-ok'); link('', LINK.li, 'linkedin.com/in/manoela-fasanello'); } else line(t.sudoNo, 't-err'); }
      else if (c === 'nmap'){ t.nmap.forEach(function(x, i){ line(x, i === 4 ? 't-acc' : 't-mut'); }); }
      else if (c === 'exit' || c === 'quit'){ line(t.exit, 't-mut'); }
      else if (c === 'echo'){ line(cmd.slice(5), 't-mut'); }
      else { line(t.nf + parts[0] + t.nf2, 't-err'); }
    }
    function finishIntro(){ if (!intro) return; intro.done = true; intro = null; }
    function playIntro(){
      if (started) return; started = true;
      var steps = [['whoami', t.who], [t.focusCmd, t.focus]];
      if (RM){ steps.forEach(function(s){ prompt(s[0]); line(s[1], 't-mut'); }); line(t.hint, 't-dim'); return; }
      var st = intro = {done:false}, i = 0;
      function next(){
        if (st.done){ for (; i < steps.length; i++){ prompt(steps[i][0]); line(steps[i][1], 't-mut'); } line(t.hint, 't-dim'); return; }
        if (i >= steps.length){ intro = null; line(t.hint, 't-dim'); return; }
        var s = steps[i], span = prompt(''), k = 0;
        (function type(){
          if (st.done){ span.textContent = s[0]; line(s[1], 't-mut'); i++; next(); return; }
          if (k < s[0].length){ span.textContent += s[0][k++]; setTimeout(type, 55 + Math.random() * 45); }
          else setTimeout(function(){ line(s[1], 't-mut'); i++; setTimeout(next, 420); }, 260);
        })();
      }
      setTimeout(next, 500);
    }
    form.addEventListener('submit', function(e){ e.preventDefault(); finishIntro(); var v = inp.value; inp.value = ''; prompt(v); if (v.trim()){ hist.push(v); hi = hist.length; } run(v); });
    inp.addEventListener('keydown', function(e){
      if (e.key === 'ArrowUp' && hist.length){ e.preventDefault(); hi = Math.max(0, hi - 1); inp.value = hist[hi] || ''; }
      else if (e.key === 'ArrowDown' && hist.length){ e.preventDefault(); hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ''; }
    });
    inp.addEventListener('focus', finishIntro);
    body.addEventListener('click', function(e){ if (e.target.tagName !== 'A' && !String(window.getSelection())) inp.focus({preventScroll:true}); });
    if ('IntersectionObserver' in window){ var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ playIntro(); io.disconnect(); } }); }, {threshold:.35}); io.observe(el); } else playIntro();
  }

  function Stars(cv){
    var ctx = cv.getContext && cv.getContext('2d'); if (!ctx) return;
    var host = cv.parentElement, w = 0, h = 0, pts = [], m = {x:-1e4, y:-1e4}, on = false, inView = false, raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size(){
      var r = host.getBoundingClientRect(); w = r.width; h = r.height; if (!w || !h) return;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(120, Math.max(28, w * h / 11000))); pts = [];
      for (var i = 0; i < n; i++) pts.push({x:Math.random() * w, y:Math.random() * h, vx:(Math.random() - .5) * .22, vy:(Math.random() - .5) * .22, r:Math.random() * 1.3 + .5});
      draw();
    }
    function draw(){
      ctx.clearRect(0, 0, w, h); var i, j, p, q, dx, dy, d, D = 125, n = pts.length;
      if (on && !RM) for (i = 0; i < n; i++){ p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w; if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h; }
      ctx.lineWidth = 1;
      for (i = 0; i < n; i++){ p = pts[i];
        for (j = i + 1; j < n; j++){ q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy;
          if (d < D * D){ d = Math.sqrt(d); ctx.strokeStyle = 'rgba(167,139,250,' + ((1 - d / D) * .16).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } }
        dx = p.x - m.x; dy = p.y - m.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < 170){ ctx.strokeStyle = 'rgba(196,181,253,' + ((1 - d / 170) * .5).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(m.x, m.y); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(196,181,253,.6)';
      for (i = 0; i < n; i++){ p = pts[i]; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); }
    }
    function loop(){ draw(); raf = requestAnimationFrame(loop); }
    function start(){ if (on || document.hidden) return; if (!w) size(); on = true; if (!RM) raf = requestAnimationFrame(loop); }
    function stop(){ on = false; cancelAnimationFrame(raf); }
    host.addEventListener('pointermove', function(e){ if (e.pointerType !== 'mouse') return; var r = host.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; if (RM) draw(); });
    host.addEventListener('pointerleave', function(){ m.x = m.y = -1e4; if (RM) draw(); });
    var tm; window.addEventListener('resize', function(){ clearTimeout(tm); tm = setTimeout(function(){ w = 0; size(); }, 200); });
    document.addEventListener('visibilitychange', function(){ if (document.hidden) stop(); else if (inView) start(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(e){ inView = e.isIntersecting; if (inView) start(); else stop(); }); }).observe(host);
    else { size(); start(); }
  }

  function Cards(){
    document.querySelectorAll('.fx-card').forEach(function(c){
      c.addEventListener('pointermove', function(e){
        var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
        if (HOVER && !RM && c.tagName === 'ARTICLE' && !c.classList.contains('reveal')) c.style.transform = 'perspective(900px) rotateX(' + ((.5 - y / r.height) * 5).toFixed(2) + 'deg) rotateY(' + ((x / r.width - .5) * 5).toFixed(2) + 'deg) translateY(-2px)';
      });
      c.addEventListener('pointerleave', function(){ c.style.transform = ''; });
    });
  }

  function Reveal(){
    var els = document.querySelectorAll('.reveal');
    if (RM || !('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.remove('reveal'); }); return; }
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return; var el = e.target; io.unobserve(el);
        var sib = Array.prototype.indexOf.call(el.parentElement.children, el) % 3;
        el.style.transitionDelay = (sib * 90) + 'ms'; el.classList.add('in');
        setTimeout(function(){ el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; }, 900 + sib * 90);
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){ io.observe(el); });
  }

  document.querySelectorAll('[data-term]').forEach(Term);
  document.querySelectorAll('canvas.stars').forEach(Stars);
  Cards(); Reveal(); GitHubStats(); TryHackMe(); Palette(); Intro(); Pointer();
})();
