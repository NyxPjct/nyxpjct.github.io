/* ==========================================================================
   Nyx Project · Manoela Fasanello — script.js
   Sem dependências além do GSAP + ScrollTrigger (hospedados no próprio site).
   Módulos: idiomas · navbar · digitação · canvas · terminal · GSAP · cards ·
            GitHub ao vivo · TryHackMe · formulário · busca rápida · estatísticas
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 0. Configuração ---------- */
  var CONFIG = {
    // Formulário de contato: cole aqui o endpoint do Formspree (ex.: https://formspree.io/f/abcdwxyz).
    // Vazio = o formulário valida e sugere o LinkedIn, sem enviar nada.
    formEndpoint: 'https://formspree.io/f/mwlokobn',
    github: 'https://github.com/NyxPjct',
    links: {
      linkedin: 'https://www.linkedin.com/in/manoela-fasanello-b0a9b6273/',
      github: 'https://github.com/NyxPjct',
      instagram: 'https://www.instagram.com/nyxprojectr',
      tryhackme: 'https://tryhackme.com/p/ATHOS'
    },
    apps: { dailyapp: 'DailyAPP', drawsketch: 'DrawSketch', marketai: 'MarketAI', honeymoney: 'HoneyMoney' },
    statsHost: 'nyxpjct.github.io',
    statsUrl: 'https://nyxpjct.goatcounter.com/count'
  };

  var root = document.documentElement;
  var RM = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var FINE = !!(window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches);
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- 1. Idiomas (PT padrão no HTML, EN pelo dicionário) ---------- */
  var I18N = {
 "pt": {
  "meta_title": "Manoela Fasanello — App Developer & Cybersecurity · Nyx Project",
  "meta_desc": "Portfólio de Manoela Fasanello: desenvolvimento de apps para celular, web e desktop, e cibersegurança com foco em pentest de aplicações web.",
  "menu_open": "Abrir menu",
  "menu_close": "Fechar menu",
  "gh_updated": "atualizado",
  "f_invalid": "Confira os campos destacados: nome, um e-mail válido e a mensagem.",
  "f_notyet": "O envio pelo formulário ainda está sendo configurado. Enquanto isso, fale comigo pelo",
  "f_sending": "Enviando…",
  "f_ok": "Mensagem enviada! Respondo em breve.",
  "f_err": "Não consegui enviar agora. Tente de novo ou me chame no LinkedIn.",
  "pal_sec": "seção",
  "pal_link": "link",
  "pal_act": "ação",
  "pal_lang": "Switch to English",
  "pal_term": "Abrir o terminal",
  "pal_none": "Nada encontrado.",
  "pal_ph": "Para onde você quer ir?",
  "pal_nav": "navegar",
  "pal_open_k": "abrir",
  "pal_close": "fechar",
  "nav_about": "Sobre",
  "nav_services": "Serviços",
  "nav_projects": "Projetos",
  "nav_skills": "Habilidades",
  "nav_contact": "Contato",
  "term_help": "help=lista os comandos|whoami=quem sou eu|projetos=meus apps|stack=tecnologias que uso|contato=onde me encontrar|tryhackme=meu perfil no TryHackMe|open <nome>=abre um app ou perfil|lang en=switch to English|clear=limpa o terminal",
  "term_who": "Manoela Fasanello\ndesenvolvedora de apps · cibersegurança · pentest de aplicações web",
  "term_focuscmd": "cat foco.txt",
  "term_focus": "apps · pentest de aplicações web",
  "term_proj": "apps com o código no GitHub:",
  "term_more": "+ app secreto (2027) e jogo de plataforma (em desenvolvimento)",
  "term_ls": "dailyapp/  drawsketch/  marketai/  honeymoney/  sobre.txt  foco.txt",
  "term_stack": "linguagens=TypeScript, JavaScript, Python|apps=React, Next.js, Vite, Capacitor, Electron|back-end=FastAPI, PostgreSQL, Supabase|qualidade=Playwright, GitHub Actions, Docker",
  "term_thm": "ATHOS · Top 15% · nível 8 · 44 salas · 7 badges · 4.129 pontos\ntrilha atual: Jr Penetration Tester",
  "term_about": "Curso Defesa Cibernética na Estácio, desenvolvo apps e estudo segurança ofensiva. No Nyx Project publico conteúdo de segurança e divulgo meus apps.",
  "term_nofile": ": arquivo não encontrado",
  "term_openuse": "uso: open dailyapp | drawsketch | marketai | honeymoney | github | linkedin | tryhackme | instagram",
  "term_opening": "abrindo ",
  "term_sudo1": "[sudo] senha para recrutadora: ********",
  "term_sudo2": "acesso concedido. o caminho mais rápido é este:",
  "term_sudono": "permissão negada. tente: sudo hire manoela",
  "term_nmap": "Starting Nmap em nyxpjct.github.io ...|PORT     STATE  SERVICE|443/tcp  open   https|80/tcp   open   http → redireciona para 443|nada além do necessário por aqui. boa tentativa ;)",
  "term_exit": "não dá pra sair tão fácil assim. que tal: contato ;)",
  "term_nf": "comando não encontrado: ",
  "term_nf2": " (digite help)",
  "term_hint": "dica: digite help e aperte Enter"
 },
 "en": {
  "meta_title": "Manoela Fasanello — App Developer & Cybersecurity · Nyx Project",
  "meta_desc": "Portfolio of Manoela Fasanello: mobile, web and desktop app development, and cybersecurity focused on web application pentesting.",
  "menu_open": "Open menu",
  "menu_close": "Close menu",
  "gh_updated": "updated",
  "f_invalid": "Please check the highlighted fields: name, a valid email and your message.",
  "f_notyet": "The contact form is still being set up. In the meantime, reach me on",
  "f_sending": "Sending…",
  "f_ok": "Message sent! I will reply soon.",
  "f_err": "I could not send it right now. Please try again or reach me on LinkedIn.",
  "pal_sec": "section",
  "pal_link": "link",
  "pal_act": "action",
  "pal_lang": "Mudar para português",
  "pal_term": "Open the terminal",
  "pal_none": "Nothing found.",
  "pal_ph": "Where do you want to go?",
  "pal_nav": "navigate",
  "pal_open_k": "open",
  "pal_close": "close",
  "skip": "Skip to content",
  "nav_label": "Main",
  "pal_open": "Open quick search",
  "lang_btn": "PT",
  "lang_aria": "Versão em português",
  "nav_about": "About",
  "nav_services": "Services",
  "nav_projects": "Projects",
  "nav_skills": "Skills",
  "nav_contact": "Contact",
  "avail": "Open to new opportunities",
  "impact": "I build apps and test where they break.",
  "lead": "Mobile, web and desktop apps with security built in from the code up, and web application pentesting to find flaws before the wrong people do.",
  "cta_projects": "See projects",
  "cta_contact": "Contact",
  "loc": "Praia Grande, Brazil",
  "mode": "Remote or on-site",
  "term_label": "Terminal command",
  "term_ph": "type here",
  "nav_about_l": "about",
  "about_title": "Build, test, protect.",
  "about_text": "I build all kinds of apps, for mobile, web and desktop, and I work in cybersecurity focused on finding flaws in web applications. I study Cyber Defense at Estácio, practice on TryHackMe and, on Nyx Project, share security content and showcase my apps.",
  "avatar_alt": "Nyx Project avatar: a purple fox",
  "edu_k": "in progress",
  "edu_t": "Cyber Defense",
  "thm_k": "practice",
  "thm_lv": "level",
  "thm_rooms": "rooms completed",
  "thm_badges": "badges",
  "thm_pts": "points",
  "thm_path": "current path:",
  "thm_view": "view profile",
  "nav_services_l": "services",
  "services_title": "What I do",
  "sv1_t": "App Development",
  "sv1_d": "From the first prototype to the released version, with multilingual interfaces and security from the code up.",
  "sv1_a": "Android and iOS with Capacitor",
  "sv1_b": "React, Next.js and Vite",
  "sv1_c": "Electron for Windows, macOS and Linux",
  "sv1_d_k": "AI",
  "sv1_d_v": "agents and language model integrations",
  "sv2_t": "Cybersecurity",
  "sv2_d": "Security testing to find flaws before the wrong people do, focused on web applications.",
  "sv2_a": "of web applications",
  "sv2_b_k": "Vulnerability",
  "sv2_b_v": "assessment",
  "sv2_c": "on programs with an authorized scope",
  "sv2_d_v": "encryption, authentication and CSP",
  "nav_projects_l": "projects",
  "projects_title": "Projects",
  "projects_sub": "Apps I built from scratch, with the code on GitHub.",
  "all_gh": "See everything on GitHub",
  "nav_skills_l": "skills",
  "skills_title": "Technologies and tools",
  "nav_contact_l": "contact",
  "contact_title": "Let's talk?",
  "contact_sub": "I'm open to opportunities and projects in app development and cybersecurity, remote or on-site.",
  "f_name": "Name",
  "f_email": "Email",
  "f_msg": "Message",
  "f_send": "Send message",
  "footer_tag": "Apps and cybersecurity, by Manoela Fasanello.",
  "footer_nav": "Footer",
  "seal": "strict CSP · no cookies · anonymous stats",
  "term_help": "help=list commands|whoami=who I am|projects=my apps|stack=tech I use|contact=where to find me|tryhackme=my TryHackMe profile|open <name>=opens an app or profile|lang pt=mudar para português|clear=clear the terminal",
  "term_who": "Manoela Fasanello\napp developer · cybersecurity · web app pentesting",
  "term_focuscmd": "cat focus.txt",
  "term_focus": "apps · web app pentesting",
  "term_proj": "apps with source code on GitHub:",
  "term_more": "+ a secret app (2027) and a platform game (in development)",
  "term_ls": "dailyapp/  drawsketch/  marketai/  honeymoney/  about.txt  focus.txt",
  "term_stack": "languages=TypeScript, JavaScript, Python|apps=React, Next.js, Vite, Capacitor, Electron|back-end=FastAPI, PostgreSQL, Supabase|quality=Playwright, GitHub Actions, Docker",
  "term_thm": "ATHOS · Top 15% · level 8 · 44 rooms · 7 badges · 4,129 points\ncurrent path: Jr Penetration Tester",
  "term_about": "I study Cyber Defense at Estácio, build apps and study offensive security. On Nyx Project I share security content and showcase my apps.",
  "term_nofile": ": no such file",
  "term_openuse": "usage: open dailyapp | drawsketch | marketai | honeymoney | github | linkedin | tryhackme | instagram",
  "term_opening": "opening ",
  "term_sudo1": "[sudo] password for recruiter: ********",
  "term_sudo2": "access granted. fastest route:",
  "term_sudono": "permission denied. try: sudo hire manoela",
  "term_nmap": "Starting Nmap on nyxpjct.github.io ...|PORT     STATE  SERVICE|443/tcp  open   https|80/tcp   open   http → redirects to 443|nothing more than needed here. nice try ;)",
  "term_exit": "it is not that easy to leave. how about: contact ;)",
  "term_nf": "command not found: ",
  "term_nf2": " (type help)",
  "term_hint": "tip: type help and press Enter",
  "tech_label": "Technologies",
  "case": "View case",
  "soon": "Coming soon",
  "classified": "classified",
  "st_cherry": "coming soon · 2027",
  "st_game": "in development",
  "t_game": "Platform game",
  "pd_dailyapp": "An app to organize everyday life: tasks, routines, calendar and personal finances, with budgets and savings goals. Works offline, no account needed, with password-protected AES-256-GCM backups.",
  "pd_drawsketch": "A drawing app for browser, desktop and mobile. Eight brush types, layers with masks and blend modes, pen pressure and timelapse recording. Everything runs locally, no account needed.",
  "pd_marketai": "A market intelligence platform: price and competitor analysis, profit and margin calculation, product monitoring with alerts and trend forecasting. It flags weak data instead of making things up.",
  "pd_honeymoney": "A free, open-source platform where six AI agents build a digital offer from scratch: research, copy and sales page, with a reviewer that blocks income promises. AI keys protected in Supabase Vault.",
  "pd_cherry": "Something made for the girls. For now, it's a secret.",
  "pd_game": "A platform game I'm currently developing. More details soon.",
  "alt_dailyapp": "DailyAPP Today and Finances screens",
  "alt_drawsketch": "DrawSketch editor on desktop",
  "alt_marketai": "MarketAI dashboard",
  "alt_honeymoney": "HoneyMoney agent office",
  "sk_lang": "Languages",
  "sk_app": "Apps and front-end",
  "sk_back": "Back-end and data",
  "sk_ai": "AI",
  "sk_sec": "Security",
  "sk_qa": "Quality and delivery",
  "ch_agents": "AI agents",
  "ch_llm": "LLM integration",
  "ch_prompts": "Prompts with delimited data",
  "ch_pentest": "Web app pentesting",
  "ch_crypto": "AES-256-GCM and PBKDF2",
  "ch_auth": "Argon2 and JWT",
  "ch_rls": "RLS and Supabase Vault",
  "ch_csp": "CSP and hardening"
 }
};
  var PT_DEFAULT = {};                       // guarda o texto original em português
  function lang() { return root.classList.contains('l-en') ? 'en' : 'pt'; }
  function t(key) { var l = lang(); return (I18N[l] && I18N[l][key]) || (I18N.pt && I18N.pt[key]) || PT_DEFAULT[key] || ''; }
  function applyLang(l) {
    root.classList.remove('l-pt', 'l-en'); root.classList.add('l-' + l);
    root.lang = l === 'pt' ? 'pt-BR' : 'en';
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!(k in PT_DEFAULT)) PT_DEFAULT[k] = el.textContent;
      var v = l === 'en' ? I18N.en[k] : (I18N.pt[k] || PT_DEFAULT[k]);
      if (v != null) el.textContent = v;
    });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':'), attr = p[0], k = p[1], store = 'attr:' + attr + ':' + k;
        if (!(store in PT_DEFAULT)) PT_DEFAULT[store] = el.getAttribute(attr) || '';
        var v = l === 'en' ? I18N.en[k] : (I18N.pt[k] || PT_DEFAULT[store]);
        if (v != null) el.setAttribute(attr, v);
      });
    });
    document.title = t('meta_title');
    var d = $('meta[name="description"]'); if (d) d.setAttribute('content', t('meta_desc'));
    try { localStorage.setItem('lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('nyx:lang', { detail: l }));
  }
  function setLang(l) {
    if (l !== 'pt' && l !== 'en') return;
    applyLang(l);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  window.nyxSetLang = setLang;
  applyLang(lang());
  root.classList.add('ready');
  $$('[data-lang-toggle]').forEach(function (b) { b.addEventListener('click', function () { setLang(lang() === 'pt' ? 'en' : 'pt'); }); });

  /* ---------- 2. Navbar: encolhe, progresso de leitura, seção ativa, hambúrguer ---------- */
  function Nav() {
    var nav = $('[data-nav]'), bar = $('[data-progress]'), burger = $('[data-burger]'), menu = $('#menu');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY || 0, h = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle('scrolled', y > 24);
      if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0).toFixed(4) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    // seção ativa no menu
    var links = $$('#menu a'), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
          var a = map[e.target.id]; if (a) { a.classList.add('active'); a.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('main section[id]').forEach(function (s) { io.observe(s); });
    }

    // menu do celular
    function setOpen(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', t(open ? 'menu_close' : 'menu_open'));
      menu.classList.toggle('open', open);
    }
    burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
    links.forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); burger.focus(); } });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function () { setOpen(false); });
  }

  /* ---------- 3. Hero: entrada + título digitado com cursor ---------- */
  function Hero() {
    requestAnimationFrame(function () { root.classList.add('hero-in'); });
    var el = $('[data-type]'); if (!el || RM) return;
    var text = el.getAttribute('data-type'), i = 0;
    el.textContent = '';
    setTimeout(function step() {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(step, 32 + Math.random() * 28);
    }, 450);
  }

  /* ---------- 4. Canvas: partículas conectadas que reagem ao mouse ---------- */
  function Particles() {
    var cv = $('.hero-canvas'); if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d'), host = cv.parentElement;
    var w = 0, h = 0, pts = [], m = { x: -1e4, y: -1e4 }, on = false, inView = false, raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var LINK = 125, MOUSE = 170;
    function size() {
      var r = host.getBoundingClientRect(); w = r.width; h = r.height; if (!w || !h) return;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(110, Math.max(26, w * h / 12000))); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.2 + .5 });
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      var i, j, p, q, dx, dy, d, n = pts.length;
      if (on && !RM) for (i = 0; i < n; i++) { p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w; if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h; }
      ctx.lineWidth = 1;
      for (i = 0; i < n; i++) {
        p = pts[i];
        for (j = i + 1; j < n; j++) {
          q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy;
          if (d < LINK * LINK) { d = Math.sqrt(d); ctx.strokeStyle = 'rgba(167,139,250,' + ((1 - d / LINK) * .15).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        dx = p.x - m.x; dy = p.y - m.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE) { ctx.strokeStyle = 'rgba(196,181,253,' + ((1 - d / MOUSE) * .5).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(m.x, m.y); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(196,181,253,.6)';
      for (i = 0; i < n; i++) { p = pts[i]; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill(); }
    }
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    function start() { if (on || document.hidden) return; if (!w) size(); on = true; if (!RM) raf = requestAnimationFrame(loop); }
    function stop() { on = false; cancelAnimationFrame(raf); }        // canvas pausado fora da tela
    host.addEventListener('pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = host.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; if (RM) draw(); });
    host.addEventListener('pointerleave', function () { m.x = m.y = -1e4; if (RM) draw(); });
    var tm; window.addEventListener('resize', function () { clearTimeout(tm); tm = setTimeout(function () { w = 0; size(); }, 200); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (inView) start(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; if (inView) start(); else stop(); }); }).observe(host);
    else { size(); start(); }
  }

  /* ---------- 5. Terminal interativo ---------- */
  function Terminal() {
    var el = $('[data-term]'); if (!el) return;
    var out = $('.term-out', el), form = $('.term-form', el), inp = $('.term-in', el), body = $('.term-body', el);
    var hist = [], hi = 0, intro = null, started = false;
    var PROJ = [['DailyAPP', 'Android · iOS'], ['DrawSketch', 'Web · Desktop · Android · iOS'], ['MarketAI', 'Web · Windows'], ['HoneyMoney', 'Web · open source']];
    var ALIAS = { projetos: 'projects', contato: 'contact', sobre: 'about', ajuda: 'help', limpar: 'clear', habilidades: 'stack', skills: 'stack' };
    var TT = function (k) { return t('term_' + k); };
    function scroll() { body.scrollTop = body.scrollHeight; }
    function line(text, cls) { var d = document.createElement('div'); if (cls) d.className = cls; d.textContent = text; out.appendChild(d); scroll(); return d; }
    function prompt(cmd) { var d = document.createElement('div'), s = document.createElement('span'), c = document.createElement('span'); s.className = 't-acc'; s.textContent = '$ '; c.textContent = cmd; d.appendChild(s); d.appendChild(c); out.appendChild(d); scroll(); return c; }
    function link(label, href, text, after) {
      var d = document.createElement('div');
      if (label) { var s = document.createElement('span'); s.className = 't-dim'; s.textContent = label; d.appendChild(s); }
      var a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = text; d.appendChild(a);
      if (after) d.appendChild(document.createTextNode(after));
      out.appendChild(d); scroll();
    }
    function pad(x, n) { while (x.length < n) x += ' '; return x; }
    function run(raw) {
      var cmd = raw.trim(); if (!cmd) return;
      var parts = cmd.toLowerCase().split(/\s+/), c = ALIAS[parts[0]] || parts[0], arg = parts.slice(1).join(' ');
      if (c === 'help') TT('help').split('|').forEach(function (h) { var x = h.split('='); line(pad(x[0], 14) + x[1], 't-mut'); });
      else if (c === 'whoami') line(TT('who'), 't-mut');
      else if (c === 'projects') { line(TT('proj'), 't-dim'); PROJ.forEach(function (p) { link('', CONFIG.github + '/' + p[0], p[0], pad('', 13 - p[0].length) + p[1]); }); line(TT('more'), 't-dim'); }
      else if (c === 'ls') line(TT('ls'), 't-mut');
      else if (c === 'stack') TT('stack').split('|').forEach(function (s) { var x = s.split('='); line(pad(x[0], 12) + x[1], 't-mut'); });
      else if (c === 'contact') { link(pad('linkedin', 11), CONFIG.links.linkedin, 'manoela-fasanello'); link(pad('github', 11), CONFIG.links.github, 'NyxPjct'); link(pad('instagram', 11), CONFIG.links.instagram, '@nyxprojectr'); link(pad('tryhackme', 11), CONFIG.links.tryhackme, 'ATHOS'); }
      else if (c === 'tryhackme') { line(TT('thm'), 't-mut'); link('', CONFIG.links.tryhackme, 'tryhackme.com/p/ATHOS'); }
      else if (c === 'cat') { var f = { 'foco.txt': 'focus', 'focus.txt': 'focus', 'sobre.txt': 'about', 'about.txt': 'about' }[arg]; if (f) line(TT(f), 't-mut'); else line('cat: ' + (arg || '?') + TT('nofile'), 't-err'); }
      else if (c === 'about') line(TT('about'), 't-mut');
      else if (c === 'open') { var tg = arg.replace(/\s+/g, ''); if (!tg || !(CONFIG.apps[tg] || CONFIG.links[tg])) line(TT('openuse'), 't-mut'); else { line(TT('opening') + tg + ' ...', 't-ok'); setTimeout(function () { go(tg); }, 250); } }
      else if (c === 'lang') { if (arg === 'en' || arg === 'pt') setLang(arg); else line('lang: pt | en', 't-err'); }
      else if (c === 'clear' || c === 'cls') out.innerHTML = '';
      else if (c === 'sudo') { if (/hire/.test(arg)) { line(TT('sudo1'), 't-dim'); line(TT('sudo2'), 't-ok'); link('', CONFIG.links.linkedin, 'linkedin.com/in/manoela-fasanello'); } else line(TT('sudono'), 't-err'); }
      else if (c === 'nmap') TT('nmap').split('|').forEach(function (x, i, a) { line(x, i === a.length - 1 ? 't-acc' : 't-mut'); });
      else if (c === 'exit' || c === 'quit') line(TT('exit'), 't-mut');
      else if (c === 'echo') line(cmd.slice(5), 't-mut');
      else line(TT('nf') + parts[0] + TT('nf2'), 't-err');
    }
    function playIntro() {
      if (started) return; started = true;
      out.innerHTML = '';
      var steps = [['whoami', TT('who')], [TT('focuscmd'), TT('focus')]];
      if (RM) { steps.forEach(function (s) { prompt(s[0]); line(s[1], 't-mut'); }); line(TT('hint'), 't-dim'); return; }
      var st = intro = { done: false }, i = 0;
      function next() {
        if (st.done) { for (; i < steps.length; i++) { prompt(steps[i][0]); line(steps[i][1], 't-mut'); } line(TT('hint'), 't-dim'); return; }
        if (i >= steps.length) { intro = null; line(TT('hint'), 't-dim'); return; }
        var s = steps[i], span = prompt(''), k = 0;
        (function type() {
          if (st.done) { span.textContent = s[0]; line(s[1], 't-mut'); i++; next(); return; }
          if (k < s[0].length) { span.textContent += s[0][k++]; setTimeout(type, 45 + Math.random() * 40); }
          else setTimeout(function () { line(s[1], 't-mut'); i++; setTimeout(next, 380); }, 220);
        })();
      }
      setTimeout(next, 700);
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); if (intro) intro.done = true; var v = inp.value; inp.value = ''; prompt(v); if (v.trim()) { hist.push(v); hi = hist.length; } run(v); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); inp.value = hist[hi] || ''; }
      else if (e.key === 'ArrowDown' && hist.length) { e.preventDefault(); hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ''; }
    });
    inp.addEventListener('focus', function () { if (intro) intro.done = true; });
    body.addEventListener('click', function (e) { if (e.target.tagName !== 'A' && !String(window.getSelection())) inp.focus({ preventScroll: true }); });
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { playIntro(); io.disconnect(); } }); }, { threshold: .35 }); io.observe(el); } else playIntro();
  }

  /* destinos usados pelo terminal e pela busca rápida */
  function go(target) {
    if (CONFIG.apps[target]) { location.href = 'cases/' + target + '.html'; return true; }
    if (CONFIG.links[target]) { window.open(CONFIG.links[target], '_blank', 'noopener'); return true; }
    return false;
  }

  /* ---------- 6. Animações de rolagem (GSAP + ScrollTrigger) ---------- */
  function ScrollAnimations() {
    if (RM || !window.gsap || !window.ScrollTrigger) return;   // sem GSAP ou com movimento reduzido: tudo visível
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ duration: .6, ease: 'power2.out' });
    // elementos soltos: fade + deslocamento leve
    $$('.reveal').forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 22, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    // listas e grades: em sequência (stagger)
    $$('[data-stagger]').forEach(function (group) {
      gsap.from(group.children, { opacity: 0, y: 26, stagger: .08, scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
    });
    // serviços: ícones SVG que se desenham
    $$('.service .draw').forEach(function (svg) {
      var parts = $$('path, rect, circle', svg);
      parts.forEach(function (p) { var len = Math.ceil(p.getTotalLength ? p.getTotalLength() : 200) + 1; p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
      gsap.to(parts, { strokeDashoffset: 0, duration: .8, stagger: .1, ease: 'power1.inOut', scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
    });
    // habilidades: tags aparecem conforme o scroll
    $$('.skill-group').forEach(function (g) {
      gsap.from(g, { opacity: 0, y: 20, duration: .5, scrollTrigger: { trigger: g, start: 'top 88%', once: true } });
      gsap.from($$('.chips li', g), { opacity: 0, scale: .85, y: 8, duration: .35, stagger: .04, ease: 'back.out(1.6)', scrollTrigger: { trigger: g, start: 'top 82%', once: true } });
    });
  }

  /* ---------- 7. Cards: inclinação 3D + brilho na borda que segue o mouse ---------- */
  function Cards() {
    $$('.card-glow').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
        if (FINE && !RM && c.classList.contains('project')) {
          c.style.setProperty('--rx', ((.5 - y / r.height) * 5).toFixed(2) + 'deg');
          c.style.setProperty('--ry', ((x / r.width - .5) * 5).toFixed(2) + 'deg');
        }
      });
      c.addEventListener('pointerleave', function () { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ---------- 8. Números do GitHub ao vivo nos cards ---------- */
  function GitHubStats() {
    var els = $$('[data-gh]'); if (!els.length || !window.fetch) return;
    var KEY = 'nyx-gh-v1', TTL = 3600e3, cache = {};
    try { cache = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
    function ago(iso) {
      var s = (Date.now() - new Date(iso).getTime()) / 1000, l = lang();
      var rtf = window.Intl && Intl.RelativeTimeFormat ? new Intl.RelativeTimeFormat(l === 'pt' ? 'pt-BR' : 'en', { numeric: 'auto' }) : null;
      var u = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
      for (var i = 0; i < u.length; i++) if (s >= u[i][1] || i === u.length - 1) { var v = Math.max(1, Math.round(s / u[i][1])); return rtf ? rtf.format(-v, u[i][0]) : v + ' ' + u[i][0]; }
    }
    function paint() {
      els.forEach(function (el) {
        var d = cache[el.getAttribute('data-gh')]; if (!d || !d.d) return;
        var parts = ['★ ' + d.d.stars]; if (d.d.lang) parts.push(d.d.lang);
        parts.push(t('gh_updated') + ' ' + ago(d.d.pushed));
        el.textContent = parts.join(' · ');
      });
    }
    paint();
    els.forEach(function (el) {
      var r = el.getAttribute('data-gh');
      if (cache[r] && Date.now() - cache[r].t < TTL) return;
      fetch('https://api.github.com/repos/NyxPjct/' + r, { headers: { 'Accept': 'application/vnd.github+json' }, referrerPolicy: 'no-referrer', credentials: 'omit' })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (j) { if (!j) return; cache[r] = { t: Date.now(), d: { stars: j.stargazers_count, lang: j.language, pushed: j.pushed_at } }; try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {} paint(); })
        .catch(function () {});
    });
    document.addEventListener('nyx:lang', paint);
  }

  /* ---------- 9. TryHackMe (assets/data/thm.json, atualizado pela automação) ---------- */
  function TryHackMe() {
    if (!$('[data-thm]') || !window.fetch) return;
    var data = null;
    function paint() {
      if (!data) return; var l = lang(), nf = new Intl.NumberFormat(l === 'pt' ? 'pt-BR' : 'en');
      function set(k, v) { $$('[data-thm="' + k + '"]').forEach(function (el) { el.textContent = v; }); }
      set('level', nf.format(data.level)); set('rooms', nf.format(data.rooms)); set('badges', nf.format(data.badges)); set('points', nf.format(data.points));
      if (data.rank) set('rank', data.rank); if (data.path) set('path', data.path);
    }
    fetch('assets/data/thm.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && typeof j.level === 'number') { data = j; paint(); } }).catch(function () {});
    document.addEventListener('nyx:lang', paint);
  }

  /* ---------- 10. Formulário de contato ---------- */
  function ContactForm() {
    var form = $('[data-contact]'); if (!form) return;
    var status = $('.form-status', form), btn = $('button[type="submit"]', form);
    function say(msg, cls) { status.textContent = msg; status.className = 'form-status' + (cls ? ' ' + cls : ''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['name', 'email', 'message'].forEach(function (n) {
        var f = form.elements[n], bad = !f.value.trim() || (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad && ok) { ok = false; f.focus(); }
      });
      if (!ok) { say(t('f_invalid'), 'err'); return; }
      if (form.elements._gotcha.value) return;                      // robô de spam
      if (!CONFIG.formEndpoint) {                                    // envio ainda não configurado
        status.className = 'form-status'; status.textContent = t('f_notyet') + ' ';
        var a = document.createElement('a'); a.href = CONFIG.links.linkedin; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'LinkedIn'; status.appendChild(a);
        return;
      }
      btn.disabled = true; say(t('f_sending'));
      var data = new FormData(form); data.append('_subject', 'Novo contato pelo portfólio — ' + form.elements.name.value.trim());
      fetch(CONFIG.formEndpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say(t('f_ok'), 'ok'); })
        .catch(function () { say(t('f_err'), 'err'); })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ---------- 11. Busca rápida (Ctrl + K) ---------- */
  function Palette() {
    var bg = null, list, input, sel = 0, items = [], last = null;
    function build() {
      var out = [];
      [['nav_about', '#sobre'], ['nav_services', '#servicos'], ['nav_projects', '#projetos'], ['nav_skills', '#habilidades'], ['nav_contact', '#contato']].forEach(function (s) {
        out.push({ label: t(s[0]), hint: t('pal_sec'), run: function () { var el = $(s[1]); if (el) el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); } });
      });
      Object.keys(CONFIG.apps).forEach(function (k) { out.push({ label: CONFIG.apps[k], hint: 'case', run: function () { go(k); } }); });
      [['GitHub', 'github'], ['LinkedIn', 'linkedin'], ['TryHackMe', 'tryhackme'], ['Instagram', 'instagram']].forEach(function (x) { out.push({ label: x[0], hint: t('pal_link'), run: function () { go(x[1]); } }); });
      out.push({ label: t('pal_lang'), hint: t('pal_act'), run: function () { setLang(lang() === 'pt' ? 'en' : 'pt'); } });
      out.push({ label: t('pal_term'), hint: t('pal_act'), run: function () { var i = $('.term-in'); if (i) { i.scrollIntoView({ block: 'center', behavior: RM ? 'auto' : 'smooth' }); setTimeout(function () { i.focus({ preventScroll: true }); }, RM ? 0 : 450); } } });
      return out;
    }
    function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function render() {
      var q = norm(input.value.trim()), all = build();
      items = q ? all.filter(function (it) { return norm(it.label + ' ' + it.hint).indexOf(q) !== -1; }) : all;
      sel = Math.min(sel, Math.max(0, items.length - 1)); list.innerHTML = '';
      if (!items.length) { var e = document.createElement('li'); e.className = 'pal-empty'; e.setAttribute('role', 'presentation'); e.textContent = t('pal_none'); list.appendChild(e); input.removeAttribute('aria-activedescendant'); return; }
      items.forEach(function (it, i) {
        var li = document.createElement('li'), a = document.createElement('span'), b = document.createElement('small');
        li.id = 'pal-opt-' + i; li.setAttribute('role', 'option'); a.textContent = it.label; b.textContent = it.hint; li.appendChild(a); li.appendChild(b);
        li.addEventListener('mousemove', function () { if (sel !== i) { sel = i; mark(); } });
        li.addEventListener('click', function () { choose(i); });
        list.appendChild(li);
      });
      mark();
    }
    function mark() { $$('li', list).forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); }); input.setAttribute('aria-activedescendant', 'pal-opt-' + sel); var c = list.children[sel]; if (c && c.scrollIntoView) c.scrollIntoView({ block: 'nearest' }); }
    function choose(i) { var it = items[i]; if (!it) return; close(); it.run(); }
    function open() {
      if (bg) return; last = document.activeElement;
      bg = document.createElement('div'); bg.className = 'pal-bg';
      var pal = document.createElement('div'); pal.className = 'pal'; pal.setAttribute('role', 'dialog'); pal.setAttribute('aria-modal', 'true'); pal.setAttribute('aria-label', t('pal_ph'));
      pal.innerHTML = '<div class="pal-top"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="text" role="combobox" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list" autocomplete="off" spellcheck="false"><kbd>Esc</kbd></div><ul id="pal-list" role="listbox"></ul><div class="pal-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> <span data-k="nav"></span></span><span><kbd>Enter</kbd> <span data-k="open"></span></span><span><kbd>Esc</kbd> <span data-k="close"></span></span></div>';
      bg.appendChild(pal); document.body.appendChild(bg);
      $('[data-k="nav"]', pal).textContent = t('pal_nav'); $('[data-k="open"]', pal).textContent = t('pal_open_k'); $('[data-k="close"]', pal).textContent = t('pal_close');
      list = $('ul', pal); input = $('input', pal); input.placeholder = t('pal_ph'); sel = 0; render();
      input.addEventListener('input', function () { sel = 0; render(); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) { sel = (sel + 1) % items.length; mark(); } }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) { sel = (sel - 1 + items.length) % items.length; mark(); } }
        else if (e.key === 'Enter') { e.preventDefault(); choose(sel); }
        else if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'Tab') e.preventDefault();
      });
      bg.addEventListener('mousedown', function (e) { if (e.target === bg) close(); });
      setTimeout(function () { input.focus(); }, 0);
    }
    function close() { if (!bg) return; bg.remove(); bg = null; if (last && last.focus) last.focus({ preventScroll: true }); }
    document.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); bg ? close() : open(); } });
    $$('[data-palette]').forEach(function (b) { b.addEventListener('click', open); });
  }

  /* ---------- 12. Contador de visitas anônimo (GoatCounter, sem cookies) ---------- */
  function Stats() {
    if (location.hostname !== CONFIG.statsHost || navigator.webdriver || document.visibilityState === 'prerender') return;
    var q = ['p=' + encodeURIComponent(location.pathname || '/'), 't=' + encodeURIComponent(document.title || ''), 'r=' + encodeURIComponent(document.referrer || ''),
             's=' + encodeURIComponent([screen.width, screen.height, window.devicePixelRatio || 1].join(',')), 'rnd=' + Math.random().toString(36).slice(2)];
    var url = CONFIG.statsUrl + '?' + q.join('&');
    if (navigator.sendBeacon && navigator.sendBeacon(url)) return;
    var img = new Image(); img.src = url;
  }

  /* ---------- Início ---------- */
  Nav(); Hero(); Particles(); Terminal(); Cards(); GitHubStats(); TryHackMe(); ContactForm(); Palette(); Stats();
  ScrollAnimations();
})();
