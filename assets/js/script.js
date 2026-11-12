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
  "term_stack": "linguagens=TypeScript, JavaScript, Python, SQL, C#, Ruby|mobile=React Native, Expo, Capacitor|web=React, Next.js, Vite, Tailwind|desktop=Electron, PyWebView|back-end=Node.js, FastAPI, tRPC, Socket.IO|dados=PostgreSQL, Supabase, SQLite|qualidade=Playwright, Vitest, GitHub Actions, Docker|pentest=Burp Suite, Nmap, Metasploit, sqlmap, ffuf",
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
  "st_hub": "client · 2026",
  "plat_hub": "Online store",
  "visit_store": "Visit store",
  "pd_hub": "Online store built for an overseas business taking its first steps in e-commerce. I organized the sports, fitness and lifestyle catalog, set up pricing in pounds, euros and dollars, and integrated Stripe checkout.",
  "story_label": "How I work",
  "st1_k": "build",
  "st1_t": "From zero to shipped.",
  "st1_p": "Apps for phone, web and desktop, made for the people who use them every day.",
  "st2_k": "test",
  "st2_t": "I find where it breaks.",
  "st2_p": "Web application pentesting: I find the flaws before the wrong people do.",
  "st3_k": "protect",
  "st3_t": "And I lock the door.",
  "st3_p": "Encryption, authentication and hardening from the first line of code.",
  "st4_k": "signature",
  "st4_p": "Where I ship my apps and security content.",
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
  "term_stack": "languages=TypeScript, JavaScript, Python, SQL, C#, Ruby|mobile=React Native, Expo, Capacitor|web=React, Next.js, Vite, Tailwind|desktop=Electron, PyWebView|back-end=Node.js, FastAPI, tRPC, Socket.IO|data=PostgreSQL, Supabase, SQLite|quality=Playwright, Vitest, GitHub Actions, Docker|pentest=Burp Suite, Nmap, Metasploit, sqlmap, ffuf",
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
  "sk_mobile": "Mobile",
  "sk_web": "Web and front-end",
  "sk_desk": "Desktop",
  "sk_back": "Back-end and APIs",
  "sk_data": "Databases",
  "sk_ai": "AI",
  "sk_sec": "Security",
  "sk_qa": "Quality and delivery",
  "sk_tools": "Pentest tools",
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
    var ctx = cv.getContext('2d'), host = cv.closest('.hero') || cv.parentElement;
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

  /* ---------- 4b. Cena cinematográfica: partículas que mudam de forma com a rolagem ----------
     Formas: espalhado → </> → mira → escudo → raposa NYX. Cada forma é desenhada num canvas
     escondido e "amostrada" em pontos; cada partícula viaja entre o ponto i de uma forma e o
     ponto i da próxima. A seção é alta e o palco é sticky, então a rolagem vira a linha do tempo. */
  function Story() {
    var sec = $('[data-story]'); if (!sec) return;
    var cv = $('.story-canvas', sec);
    if (RM || !cv || !cv.getContext) return;                     // movimento reduzido: fica a lista simples
    sec.classList.add('on');
    var ctx = cv.getContext('2d'), chapters = $$('.chapter', sec), steps = $$('.story-steps i', sec);
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w = 0, h = 0, wide = false;
    var N = window.innerWidth < 700 ? 1600 : 3000, SHAPES = [], ready = false;
    var X = new Float32Array(N), Y = new Float32Array(N), Z = new Float32Array(N), D = new Float32Array(N), R = new Float32Array(N);
    var B = new Uint8Array(N), HI = [];
    var prog = 0, sp = 0, mx = 0, my = 0, smx = 0, smy = 0, raf = 0, on = false, inView = false, last = -1;
    for (var i = 0; i < N; i++) { D[i] = Math.random(); R[i] = Math.random(); }

    // amostra os pixels pintados de um desenho 360×360 e devolve N pontos em [-1, 1]
    function sample(draw, hiDraw) {
      var S = 360, c = document.createElement('canvas'); c.width = c.height = S;
      var g = c.getContext('2d', { willReadFrequently: true }); g.fillStyle = g.strokeStyle = '#fff'; g.lineCap = g.lineJoin = 'round';
      draw(g, S);
      var data = g.getImageData(0, 0, S, S).data, pool = [], edge = [], x, y;
      var on = function (x, y) { return x >= 0 && y >= 0 && x < S && y < S && data[(y * S + x) * 4 + 3] > 128; };
      for (y = 0; y < S; y += 2) for (x = 0; x < S; x += 2) if (on(x, y)) {
        pool.push(x, y);
        // borda = pixel pintado com vizinho vazio: recebe mais partículas, para o contorno ficar nítido
        if (!on(x + 5, y) || !on(x - 5, y) || !on(x, y + 5) || !on(x, y - 5)) edge.push(x, y);
      }
      var hiPool = [];
      if (hiDraw) {
        g.clearRect(0, 0, S, S); hiDraw(g, S); data = g.getImageData(0, 0, S, S).data;
        for (y = 0; y < S; y += 2) for (x = 0; x < S; x += 2) if (data[(y * S + x) * 4 + 3] > 128) hiPool.push(x, y);
      }
      var out = { x: new Float32Array(N), y: new Float32Array(N), z: new Float32Array(N), hi: new Uint8Array(N) };
      var nHi = hiPool.length ? Math.round(N * .07) : 0;
      for (var k = 0; k < N; k++) {
        var src = k < nHi ? hiPool : (edge.length && Math.random() < .5 ? edge : pool), j = (Math.random() * (src.length / 2)) | 0;
        out.x[k] = (src[j * 2] + Math.random() * 2 - S / 2) / (S / 2);
        out.y[k] = (src[j * 2 + 1] + Math.random() * 2 - S / 2) / (S / 2);
        out.z[k] = (Math.random() - .5) * .14;
        out.hi[k] = k < nHi ? 1 : 0;
      }
      // embaralha para que cada partícula viaje para um lugar diferente a cada forma (dá o redemoinho)
      for (k = N - 1; k > 0; k--) {
        var r = (Math.random() * (k + 1)) | 0, t;
        t = out.x[k]; out.x[k] = out.x[r]; out.x[r] = t; t = out.y[k]; out.y[k] = out.y[r]; out.y[r] = t;
        t = out.z[k]; out.z[k] = out.z[r]; out.z[r] = t; t = out.hi[k]; out.hi[k] = out.hi[r]; out.hi[r] = t;
      }
      return out;
    }
    function scatter() {
      var o = { x: new Float32Array(N), y: new Float32Array(N), z: new Float32Array(N), hi: new Uint8Array(N) };
      for (var k = 0; k < N; k++) {
        var a = Math.random() * 6.2832, b = Math.acos(Math.random() * 2 - 1), r = 1.3 + Math.random() * 1.5;
        o.x[k] = r * Math.sin(b) * Math.cos(a) * 1.6; o.y[k] = r * Math.sin(b) * Math.sin(a); o.z[k] = r * Math.cos(b);
      }
      return o;
    }
    function poly(g, pts) { g.beginPath(); g.moveTo(pts[0], pts[1]); for (var k = 2; k < pts.length; k += 2) g.lineTo(pts[k], pts[k + 1]); g.closePath(); }
    function build() {
      SHAPES = [
        scatter(),
        // 1. </> — construir
        sample(function (g, S) { g.font = '500 150px "JetBrains Mono", ui-monospace, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('</>', S / 2, S / 2 + 6); }),
        // 2. mira — testar
        sample(function (g, S) {
          var c = S / 2; g.lineWidth = 16; g.beginPath(); g.arc(c, c, 128, 0, 6.2832); g.stroke();
          g.lineWidth = 11; g.beginPath(); g.arc(c, c, 62, 0, 6.2832); g.stroke();
          g.lineWidth = 12; [[c, 8, c, 92], [c, 268, c, 352], [8, c, 92, c], [268, c, 352, c]].forEach(function (l) { g.beginPath(); g.moveTo(l[0], l[1]); g.lineTo(l[2], l[3]); g.stroke(); });
          g.beginPath(); g.arc(c, c, 14, 0, 6.2832); g.fill();
        }, function (g, S) { g.beginPath(); g.arc(S / 2, S / 2, 14, 0, 6.2832); g.fill(); }),
        // 3. escudo com check — proteger
        sample(function (g) {
          g.beginPath(); g.moveTo(180, 22); g.lineTo(312, 72); g.lineTo(312, 170);
          g.bezierCurveTo(312, 252, 256, 312, 180, 340); g.bezierCurveTo(104, 312, 48, 252, 48, 170); g.lineTo(48, 72); g.closePath(); g.fill();
          g.globalCompositeOperation = 'destination-out'; g.lineWidth = 30;
          g.beginPath(); g.moveTo(118, 182); g.lineTo(162, 226); g.lineTo(246, 140); g.stroke();
          g.globalCompositeOperation = 'source-over';
        }),
        // 4. raposa NYX (geométrica), com olhos e o losango da testa em destaque
        sample(function (g) {
          poly(g, [62, 26, 150, 128, 210, 128, 298, 26, 306, 168, 338, 214, 244, 262, 180, 336, 116, 262, 22, 214, 54, 168]); g.fill();
          g.globalCompositeOperation = 'destination-out';
          poly(g, [86, 70, 136, 128, 98, 140]); g.fill(); poly(g, [274, 70, 224, 128, 262, 140]); g.fill();      // dentro das orelhas
          poly(g, [104, 196, 162, 204, 146, 220]); g.fill(); poly(g, [256, 196, 198, 204, 214, 220]); g.fill();  // olhos
          poly(g, [180, 140, 192, 162, 180, 184, 168, 162]); g.fill();                                          // losango
          g.globalCompositeOperation = 'source-over';
        }, function (g) {
          poly(g, [104, 196, 162, 204, 146, 220]); g.fill(); poly(g, [256, 196, 198, 204, 214, 220]); g.fill();
          poly(g, [180, 140, 192, 162, 180, 184, 168, 162]); g.fill();
        })
      ];
      ready = true; frame(performance.now());
    }

    function size() {
      var r = cv.getBoundingClientRect(); w = r.width; h = r.height; wide = w >= 900;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      last = -1;
    }
    function measure() {                                           // 0 → 1 ao longo da seção
      var r = sec.getBoundingClientRect(), span = r.height - window.innerHeight;
      prog = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    }
    function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    var COLORS = ['rgba(124,58,237,.55)', 'rgba(167,139,250,.6)', 'rgba(196,181,253,.7)', 'rgba(237,233,254,.85)'];

    function frame(now) {
      if (!ready || !w) return;
      sp += (prog - sp) * .09;                                     // inércia: a cena "desliza" atrás da rolagem
      smx += (mx - smx) * .05; smy += (my - smy) * .05;
      var u = Math.min(sp * 4, 3.9999), k = Math.floor(u), f = u - k;
      var A = SHAPES[k], Bs = SHAPES[k + 1], mt = Math.min(1, f / .45);
      var time = now * .001, rotY = Math.sin(time * .35) * .3 + smx * .35, rotX = Math.sin(time * .27) * .1 + smy * .2;
      var cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      var S = wide ? Math.min(w * .26, h * .36) : Math.min(w * .42, h * .27), ox = wide ? w * .68 : w / 2, oy = wide ? h / 2 : h * .36;
      var breathe = 1 + Math.sin(time * 1.3) * .012;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < N; i++) {
        var m = Math.min(1, Math.max(0, mt * 1.5 - D[i] * .5)), e = ease(m), arc = Math.sin(e * Math.PI);
        var x = A.x[i] + (Bs.x[i] - A.x[i]) * e + arc * (D[i] - .5) * .9;
        var y = A.y[i] + (Bs.y[i] - A.y[i]) * e + arc * (R[i] - .5) * .9;
        var z = A.z[i] + (Bs.z[i] - A.z[i]) * e + arc * (D[i] + R[i] - 1) * 1.2;
        // flutuação suave quando a forma está montada
        x += Math.sin(time * 1.1 + R[i] * 40) * .006; y += Math.cos(time * .9 + D[i] * 40) * .006;
        var x1 = x * cy - z * sy, z1 = x * sy + z * cy, y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        var p = 2.6 / (2.6 + z2);
        X[i] = ox + x1 * S * p * breathe; Y[i] = oy + y1 * S * p * breathe; Z[i] = p;
        var hi = e > .5 ? Bs.hi[i] : A.hi[i];
        B[i] = hi ? 3 : (p > 1.04 ? 2 : p > .96 ? 1 : 0);
      }
      ctx.globalCompositeOperation = 'lighter';
      for (var b = 0; b < 4; b++) {
        ctx.fillStyle = COLORS[b]; var base = b === 3 ? 2.4 : 1.5;
        for (i = 0; i < N; i++) if (B[i] === b) { var s = base * Z[i]; ctx.fillRect(X[i] - s / 2, Y[i] - s / 2, s, s); }
      }
      ctx.globalCompositeOperation = 'source-over';

      // capítulos: entram depois que a forma se monta e saem antes da próxima
      var idx = Math.round(sp * 4 * 1000) / 1000;
      chapters.forEach(function (c, n) {
        var local = idx - n, a;
        if (n === chapters.length - 1) a = Math.min(1, Math.max(0, (local - .3) / .2));
        else a = Math.min(1, Math.max(0, (local - .3) / .2)) * Math.min(1, Math.max(0, (1 - local) / .12));
        var dy = local < .65 ? (1 - a) * 28 : -(1 - a) * 28;
        c.style.opacity = a.toFixed(3); c.style.transform = 'translate3d(0,' + dy.toFixed(1) + 'px,0)';
        c.setAttribute('aria-hidden', a < .5 ? 'true' : 'false');
      });
      steps.forEach(function (s, n) { s.style.transform = 'scaleY(' + Math.min(1, Math.max(0, u - n)).toFixed(3) + ')'; });
    }
    function loop(now) { measure(); frame(now); raf = requestAnimationFrame(loop); }
    function start() { if (on || document.hidden) return; on = true; raf = requestAnimationFrame(loop); }
    function stop() { on = false; cancelAnimationFrame(raf); }      // canvas pausado fora da tela

    window.addEventListener('pointermove', function (e) {
      if (!inView || e.pointerType !== 'mouse') return;
      mx = e.clientX / window.innerWidth * 2 - 1; my = e.clientY / window.innerHeight * 2 - 1;
    }, { passive: true });
    var tm; window.addEventListener('resize', function () { clearTimeout(tm); tm = setTimeout(size, 150); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (inView) start(); });
    size(); measure(); sp = prog;
    var go = function () { build(); if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; if (inView) start(); else stop(); }); }).observe(sec); else { inView = true; start(); } };
    // espera a fonte mono carregar para o "</>" sair com o desenho certo
    if (document.fonts && document.fonts.load) document.fonts.load('500 150px "JetBrains Mono"').then(go, go); else go();
  }

  /* ---------- 4c. Abertura cinematográfica ----------
     O nome surge letra por letra. Ao rolar, a seção fica presa (pin): o fundo faz um zoom lento,
     o conteúdo sobe e some, a cena escurece e as barras de cinema se recolhem. */
  function Opening() {
    var hero = $('[data-opening]'); if (!hero || RM || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    var name = $('.hero-name', hero), text = name.textContent.trim();
    name.setAttribute('aria-label', text); name.textContent = '';
    text.split(/\s+/).forEach(function (word, wi, all) {
      var w = document.createElement('span'); w.className = 'word'; w.setAttribute('aria-hidden', 'true');
      word.split('').forEach(function (c) { var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); });
      name.appendChild(w); if (wi < all.length - 1) name.appendChild(document.createTextNode(' '));
    });
    gsap.from($$('.ch', name), { opacity: 0, yPercent: 75, duration: .7, stagger: .045, ease: 'power3.out', delay: .2 });
    var tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      trigger: hero, pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
      // se o conteúdo for mais alto que a tela (celular), a pessoa lê tudo e só depois a cena prende
      start: function () { return hero.offsetHeight > window.innerHeight + 4 ? 'bottom bottom' : 'top top'; },
      end: '+=90%'
    } });
    tl.to($('.hero-bg', hero), { scale: 1.25, duration: 1 }, 0)
      .to($('.hero-grid', hero), { y: -50, opacity: 0, duration: .4 }, .55)
      .to($('.hero-shade', hero), { opacity: 1, duration: .35 }, .65)
      .to($('.lbox-t', hero), { scaleY: 0, duration: .2 }, .8)
      .to($('.lbox-b', hero), { scaleY: 0, duration: .2 }, .8);
  }

  /* ---------- 4d. Raposa: rig (aplica a pose às partes do SVG) ----------
     Partes separadas: corpo, 4 pernas, cauda, cabeça e orelhas. A pose é uma mistura de pesos:
     walk/run (ciclo de passos), sit (sentada), lie (deitada), look (olhando), ear (orelha), wag (cauda). */
  function FoxRig(svg) {
    var q = function (k) { return svg.querySelector('[data-fx="' + k + '"]'); };
    var P = { pose: q('pose'), tail: q('tail'), head: q('head'), earb: q('earb'), earf: q('earf'), lbf: q('lbf'), lff: q('lff'), lbn: q('lbn'), lfn: q('lfn') };
    var HIP = { lbf: [-20, -24], lbn: [-14, -23], lff: [16, -24], lfn: [22, -23] };
    return function (s) {
      var w = s.walk, A = 20 + 16 * s.run, ph = s.phase, sit = s.sit, lie = s.lie;
      var sw = { lfn: Math.sin(ph), lbf: Math.sin(ph), lff: Math.sin(ph + Math.PI), lbn: Math.sin(ph + Math.PI) };  // trote: pares diagonais
      var bob = -Math.abs(Math.sin(ph)) * 1.4 * w;
      P.pose.setAttribute('transform', 'translate(0 ' + (15 * sit + 15 * lie + bob).toFixed(2) + ') rotate(' + (-28 * sit).toFixed(2) + ' -18 -22)');
      ['lbf', 'lbn', 'lff', 'lfn'].forEach(function (k) {
        var front = k.charAt(1) === 'f', a = sw[k] * A * w, sy;
        if (front) { a += 28 * sit - 82 * lie; sy = 1 + .16 * sit - .1 * lie; }
        else { a += -62 * sit + 72 * lie; sy = 1 - .3 * sit - .15 * lie; }
        P[k].setAttribute('transform', 'translate(' + HIP[k][0] + ' ' + HIP[k][1] + ') rotate(' + a.toFixed(2) + ') scale(1 ' + sy.toFixed(3) + ')');
      });
      var tail = Math.sin(ph * .5) * 7 * w - 14 * sit - 10 * lie + s.wag * Math.sin(s.t * 7) * 9 - 6 * s.run;
      P.tail.setAttribute('transform', 'rotate(' + tail.toFixed(2) + ' -24 -31)');
      P.head.setAttribute('transform', 'rotate(' + (22 * sit + 9 * lie - 12 * s.look + Math.sin(ph) * 1.5 * w + 6 * s.run).toFixed(2) + ' 22 -36)');
      P.earb.setAttribute('transform', 'rotate(' + (-s.ear * 22).toFixed(2) + ' 27 -48)');
      P.earf.setAttribute('transform', 'rotate(' + (-s.ear * 14).toFixed(2) + ' 34 -49)');
    };
  }
  function foxPose(o) { var s = { phase: 0, walk: 0, run: 0, sit: 0, lie: 0, look: 0, ear: 0, wag: 0, t: 0 }; for (var k in o) s[k] = o[k]; return s; }

  /* ---------- 4e. Raposa guia ----------
     Computador (tela de 1360 px ou mais): a raposa segue uma linha curva (MotionPathPlugin) que desce em
     zigue-zague pelas laterais e atravessa de um lado para o outro entre as seções.
     A posição dela acompanha a rolagem (ScrollTrigger com scrub).
     Celular / telas menores: anda numa faixa na base da tela.
     Ela fica numa camada atrás do conteúdo e não recebe cliques. */
  function FoxGuide() {
    var still = $('.fox-static .fox'); if (still) FoxRig(still)(foxPose({ sit: 1 }));   // versão parada do rodapé
    var tpl = $('#fox-tpl');
    if (RM || !tpl || !window.gsap || !window.ScrollTrigger || !window.MotionPathPlugin) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    var NS = 'http://www.w3.org/2000/svg';
    var layer = document.createElement('div'); layer.className = 'fox-layer'; layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<svg class="fox-trail" xmlns="' + NS + '"><defs><symbol id="nyx-paw" viewBox="-6 -6 12 12">' +
      '<ellipse cx="0" cy="1.8" rx="2.6" ry="2.2"/><circle cx="-2.7" cy="-1.8" r="1"/><circle cx="-1" cy="-3.4" r="1"/><circle cx="1" cy="-3.4" r="1"/><circle cx="2.7" cy="-1.8" r="1"/></symbol></defs>' +
      '<path class="fox-path"/><g class="fox-prints"></g></svg>';
    var fox = tpl.content.querySelector('svg').cloneNode(true);
    var main = $('main') || document.body; layer.appendChild(fox); main.insertBefore(layer, main.firstChild);
    var pathEl = $('.fox-path', layer), prints = $('.fox-prints', layer), rig = FoxRig(fox);
    var secs = ['#sobre', '#servicos', '#projetos', '#habilidades', '#contato'].map(function (s) { return $(s); });
    if (secs.some(function (s) { return !s; })) return;
    var card = $('.project'), form = $('[data-contact]');
    if (card && !$('.fox-glow', card)) { var g = document.createElement('span'); g.className = 'fox-glow'; g.setAttribute('aria-hidden', 'true'); card.appendChild(g); }

    var st = foxPose({ face: 1, s: 0 }), mode = '', total = 1, Ys = null, STEP = 4, tween = null, pos = { x: -100, y: 0, rotation: 0 };
    var MT = 0, Ly = 0, H = 0, C = 1, lastMove = 0, stepAcc = 0, side = 1, prevS = 0, prevScroll = 0, d = 0, earNext = 0, looking = false;
    var scroll = { v: 0 };
    gsap.to(scroll, { v: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .8, invalidateOnRefresh: true } });

    function docRect(el) { var r = el.getBoundingClientRect(), y = (window.scrollY || window.pageYOffset) - (el === main ? 0 : MT); return { top: r.top + y, bottom: r.bottom + y, left: r.left, right: r.right, mid: (r.top + r.bottom) / 2 + y }; }
    // linha com cantos arredondados passando pelos pontos
    function rounded(pts, r) {
      var out = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
      for (var i = 1; i < pts.length - 1; i++) {
        var p = pts[i], a = pts[i - 1], b = pts[i + 1];
        var la = Math.hypot(p[0] - a[0], p[1] - a[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]), ra = Math.min(r, la / 2), rb = Math.min(r, lb / 2);
        var p1 = [p[0] + (a[0] - p[0]) * ra / la, p[1] + (a[1] - p[1]) * ra / la], p2 = [p[0] + (b[0] - p[0]) * rb / lb, p[1] + (b[1] - p[1]) * rb / lb];
        out += ' L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' Q' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
      }
      var z = pts[pts.length - 1]; return out + ' L' + z[0].toFixed(1) + ' ' + z[1].toFixed(1);
    }
    // zigue-zague de y0 até y1 dentro da lateral (centro c, meia largura a); o último ponto cai no lado "endX"
    function zig(pts, c, a, y0, y1, endX, D) {
      var n = Math.max(1, Math.round((y1 - y0) / D));
      for (var j = 0; j <= n; j++) pts.push([((n - j) % 2 === 0) ? endX : (endX === c + a ? c - a : c + a), y0 + (y1 - y0) * j / n]);
    }
    function build() {
      var vw = document.documentElement.clientWidth, vh = window.innerHeight;
      mode = vw >= 1360 ? 'path' : 'strip';
      layer.classList.toggle('strip', mode === 'strip');
      while (prints.firstChild) prints.removeChild(prints.firstChild);
      if (mode === 'strip') { layer.style.height = ''; pathEl.setAttribute('d', ''); return; }
      layer.style.height = '0px';
      MT = docRect(main).top;                                       // a camada mora dentro do main
      layer.style.height = main.scrollHeight + 'px';
      var box = $('#sobre .container').getBoundingClientRect(), gl = box.left, a = Math.max(10, Math.min(60, gl / 2 - 48));   // a raposa (84 px) cabe inteira na lateral
      var cL = gl / 2, cR = box.right + (vw - box.right) / 2, D = 110, R = secs.map(docRect), pts = [[-80, R[0].top + 40]];
      var cardY = card ? docRect(card).mid : R[2].mid, formY = form ? docRect(form).mid : R[4].mid;
      // Sobre (esquerda) → Serviços (direita)
      zig(pts, cL, a, R[0].top + 90, R[0].bottom - 60, cL - a, D);
      zig(pts, cR, a, R[1].top + 90, R[1].bottom - 60, cR + a, D);
      // Projetos (esquerda): um vértice exatamente na altura do card em destaque, do lado mais perto dele
      zig(pts, cL, a, R[2].top + 90, cardY, cL + a, D);
      var tail = []; zig(tail, cL, a, cardY, R[2].bottom - 60, cL + a, D);
      // zig termina no lado pedido; aqui o primeiro ponto precisa ser o do card, então espelha a alternância
      tail = tail.map(function (p, j) { return [(j % 2 === 0) ? cL + a : cL - a, p[1]]; }).slice(1); pts = pts.concat(tail);
      // Habilidades (direita), depois Contato (direita): termina ao lado do formulário, no lado mais perto dele
      zig(pts, cR, a, R[3].top + 90, R[3].bottom - 60, cR + a, D);
      zig(pts, cR, a, R[4].top + 90, formY, cR - a, D);
      pathEl.setAttribute('d', rounded(pts, 22));
      total = pathEl.getTotalLength();
      var n = Math.ceil(total / STEP) + 1; Ys = new Float32Array(n);
      for (var k = 0; k < n; k++) Ys[k] = pathEl.getPointAtLength(Math.min(total, k * STEP)).y;
      for (k = 1; k < n; k++) if (Ys[k] < Ys[k - 1]) Ys[k] = Ys[k - 1];     // garante ordem crescente para a busca
      pathEl.style.strokeDasharray = total; pathEl.style.strokeDashoffset = total;
      if (tween) tween.kill();
      tween = gsap.to(pos, { motionPath: { path: pathEl, autoRotate: true }, duration: 1, ease: 'none', paused: true });
      // parada em Projetos (H) e corrida para recuperar em Habilidades (C)
      Ly = cardY; H = vh * .55; C = Math.max(300, R[3].bottom - 60 - (Ly + H));
    }
    function remap(t) {
      if (t < Ly) return t;
      if (t < Ly + H) return Ly;
      if (t < Ly + H + C) return Ly + (t - Ly - H) * (C + H) / C;
      return t;
    }
    function lengthAtY(y) {
      var lo = 0, hi = Ys.length - 1; if (y <= Ys[0]) return 0; if (y >= Ys[hi]) return total;
      while (hi - lo > 1) { var m = (lo + hi) >> 1; if (Ys[m] < y) lo = m; else hi = m; }
      var f = (y - Ys[lo]) / Math.max(.001, Ys[hi] - Ys[lo]); return Math.min(total, (lo + f) * STEP);
    }
    function paw(x, y, ang) {
      var u = document.createElementNS(NS, 'use'); u.setAttribute('href', '#nyx-paw'); u.setAttribute('class', 'fox-paw');
      u.setAttribute('width', 9); u.setAttribute('height', 9); u.setAttribute('x', -4.5); u.setAttribute('y', -4.5);
      u.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (ang + 90).toFixed(1) + ')');
      prints.appendChild(u);
      gsap.fromTo(u, { opacity: .7 }, { opacity: 0, duration: 2.6, delay: .4, ease: 'power1.in', onComplete: function () { if (u.parentNode) u.parentNode.removeChild(u); } });
      while (prints.childNodes.length > 40) prints.removeChild(prints.firstChild);
    }
    function ease(cur, to, k) { return cur + (to - cur) * k; }

    function tick() {
      var now = performance.now(), vh = window.innerHeight, scrollPx = scroll.v * ScrollTrigger.maxScroll(window);
      st.t = now / 1000;
      var x, y, travel = 0, moving, ds, run = 0, hold = false, lie = false, show;
      if (mode === 'path' && Ys) {
        var t = scrollPx + vh * .6 - MT, s = lengthAtY(remap(t));
        ds = s - prevS; prevS = s;
        tween.progress(s / total); x = pos.x; y = pos.y;
        travel = pos.rotation + (ds < 0 ? 180 : 0);
        hold = t >= Ly && t < Ly + H && Math.abs(remap(t) - Ly) < 1;
        run = t >= Ly + H && t < Ly + H + C ? 1 : 0;
        lie = s >= total - 2;
        show = s > 2;
        pathEl.style.strokeDashoffset = (total - s).toFixed(1);
      } else {
        // faixa na base da tela: anda de um lado para o outro conforme a rolagem
        var vw = document.documentElement.clientWidth, m = 46, W = Math.max(40, vw - 2 * m), dsc = scrollPx - prevScroll; prevScroll = scrollPx;
        var rc = card ? card.getBoundingClientRect() : null, rf = secs[4].getBoundingClientRect(), rs = secs[3].getBoundingClientRect();
        hold = !!rc && (rc.top + rc.bottom) / 2 > vh * .3 && (rc.top + rc.bottom) / 2 < vh * .7;
        lie = rf.top < vh * .55;
        run = rs.top < vh * .6 && rs.bottom > vh * .4 ? 1 : 0;
        var dd = (hold || lie) ? 0 : dsc * .45 * (run ? 1.9 : 1);
        d += dd; ds = dd;
        var p2 = ((d % (2 * W)) + 2 * W) % (2 * W), prevX = st.sx === undefined ? m : st.sx;
        x = m + (p2 < W ? p2 : 2 * W - p2); y = 76;
        travel = x > prevX ? 0 : x < prevX ? 180 : (st.face > 0 ? 0 : 180); st.sx = x;
        show = secs[0].getBoundingClientRect().top < vh * .9;
      }
      moving = Math.abs(ds) > .15;
      if (moving) {
        lastMove = now;
        var faceTo = Math.cos(travel * Math.PI / 180) >= 0 ? 1 : -1;
        st.faceTo = faceTo;
        st.phase += Math.abs(ds) * .13 / (1 + .35 * st.run);
        stepAcc += Math.abs(ds);
        if (stepAcc > (st.run > .5 ? 34 : 26)) {
          stepAcc = 0; side = -side;
          var rad = travel * Math.PI / 180, nx = -Math.sin(rad) * 3.5 * side, ny = Math.cos(rad) * 3.5 * side;
          paw(x + nx, (mode === 'path' ? y - 2 : 79) + ny, travel);
        }
      }
      var idle = now - lastMove > 350;
      st.face = ease(st.face, st.faceTo || 1, .22);
      st.walk = ease(st.walk, moving ? 1 : 0, .18);
      st.run = ease(st.run, run, .06);
      st.lie = ease(st.lie, lie && idle ? 1 : 0, .06);
      st.sit = ease(st.sit, idle && !lie ? 1 : 0, moving ? .3 : .07);
      st.look = ease(st.look, hold && idle ? 1 : 0, .06);
      st.wag = ease(st.wag, idle && !lie ? 1 : 0, .05);
      // de vez em quando mexe as orelhas quando está parada
      if (idle && now > earNext) { earNext = now + 2200 + Math.random() * 2600; gsap.fromTo(st, { ear: 1 }, { ear: 0, duration: .5, ease: 'power2.out' }); }
      // em Projetos: olha para o card em destaque
      if (card) { var look = hold && st.look > .5; if (look !== looking) { looking = look; card.classList.toggle('fox-look', look); } }
      if (hold && mode === 'path') st.faceTo = 1;
      // inclinação acompanha a ladeira do caminho (limitada)
      var tilt = 0;
      if (mode === 'path') { tilt = st.face >= 0 ? travel : travel - 180; tilt = ((tilt + 540) % 360) - 180; tilt = Math.max(-30, Math.min(30, tilt)) * (1 - st.sit) * (1 - st.lie); }
      st.tilt = ease(st.tilt || 0, tilt, .2);
      var ox = mode === 'path' ? 42 : 39, oy = mode === 'path' ? 45.94 : 42.75;
      fox.style.transform = 'translate3d(' + (x - ox).toFixed(1) + 'px,' + (y - oy).toFixed(1) + 'px,0) rotate(' + st.tilt.toFixed(2) + 'deg) scaleX(' + st.face.toFixed(3) + ')';
      fox.classList.toggle('in', !!show);
      rig(st);
    }
    build();
    ScrollTrigger.addEventListener('refresh', build);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    gsap.ticker.add(tick);
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
  Nav(); Hero(); Particles(); Story(); Terminal(); Cards(); GitHubStats(); TryHackMe(); ContactForm(); Palette(); Stats();
  Opening(); ScrollAnimations(); FoxGuide();
})();
